import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Ending = () => {
    const [showFirstLine, setShowFirstLine] = useState(false);
    const [showSecondLine, setShowSecondLine] = useState(false);
    const [showSignature, setShowSignature] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setShowFirstLine(true), 1000);
        const timer2 = setTimeout(() => setShowSecondLine(true), 4000);
        const timer3 = setTimeout(() => setShowSignature(true), 7000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <section className="relative min-h-screen w-full py-20 md:py-32 px-6 overflow-hidden flex items-center justify-center bg-gradient-to-b from-midnight-900 via-midnight-950 to-black">
            {/* Gentle stars */}
            <div className="absolute inset-0">
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full twinkle"
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

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
                {/* First line */}
                {showFirstLine && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="space-y-6"
                    >
                        <p className="text-2xl md:text-4xl text-gray-300 leading-relaxed font-sans">
                            I don't know what the future holds.
                        </p>
                        <p className="text-2xl md:text-4xl text-gray-300 leading-relaxed font-sans">
                            But if it has your hand in mine…
                        </p>
                    </motion.div>
                )}

                {/* Second line */}
                {showSecondLine && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        className="space-y-6"
                    >
                        <p className="text-3xl md:text-5xl gradient-text leading-relaxed font-display">
                            I'm ready to walk without questions.
                        </p>
                        <p className="text-xl md:text-2xl text-[#adb5bd] leading-relaxed font-sans italic mt-8">
                            This website will stay here.
                        </p>
                        <p className="text-xl md:text-2xl text-[#adb5bd] leading-relaxed font-sans italic">
                            Even when words fail me.
                        </p>
                        <p className="text-2xl md:text-3xl text-romantic-300 leading-relaxed font-sans mt-8">
                            Because loving you is the one thing I never want to debug ❤️
                        </p>
                    </motion.div>
                )}

                {/* Heart animation */}
                {showSecondLine && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="breathe"
                    >
                        <div className="text-6xl md:text-7xl">
                            ❤️
                        </div>
                    </motion.div>
                )}

                {/* Signature */}
                {showSignature && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2 }}
                        className="pt-16"
                    >
                        <div className="glass px-8 py-6 inline-block">
                            <p className="text-xl md:text-2xl text-romantic-300 font-handwriting">
                                Made with love,<br />only for you.
                            </p>
                        </div>

                        {/* Scroll to top hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 1.5 }}
                            className="mt-12"
                        >
                            <motion.button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-gray-500 text-sm font-sans hover:text-romantic-300 transition-colors duration-300 flex items-center gap-2 mx-auto"
                            >
                                <motion.span
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    ↑
                                </motion.span>
                                <span>Start over</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Ending;
