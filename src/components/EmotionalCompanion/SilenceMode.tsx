import { motion } from 'framer-motion';

interface SilenceModeProps {
    userName: string;
    onBack: () => void;
}

const SilenceMode = ({ userName, onBack }: SilenceModeProps) => {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#030508] via-[#050810] to-[#030508] overflow-hidden">
            {/* Very subtle glow */}
            <motion.div
                animate={{
                    opacity: [0.03, 0.06, 0.03],
                    scale: [1, 1.05, 1],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#cdb4db] rounded-full blur-3xl"
            />

            <div className="relative z-10 text-center space-y-12">
                {/* Breathing hug emoji */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-9xl"
                >
                    🤗
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 2 }}
                    className="space-y-6"
                >
                    <p className="text-3xl md:text-4xl text-white/90 font-sans">
                        I'm here.
                    </p>
                    <p className="text-2xl text-white/70 font-sans">
                        You're not alone.
                    </p>
                </motion.div>

                {/* Back button (subtle) */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    onClick={onBack}
                    className="mt-16 px-6 py-3 bg-white/5 backdrop-blur-sm text-white/70 rounded-full font-sans text-sm"
                >
                    ← Back
                </motion.button>
            </div>
        </section>
    );
};

export default SilenceMode;
