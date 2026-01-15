import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingEmojisProps {
    position?: 'all' | 'left' | 'right' | 'center';
}

const emojis = ['❤️', '💖', '💕', '💞', '💓', '💗', '💝', '💘', '✨', '🦋', '🌹'];

const FloatingEmojis = ({ position = 'all' }: FloatingEmojisProps) => {
    const [elements, setElements] = useState<Array<{ id: number; emoji: string; x: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        // Create random floating elements
        const count = 15;
        const newElements = Array.from({ length: count }).map((_, i) => ({
            id: i,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            x: Math.random() * 100, // percentage
            delay: Math.random() * 5,
            duration: 10 + Math.random() * 10,
        }));
        setElements(newElements);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {elements.map((el) => (
                <motion.div
                    key={el.id}
                    initial={{ opacity: 0, y: '110vh', x: `${el.x}vw` }}
                    animate={{
                        opacity: [0, 0.7, 0],
                        y: '-10vh',
                        rotate: [0, 45, -45, 0]
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        delay: el.delay,
                        ease: "linear"
                    }}
                    className="absolute text-2xl md:text-4xl filter drop-shadow-lg"
                    style={{
                        left: 0, // Base position handled by initial x
                    }}
                >
                    {el.emoji}
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingEmojis;
