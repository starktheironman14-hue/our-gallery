import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import FloatingEmojis from './FloatingEmojis';
import MediaBox from './MediaBox';
import {
    mePhotos,
    kitkatPhotos,
    sexyMoments,
    weTogether,
    ourFirstMeet,
    giftContent,
    yourGifts
} from '../data/memories';

interface MemoryLaneProps {
    onBack: () => void;
}

type ViewMode = 'tabs' | 'special' | 'sexy' | 'together' | 'firstmeet' | 'gift' | 'yourgifts';

const MemoryLane = ({ onBack }: MemoryLaneProps) => {
    const [activeTab, setActiveTab] = useState<'me' | 'kitkat'>('me');
    const [viewMode, setViewMode] = useState<ViewMode>('tabs');

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen py-20 px-6 bg-gradient-to-br from-rose-950 via-black to-rose-950 overflow-hidden"
        >
            {/* Conditional Background for Sexy Moments */}
            {viewMode === 'sexy' && (
                <div className="absolute inset-[10px] rounded-[20px] overflow-hidden z-0 shadow-2xl border border-white/10">
                    <div
                        className="absolute inset-0 bg-center bg-no-repeat"
                        style={{
                            backgroundImage: 'url("/sexy_moments_bg.jpg")',
                            backgroundSize: '100% 100%'
                        }}
                    />
                    {/* Dark overlay for readability - No blur */}
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            )}

            {/* Conditional Background for Gift Section */}
            {viewMode === 'gift' && (
                <div className="absolute inset-[10px] rounded-[20px] overflow-hidden z-0 shadow-2xl border border-white/10">
                    <div
                        className="absolute inset-0 bg-center bg-no-repeat"
                        style={{
                            backgroundImage: 'url("/gift_bg.jpg")',
                            backgroundSize: '100% 100%'
                        }}
                    />
                    {/* Dark overlay for readability - No blur */}
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            )}

            {/* Conditional Background for Your Gifts Section */}
            {viewMode === 'yourgifts' && (
                <div className="absolute inset-[10px] rounded-[20px] overflow-hidden z-0 shadow-2xl border border-white/10">
                    <div
                        className="absolute inset-0 bg-center bg-no-repeat"
                        style={{
                            backgroundImage: 'url("/your_gifts_bg.jpg")',
                            backgroundSize: '100% 100%'
                        }}
                    />
                    {/* Dark overlay for readability - No blur */}
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            )}

            <FloatingEmojis position="all" />

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    onClick={() => {
                        if (viewMode === 'sexy' || viewMode === 'together' || viewMode === 'firstmeet' || viewMode === 'gift' || viewMode === 'yourgifts') {
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

                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="glass inline-block px-10 py-6 rounded-[2rem] border border-white/20">
                        <h2 className="text-5xl md:text-7xl font-display gradient-text mb-2">
                            {viewMode === 'sexy' ? 'Sexy Moments 🥵🫶🏻' :
                                viewMode === 'together' ? 'We Together 🫶🏻💕' :
                                    viewMode === 'firstmeet' ? 'Our First Meet 💑' :
                                        viewMode === 'gift' ? 'My First Gift from My Kitkat 🎁' :
                                            viewMode === 'yourgifts' ? 'Your Gifts 🎁' :
                                                viewMode === 'special' ? 'Something Special 💝' :
                                                    'Memory Lane 📸'}
                        </h2>
                        <p className="text-lg text-romantic-200 font-sans italic">
                            {viewMode === 'tabs' ? 'Our beautiful moments together' :
                                viewMode === 'special' ? 'Unwrap your surprises...' :
                                    'For my favourite person in the world ❤️'}
                        </p>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {viewMode === 'tabs' && (
                        <motion.div
                            key="tabs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
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

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {(activeTab === 'me' ? mePhotos : kitkatPhotos).map((photo, index) => (
                                    <motion.div
                                        layout
                                        key={photo}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "100px" }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="relative group p-3"
                                    >
                                        {/* "Badhiya sa border" - Premium double glass border effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-sm -z-10 group-hover:blur-md transition-all duration-500"></div>
                                        <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-rose-400/50 transition-colors duration-500"></div>
                                        <div className="absolute inset-[3px] rounded-[14px] border border-white/10 group-hover:border-rose-400/30 transition-colors duration-500"></div>

                                        <div className="rounded-xl overflow-hidden shadow-2xl">
                                            <MediaBox
                                                src={photo}
                                                mode="cover"
                                                aspectRatio="portrait"
                                                alt={`Memory ${index + 1}`}
                                                className="transform transition-transform duration-700 hover:scale-105"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {viewMode === 'special' && (
                        <motion.div
                            key="special"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode('sexy')}
                                className="glass px-12 py-8 rounded-3xl text-3xl font-display text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-2xl w-full max-w-lg text-center backdrop-blur-xl border border-white/20"
                            >
                                Sexy Moments 🥵🫶🏻
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: -1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode('together')}
                                className="glass px-12 py-8 rounded-3xl text-3xl font-display text-white hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-2xl w-full max-w-lg text-center backdrop-blur-xl border border-white/20"
                            >
                                We Together 🫶🏻💕
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode('firstmeet')}
                                className="glass px-12 py-8 rounded-3xl text-3xl font-display text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-2xl w-full max-w-lg text-center backdrop-blur-xl border border-white/20"
                            >
                                Our First Meet 💑
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: -1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode('gift')}
                                className="glass px-12 py-8 rounded-3xl text-3xl font-display text-white hover:bg-gradient-to-r hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-2xl w-full max-w-lg text-center backdrop-blur-xl border border-white/20"
                            >
                                My First Gift from My Kitkat 🎁
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode('yourgifts')}
                                className="glass px-12 py-8 rounded-3xl text-3xl font-display text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 transition-all duration-300 shadow-2xl w-full max-w-lg text-center backdrop-blur-xl border border-white/20"
                            >
                                Your Gifts 🎁
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Simplified, Static Grid for 'Our First Meet' and 'Gift' to fix rendering issues */}
                    {['firstmeet', 'gift'].includes(viewMode) && (
                        <div key={viewMode} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {(viewMode === 'firstmeet' ? ourFirstMeet : giftContent).map((item, index) => (
                                <div key={index} className="relative p-4">
                                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl">
                                        <MediaBox
                                            src={item.src}
                                            type={('type' in item && item.type === 'video') || (item.src && item.src.endsWith('.mp4')) ? 'video' : 'image'}
                                            caption={item.caption}
                                            mode="contain"
                                            alt={`Content ${index + 1}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Original Animated Grid for other special sections */}
                    {['sexy', 'together', 'yourgifts'].includes(viewMode) && (
                        <motion.div
                            key={viewMode}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-10"
                        >
                            {(viewMode === 'sexy' ? sexyMoments :
                                viewMode === 'together' ? weTogether :
                                    yourGifts).map((item, index) => (
                                        <motion.div
                                            layout
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "50px" }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="group relative"
                                        >
                                            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-colors shadow-2xl">
                                                <MediaBox
                                                    src={item.src}
                                                    type={('type' in item && item.type === 'video') || (item.src && item.src.endsWith('.mp4')) ? 'video' : 'image'}
                                                    caption={item.caption}
                                                    mode="contain"
                                                    alt={`Content ${index + 1}`}
                                                />
                                            </div>
                                        </motion.div>
                                    ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
};

export default MemoryLane;
