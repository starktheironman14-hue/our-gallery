import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Memory {
    title: string;
    content: string;
}

const memories: Memory[] = [
    {
        title: "The first time we talked",
        content: "I still remember the first time we talked. I didn't know then… that one day, you'd become my favorite thought."
    },
    {
        title: "How your words felt different",
        content: "I still remember how your words felt different. Softer. Louder. Closer."
    },
    {
        title: "When you became my whole day",
        content: "Somewhere between random talks and late replies, you stopped being a part of my day… and became my whole day."
    },
    {
        title: "The feelings I remember",
        content: "I don't remember exact dates, but I remember feelings. And every feeling had you in it."
    }
];

const MemoryCard = ({ memory, index }: { memory: Memory; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="mb-16 md:mb-24"
        >
            <div className="relative group">
                {/* Glassmorphism card */}
                <div className="glass p-8 md:p-12 hover:bg-white/15 transition-all duration-500">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-romantic-500/20 to-lavender-light/20 rounded-2xl blur-xl" />
                    </div>

                    <div className="relative z-10">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                            className="text-2xl md:text-3xl font-display gradient-text mb-6"
                        >
                            {memory.title}
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                            className="text-base md:text-lg leading-relaxed text-[#f8f9fa] font-sans"
                        >
                            {memory.content}
                        </motion.p>
                    </div>
                </div>

                {/* Decorative element */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
                    className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-romantic-400 to-romantic-600 rounded-full opacity-60"
                />
            </div>
        </motion.div>
    );
};

const HerLifeThroughMyEyes = () => {
    return (
        <section className="relative min-h-screen w-full py-20 md:py-32 px-6 overflow-hidden bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }} />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-display gradient-text mb-4">
                        Her Life Through My Eyes
                    </h2>
                    <p className="text-lg md:text-xl text-[#adb5bd] font-sans italic">
                        Moments that changed everything
                    </p>
                </motion.div>

                {memories.map((memory, index) => (
                    <MemoryCard key={index} memory={memory} index={index} />
                ))}
            </div>
        </section>
    );
};

export default HerLifeThroughMyEyes;
