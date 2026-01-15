import { motion } from 'framer-motion';
import { useState } from 'react';
import FloatingEmojis from './FloatingEmojis';

interface WriteEmotionsProps {
    onBack: () => void;
}

const WriteEmotions = ({ onBack }: WriteEmotionsProps) => {
    const [theme, setTheme] = useState('');
    const [emotion, setEmotion] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the emotion
        // For now, we'll just clear the form or show a success message
        alert('Your feelings are safe with me 💕');
        setTheme('');
        setEmotion('');
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen py-20 px-6 bg-gradient-to-br from-rose-950 via-black to-rose-950 overflow-hidden flex items-center justify-center"
        >
            <FloatingEmojis position="all" />

            {/* Background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-romantic-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-2xl">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    onClick={onBack}
                    className="glass px-6 py-3 rounded-full text-white font-sans mb-8 flex items-center gap-2"
                >
                    ← Back
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-8 md:p-12 rounded-3xl"
                >
                    <h2 className="text-3xl md:text-4xl font-display gradient-text mb-6 text-center">
                        Write Your Heart Out ✍️
                    </h2>
                    <p className="text-gray-300 font-sans text-center mb-10">
                        Whatever you feel, let it flow here. No judgments, just love.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-white font-sans mb-2 ml-1">Title / Theme</label>
                            <input
                                type="text"
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                placeholder="e.g., Missing you, Happy thoughts..."
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-romantic-400 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-white font-sans mb-2 ml-1">Your Feelings</label>
                            <textarea
                                value={emotion}
                                onChange={(e) => setEmotion(e.target.value)}
                                placeholder="Pour your heart out..."
                                rows={6}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-romantic-400 transition-colors resize-none"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-romantic-500 to-rose-600 text-white font-bold font-sans shadow-lg shadow-romantic-500/30 hover:shadow-romantic-500/50 transition-all"
                        >
                            Save My Feelings 💝
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default WriteEmotions;
