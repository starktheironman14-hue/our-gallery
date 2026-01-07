import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface IntroScreenProps {
    onContinue: () => void;
    onDecline: () => void;
}

const IntroScreen = ({ onContinue, onDecline }: IntroScreenProps) => {
    const [showFirstLine, setShowFirstLine] = useState(false);
    const [showSecondLine, setShowSecondLine] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setShowFirstLine(true), 500);
        const timer2 = setTimeout(() => setShowSecondLine(true), 2000);
        const timer3 = setTimeout(() => setShowButtons(true), 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <div className="space-y-12 text-center">
            {showFirstLine && (
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="text-5xl md:text-7xl font-display text-white"
                >
                    <TypewriterText text="Hey…" speed={150} />
                </motion.h1>
            )}

            {showSecondLine && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5 }}
                    className="text-2xl md:text-3xl text-[#cdb4db] font-sans"
                >
                    <TypewriterText text="Before you enter, can I ask you a few things?" speed={60} />
                </motion.p>
            )}

            {showButtons && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-6 justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onContinue}
                        className="px-8 py-4 bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white rounded-full font-sans text-lg shadow-lg"
                    >
                        Yes 🤍
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onDecline}
                        className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-sans text-lg"
                    >
                        No 😌
                    </motion.button>
                </motion.div>
            )}
        </div>
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

export default IntroScreen;
