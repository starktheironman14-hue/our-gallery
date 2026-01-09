import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import FloatingEmojis from './FloatingEmojis';

interface WriteEmotionsProps {
    onBack: () => void;
}

const WriteEmotions = ({ onBack }: WriteEmotionsProps) => {
    const [showInbox, setShowInbox] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [emotion, setEmotion] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [saving, setSaving] = useState(false);

    const [unreadCount, setUnreadCount] = useState(0);

    const fetchMessages = async () => {
        const userId = localStorage.getItem('companion_userId') || 'shubhi';
        try {
            const res = await fetch(`/api/messages/user/${userId}`);
            const data = await res.json();
            if (data.success) {
                setMessages(data.messages);
                // Update unread count
                const count = data.messages.filter((msg: any) => msg.reply && msg.userRead === false).length;
                setUnreadCount(count);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 10000);
        return () => clearInterval(interval);
    }, []);

    const toggleInbox = () => {
        if (!showInbox) {
            // Mark replies as read when opening
            const userId = localStorage.getItem('companion_userId') || 'shubhi';
            fetch('/api/user/mark-read', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });
            // Clear local count immediately
            setUnreadCount(0);
        }
        fetchMessages(); // Refresh list either way
        setShowInbox(!showInbox);
    };

    const handleSubmit = async () => {
        if (!emotion.trim()) return;

        setSaving(true);
        try {
            // Generate or get userId
            let userId = localStorage.getItem('companion_userId');
            if (!userId) {
                userId = 'shubhi_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('companion_userId', userId);
            }

            await fetch('/api/message/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    type: 'emotion',
                    content: emotion,
                    mood: null,
                }),
            });

            setSubmitted(true);
            setTimeout(() => {
                setEmotion('');
                setSubmitted(false);
            }, 3000);
        } catch (error) {
            console.error('Failed to save emotion:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="relative min-h-screen py-20 px-6 bg-gradient-to-br from-midnight-950 via-midnight-900 to-midnight-950 overflow-hidden">
            <FloatingEmojis position="all" />

            <div className="relative z-10 max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05, x: -5 }}
                        onClick={onBack}
                        className="glass px-6 py-3 rounded-full text-white font-sans flex items-center gap-2"
                    >
                        ← Back
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={toggleInbox}
                        className={`px-6 py-3 rounded-full text-white font-sans flex items-center gap-2 transition-all relative ${showInbox ? 'bg-white/20' : 'glass'}`}
                    >
                        {showInbox ? '✍️ Write' : '📥 Inbox'}
                        {unreadCount > 0 && !showInbox && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md animate-bounce">
                                {unreadCount}
                            </span>
                        )}
                    </motion.button>
                </div>

                {showInbox ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar"
                    >
                        <h2 className="text-3xl font-display text-white mb-6 text-center">Your Messages 💌</h2>
                        {messages.length === 0 ? (
                            <p className="text-center text-white/50 font-sans">No messages yet. Write something!</p>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg._id} className="glass p-6 rounded-2xl space-y-4">
                                    <div className="flex justify-between items-start">
                                        <p className="text-white/90 font-sans text-lg">{msg.content}</p>
                                        <span className="text-xs text-white/30 whitespace-nowrap ml-4">
                                            {new Date(msg.timestamp).toLocaleString('en-IN', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short',
                                            })}
                                        </span>
                                    </div>

                                    {msg.reply ? (
                                        <div className="bg-white/10 rounded-xl p-4 border border-romantic-400/30">
                                            <p className="text-xs text-romantic-300 mb-1 font-bold uppercase tracking-wider">He replied:</p>
                                            <p className="text-white font-serif italic text-lg">"{msg.reply}"</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-white/30 text-sm">
                                            <span className="w-2 h-2 rounded-full bg-yellow-500/50 animate-pulse" />
                                            Waiting for reply...
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </motion.div>
                ) : (
                    !submitted ? (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-4xl md:text-6xl font-display gradient-text mb-6">
                                    Write your current emotions
                                </h2>
                                <p className="text-xl text-romantic-200 font-sans">
                                    for me my baby 🤗🥵😘
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-6"
                            >
                                <textarea
                                    value={emotion}
                                    onChange={(e) => setEmotion(e.target.value)}
                                    placeholder="Tell me how you're feeling right now... 💕"
                                    className="w-full h-64 px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-3xl text-white text-lg placeholder-white/50 focus:outline-none focus:border-romantic-400 transition-all resize-none"
                                    autoFocus
                                />

                                <div className="flex justify-end">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSubmit}
                                        disabled={!emotion.trim() || saving}
                                        className="px-8 py-4 bg-gradient-to-r from-romantic-400 to-romantic-500 text-white rounded-full font-sans text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {saving ? 'Sending...' : 'Send to him 💝'}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-9xl"
                            >
                                💝
                            </motion.div>
                            <p className="text-3xl md:text-4xl text-white font-sans">
                                Got it, baby! 🥰
                            </p>
                            <p className="text-xl text-romantic-200 font-sans">
                                He'll read this soon 💕
                            </p>
                        </motion.div>
                    )
                )}
            </div>
        </section>
    );

};

export default WriteEmotions;
