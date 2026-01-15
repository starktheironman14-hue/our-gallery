import { motion } from 'framer-motion';

interface WhyYouProps {
    onBack: () => void;
}


const WhyYou = ({ onBack }: WhyYouProps) => {
    return (
        <section className="relative min-h-screen w-full py-20 px-6 overflow-hidden bg-black flex items-center justify-center">
            {/* Background Image Container with 10px spacing acting as a frame */}
            <div className="absolute inset-[10px] rounded-[20px] overflow-hidden z-0 shadow-2xl border border-white/10">
                <div
                    className="absolute inset-0 bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("/why_you_bg.png")',
                        backgroundSize: '100% 100%' // Stretch to fit
                    }}
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    onClick={onBack}
                    className="self-start glass px-6 py-3 rounded-full text-white font-sans mb-12 flex items-center gap-2"
                >
                    ← Back
                </motion.button>

                {/* Romantic Custom Paragraph */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass p-10 md:p-14 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md max-w-2xl text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-display gradient-text mb-8">
                        Why You? ❤️
                    </h2>

                    <p className="text-2xl md:text-3xl font-display font-bold text-white leading-relaxed drop-shadow-md">
                        Kyunki tum bas tum ho... <br /><br />
                        Tumhari wo pagalpan wali baatein, wo cute si smile jo mera din bana deti hai.
                        Duniya ke liye tum ek ladki ho, par mere liye tum meri puri duniya ho.
                        Tumhare gusse mein bhi pyaar dikhta hai, aur tumhari khamoshi mein bhi shor sunayi deta hai.
                        You aren't just my girlfriend, you are my chaos, my peace, and my obsession.
                        Maine tumhe choose nahi kiya, mere dil ne bas tumhe pehchan liya.
                        Tum meri perfect imperfection ho, Kitkat! 🥵😘∞
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyYou;
