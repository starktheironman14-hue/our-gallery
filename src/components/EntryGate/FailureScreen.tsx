import { motion } from 'framer-motion';

interface FailureScreenProps {
    message: string;
}

const FailureScreen = ({ message }: FailureScreenProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="space-y-12 text-center"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <p className="text-3xl md:text-4xl text-white/90 font-sans leading-relaxed">
                    {message}
                </p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="space-y-4"
                >
                    <p className="text-xl text-white/70 font-sans">
                        This space is personal.
                    </p>
                    <p className="text-xl text-white/70 font-sans">
                        If it's not yours, please leave gently.
                    </p>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-6xl"
            >
                🤍
            </motion.div>
        </motion.div>
    );
};

export default FailureScreen;
