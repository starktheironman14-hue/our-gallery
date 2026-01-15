import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingEmojis from './FloatingEmojis';

const AlwaysHere = () => {
    const navigate = useNavigate();
    const onBack = () => navigate('/navigation');
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
                        backgroundImage: 'url("/always_here_bg.jpg")',
                        backgroundSize: '100% 100%' // Stretch to fit
                    }}
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <FloatingEmojis position="all" />

            <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
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
                    transition={{ duration: 1.5 }}
                    className="glass p-10 md:p-14 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md max-w-2xl text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-display gradient-text mb-6">
                        Always Here For You... 🤝❤️
                    </h2>

                    <p className="text-xl md:text-2xl font-sans text-white/95 leading-relaxed space-y-4">
                        Kitkat, suno... <br /><br />
                        Life mein chahe kitni bhi problems aayein, ya din kitna bhi kharab ho, yaad rakhna main hamesha yahi hoon.
                        Tumhare ek call par, tumhari ek awaaz par. Main sirf tumhara boyfriend nahi, tumhara sabse bada supporter hoon.
                        Jab bhi lage ki sab kuch bikhra hua hai, bas mera hath pakad lena, hum milkar sab theek kar lenge.
                        Mujhe tumhari hansi se pyaar hai, par tumhare aansu ponchna meri zimmedari hai.
                        You are never alone, Shubhi. Main tha, main hoon, aur hamesha rahunga. Just for you. 🛡️💖∞
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default AlwaysHere;
