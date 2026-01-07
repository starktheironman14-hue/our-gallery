import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const reasons = [
    "I fell for the way you talk.",
    "I fell for the way you get silent sometimes.",
    "I fell for your smile — even the one you don't notice.",
    "I fell for how you care without showing it.",
    "I fell for your mood swings, because even your chaos feels like home.",
    "I fell for the way you say my name.",
    "I fell for the way you listen.",
    "I fell for how you make ordinary moments feel special.",
    "I fell for your honesty, even when it hurts.",
    "I fell for the way you laugh.",
    "I fell for how you remember small things I said.",
    "I fell for your strength when you're breaking.",
    "I fell for how you see the world.",
    "I fell for the way you care about people.",
    "I fell for your imperfections.",
    "I fell for how you make me feel safe.",
    "I fell for the way you dream.",
    "I fell for your late night texts.",
    "I fell for how you understand my silence.",
    "I fell for the way you're unapologetically you.",
    "I fell for you… and then I realized there was no 'why' left.",
];

const ReasonItem = ({ reason, index }: { reason: string; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: (index % 5) * 0.1 }}
            className="flex items-start gap-4 mb-8"
        >
            {/* Number */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-romantic-400 to-romantic-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-sm">{index + 1}</span>
            </div>

            {/* Reason text with floating animation */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: index * 0.2 }}
                className="flex-1 pt-2"
            >
                <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-sans">
                    {reason}
                </p>
            </motion.div>
        </motion.div>
    );
};

const WhyIFellForYou = () => {
    return (
        <section className="relative min-h-screen w-full py-20 md:py-32 px-6 overflow-hidden bg-gradient-to-b from-midnight-950 via-midnight-900 to-midnight-950">
            {/* Animated gradient orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-romantic-500 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lavender-light rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-display gradient-text mb-6">
                        Why I Fell For You
                    </h2>
                    <p className="text-lg md:text-xl text-[#adb5bd] font-sans italic">
                        An endless list of reasons...
                    </p>
                </motion.div>

                {/* Reasons list */}
                <div className="space-y-8 py-20">
                    {reasons.map((reason, index) => (
                        <ReasonItem key={index} reason={reason} index={index} />
                    ))}
                </div>

                {/* Final message */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center py-16"
                >
                    <div className="glass p-12">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="text-2xl md:text-3xl font-display text-romantic-300 leading-relaxed italic"
                        >
                            "The list stopped here… but my feelings didn't."
                        </motion.p>

                        {/* Infinite symbol */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="mt-8 text-6xl text-romantic-400 opacity-50"
                        >
                            ∞
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyIFellForYou;
