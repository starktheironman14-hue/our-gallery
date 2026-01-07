import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FloatingEmojisProps {
    position?: 'top' | 'bottom' | 'side' | 'all';
}

const topEmojis = ['💋', '🫀', '❤️', '🥵', '🥰', '🫶🏻', '💕', '😍', '😘'];
const bottomEmojis = ['😌', '🤭', '👄', '👅', '🌹', '🥀', '💐', '🌸', '🌺'];
const sideEmojis = ['🌟', '⚡️', '🍌', '🍑', '🍓', '🍒'];
const heartVariations = ['🩷', '🧡', '🩵', '❤️‍🔥', '❤️‍🩹', '💞', '💓', '💘', '💖', '💝', '♾️'];

const FloatingEmojis = ({ position = 'all' }: FloatingEmojisProps) => {
    const [emojis, setEmojis] = useState<Array<{
        emoji: string;
        x: number;
        y: number;
        delay: number;
        duration: number;
        rotation: number;
    }>>([]);

    useEffect(() => {
        const allEmojis = position === 'all'
            ? [...topEmojis, ...bottomEmojis, ...sideEmojis, ...heartVariations]
            : position === 'top'
                ? topEmojis
                : position === 'bottom'
                    ? bottomEmojis
                    : sideEmojis;

        const emojiElements = Array.from({ length: 30 }, () => {
            const emoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
            return {
                emoji,
                x: Math.random() * 100,
                y: position === 'top' ? -10 : position === 'bottom' ? 110 : Math.random() * 100,
                delay: Math.random() * 5,
                duration: 8 + Math.random() * 10,
                rotation: Math.random() * 360,
            };
        });

        setEmojis(emojiElements);
    }, [position]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {emojis.map((item, index) => (
                <motion.div
                    key={index}
                    className="absolute text-2xl md:text-3xl opacity-60"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                    }}
                    animate={{
                        y: position === 'top'
                            ? [0, window.innerHeight + 100]
                            : position === 'bottom'
                                ? [0, -window.innerHeight - 100]
                                : [-50, 50, -50],
                        x: [0, Math.random() * 100 - 50, 0],
                        rotate: [item.rotation, item.rotation + 360],
                        opacity: [0, 0.6, 0.6, 0],
                    }}
                    transition={{
                        duration: item.duration,
                        delay: item.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {item.emoji}
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingEmojis;
