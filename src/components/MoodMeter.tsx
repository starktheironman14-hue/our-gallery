import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import FloatingEmojis from './FloatingEmojis';

interface MoodMeterProps {
    onBack: () => void;
}

const moods = [
    {
        emoji: '😄',
        name: 'Happy',
        animation: ['🌟', '✨', '💫', '⭐'],
        message: 'Stay like this, Shubhi 💕'
    },
    {
        emoji: '🥺',
        name: 'Missing',
        animation: ['💕', '💖', '💗', '💝'],
        message: 'My heart never left your side, Kitkat 🫶🏻'
    },
    {
        emoji: '😡',
        name: 'Angry',
        animation: ['🌧️', '⛈️', '🌈', '☀️'],
        message: 'I\'m here, not going anywhere 💪'
    },
    {
        emoji: '😴',
        name: 'Tired',
        animation: ['🌙', '💤', '☁️', '✨'],
        message: 'Rest, Shubhi. I\'ll guard your peace 😌'
    },
];

const MoodMeter = ({ onBack }: MoodMeterProps) => {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen py-20 px-6 overflow-hidden flex items-center justify-center bg-black"
        >
            {/* Background Image Container with 10px spacing acting as a frame */}
            <div className="absolute inset-[10px] rounded-[20px] overflow-hidden z-0 shadow-2xl border border-white/10">
                <div
                    className="absolute inset-0 bg-center transform hover:scale-105 transition-transform duration-[20s]"
                    style={{
                        backgroundImage: "url('/mood_bg_v2.jpg')",
                        backgroundSize: '100% 100%' // Force 16:10 aspect ratio by stretching to fill container
                    }}
                />
                {/* Dark overlay for better text readability - No blur */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <FloatingEmojis position="all" />

            <div className="relative z-10 max-w-4xl mx-auto w-full">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    onClick={onBack}
                    className="fixed top-6 left-6 z-50 glass px-6 py-3 rounded-full text-white font-sans flex items-center gap-2"
                >
                    ← Back
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="glass inline-block px-10 py-6 rounded-[2rem] border border-white/20">
                        <h2 className="text-5xl md:text-7xl font-display gradient-text mb-2">
                            How are you feeling? 😊
                        </h2>
                        <p className="text-lg text-romantic-200 font-sans italic">
                            Tell me, Kitkat
                        </p>
                    </div>
                </motion.div>

                {/* Mood selector */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {moods.map((mood, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedMood(index)}
                            className={`glass p-8 relative ${selectedMood === index ? 'ring-4 ring-romantic-400' : ''
                                }`}
                        >
                            <motion.div
                                animate={selectedMood === index ? {
                                    scale: [1, 1.3, 1],
                                    rotate: [0, 10, -10, 0],
                                } : {}}
                                transition={{ duration: 0.5 }}
                                className="text-7xl mb-3"
                            >
                                {mood.emoji}
                            </motion.div>
                            <p className="text-white font-sans">{mood.name}</p>
                        </motion.button>
                    ))}
                </div>

                {/* Animated response */}
                <AnimatePresence mode="wait">
                    {selectedMood !== null && (
                        <motion.div
                            key={selectedMood}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="glass p-12 rounded-3xl text-center"
                        >
                            {/* Animated scene */}
                            <div className="flex justify-center gap-4 mb-8">
                                {moods[selectedMood].animation.map((emoji, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.3, duration: 0.5 }}
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
                                transition={{ delay: 1 }}
                                className="text-2xl text-romantic-200 font-sans"
                            >
                                {moods[selectedMood].message}
                            </motion.p>

                            {/* Floating hearts */}
                            <div className="mt-6 flex justify-center gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <motion.span
                                        key={i}
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                        className="text-3xl"
                                    >
                                        ❤️
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
};

export default MoodMeter;
