import { motion } from 'framer-motion';

const IfYouFeelAlone = () => {
    return (
        <section className="relative min-h-screen w-full py-32 px-6 overflow-hidden flex items-center justify-center bg-gradient-to-t from-black to-midnight-950">
            {/* Soft glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-romantic-500 rounded-full opacity-5 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="space-y-12"
                >
                    {/* Floating heart with breathing animation */}
                    <motion.div
                        className="breathe text-6xl md:text-7xl"
                    >
                        💝
                    </motion.div>

                    {/* Main message */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-3xl md:text-5xl font-display text-romantic-200 leading-relaxed"
                    >
                        If You Ever Feel Alone
                    </motion.h2>

                    {/* Message content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.6 }}
                        className="space-y-8"
                    >
                        <p className="breathe text-xl md:text-2xl text-gray-300 leading-relaxed font-sans">
                            If you're reading this on a bad day…
                        </p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 1 }}
                            className="text-2xl md:text-3xl text-romantic-200 leading-relaxed font-display"
                        >
                            please remember one thing.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 1.5 }}
                            className="pt-8 space-y-6"
                        >
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-sans">
                                You matter.
                            </p>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-sans">
                                More than you know.
                            </p>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-sans">
                                More than you believe.
                            </p>
                            <p className="breathe text-lg md:text-xl text-gray-300 leading-relaxed font-sans">
                                And somewhere, someone is silently choosing you… every single day.
                            </p>
                            <p className="text-xl md:text-2xl text-romantic-200 leading-relaxed font-sans font-semibold">
                                That someone is me.
                            </p>
                        </motion.div>

                        {/* Gentle embrace visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 2 }}
                            className="pt-12"
                        >
                            <div className="glass px-8 py-4 inline-block">
                                <p className="text-2xl md:text-3xl">
                                    🤗
                                </p>
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 2.5 }}
                            className="text-base md:text-lg text-[#adb5bd] leading-relaxed font-sans italic pt-8"
                        >
                            This is my digital hug for you. Whenever you need it.
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default IfYouFeelAlone;
