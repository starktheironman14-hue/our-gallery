import { motion } from 'framer-motion';
import { useState } from 'react';
import FloatingEmojis from './FloatingEmojis';

interface ForeverProps {
    onBack: () => void;
}

const Forever = ({ onBack }: ForeverProps) => {
    const [showRing, setShowRing] = useState(false);

    return (
        <section className="relative min-h-screen py-20 px-6 bg-gradient-to-br from-rose-950 via-black to-rose-950 overflow-hidden flex items-center justify-center">
            <FloatingEmojis position="all" />

            {/* Stars */}
            <div className="absolute inset-0">
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Romantic glow */}
            <motion.div
                animate={{
                    opacity: [0.05, 0.15, 0.05],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-romantic-500 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    onClick={onBack}
                    className="glass px-6 py-3 rounded-full text-white font-sans mb-8 flex items-center gap-2 absolute top-0 left-0"
                >
                    ← Back
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="space-y-12 mt-20"
                >
                    {/* Video */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="glass p-6 rounded-3xl inline-block mb-8"
                    >
                        <h3 className="text-xl md:text-2xl font-display text-white mb-4">
                            Every second with you is my favorite movie 🎬💑
                        </h3>
                        <video
                            src="/anshu/WhatsApp Video 2025-12-31 at 14.27.01.mp4"
                            controls
                            className="w-full max-w-2xl rounded-2xl"
                            poster="/anshu/WhatsApp Image 2025-12-31 at 14.26.56 (1).jpeg"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </motion.div>

                    {/* Infinity symbol */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="text-9xl"
                    >
                        ♾️
                    </motion.div>

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        className="space-y-8"
                    >
                        <div className="glass inline-block px-10 py-6 rounded-[2rem] border border-white/20">
                            <p className="text-3xl md:text-5xl gradient-text font-display mb-4">
                                With you, Shubhi
                            </p>
                            <p className="text-2xl md:text-4xl text-romantic-200 font-display">
                                I'm ready for everything ✨
                            </p>
                            <p className="text-xl md:text-2xl text-gray-300 font-sans italic mt-8">
                                Loving you is the one thing<br />
                                I never want to debug, Kitkat 💕
                            </p>
                        </div>
                    </motion.div>

                    {/* Ring animation */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowRing(true)}
                        className="glass px-8 py-4 rounded-full text-lg text-white font-sans"
                    >
                        Click for a promise 💍
                    </motion.button>

                    {/* Ring reveal */}
                    {showRing && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-8xl"
                            >
                                💍
                            </motion.div>

                            {/* Sparkles */}
                            {[...Array(8)].map((_, i) => (
                                <motion.span
                                    key={i}
                                    className="absolute text-3xl"
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                    }}
                                    animate={{
                                        x: [0, (Math.cos(i * 45 * Math.PI / 180) * 60)],
                                        y: [0, (Math.sin(i * 45 * Math.PI / 180) * 60)],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.1,
                                    }}
                                >
                                    ✨
                                </motion.span>
                            ))}
                        </motion.div>
                    )}

                    {/* Signature */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1.5 }}
                        className="pt-12"
                    >
                        <div className="glass px-8 py-4 inline-block">
                            <p className="text-xl text-romantic-300 font-handwriting">
                                Forever yours,<br />only for you Kitkat 💝
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Forever;
