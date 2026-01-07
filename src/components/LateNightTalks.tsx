import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const messages = [
    "Are you awake?",
    "Because I still think about those nights…",
    "when the world was silent",
    "and your voice was enough.",
    "No filters.",
    "No pretending.",
    "Just two souls talking till sleep lost its power.",
    "Those nights didn't end at 'good night'…",
    "they stayed with me the next morning too.",
    "If I ever miss something the most,",
    "it's not the chats…",
    "it's how close we felt without being close."
];

const LateNightTalks = () => {
    const [visibleMessages, setVisibleMessages] = useState<number>(0);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-200px" });

    useEffect(() => {
        if (isInView && visibleMessages < messages.length) {
            const timer = setTimeout(() => {
                setVisibleMessages(prev => prev + 1);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isInView, visibleMessages]);

    const toggleMusic = () => {
        setIsMusicPlaying(!isMusicPlaying);
        // Music functionality can be added here when audio file is provided
    };

    return (
        <section ref={ref} className="relative min-h-screen w-full py-20 md:py-32 px-6 overflow-hidden bg-[#020617]">
            {/* Stars effect */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full twinkle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Moon glow */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-romantic-200 rounded-full opacity-20 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display text-romantic-200 mb-4 flex items-center justify-center gap-3">
                        Late Night Talks Mode <span className="text-3xl">🌙</span>
                    </h2>

                    {/* Music toggle */}
                    <motion.button
                        onClick={toggleMusic}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-6 py-2 rounded-full glass text-gray-300 text-sm hover:bg-white/15 transition-all duration-300 flex items-center gap-2 mx-auto"
                    >
                        <span>{isMusicPlaying ? '🔊' : '🔇'}</span>
                        <span>{isMusicPlaying ? 'Music On' : 'Play Music'}</span>
                    </motion.button>
                </motion.div>

                {/* Chat messages */}
                <div className="space-y-6">
                    {messages.slice(0, visibleMessages).map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex"
                        >
                            <div className="relative max-w-[85%] md:max-w-[75%]">
                                {/* Message bubble */}
                                <div className="glass px-6 py-4 rounded-2xl rounded-tl-sm">
                                    <p className="text-gray-200 text-base md:text-lg leading-relaxed font-sans">
                                        {message}
                                    </p>
                                </div>

                                {/* Timestamp */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-xs text-gray-500 mt-2 ml-2"
                                >
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {visibleMessages < messages.length && visibleMessages > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-1 ml-6"
                        >
                            <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                                className="w-2 h-2 bg-romantic-400 rounded-full"
                            />
                            <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                                className="w-2 h-2 bg-romantic-400 rounded-full"
                            />
                            <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                                className="w-2 h-2 bg-romantic-400 rounded-full"
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LateNightTalks;
