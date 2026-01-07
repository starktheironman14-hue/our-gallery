import { motion } from 'framer-motion';
import { useState } from 'react';
import FloatingEmojis from './FloatingEmojis';

interface OurWorldProps {
    onBack: () => void;
}

const apps = [
    {
        id: 'memories',
        emoji: '📁',
        name: 'Our Memories',
        animation: ['📸', '💕', '✨', '🎥'],
        text: 'Feelings saved in silence 💝'
    },
    {
        id: 'messages',
        emoji: '📨',
        name: 'Messages',
        animation: ['💌', '💕', '💖', '💝'],
        text: 'My heart never stays quiet about you 🫶🏻'
    },
    {
        id: 'songs',
        emoji: '🎵',
        name: 'Our Songs',
        animation: ['🎶', '🎤', '🎧', '💕'],
        text: 'Some songs sound like you, Shubhi 🥰'
    },
    {
        id: 'future',
        emoji: '🔐',
        name: 'Our Future',
        animation: ['💍', '🏡', '👶', '♾️'],
        text: 'Every version has you in it, Kitkat 💕'
    },
];

const OurWorld = ({ onBack }: OurWorldProps) => {
    const [selectedApp, setSelectedApp] = useState<number | null>(null);

    return (
        <section className="relative min-h-screen py-20 px-6 overflow-hidden">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("/anshu/WhatsApp%20Image%202025-12-31%20at%2014.26.56%20(1).jpeg")',
                }}
            />

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <FloatingEmojis position="all" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    onClick={onBack}
                    className="glass px-6 py-3 rounded-full text-white font-sans mb-8 flex items-center gap-2"
                >
                    ← Back
                </motion.button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="glass inline-block px-10 py-6 rounded-[2rem] border border-white/20">
                        <h2 className="text-5xl md:text-7xl font-display text-white mb-2 drop-shadow-lg">
                            Our World 💻
                        </h2>
                        <p className="text-lg text-gray-200 font-sans italic drop-shadow-lg">
                            An OS built on feelings
                        </p>
                    </div>
                </motion.div>

                {/* App grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {apps.map((app, index) => (
                        <motion.button
                            key={app.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, y: -10 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedApp(index)}
                            className="folder flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
                        >
                            <motion.div
                                animate={selectedApp === index ? {
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.2, 1],
                                } : {}}
                                transition={{ duration: 0.5 }}
                                className="text-8xl drop-shadow-lg"
                            >
                                {app.emoji}
                            </motion.div>
                            <p className="text-white text-sm font-sans text-center drop-shadow-lg">
                                {app.name}
                            </p>
                        </motion.button>
                    ))}
                </div>

                {/* Quick peek animation */}
                {selectedApp !== null && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        className="glass p-12 rounded-3xl text-center"
                    >
                        {/* Animated icons */}
                        <div className="flex justify-center gap-4 mb-8">
                            {apps[selectedApp].animation.map((emoji, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20, rotate: 0 }}
                                    animate={{
                                        opacity: 1,
                                        y: [0, -20, 0],
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        delay: i * 0.2,
                                        y: { duration: 2, repeat: Infinity },
                                        rotate: { duration: 3, repeat: Infinity },
                                    }}
                                    className="text-5xl"
                                >
                                    {emoji}
                                </motion.div>
                            ))}
                        </div>

                        {/* Message */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-2xl text-white font-sans"
                        >
                            {apps[selectedApp].text}
                        </motion.p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default OurWorld;
