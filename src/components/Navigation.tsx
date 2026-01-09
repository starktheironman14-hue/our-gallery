import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import FloatingEmojis from './FloatingEmojis';

interface NavigationProps {
    onSectionSelect: (section: string) => void;
    onBack: () => void;
}


interface Section {
    id: string;
    emoji: string;
    title: string;
    subtitle: string;
    gradient: string;
}

const sections: Section[] = [
    {
        id: 'memory-lane',
        emoji: '📸',
        title: 'Memory Lane',
        subtitle: 'Our special moments',
        gradient: 'from-pink-500 to-rose-500',
    },
    {
        id: 'midnight-chats',
        emoji: '🌙',
        title: 'Midnight Chats',
        subtitle: 'Late night talks',
        gradient: 'from-purple-500 to-indigo-500',
    },
    {
        id: 'why-you',
        emoji: '💝',
        title: 'Why You',
        subtitle: 'Reasons I fell',
        gradient: 'from-red-500 to-pink-500',
    },
    {
        id: 'mood-meter',
        emoji: '😊',
        title: 'Mood Meter',
        subtitle: 'How you feel',
        gradient: 'from-yellow-500 to-orange-500',
    },
    {
        id: 'our-world',
        emoji: '💻',
        title: 'Our World',
        subtitle: 'Love OS',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        id: 'always-here',
        emoji: '🤗',
        title: 'Always Here',
        subtitle: 'When you need me',
        gradient: 'from-green-500 to-emerald-500',
    },
    {
        id: 'forever',
        emoji: '💍',
        title: 'Forever',
        subtitle: 'Our future',
        gradient: 'from-romantic-400 to-romantic-600',
    },
    {
        id: 'write-emotions',
        emoji: '📝',
        title: 'Write for Me',
        subtitle: 'Your current feelings',
        gradient: 'from-pink-600 to-purple-600',
    },
    {
        id: 'telegram-message',
        emoji: '📱',
        title: 'Direct Message',
        subtitle: 'Send to my phone',
        gradient: 'from-blue-600 to-indigo-600',
    },
];

const Navigation = ({ onSectionSelect, onBack }: NavigationProps) => {
    const [replyCount, setReplyCount] = useState(0);
    const [adminMsgCount, setAdminMsgCount] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            const userId = localStorage.getItem('companion_userId') || 'shubhi';
            try {
                // 1. Check Inbox Replies (for User)
                const resUser = await fetch(`/api/messages/user/${userId}`);
                const dataUser = await resUser.json();
                if (dataUser.success) {
                    // Count replies that are NOT read by user
                    const count = dataUser.messages.filter((msg: any) => msg.reply && msg.userRead === false).length;
                    setReplyCount(count);
                }

                // 2. Check Admin Messages (for Admin)
                // We fetch all messages to see if any are unread by admin
                // This is lightweight enough for now
                const resAdmin = await fetch('/api/admin/messages');
                const dataAdmin = await resAdmin.json();
                if (dataAdmin.success) {
                    // Count messages NOT read by admin
                    // If field is missing (old messages), assume unread or read? 
                    // Let's assume unread if explicit adminRead is strictly false or undefined? 
                    // Actually, undefined usually means old. Let's say if (msg.adminRead === false).
                    const count = dataAdmin.messages.filter((msg: any) => msg.adminRead === false).length;
                    setAdminMsgCount(count);
                }

            } catch (err) {
                console.error("Failed to fetch notifications", err);
            }
        };

        fetchNotifications();
        // Poll every 10 seconds for faster updates
        const interval = setInterval(fetchNotifications, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen py-20 px-6 bg-gradient-to-br from-rose-950 via-black to-rose-950 overflow-hidden">
            {/* Floating emojis */}
            <FloatingEmojis position="all" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16 relative"
                >
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        onClick={onBack}
                        className="absolute -top-12 left-0 glass px-6 py-2 rounded-full text-white hover:text-white/80 transition-colors text-sm font-sans flex items-center gap-2"
                    >
                        <span>←</span> Back
                    </motion.button>

                    {/* Admin Button */}
                    <div className="absolute -top-12 right-0">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            onClick={() => onSectionSelect('admin')}
                            className="glass px-6 py-2 rounded-full text-white hover:text-white/80 transition-colors text-sm font-sans flex items-center gap-2 relative"
                        >
                            <span>🔒</span> Admin
                            {adminMsgCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md">
                                    {adminMsgCount}
                                </span>
                            )}
                        </motion.button>
                    </div>

                    <div className="glass inline-block px-10 py-6 rounded-[2rem] border border-white/20">
                        <motion.h1
                            className="text-5xl md:text-7xl font-display gradient-text mb-4"
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            For You, Shubhi 💕
                        </motion.h1>
                        <p className="text-lg md:text-xl text-romantic-200 font-sans italic">
                            Choose where your heart wants to go
                        </p>
                    </div>
                </motion.div>

                {/* Section buttons grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {sections.map((section, index) => (
                        <motion.button
                            key={section.id}
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.05,
                                y: -10,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSectionSelect(section.id)}
                            className="relative group glass p-8 overflow-hidden"
                        >
                            {/* Notification Badge */}
                            {section.id === 'write-emotions' && replyCount > 0 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-4 left-4 z-20 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white/20"
                                >
                                    {replyCount}
                                </motion.div>
                            )}

                            {/* Gradient background on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                            {/* Heart explosion on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                {[...Array(6)].map((_, i) => (
                                    <motion.span
                                        key={i}
                                        className="absolute text-xl"
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                        }}
                                        animate={{
                                            x: [0, (Math.cos(i * 60 * Math.PI / 180) * 80)],
                                            y: [0, (Math.sin(i * 60 * Math.PI / 180) * 80)],
                                            opacity: [0, 1, 0],
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                        }}
                                    >
                                        💖
                                    </motion.span>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <motion.div
                                    className="text-6xl mb-4"
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                    }}
                                >
                                    {section.emoji}
                                </motion.div>
                                <h3 className="text-2xl font-display text-white mb-2">
                                    {section.title}
                                </h3>
                                <p className="text-sm text-gray-300 font-sans">
                                    {section.subtitle}
                                </p>
                            </div>

                            {/* Glow effect */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${section.gradient} blur-xl -z-10`} />
                        </motion.button>
                    ))}
                </div>

                {/* Bottom message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                    className="text-center space-y-4"
                >
                    <p className="text-gray-400 text-sm font-sans italic">
                        Made with love, only for you Kitkat 💝
                    </p>
                    {/* Hidden admin access - triple click */}
                    <p
                        onClick={(e) => {
                            if (e.detail === 3) {
                                onSectionSelect('admin');
                            }
                        }}
                        className="text-gray-600 text-xs font-sans cursor-default select-none"
                    >
                        v1.0
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Navigation;
