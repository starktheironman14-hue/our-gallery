import { motion } from 'framer-motion';
import { useState } from 'react';

interface RadioQuestionProps {
    question: string;
    options: string[];
    onSubmit: (answer: string) => Promise<boolean>;
    successMessage?: string;
    isValidating?: boolean;
}

const RadioQuestion = ({ question, options, onSubmit, successMessage, isValidating }: RadioQuestionProps) => {
    const [selected, setSelected] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async () => {
        if (!selected) return;

        const result = await onSubmit(selected);
        if (result) {
            setShowSuccess(true);
        }
    };

    if (showSuccess && successMessage) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
            >
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5 }}
                    className="text-3xl md:text-4xl text-[#cdb4db] font-sans"
                >
                    {successMessage}
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 text-center"
        >
            <h2 className="text-3xl md:text-4xl text-white font-sans">
                {question}
            </h2>

            <div className="space-y-4 max-w-md mx-auto">
                {options.map((option, index) => (
                    <motion.button
                        key={option}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelected(option)}
                        className={`w-full px-6 py-4 rounded-2xl font-sans text-lg transition-all ${selected === option
                            ? 'bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white shadow-lg'
                            : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
                            }`}
                        disabled={isValidating}
                    >
                        {option}
                    </motion.button>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={!selected || isValidating}
                className="px-8 py-4 bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white rounded-full font-sans text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isValidating ? 'Checking...' : 'Continue'}
            </motion.button>
        </motion.div>
    );
};

export default RadioQuestion;
