import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';



interface Message {
    _id: string;
    type: string;
    content: string;
    mood?: string;
    timestamp: string;
    reply?: string;
}

const AdminDashboard = () => {
    const navigate = useNavigate();
    const onBack = () => navigate('/navigation');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            // 1. Verify Password
            const loginResponse = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const loginData = await loginResponse.json();

            if (loginData.success) {
                // 2. Fetch Messages
                const msgResponse = await fetch('/api/admin/messages');
                const msgData = await msgResponse.json();

                if (msgData.success) {
                    setIsAuthenticated(true);
                    setMessages(msgData.messages || []);

                    // Mark as read immediately
                    fetch('/api/admin/mark-read', { method: 'POST' });
                } else {
                    setError('Login successful but failed to fetch messages.');
                }
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            setError('Connection failed. Ensure server is running.');
        } finally {
            setLoading(false);
        }
    };

    const getMoodEmoji = (mood?: string) => {
        const moodMap: Record<string, string> = {
            happy: '😄',
            low: '😔',
            angry: '😡',
            confused: '😵',
            loved: '💖',
        };
        return mood ? moodMap[mood] || '💭' : '💭';
    };

    const formatDate = (timestamp: string) => {
        return new Date(timestamp).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'medium',
        });
    };

    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [sendingReply, setSendingReply] = useState(false);

    const handleReply = async (messageId: string) => {
        if (!replyContent.trim()) return;
        setSendingReply(true);
        try {
            const res = await fetch('/api/admin/reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messageId, replyContent }),
            });
            const data = await res.json();
            if (data.success) {
                // Update local state
                setMessages(prev => prev.map(msg =>
                    msg._id === messageId ? { ...msg, reply: replyContent } : msg
                ));
                setReplyingTo(null);
                setReplyContent('');
            }
        } catch (err) {
            console.error('Failed to reply', err);
        } finally {
            setSendingReply(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-midnight-950 via-midnight-900 to-midnight-950 py-20 px-6">
                <div className="relative z-10 max-w-md mx-auto w-full">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={onBack}
                        className="glass px-6 py-3 rounded-full text-white font-sans mb-8 flex items-center gap-2"
                    >
                        ← Back
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass p-8 rounded-3xl"
                    >
                        <h2 className="text-3xl font-display gradient-text mb-6 text-center">
                            Admin Panel 🔐
                        </h2>

                        <div className="space-y-4">
                            {/* Read-only Username Field */}
                            <div>
                                <label className="text-white/70 text-sm font-sans ml-2 mb-1 block">Username</label>
                                <input
                                    type="text"
                                    value="Royal_Singh"
                                    readOnly
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/50 cursor-not-allowed font-sans"
                                />
                            </div>

                            <div>
                                <label className="text-white/70 text-sm font-sans ml-2 mb-1 block">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                    placeholder="Enter password..."
                                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-romantic-400 transition-all font-sans"
                                    autoFocus
                                />
                            </div>

                            {error && (
                                <p className="text-red-400 text-sm text-center">{error}</p>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogin}
                                disabled={loading || !password}
                                className="w-full px-8 py-4 bg-gradient-to-r from-romantic-400 to-romantic-500 text-white rounded-full font-sans text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Checking...' : 'Unlock Panel'}
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen bg-gradient-to-br from-midnight-950 via-midnight-900 to-midnight-950 py-20 px-6">
            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={onBack}
                    className="glass px-6 py-3 rounded-full text-white font-sans mb-8 flex items-center gap-2"
                >
                    ← Back
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-display gradient-text mb-4">
                        Her Messages 💝
                    </h1>
                    <p className="text-lg text-romantic-200 font-sans">
                        {messages.length} message{messages.length !== 1 ? 's' : ''} from Shubhi
                    </p>
                </motion.div>

                {messages.length === 0 ? (
                    <div className="glass p-12 rounded-3xl text-center">
                        <p className="text-2xl text-white/70 font-sans">
                            No messages yet. She hasn't written anything. 💭
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                            <motion.div
                                key={message._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-6 rounded-2xl"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="text-4xl">{getMoodEmoji(message.mood)}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-romantic-300 font-sans">
                                                {message.type === 'thought' ? 'Thought' :
                                                    message.type === 'sentence' ? 'Sentence' :
                                                        message.type === 'anger' ? 'Anger Mode' :
                                                            message.type === 'emotion' ? 'Current Emotion' : 'Message'}
                                            </span>
                                            <span className="text-xs text-white/50 font-sans">
                                                {formatDate(message.timestamp)}
                                            </span>
                                        </div>
                                        <p className="text-white font-sans text-lg leading-relaxed mb-4">
                                            {message.content}
                                        </p>

                                        {/* Reply Section */}
                                        {message.reply ? (
                                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                                <p className="text-xs text-green-400 mb-1 font-bold uppercase tracking-wider">Replied:</p>
                                                <p className="text-white/80 font-sans italic">"{message.reply}"</p>
                                            </div>
                                        ) : (
                                            replyingTo === message._id ? (
                                                <div className="mt-4 flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={replyContent}
                                                        onChange={(e) => setReplyContent(e.target.value)}
                                                        placeholder="Type your reply..."
                                                        className="flex-1 bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-romantic-400"
                                                        autoFocus
                                                    />
                                                    <button
                                                        onClick={() => handleReply(message._id)}
                                                        disabled={sendingReply}
                                                        className="bg-romantic-500 hover:bg-romantic-600 text-white px-4 py-2 rounded-lg font-sans transition-colors"
                                                    >
                                                        Send
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setReplyingTo(null);
                                                            setReplyContent('');
                                                        }}
                                                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-sans transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setReplyingTo(message._id)}
                                                    className="text-sm text-romantic-300 hover:text-romantic-200 font-sans font-medium flex items-center gap-1 transition-colors"
                                                >
                                                    ↩ Reply
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminDashboard;
