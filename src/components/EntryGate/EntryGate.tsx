import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from './IntroScreen';
import TextQuestion from './TextQuestion';
import RadioQuestion from './RadioQuestion';
import SuccessScreen from './SuccessScreen';
import FailureScreen from './FailureScreen';

interface EntryGateProps {
    onSuccess: () => void;
}

type Stage = 'intro' | 'declined' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'success' | 'failure';

const EntryGate = ({ onSuccess }: EntryGateProps) => {
    const [stage, setStage] = useState<Stage>('intro');
    const [isValidating, setIsValidating] = useState(false);
    const [failureMessage, setFailureMessage] = useState('');

    const validateAnswer = async (question: string, answer: string): Promise<boolean> => {
        setIsValidating(true);

        // Simulate API delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        const trimmedAnswer = answer.toLowerCase().trim();

        const correctAnswers: Record<string, string[]> = {
            q1: ['aaru'],
            q2: ['kitkat'],
            q3: ['3 june'],
            q4: ['i am your wifey', 'your wifey'],
            q5: ['always in your heart', 'always in your heart baby'],
        };

        const validAnswers = correctAnswers[question];
        const isCorrect = validAnswers?.some(
            validAnswer => validAnswer.toLowerCase() === trimmedAnswer
        ) || false;

        setIsValidating(false);

        if (!isCorrect) {
            // Set failure message based on question
            const failureMessages: Record<string, string> = {
                q1: "This place isn't for you.",
                q3: "Only memories can open this door.",
            };
            setFailureMessage(failureMessages[question] || "This place isn't for you.");
            setStage('failure');
        }

        return isCorrect;
    };

    const handleIntroDecline = () => {
        setFailureMessage("That's okay. This place will wait.");
        setStage('declined');
    };

    const handleQ1Submit = async (answer: string) => {
        const isCorrect = await validateAnswer('q1', answer);
        if (isCorrect) {
            setTimeout(() => setStage('q2'), 2000);
        }
        return isCorrect;
    };

    const handleQ2Submit = async (answer: string) => {
        const isCorrect = await validateAnswer('q2', answer);
        if (isCorrect) {
            setTimeout(() => setStage('q3'), 2000);
        }
        return isCorrect;
    };

    const handleQ3Submit = async (answer: string) => {
        const isCorrect = await validateAnswer('q3', answer);
        if (isCorrect) {
            setTimeout(() => setStage('q4'), 2000);
        }
        return isCorrect;
    };

    const handleQ4Submit = async (answer: string) => {
        const isCorrect = await validateAnswer('q4', answer);
        if (isCorrect) {
            setTimeout(() => setStage('q5'), 2000);
        }
        return isCorrect;
    };

    const handleQ5Submit = async (answer: string) => {
        const isCorrect = await validateAnswer('q5', answer);
        if (isCorrect) {
            setTimeout(() => setStage('success'), 2000);
        }
        return isCorrect;
    };

    const handleEnter = () => {
        // Don't save to localStorage - user must answer questions every time
        onSuccess();
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0F1A] via-[#1a0a1a] to-[#0B0F1A] overflow-hidden px-6">
            {/* Soft background glow */}
            <motion.div
                animate={{
                    opacity: [0.05, 0.15, 0.05],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#cdb4db] rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-2xl mx-auto w-full">
                <AnimatePresence mode="wait">
                    {stage === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <IntroScreen
                                onContinue={() => setStage('q1')}
                                onDecline={handleIntroDecline}
                            />
                        </motion.div>
                    )}

                    {stage === 'declined' && (
                        <motion.div
                            key="declined"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <FailureScreen message={failureMessage} />
                        </motion.div>
                    )}

                    {stage === 'q1' && (
                        <motion.div
                            key="q1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <TextQuestion
                                question="What do you call him?"
                                placeholder="Type the name you use…"
                                onSubmit={handleQ1Submit}
                                successMessage="That felt familiar... The way you say it makes his heart skip a beat ❤️🦋"
                                isValidating={isValidating}
                            />
                        </motion.div>
                    )}

                    {stage === 'q2' && (
                        <motion.div
                            key="q2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <TextQuestion
                                question="What does he calls you?"
                                placeholder="Your Nickname"
                                onSubmit={handleQ2Submit}
                                successMessage="Of course… You are his sweet little Kitkat 🍫✨"
                                isValidating={isValidating}
                            />
                        </motion.div>
                    )}

                    {stage === 'q3' && (
                        <motion.div
                            key="q3"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <RadioQuestion
                                question="When did we really start talking?"
                                options={['4 December', '29 February', '17 July', '3 June']}
                                onSubmit={handleQ3Submit}
                                successMessage="You remember… That day changed everything forever 📅💑"
                                isValidating={isValidating}
                            />
                        </motion.div>
                    )}

                    {stage === 'q4' && (
                        <motion.div
                            key="q4"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <TextQuestion
                                question="What you answer always when he asks you who are you 🥰😁"
                                placeholder="Tell me who you are…"
                                onSubmit={handleQ4Submit}
                                successMessage="That's the only right answer. You are his wifey, now and always 👰💍💖"
                                isValidating={isValidating}
                            />
                        </motion.div>
                    )}

                    {stage === 'q5' && (
                        <motion.div
                            key="q5"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <TextQuestion
                                question="What do you reply always when he asks where are you? 🤔💕"
                                placeholder="Say it the way you feel…"
                                onSubmit={handleQ5Submit}
                                successMessage="I know where you belong... Safest place in the world 🏠❤️"
                                isValidating={isValidating}
                            />
                        </motion.div>
                    )}

                    {stage === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <SuccessScreen onEnter={handleEnter} />
                        </motion.div>
                    )}

                    {stage === 'failure' && (
                        <motion.div
                            key="failure"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <FailureScreen message={failureMessage} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default EntryGate;
