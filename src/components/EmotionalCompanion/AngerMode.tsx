import { motion } from 'framer-motion';
import { useState } from 'react';

interface AngerModeProps {
    userName: string;
    onSubmit: () => void;
}

const AngerMode = ({ userName, onSubmit }: AngerModeProps) => {
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        if (!message.trim()) return;

        try {
            const userId = localStorage.getItem('companion_userId');
            await fetch('/api/message/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    type: 'anger',
                    content: message,
                    mood: 'angry',
                }),
            });

            setSubmitted(true);
            setTimeout(() => onSubmit(), 4000);
        } catch (error) {
            console.error('Failed to save message:', error);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050810] via-[#0a0510] to-[#050810] overflow-hidden py-20 px-6">
            {/* Darker, slower glow */}
            <motion.div
                animate={{
                    opacity: [0.05, 0.1, 0.05],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-3xl mx-auto w-full">
                {!submitted ? (
                    <>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-center mb-12"
                        >
                            <p className="text-2xl md:text-3xl text-red-300 font-sans mb-6">
                                You don't have to talk nicely here.
                            </p>
                            <p className="text-xl text-white/70 font-sans">
                                Just be real.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="space-y-6"
                        >
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Say whatever you need to."
                                className="w-full h-64 px-6 py-4 bg-white/5 backdrop-blur-sm border-2 border-red-900/30 rounded-3xl text-white text-lg placeholder-white/30 focus:outline-none focus:border-red-700/50 transition-all resize-none"
                                autoFocus
                            />

                            <div className="flex justify-end">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSubmit}
                                    disabled={!message.trim()}
                                    className="px-8 py-4 bg-gradient-to-r from-red-700 to-red-900 text-white rounded-full font-sans text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Leave it here
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                        className="text-center space-y-8"
                    >
                        <p className="text-3xl md:text-4xl text-white font-sans">
                            I'm still here.
                        </p>
                        <p className="text-2xl text-white/70 font-sans">
                            Take your time.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default AngerMode;
