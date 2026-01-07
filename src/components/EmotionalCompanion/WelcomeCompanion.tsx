import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTyping } from '../../hooks/useTyping';

interface WelcomeCompanionProps {
    onContinue: (name: string) => void;
    onNotNow: () => void;
}

const WelcomeCompanion = ({ onContinue, onNotNow }: WelcomeCompanionProps) => {
    const [stage, setStage] = useState<'greeting' | 'waiting' | 'question' | 'name' | 'declined'>('greeting');
    const [name, setName] = useState('');

    const greeting = useTyping("Hey…", 100);
    const waiting = useTyping("I was waiting for you.", 80);
    const question = useTyping("Can I ask you something?", 80);

    useEffect(() => {
        if (greeting.isComplete) {
            setTimeout(() => setStage('waiting'), 1000);
        }
    }, [greeting.isComplete]);

    useEffect(() => {
        if (stage === 'waiting' && waiting.isComplete) {
            setTimeout(() => setStage('question'), 1500);
        }
    }, [stage, waiting.isComplete]);

    const handleYes = () => {
        setStage('name');
    };

    const handleNotNow = () => {
        setStage('declined');
        setTimeout(() => onNotNow(), 3000);
    };

    const handleNameSubmit = () => {
        if (name.trim()) {
            localStorage.setItem('companion_name', name);
            onContinue(name);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0F1A] via-[#1a0a1a] to-[#0B0F1A] overflow-hidden">
            {/* Soft glow */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff7eb3] rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
                {/* Greeting stage */}
                {stage === 'greeting' && (
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-5xl md:text-7xl font-display text-white mb-8"
                    >
                        {greeting.displayedText}
                    </motion.h1>
                )}

                {/* Waiting stage */}
                {stage === 'waiting' && (
                    <>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-5xl md:text-7xl font-display text-white mb-8"
                        >
                            Hey…
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-2xl md:text-3xl text-[#cdb4db] font-sans"
                        >
                            {waiting.displayedText}
                        </motion.p>
                    </>
                )}

                {/* Question stage */}
                {stage === 'question' && (
                    <>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-5xl md:text-7xl font-display text-white mb-8"
                        >
                            Hey…
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-2xl md:text-3xl text-[#cdb4db] font-sans mb-12"
                        >
                            {question.displayedText}
                        </motion.p>

                        {question.isComplete && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex gap-6 justify-center"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleYes}
                                    className="px-8 py-4 bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white rounded-full font-sans text-lg shadow-lg"
                                >
                                    Yes 💗
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleNotNow}
                                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-sans text-lg"
                                >
                                    Not now 😌
                                </motion.button>
                            </motion.div>
                        )}
                    </>
                )}

                {/* Name input stage */}
                {stage === 'name' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <p className="text-2xl md:text-3xl text-[#cdb4db] font-sans">
                            What should I call you?
                        </p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                            placeholder="Your name..."
                            className="w-full max-w-md mx-auto px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full text-white text-center text-xl placeholder-white/50 focus:outline-none focus:border-[#ff7eb3] transition-all"
                            autoFocus
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNameSubmit}
                            disabled={!name.trim()}
                            className="px-8 py-4 bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white rounded-full font-sans text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue 🤍
                        </motion.button>
                    </motion.div>
                )}

                {/* Declined stage */}
                {stage === 'declined' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        <p className="text-2xl md:text-3xl text-[#cdb4db] font-sans">
                            That's okay.
                        </p>
                        <p className="text-xl text-white/70 font-sans">
                            I'll still be here.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default WelcomeCompanion;
