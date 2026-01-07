import { motion } from 'framer-motion';
import FloatingEmojis from './FloatingEmojis';

interface AlwaysHereProps {
    onBack: () => void;
}

const AlwaysHere = ({ onBack }: AlwaysHereProps) => {
    return (
        <section className="relative min-h-screen py-20 px-6 bg-gradient-to-br from-rose-950 via-black to-rose-950 overflow-hidden flex items-center justify-center">
            <FloatingEmojis position="all" />

            {/* Soft glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    onClick={onBack}
                    className="glass px-6 py-3 rounded-full text-white font-sans mb-8 flex items-center gap-2 absolute top-0 left-0"
                >
                    ← Back
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="space-y-12 mt-20"
                >
                    {/* Photo frame */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="glass p-6 rounded-3xl inline-block"
                    >
                        <h3 className="text-xl md:text-2xl font-display text-white mb-6">
                            Whenever you need me, just look here... 📸💕
                        </h3>
                        <motion.div
                            animate={{
                                boxShadow: [
                                    "0 0 0 0px rgba(236, 72, 153, 0.4)",
                                    "0 0 0 20px rgba(236, 72, 153, 0)",
                                ],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}
                            className="w-80 h-80 rounded-2xl overflow-hidden relative mx-auto"
                        >
                            <img
                                src="/Me/WhatsApp Image 2026-01-07 at 19.21.16.jpeg"
                                alt="Us together"
                                className="w-full h-full object-cover"
                            />
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                        </motion.div>
                    </motion.div>

                    {/* Message with emojis */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        className="space-y-6 glass p-8 rounded-3xl"
                    >
                        <div className="glass inline-block px-10 py-6 rounded-[2rem] border border-white/20">
                            <p className="text-2xl md:text-3xl text-romantic-200 font-sans leading-relaxed">
                                Babu, you are my everything 💕
                            </p>
                            <p className="text-xl md:text-2xl text-gray-300 font-sans leading-relaxed mt-4">
                                Mai hamesha tumhare sath rahunga, har situation me, har mod par. 🤝❤️<br />
                                I promise to be your strength when you feel weak. 💪
                            </p>
                        </div>
                        <motion.p
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="text-xl md:text-2xl text-romantic-300 font-sans leading-relaxed mt-8"
                        >
                            Humara future sirf sapna nahi, ek wada hai... 🌟<br />
                            Ki hum dono sath milkar ek beautiful life banayenge, 💑<br />
                            Husband-Wife banke, hamesha ke liye. 💍❤️
                        </motion.p>
                    </motion.div>

                    {/* Digital hug */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 1.5 }}
                        className="pt-8"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="text-7xl"
                        >
                            🤗
                        </motion.div>
                        <p className="text-lg text-gray-300 font-sans italic mt-4">
                            This is my digital hug for you, Kitkat 💝
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AlwaysHere;
