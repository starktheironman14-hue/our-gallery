import { motion } from 'framer-motion';
import { useState } from 'react';
import FloatingEmojis from './FloatingEmojis';

interface WhyYouProps {
    onBack: () => void;
}

const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💞', '💝', '💘', '🩷', '🧡', '💛', '💚', '🩵', '💙', '💜', '🤎', '🖤', '🤍'];

const reasons = [
    { emoji: '😊', text: 'Your smile, Shubhi', heart: heartEmojis[0] },
    { emoji: '🤫', text: 'Your silence', heart: heartEmojis[1] },
    { emoji: '💕', text: 'How you care', heart: heartEmojis[2] },
    { emoji: '🏡', text: 'Your chaos feels like home', heart: heartEmojis[3] },
    { emoji: '🎵', text: 'The way you say my name', heart: heartEmojis[4] },
    { emoji: '👂', text: 'How you listen', heart: heartEmojis[5] },
    { emoji: '✨', text: 'You make moments special', heart: heartEmojis[6] },
    { emoji: '💯', text: 'Your honesty', heart: heartEmojis[7] },
    { emoji: '😂', text: 'Your laugh, Kitkat', heart: heartEmojis[8] },
    { emoji: '🧠', text: 'You remember everything', heart: heartEmojis[9] },
    { emoji: '💪', text: 'Your strength', heart: heartEmojis[10] },
    { emoji: '🌍', text: 'How you see the world', heart: heartEmojis[11] },
    { emoji: '🫶🏻', text: 'You make me feel safe', heart: heartEmojis[12] },
    { emoji: '💭', text: 'Your dreams', heart: heartEmojis[13] },
    { emoji: '📱', text: 'Late night texts', heart: heartEmojis[14] },
    { emoji: '🤐', text: 'You understand my silence', heart: heartEmojis[15] },
    { emoji: '💝', text: 'You being you', heart: heartEmojis[16] },
    { emoji: '♾️', text: 'Then I realized... no why left', heart: heartEmojis[17] },
];

const WhyYou = ({ onBack }: WhyYouProps) => {
    const [activeHeart, setActiveHeart] = useState<number | null>(null);

    const handleHeartClick = (index: number) => {
        // Toggle: if clicking the same heart, close it; otherwise show new one
        setActiveHeart(activeHeart === index ? null : index);
    };

    return (
        <section className="relative min-h-screen py-20 px-6 overflow-hidden">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url("/Kitkat/WhatsApp%20Image%202025-12-31%20at%2014.26.57.jpeg")',
                }}
            />

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <FloatingEmojis position="all" />

            <div className="relative z-10 max-w-5xl mx-auto">
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
                        <h2 className="text-5xl md:text-7xl font-display gradient-text mb-2">
                            Why You 💝
                        </h2>
                        <p className="text-lg text-romantic-200 font-sans italic">
                            Click the hearts, Kitkat
                        </p>
                    </div>
                </motion.div>

                {/* Heart grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
                    {reasons.map((reason, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleHeartClick(index)}
                            className="relative group"
                        >
                            {/* Different heart for each */}
                            <motion.div
                                animate={activeHeart === index ? {
                                    scale: [1, 1.3, 1],
                                } : {}}
                                transition={{ duration: 0.5 }}
                                className="text-6xl cursor-pointer"
                            >
                                {reason.heart}
                            </motion.div>

                            {/* Reason popup - only show if this heart is active */}
                            {activeHeart === index && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                    className="absolute -top-20 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-lg whitespace-nowrap z-20"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{reason.emoji}</span>
                                        <p className="text-sm text-white font-sans">{reason.text}</p>
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/10" />
                                </motion.div>
                            )}

                            {/* Sparkles on click */}
                            {activeHeart === index && (
                                <div className="absolute inset-0 pointer-events-none">
                                    {[...Array(4)].map((_, i) => (
                                        <motion.span
                                            key={i}
                                            className="absolute text-xl"
                                            style={{
                                                left: '50%',
                                                top: '50%',
                                            }}
                                            animate={{
                                                x: [0, (Math.cos(i * 90 * Math.PI / 180) * 40)],
                                                y: [0, (Math.sin(i * 90 * Math.PI / 180) * 40)],
                                                opacity: [1, 0],
                                            }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            ✨
                                        </motion.span>
                                    ))}
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Final message */}
                {activeHeart === reasons.length - 1 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center glass p-12 rounded-3xl"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="text-7xl mb-6"
                        >
                            ♾️
                        </motion.div>
                        <p className="text-2xl md:text-3xl font-display text-romantic-300 italic">
                            The list stopped here…<br />but my feelings didn't, Shubhi 💕
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default WhyYou;
