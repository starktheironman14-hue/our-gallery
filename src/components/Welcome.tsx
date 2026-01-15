import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import FloatingEmojis from './FloatingEmojis';

import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
    const onEnter = () => navigate('/navigation');
    const [showFirstLine, setShowFirstLine] = useState(false);
    const [showSecondLine, setShowSecondLine] = useState(false);
    const [showThirdLine, setShowThirdLine] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setShowFirstLine(true), 500);
        const timer2 = setTimeout(() => setShowSecondLine(true), 2500);
        const timer3 = setTimeout(() => setShowThirdLine(true), 4500);
        const timer4 = setTimeout(() => setShowButton(true), 6500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    return (
        <section className="relative h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-midnight-950 via-[#1a0a1a] to-romantic-900 overflow-hidden">
            {/* Floating emojis */}
            <FloatingEmojis position="all" />

            {/* Romantic glow */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-romantic-500 rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative z-10 px-6 max-w-3xl">
                {/* Top Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="glass px-8 py-4 rounded-2xl mb-12 inline-block"
                >
                    <h2 className="text-2xl md:text-4xl font-display text-white tracking-wider uppercase">
                        Our Personal Digital Diary
                    </h2>
                </motion.div>

                {/* Breathing heart */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-8xl md:text-9xl mb-8"
                >
                    💕
                </motion.div>

                {showFirstLine && (
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="text-4xl md:text-6xl font-display gradient-text mb-6"
                    >
                        <TypewriterText text="Hey Kitkat..." speed={100} />
                    </motion.h1>
                )}

                {showSecondLine && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="text-xl md:text-2xl text-romantic-200 font-sans mb-4"
                    >
                        <TypewriterText text="This is not just a website" speed={80} />
                    </motion.p>
                )}

                {showThirdLine && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="text-xl md:text-2xl text-romantic-300 font-sans mb-12"
                    >
                        <TypewriterText text="It's my heart, coded for you 💝" speed={80} />
                    </motion.p>
                )}

                {showButton && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onEnter}
                        className="relative group glass px-12 py-10 rounded-3xl overflow-hidden backdrop-blur-md border-2 border-white/20 hover:border-romantic-400 transition-all duration-300"
                    >
                        {/* Gradient background on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-romantic-400 to-romantic-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            {/* Breathing heart emoji */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.15, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="text-8xl"
                            >
                                ❤️
                            </motion.div>

                            {/* Text */}
                            <div className="text-center space-y-2">
                                <p className="text-2xl font-display text-white">
                                    Enter in my heart
                                </p>
                                <p className="text-lg font-sans text-romantic-200 italic">
                                    which beats for you, and only you 💕
                                </p>
                            </div>
                        </div>
                    </motion.button>
                )}
            </div>
        </section>
    );
};

// Typewriter component
const TypewriterText = ({ text, speed = 100 }: { text: string; speed?: number }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    return <span>{displayedText}</span>;
};

export default Welcome;
