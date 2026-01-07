import { motion } from 'framer-motion';

interface SuccessScreenProps {
    onEnter: () => void;
}

const SuccessScreen = ({ onEnter }: SuccessScreenProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="space-y-12 text-center"
        >
            {/* Warm glow animation */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff7eb3] rounded-full blur-3xl -z-10"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
            >
                <p className="text-3xl md:text-4xl text-white font-sans">
                    I recognize you now.
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <p className="text-4xl md:text-5xl gradient-text font-display">
                        Welcome home, KitKat ❤️
                    </p>
                </motion.div>
            </motion.div>

            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEnter}
                className="px-12 py-5 bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white rounded-full font-display text-2xl shadow-2xl"
            >
                Enter
            </motion.button>
        </motion.div>
    );
};

export default SuccessScreen;
