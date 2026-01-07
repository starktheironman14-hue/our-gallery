import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAutosave } from '../../hooks/useAutosave';

interface WriteThoughtsProps {
    userName: string;
    currentMood: string;
    onSubmit: () => void;
}

const WriteThoughts = ({ userName, currentMood, onSubmit }: WriteThoughtsProps) => {
    const [thought, setThought] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const saveThought = async (content: string) => {
        const userId = localStorage.getItem('companion_userId');
        await fetch('/api/message/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                type: 'thought',
                content,
                mood: currentMood,
            }),
        });
    };

    const { isSaving } = useAutosave(thought, saveThought, 5000);

    const handleSubmit = async () => {
        if (!thought.trim()) return;

        await saveThought(thought);
        setSubmitted(true);

        setTimeout(() => {
            onSubmit();
        }, 3000);
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
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <p className="text-2xl md:text-3xl text-[#cdb4db] font-sans mb-4">
                                You can write anything here.
                            </p>
                            <p className="text-xl text-white/70 font-sans mb-2">
                                I won't interrupt.
                            </p>
                            <p className="text-xl text-white/70 font-sans">
                                I won't judge.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            <textarea
                                value={thought}
                                onChange={(e) => setThought(e.target.value)}
                                placeholder="Type here… I'm listening."
                                className="w-full h-64 px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-3xl text-white text-lg placeholder-white/50 focus:outline-none focus:border-[#ff7eb3] transition-all resize-none"
                                autoFocus
                            />

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-white/50 font-sans">
                                    {isSaving ? 'Saving...' : 'Auto-saved'}
                                </span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSubmit}
                                    disabled={!thought.trim()}
                                    className="px-8 py-4 bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white rounded-full font-sans text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Leave it here 🤍
                                </motion.button>
                            </div>
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
                            🤍
                        </motion.div>
                        <p className="text-3xl md:text-4xl text-white font-sans">
                            Thank you for trusting me with this.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default WriteThoughts;
