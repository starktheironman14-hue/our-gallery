import { motion } from 'framer-motion';
import { useState } from 'react';

interface QuestionProps {
    question: string;
    placeholder: string;
    onSubmit: (answer: string) => Promise<boolean>;
    successMessage?: string;
    isValidating?: boolean;
}

const TextQuestion = ({ question, placeholder, onSubmit, successMessage, isValidating }: QuestionProps) => {
    const [answer, setAnswer] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async () => {
        if (!answer.trim()) return;

        const result = await onSubmit(answer);
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

            <div className="space-y-6">
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder={placeholder}
                    className="w-full max-w-md mx-auto px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full text-white text-center text-xl placeholder-white/50 focus:outline-none focus:border-[#ff7eb3] transition-all"
                    autoFocus
                    disabled={isValidating}
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={!answer.trim() || isValidating}
                    className="px-8 py-4 bg-gradient-to-r from-[#ff7eb3] to-[#ff758c] text-white rounded-full font-sans text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isValidating ? 'Checking...' : 'Continue'}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default TextQuestion;
