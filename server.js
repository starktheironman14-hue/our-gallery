
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import mongoose from 'mongoose'; // Added mongoose

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI is missing in .env file. Database features will not work.");
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Database Schema
const messageSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, default: 'message' },
    mood: String,
    timestamp: { type: Date, default: Date.now },
    reply: String,
    replyTimestamp: Date,
    adminRead: { type: Boolean, default: false },
    userRead: { type: Boolean, default: false }
});

const Message = mongoose.model('Message', messageSchema);

// Telegram Config
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// --- API ROUTES ---

// 1. Save Message (Write for Me)
app.post('/api/message/save', async (req, res) => {
    try {
        const { content, type, mood, userId } = req.body;

        if (!content) {
            return res.status(400).json({ success: false, error: 'Content is required' });
        }

        const newMessage = await Message.create({
            userId: userId || 'anonymous',
            type: type || 'message',
            content,
            mood: mood || 'neutral',
            timestamp: new Date(),
            adminRead: false
        });

        return res.status(200).json({ success: true, message: 'Message saved', data: newMessage });
    } catch (error) {
        console.error('Error saving message:', error);
        return res.status(500).json({ success: false, error: 'Failed to save message' });
    }
});

// 2. Admin Login
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    // Hardcoded password as requested
    if (password === 'anurag_s') {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ success: false, error: 'Invalid password' });
    }
});

// 3. Get All Messages (Protected)
app.get('/api/admin/messages', async (req, res) => {
    try {
        // Return latest first
        const messages = await Message.find().sort({ timestamp: -1 });
        return res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error('Error reading messages:', error);
        return res.status(500).json({ success: false, error: 'Failed to retrieve messages' });
    }
});

// 4. Admin Reply
app.post('/api/admin/reply', async (req, res) => {
    try {
        const { messageId, replyContent } = req.body;

        if (!messageId || !replyContent) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            {
                reply: replyContent,
                replyTimestamp: new Date(),
                userRead: false
            },
            { new: true } // Return updated doc
        );

        if (!updatedMessage) {
            return res.status(404).json({ success: false, error: 'Message not found' });
        }

        return res.status(200).json({ success: true, message: 'Reply sent' });

    } catch (error) {
        console.error('Error sending reply:', error);
        return res.status(500).json({ success: false, error: 'Failed to send reply' });
    }
});

// 5. Get Messages for User (Inbox)
app.get('/api/messages/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        // Ensure we handle "undefined" string case just in case
        if (!userId || userId === 'undefined') {
            return res.status(400).json({ success: false, error: 'User ID required' });
        }

        // Filter messages for this user
        const userMessages = await Message.find({ userId }).sort({ timestamp: -1 });

        return res.status(200).json({ success: true, messages: userMessages });
    } catch (error) {
        console.error('Error fetching user messages:', error);
        return res.status(500).json({ success: false, error: 'Failed to fetch messages' });
    }
});

// 6. Mark Read Endpoints
app.post('/api/admin/mark-read', async (req, res) => {
    try {
        await Message.updateMany({ adminRead: false }, { adminRead: true });
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error marking admin read:', error);
        return res.status(500).json({ success: false });
    }
});

app.post('/api/user/mark-read', async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ success: false });

        // Mark replies for this user as read
        await Message.updateMany(
            { userId, reply: { $exists: true, $ne: null }, userRead: false },
            { userRead: true }
        );

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error marking user read:', error);
        return res.status(500).json({ success: false });
    }
});


// 7. Send Telegram Message
app.post('/api/send-message', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Message cannot be empty'
            });
        }

        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.error('Missing Telegram Environment Variables');
            return res.status(500).json({
                success: false,
                error: 'Server configuration error'
            });
        }

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            }),
        });

        const data = await response.json();

        if (data.ok) {
            return res.status(200).json({
                success: true,
                message: 'Message sent successfully!'
            });
        } else {
            console.error('Telegram API Error:', data);
            return res.status(500).json({
                success: false,
                error: 'Failed to send message to Telegram',
                details: data.description
            });
        }

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
