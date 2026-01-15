import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();
    const onSectionSelect = (section: string) => navigate(`/${section}`);
    const sections = [
        { id: 'memory-lane', label: 'Memory Lane', emoji: '📸', color: 'from-blue-500 to-cyan-500' },
        { id: 'midnight-chats', label: 'Midnight Chats', emoji: '🌙', color: 'from-purple-500 to-pink-500' },
        { id: 'why-you', label: 'Why You?', emoji: '🥰', color: 'from-red-500 to-rose-500' },
        { id: 'mood-meter', label: 'Mood Meter', emoji: '🌡️', color: 'from-amber-400 to-orange-500' },
        { id: 'our-world', label: 'Our World', emoji: '🌍', color: 'from-emerald-500 to-teal-500' },
        { id: 'always-here', label: 'Always Here', emoji: '🤗', color: 'from-indigo-500 to-violet-500' },
        { id: 'forever', label: 'Forever', emoji: '♾️', color: 'from-gray-700 to-gray-900' },
        { id: 'write-emotions', label: 'Write Emotions', emoji: '✍️', color: 'from-pink-400 to-rose-400' },
        { id: 'admin', label: 'Admin Dashboard', emoji: '⚙️', color: 'from-slate-600 to-slate-800' },
    ];

    return (
        <section className="min-h-screen py-20 px-4 text-white relative overflow-hidden">
            {/* Background Image Container with 10px spacing acting as a frame */}
            <div className="absolute inset-[10px] rounded-[20px] overflow-hidden z-0 shadow-2xl border border-white/10">
                <div
                    className="absolute inset-0 bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("/world_bg.jpg")',
                        backgroundSize: '100% 100%' // Force stretch to fit container without cropping
                    }}
                />
                {/* Dark overlay for readability - No blur */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">Where do you want to go?</h1>
                    <p className="text-xl text-gray-400 font-sans">Choose a path to explore ❤️</p>
                </motion.div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map((section, index) => (
                        <motion.button
                            key={section.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSectionSelect(section.id)}
                            className={`relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${section.color} shadow-lg group`}
                        >
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <span className="text-6xl filter drop-shadow-md">{section.emoji}</span>
                                <span className="text-2xl font-bold font-display">{section.label}</span>
                            </div>
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Navigation;
