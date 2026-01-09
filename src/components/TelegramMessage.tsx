
import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface TelegramMessageProps {
    onBack: () => void;
}

const TelegramMessage = ({ onBack }: TelegramMessageProps) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSend = async () => {
        if (!message.trim()) return;

        setIsLoading(true);
        setStatus('idle');

        try {
            // Using /api prefix which corresponds to the proxy in vite.config.ts
            // Ensure node server.js is running on port 3000
            await axios.post('/api/send-message', { message });
            setStatus('success');
            setStatusMessage('Message delivered flawlessly ✨');
            setMessage('');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error: any) {
            console.error('Error sending message:', error);
            setStatus('error');

            // Detailed error for debugging
            if (error.code === "ERR_NETWORK") {
                setStatusMessage('Network Error: Is the backend server running? Run "node server.js"');
            } else if (error.response?.status === 404) {
                setStatusMessage('Error 404: Endpoint not found. Check server running on port 3000.');
            } else {
                setStatusMessage(error.response?.data?.error || 'Failed to send message');
            }

            setTimeout(() => setStatus('idle'), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen py-20 px-6 bg-gradient-to-br from-midnight-950 via-midnight-900 to-midnight-950 overflow-hidden flex flex-col items-center">

            <div className="relative z-10 w-full max-w-lg mx-auto">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    onClick={onBack}
                    className="glass px-6 py-3 rounded-full text-white font-sans mb-8 flex items-center gap-2 hover:bg-white/10 transition-colors"
                >
                    <span>←</span> Back
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
                >
                    <h3 className="text-2xl font-sans text-white mb-6 text-center">
                        Send a direct note 💌
                    </h3>

                    <div className="space-y-4">
                        <div className="relative">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message here..."
                                className="w-full h-48 bg-black/20 text-white placeholder-white/40 rounded-xl p-4 resize-none border border-white/10 focus:border-[#ff7eb3] focus:outline-none transition-all font-sans text-lg"
                                disabled={isLoading}
                                autoFocus
                            />
                        </div>

                        <AnimatePresence mode="wait">
                            {status !== 'idle' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`text-center text-sm font-medium px-4 ${status === 'success' ? 'text-green-400' : 'text-red-400'
                                        }`}
                                >
                                    {statusMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSend}
                            disabled={isLoading || !message.trim()}
                            className={`w-full py-4 rounded-xl font-sans font-medium text-white shadow-lg transition-all text-lg ${isLoading || !message.trim()
                                    ? 'bg-white/10 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] hover:shadow-[#ff7eb3]/20'
                                }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Sending...</span>
                                </div>
                            ) : (
                                'Send to Phone 📱'
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TelegramMessage;
