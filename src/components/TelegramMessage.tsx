import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FloatingEmojis from './FloatingEmojis';



const TelegramMessage = () => {
    const navigate = useNavigate();
    const onBack = () => navigate('/navigation');
    const [message, setMessage] = useState('');
    const [isActive, setIsActive] = useState(false);

    const handleSend = () => {
        if (!message.trim()) return;

        // Construct the telegram URL structure
        // Replace USERNAME with actual username if known, otherwise generic link
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(message)}&text=${encodeURIComponent("Sent from LoveOS")}`;

        // Since we can't deep direct message without a bot usually, we'll simulate or redirect
        window.open(telegramUrl, '_blank');

        setMessage('');
        alert('Opening Telegram... ✈️');
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen py-20 px-6 bg-gradient-to-br from-[#2AABEE]/20 via-black to-[#2AABEE]/20 overflow-hidden flex items-center justify-center"
        >
            <FloatingEmojis position="all" />

            <div className="relative z-10 w-full max-w-md">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    onClick={onBack}
                    className="glass px-6 py-3 rounded-full text-white font-sans mb-8 flex items-center gap-2"
                >
                    ← Back
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#1c2e36] p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    {/* Telegram Header */}
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl">
                            ✈️
                        </div>
                        <div>
                            <h3 className="text-white font-sans font-medium text-lg">Send to My Telegram</h3>
                            <p className="text-blue-300/60 text-sm">Always online for you</p>
                        </div>
                    </div>

                    {/* Message Input Area */}
                    <div className="relative bg-[#0e1621] rounded-xl p-4 min-h-[150px] mb-4">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onFocus={() => setIsActive(true)}
                            onBlur={() => setIsActive(false)}
                            placeholder="Type a message..."
                            className="w-full bg-transparent text-white font-sans resize-none outline-none text-base placeholder-white/30 h-32"
                        />
                    </div>

                    {/* Send Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className={`w-full py-3 rounded-xl font-bold font-sans flex items-center justify-center gap-2 transition-all ${message.trim()
                            ? 'bg-[#2AABEE] text-white shadow-lg shadow-[#2AABEE]/30'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <span>Send Message</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={message.trim() ? "translate-x-1 transition-transform" : ""}>
                            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.button>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default TelegramMessage;
