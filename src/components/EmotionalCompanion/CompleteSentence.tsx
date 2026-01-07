import { motion } from 'framer-motion';
import { useState } from 'react';

interface CompleteSentenceProps {
    userName: string;
    onComplete: () => void;
}

const prompts = [
    "When I think of us, I feel ___",
    "Something I never say out loud is ___",
    "Right now, my heart feels ___",
];

const CompleteSentence = ({ userName, onComplete }: CompleteSentenceProps) => {
    const [responses, setResponses] = useState<string[]>(['', '', '']);
    const [submitted, setSubmitted] = useState(false);

    const handleResponseChange = (index: number, value: string) => {
        const newResponses = [...responses];
        newResponses[index] = value;
        setResponses(newResponses);
    };

    const handleSubmit = async () => {
        const allFilled = responses.every(r => r.trim());
        if (!allFilled) return;

        try {
            const userId = localStorage.getItem('companion_userId');

            // Save each response
            for (let i = 0; i < prompts.length; i++) {
                await fetch('/api/message/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId,
                        type: 'sentence',
                        content: `${prompts[i]} ${responses[i]}`,
                        mood: null,
                    }),
                });
            }

            setSubmitted(true);
            setTimeout(() => onComplete(), 3000);
        } catch (error) {
            console.error('Failed to save responses:', error);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0F1A] via-[#1a0a1a] to-[#0B0F1A] overflow-hidden py-20 px-6">
            {/* Soft glow */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff7eb3] rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-3xl mx-auto w-full">
                {!submitted ? (
                    <>
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl text-[#cdb4db] font-sans text-center mb-12"
                        >
                            Complete these sentences, {userName}
                        </motion.h2>

                        <div className="space-y-8">
                            {prompts.map((prompt, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="space-y-3"
                                >
                                    <p className="text-xl text-white/90 font-sans">
                                        {prompt}
                                    </p>
                                    <input
                                        type="text"
                                        value={responses[index]}
                                        onChange={(e) => handleResponseChange(index, e.target.value)}
                                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white text-lg placeholder-white/50 focus:outline-none focus:border-[#ff7eb3] transition-all"
                                        placeholder="Your answer..."
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex justify-end mt-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSubmit}
                                disabled={!responses.every(r => r.trim())}
                                className="px-8 py-4 bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white rounded-full font-sans text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit 🤍
                            </motion.button>
                        </motion.div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-6"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-7xl"
                        >
                            ✨
                        </motion.div>
                        <p className="text-3xl md:text-4xl text-white font-sans">
                            That felt honest.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default CompleteSentence;
