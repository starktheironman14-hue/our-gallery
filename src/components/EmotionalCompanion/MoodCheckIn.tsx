import { motion } from 'framer-motion';
import { useState } from 'react';

interface MoodCheckInProps {
    userName: string;
    onMoodSelected: (mood: string, emoji: string) => void;
}

const moods = [
    { id: 'happy', emoji: '😄', label: 'Happy', gradient: 'from-yellow-400 to-orange-400', response: 'Your happiness makes everything brighter.' },
    { id: 'low', emoji: '😔', label: 'Low', gradient: 'from-blue-400 to-purple-400', response: "It's okay to feel this way. I'm here." },
    { id: 'angry', emoji: '😡', label: 'Angry', gradient: 'from-red-500 to-pink-500', response: "It's okay to be angry here. You don't have to explain." },
    { id: 'confused', emoji: '😵', label: 'Confused', gradient: 'from-purple-400 to-pink-400', response: 'Confusion is just clarity waiting to happen.' },
    { id: 'loved', emoji: '💖', label: 'Loved', gradient: 'from-pink-400 to-rose-400', response: 'You deserve to feel this way always.' },
];

const MoodCheckIn = ({ userName, onMoodSelected }: MoodCheckInProps) => {
    const [selectedMood, setSelectedMood] = useState<typeof moods[0] | null>(null);
    const [showResponse, setShowResponse] = useState(false);

    const handleMoodClick = async (mood: typeof moods[0]) => {
        setSelectedMood(mood);
        setShowResponse(true);

        // Save mood to database
        try {
            const userId = localStorage.getItem('companion_userId');
            await fetch('/api/mood/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    mood: mood.id,
                    emoji: mood.emoji,
                }),
            });
        } catch (error) {
            console.error('Failed to save mood:', error);
        }

        setTimeout(() => {
            onMoodSelected(mood.id, mood.emoji);
        }, 3000);
    };

    return (
        <section
            className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ${selectedMood
                ? `bg-gradient-to-br ${selectedMood.gradient}`
                : 'bg-gradient-to-br from-[#0B0F1A] via-[#1a0a1a] to-[#0B0F1A]'
                }`}
        >
            {/* Soft glow */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff7eb3] rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {!showResponse ? (
                    <>
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-display text-white mb-4"
                        >
                            Hey {userName} 🤍
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl md:text-3xl text-[#cdb4db] font-sans mb-16"
                        >
                            How are you feeling right now?
                        </motion.p>

                        {/* Mood buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {moods.map((mood, index) => (
                                <motion.button
                                    key={mood.id}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    whileHover={{ scale: 1.1, y: -10 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleMoodClick(mood)}
                                    className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-3xl hover:bg-white/20 transition-all"
                                >
                                    <span className="text-6xl">{mood.emoji}</span>
                                    <span className="text-white font-sans text-sm">{mood.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-9xl"
                        >
                            {selectedMood?.emoji}
                        </motion.div>
                        <p className="text-3xl md:text-4xl text-white font-sans">
                            {selectedMood?.response}
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default MoodCheckIn;
