import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import FloatingEmojis from './FloatingEmojis';

interface MemoryLaneProps {
    onBack: () => void;
}

// All photos from Me folder
const mePhotos = [
    '/Me/WhatsApp Image 2026-01-07 at 19.21.16.jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.17 (1).jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.17 (2).jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.17.jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.18.jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.22 (1).jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.22 (2).jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.22.jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.23.jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.24 (1).jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.24.jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.25 (1).jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.25 (2).jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.25.jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.26.jpeg',
    '/Me/WhatsApp Image 2026-01-07 at 19.21.27.jpeg',
];

// All photos from Kitkat folder
const kitkatPhotos = [
    '/Kitkat/WhatsApp Image 2025-12-31 at 14.26.54 (1).jpeg',
    '/Kitkat/WhatsApp Image 2025-12-31 at 14.26.55.jpeg',
    '/Kitkat/WhatsApp Image 2025-12-31 at 14.26.56.jpeg',
    '/Kitkat/WhatsApp Image 2025-12-31 at 14.26.57 (1).jpeg',
    '/Kitkat/WhatsApp Image 2025-12-31 at 14.26.57 (2).jpeg',
    '/Kitkat/WhatsApp Image 2025-12-31 at 14.26.57.jpeg',
    '/Kitkat/WhatsApp Image 2025-12-31 at 14.26.58.jpeg',
    '/Kitkat/WhatsApp Image 2025-12-31 at 14.27.02 (1).jpeg',
    '/Kitkat/WhatsApp Image 2025-12-31 at 14.27.02.jpeg',
    '/Kitkat/WhatsApp Image 2026-01-07 at 19.21.10 (1).jpeg',
    '/Kitkat/WhatsApp Image 2026-01-07 at 19.21.10.jpeg',
    '/Kitkat/WhatsApp Image 2026-01-07 at 19.21.13.jpeg',
    '/Kitkat/WhatsApp Image 2026-01-07 at 19.21.27.jpeg',
];

// Sexy Moments content
const sexyMoments = [
    { type: 'image', src: '/anshu/WhatsApp Image 2025-12-31 at 14.26.54.jpeg' },
    { type: 'video', src: '/anshu/WhatsApp Video 2025-12-31 at 14.25.37.mp4' },
    { type: 'video', src: '/anshu/WhatsApp Video 2025-12-31 at 14.26.53.mp4' },
];

// We Together content (Existing)
const weTogether = [
    { type: 'image', src: '/anshu/WhatsApp Image 2025-12-31 at 14.26.59 (1).jpeg' },
    { type: 'image', src: '/anshu/WhatsApp Image 2025-12-31 at 14.26.59.jpeg' },
    { type: 'video', src: '/anshu/WhatsApp Video 2025-12-31 at 14.27.00.mp4' },
    { type: 'video', src: '/anshu/WhatsApp Video 2025-12-31 at 14.27.01.mp4' },
    { type: 'video', src: '/anshu/WhatsApp Video 2025-12-31 at 14.27.00 (2).mp4' },
];

// Our First Meet content (New)
const ourFirstMeet = [
    { type: 'video', src: '/anshu/WhatsApp Video 2025-12-31 at 14.27.00 (2).mp4' },
    { type: 'video', src: '/anshu/WhatsApp Video 2025-12-31 at 14.27.00 (1).mp4' },
    { type: 'image', src: '/anshu/WhatsApp Image 2025-12-31 at 14.27.01.jpeg' },
    { type: 'image', src: '/anshu/WhatsApp Image 2025-12-31 at 14.27.01 (1).jpeg' },
];


// Colorful border colors
const borderColors = [
    'border-red-500',
    'border-pink-500',
    'border-purple-500',
    'border-blue-500',
    'border-cyan-500',
    'border-green-500',
    'border-yellow-500',
    'border-orange-500',
    'border-rose-500',
    'border-fuchsia-500',
    'border-violet-500',
    'border-indigo-500',
    'border-teal-500',
    'border-lime-500',
    'border-amber-500',
    'border-emerald-500',
];

type ViewMode = 'tabs' | 'special' | 'sexy' | 'together' | 'firstmeet';

const MemoryLane = ({ onBack }: MemoryLaneProps) => {
    const [activeTab, setActiveTab] = useState<'me' | 'kitkat'>('me');
    const [viewMode, setViewMode] = useState<ViewMode>('tabs');

    return (
        <section className="relative min-h-screen py-20 px-6 bg-gradient-to-br from-rose-950 via-black to-rose-950 overflow-hidden">
            <FloatingEmojis position="all" />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    onClick={() => {
                        if (viewMode === 'sexy' || viewMode === 'together' || viewMode === 'firstmeet') {
                            setViewMode('special');
                        } else if (viewMode === 'special') {
                            setViewMode('tabs');
                        } else {
                            onBack();
                        }
                    }}
                    className="glass px-6 py-3 rounded-full text-white font-sans mb-8 flex items-center gap-2"
                >
                    ← Back
                </motion.button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="glass inline-block px-10 py-6 rounded-[2rem] border border-white/20">
                        <h2 className="text-5xl md:text-7xl font-display gradient-text mb-2">
                            Memory Lane 📸
                        </h2>
                        <p className="text-lg text-romantic-200 font-sans italic">
                            {viewMode === 'sexy' ? 'Sexy Moments 🥵' :
                                viewMode === 'together' ? 'We Together 🫶🏻' :
                                    viewMode === 'firstmeet' ? 'Our First Meet 💑' :
                                        viewMode === 'special' ? 'Something Special 💝' :
                                            'Our beautiful moments together'}
                        </p>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {/* Main tabs view */}
                    {viewMode === 'tabs' && (
                        <motion.div
                            key="tabs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Tab buttons */}
                            <div className="flex justify-center gap-4 mb-12 flex-wrap">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab('me')}
                                    className={`px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 ${activeTab === 'me'
                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                                        : 'glass text-gray-300 hover:bg-white/15'
                                        }`}
                                >
                                    Me 💙
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setActiveTab('kitkat')}
                                    className={`px-8 py-4 rounded-full font-sans font-medium text-lg transition-all duration-300 ${activeTab === 'kitkat'
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/50'
                                        : 'glass text-gray-300 hover:bg-white/15'
                                        }`}
                                >
                                    Kitkat 💕
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setViewMode('special')}
                                    className="px-8 py-4 rounded-full font-sans font-medium text-lg bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white shadow-lg shadow-red-500/50 transition-all duration-300"
                                >
                                    Something Special 💝
                                </motion.button>
                            </div>

                            {/* Photo gallery */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {(activeTab === 'me' ? mePhotos : kitkatPhotos).map((photo, index) => (
                                    <div
                                        key={photo}
                                        className={`border-4 ${borderColors[index % borderColors.length]} rounded-lg overflow-hidden shadow-xl`}
                                    >
                                        <img
                                            src={photo}
                                            alt={`Memory ${index + 1}`}
                                            className="w-full h-auto object-contain bg-black"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Something Special menu */}
                    {viewMode === 'special' && (
                        <motion.div
                            key="special"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode('sexy')}
                                className="glass px-12 py-8 rounded-3xl text-3xl font-display text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-2xl"
                            >
                                Sexy Moments 🥵🫶🏻
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode('together')}
                                className="glass px-12 py-8 rounded-3xl text-3xl font-display text-white hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-2xl"
                            >
                                We Together 🫶🏻💕
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode('firstmeet')}
                                className="glass px-12 py-8 rounded-3xl text-3xl font-display text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-2xl"
                            >
                                Our First Meet 💑
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Sexy Moments gallery */}
                    {viewMode === 'sexy' && (
                        <motion.div
                            key="sexy"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {sexyMoments.map((item, index) => (
                                <div
                                    key={index}
                                    className="border-4 border-red-500 rounded-lg overflow-hidden shadow-xl"
                                >
                                    {item.type === 'image' ? (
                                        <img
                                            src={item.src}
                                            alt={`Sexy moment ${index + 1}`}
                                            className="w-full h-auto object-contain bg-black"
                                        />
                                    ) : (
                                        <video
                                            src={item.src}
                                            controls
                                            className="w-full h-auto bg-black"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* We Together gallery */}
                    {viewMode === 'together' && (
                        <motion.div
                            key="together"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {weTogether.map((item, index) => (
                                <div
                                    key={index}
                                    className="border-4 border-pink-500 rounded-lg overflow-hidden shadow-xl"
                                >
                                    {item.type === 'image' ? (
                                        <img
                                            src={item.src}
                                            alt={`Together ${index + 1}`}
                                            className="w-full h-auto object-contain bg-black"
                                        />
                                    ) : (
                                        <video
                                            src={item.src}
                                            controls
                                            className="w-full h-auto bg-black"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Our First Meet gallery */}
                    {viewMode === 'firstmeet' && (
                        <motion.div
                            key="firstmeet"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {ourFirstMeet.map((item, index) => (
                                <div
                                    key={index}
                                    className="border-4 border-purple-500 rounded-lg overflow-hidden shadow-xl"
                                >
                                    {item.type === 'image' ? (
                                        <img
                                            src={item.src}
                                            alt={`First Meet ${index + 1}`}
                                            className="w-full h-auto object-contain bg-black"
                                        />
                                    ) : (
                                        <video
                                            src={item.src}
                                            controls
                                            className="w-full h-auto bg-black"
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default MemoryLane;
