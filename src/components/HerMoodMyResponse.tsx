import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Mood {
    emoji: string;
    name: string;
    color: string;
    gradient: string;
    message: string;
}

const moods: Mood[] = [
    {
        emoji: '😄',
        name: 'Happy',
        color: '#fbbf24',
        gradient: 'from-yellow-400 to-orange-400',
        message: "Seeing you smile makes everything else feel unnecessary. Stay like this… the world looks better on you."
    },
    {
        emoji: '🥺',
        name: 'Missing',
        color: '#a78bfa',
        gradient: 'from-purple-400 to-pink-400',
        message: "I may not be next to you right now, but I promise… my heart never left your side."
    },
    {
        emoji: '😡',
        name: 'Angry',
        color: '#f87171',
        gradient: 'from-red-400 to-pink-500',
        message: "Get angry. Say nothing. Say everything. I'm still here — not going anywhere."
    },
    {
        emoji: '😴',
        name: 'Tired',
        color: '#60a5fa',
        gradient: 'from-blue-400 to-indigo-400',
        message: "Close your eyes for a bit. Let the world wait. I'll stay here… guarding your peace."
    }
];

const HerMoodMyResponse = () => {
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

    return (
        <section className="relative min-h-screen w-full py-20 md:py-32 px-6 overflow-hidden flex items-center justify-center">
            {/* Dynamic background based on mood */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedMood?.name || 'default'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                >
                    {selectedMood ? (
                        <div className={`absolute inset-0 bg-gradient-to-br ${selectedMood.gradient} opacity-20`}>
                            <div className="absolute inset-0 backdrop-blur-3xl" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-midnight-950 via-midnight-900 to-midnight-950" />
                    )}

                    {/* Animated orb */}
                    {selectedMood && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-30"
                            style={{ backgroundColor: selectedMood.color }}
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-display gradient-text mb-4">
                        How Are You Feeling?
                    </h2>
                    <p className="text-lg md:text-xl text-[#adb5bd] font-sans italic">
                        Tell me your mood, I'll be there for you
                    </p>
                </motion.div>

                {/* Mood buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {moods.map((mood, index) => (
                        <motion.button
                            key={mood.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedMood(mood)}
                            className={`relative group p-8 glass transition-all duration-300 hover:scale-110 ${selectedMood?.name === mood.name
                                    ? 'bg-white/20 border-2 border-white/40'
                                    : 'hover:bg-romantic-500/20'
                                }`}
                        >
                            {/* Glow effect */}
                            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${mood.gradient} blur-xl`} />

                            <div className="relative z-10">
                                <div className="text-6xl mb-3">{mood.emoji}</div>
                                <p className="text-gray-200 font-sans font-medium">{mood.name}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Response message */}
                <AnimatePresence mode="wait">
                    {selectedMood && (
                        <motion.div
                            key={selectedMood.name}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="glass p-8 md:p-12"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                <p className="text-xl md:text-2xl text-gray-100 leading-relaxed font-sans text-center">
                                    {selectedMood.message}
                                </p>
                            </motion.div>

                            {/* Decorative hearts */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="flex justify-center gap-2 mt-6"
                            >
                                {[...Array(3)].map((_, i) => (
                                    <motion.span
                                        key={i}
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                        className="text-2xl"
                                    >
                                        ❤️
                                    </motion.span>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Default message when no mood selected */}
                {!selectedMood && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <p className="text-[#adb5bd] text-lg font-sans italic">
                            Select a mood above to see my response 💕
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default HerMoodMyResponse;
