import { motion } from 'framer-motion';
import { useState } from 'react';
import FloatingEmojis from './FloatingEmojis';

interface ForeverProps {
    onBack: () => void;
}

const Forever = ({ onBack }: ForeverProps) => {
    const [showRing, setShowRing] = useState(false);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen py-20 px-6 bg-black overflow-hidden flex items-center justify-center"
        >
            {/* Background Image Container with 10px spacing acting as a frame */}
            <div className="absolute inset-[10px] rounded-[20px] overflow-hidden z-0 shadow-2xl border border-white/10">
                <div
                    className="absolute inset-0 bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("/forever_bg_v2.webp")',
                        backgroundSize: '100% 100%' // Stretch to fit
                    }}
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <FloatingEmojis position="all" />

            {/* Content */}
            <div className="relative z-10 w-full h-full max-w-4xl mx-auto flex flex-col items-center justify-center">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    onClick={onBack}
                    className="absolute top-8 left-6 glass px-6 py-3 rounded-full text-white font-sans flex items-center gap-2 z-20"
                >
                    ← Back
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/20 shadow-2xl backdrop-blur-md max-w-3xl text-center flex flex-col gap-8 mt-16"
                >
                    <h2 className="text-3xl md:text-5xl font-display text-white mb-2 shadow-black drop-shadow-lg">
                        Hamesha Sath... Hamesha Pas ❤️♾️
                    </h2>

                    <div className="text-lg md:text-xl font-sans text-white/90 leading-relaxed space-y-6">
                        <p>
                            Zindagi ka safar chahe kaisa bhi ho, manzil tum hi rahogi. Jab bhi mein peeche mud kar dekhunga, main chahta hu ki tumhari muskurahat mere sath ho.
                            Wada karta hu, tumhare har aansu ko khushi mein badal dunga aur tumhari har khushi ko apni duniya bana lunga.
                            Humara rishta sirf aaj ka nahi, har jamam ka hai. 🌹
                        </p>
                        <p>
                            Tum mere har sawal ka jawab ho, meri har dua ka asar ho. Main tumhare sath sirf waqt nahi bitana chahta, main tumhare sath puri zindagi jeena chahta hu.
                            Subah ki pehli chai se lekar, raat ki aakhri goodnight tak—bas tum. You are my safe place, my home, my forever. 💑
                        </p>
                        <p>
                            Kitkat, tumse pyaar karna meri aadat nahi, meri saans ban gayi hai. Chahe puri duniya badal jaye, humara ye sath kabhi nahi badlega.
                            Main hamesha tumhara hath thame rahunga, har mushkil mein, har khushi mein. I love you endlessly, beyond words, beyond time. ✨❤️
                        </p>
                    </div>

                    {/* Ring Promise Section */}
                    <div className="mt-4 flex justify-center">
                        {!showRing ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setShowRing(true)}
                                className="glass px-8 py-3 rounded-full text-white/90 hover:text-white transition-all font-display tracking-wide border border-white/30"
                            >
                                A Little Promise? 💍
                            </motion.button>
                        ) : (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <span className="text-4xl">💍</span>
                                <span className="text-2xl font-handwriting text-romantic-200">Forever Yours</span>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Forever;
