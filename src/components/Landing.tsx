import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LandingProps {
    onEnter: () => void;
}

const Landing = ({ onEnter }: LandingProps) => {
    const [showFirstLine, setShowFirstLine] = useState(false);
    const [showSecondLine, setShowSecondLine] = useState(false);
    const [showThirdLine, setShowThirdLine] = useState(false);
    const [showFourthLine, setShowFourthLine] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setShowFirstLine(true), 500);
        const timer2 = setTimeout(() => setShowSecondLine(true), 3500);
        const timer3 = setTimeout(() => setShowThirdLine(true), 6000);
        const timer4 = setTimeout(() => setShowFourthLine(true), 8500);
        const timer5 = setTimeout(() => setShowButton(true), 11500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
        };
    }, []);

    return (
        <section className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-midnight-950 to-[#111827] relative overflow-hidden">
            {/* Floating particles */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-romantic-400 rounded-full opacity-30 twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Soft glow effect */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-romantic-500 rounded-full opacity-10 blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lavender-light rounded-full opacity-10 blur-3xl animate-pulse-slow" />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl">
                {showFirstLine && (
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-display text-white mb-6"
                    >
                        <TypewriterText text="This website is not perfect…" speed={80} />
                    </motion.h1>
                )}

                {showSecondLine && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="text-2xl md:text-4xl font-display text-romantic-200 mb-4"
                    >
                        <TypewriterText text="because it was never meant to be." speed={90} />
                    </motion.h2>
                )}

                {showThirdLine && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="text-2xl md:text-4xl font-display text-romantic-200 mb-4"
                    >
                        <TypewriterText text="It was meant to be honest." speed={90} />
                    </motion.h2>
                )}

                {showFourthLine && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-display text-romantic-300 mb-12"
                    >
                        <TypewriterText text="And it was made only for you ❤️" speed={100} />
                    </motion.h2>
                )}

                {showButton && (
                    <>
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            onClick={onEnter}
                            className="mt-10 px-8 py-3 rounded-full bg-gradient-to-r from-romantic-400 to-romantic-500 text-white shadow-lg hover:shadow-2xl hover:shadow-romantic-500/50 transition-all duration-300 animate-pulse font-sans font-medium text-lg"
                        >
                            Enter My Heart →
                        </motion.button>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="text-sm md:text-base text-[#adb5bd] italic mt-6"
                        >
                            Please don't scroll fast…<br />
                            I put my heart in every part.
                        </motion.p>
                    </>
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

export default Landing;
