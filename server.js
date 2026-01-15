
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- DATA LAYER ABSTRACTION ---

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'messages.json');

// Initialize local file if needed
if (!process.env.KV_REST_API_URL && !fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

const db = {
    async getMessages() {
        if (process.env.KV_REST_API_URL) {
            // Vercel KV
            const messages = await kv.get('messages');
            return messages || [];
        } else {
            // Local FS
            try {
                if (!fs.existsSync(DATA_FILE)) return [];
                const data = fs.readFileSync(DATA_FILE, 'utf8');
                return JSON.parse(data);
            } catch (error) {
                console.error("Error reading local file:", error);
                return [];
            }
        }
    },

    async saveMessages(messages) {
        if (process.env.KV_REST_API_URL) {
            // Vercel KV
            await kv.set('messages', messages);
        } else {
            // Local FS
            fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
        }
    },

    async addMessage(message) {
        const messages = await this.getMessages();
        messages.push(message);
        await this.saveMessages(messages);
        return message;
    },

    async updateMessage(id, updates) {
        const messages = await this.getMessages();
        const index = messages.findIndex(m => m._id === id || m.id === id); // Handle both for safety

        if (index === -1) return null;

        messages[index] = { ...messages[index], ...updates };
        await this.saveMessages(messages);
        return messages[index];
    }
};


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

        const newMessage = {
            _id: Date.now().toString(), // Simple ID generation
            userId: userId || 'anonymous',
            type: type || 'message',
            content,
            mood: mood || 'neutral',
            timestamp: new Date().toISOString(),
            adminRead: false,
            userRead: false
        };

        await db.addMessage(newMessage);

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
        const messages = await db.getMessages();
        // Return latest first
        const sortedMessages = messages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return res.status(200).json({ success: true, messages: sortedMessages });
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

        const updatedMessage = await db.updateMessage(messageId, {
            reply: replyContent,
            replyTimestamp: new Date().toISOString(),
            userRead: false // Mark unread for user
        });

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
        if (!userId || userId === 'undefined') {
            return res.status(400).json({ success: false, error: 'User ID required' });
        }

        const messages = await db.getMessages();
        // Filter messages for this user
        const userMessages = messages
            .filter(m => m.userId === userId)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        return res.status(200).json({ success: true, messages: userMessages });
    } catch (error) {
        console.error('Error fetching user messages:', error);
        return res.status(500).json({ success: false, error: 'Failed to fetch messages' });
    }
});

// 6. Mark Read Endpoints
app.post('/api/admin/mark-read', async (req, res) => {
    try {
        const messages = await db.getMessages();
        let changed = false;

        const updatedMessages = messages.map(msg => {
            if (msg.adminRead === false) {
                changed = true;
                return { ...msg, adminRead: true };
            }
            return msg;
        });

        if (changed) {
            await db.saveMessages(updatedMessages);
        }

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

        const messages = await db.getMessages();
        let changed = false;

        const updatedMessages = messages.map(msg => {
            if (msg.userId === userId && msg.reply && msg.userRead === false) {
                changed = true;
                return { ...msg, userRead: true };
            }
            return msg;
        });

        if (changed) {
            await db.saveMessages(updatedMessages);
        }

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
    if (process.env.KV_REST_API_URL) {
        console.log('✅ Connected to Vercel KV');
    } else {
        console.log('📂 Running in Local Mode (FileSystem)');
    }
});
