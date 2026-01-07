import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface AppIcon {
    id: string;
    icon: string;
    name: string;
    locked?: boolean;
}

const apps: AppIcon[] = [
    { id: 'memories', icon: '📁', name: 'Our Memories' },
    { id: 'messages', icon: '📨', name: 'Messages From My Heart' },
    { id: 'songs', icon: '🎵', name: 'Songs That Are Us' },
    { id: 'locked', icon: '🔐', name: 'One File I\'m Scared To Open', locked: true },
];

interface AppContent {
    [key: string]: {
        title: string;
        content: string | string[];
    };
}

const appContent: AppContent = {
    memories: {
        title: 'Our Memories',
        content: [
            'Not photos.',
            'Not videos.',
            'Feelings saved in silence.',
            '',
            'Every moment we\'ve shared lives here,',
            'in a place words can\'t reach. 💝'
        ]
    },
    messages: {
        title: 'Messages From My Heart',
        content: [
            'I don\'t say everything out loud…',
            'but my heart never stays quiet about you.',
            '',
            'Thank you for being you.',
            'Thank you for choosing me.',
            'You make me want to be better every day. 🏡'
        ]
    },
    songs: {
        title: 'Songs That Are "Us"',
        content: [
            'Some songs don\'t sound the same anymore…',
            'they sound like you.',
            '',
            '🎵 The ones we\'ve danced to',
            '🎵 The ones that played during our special moments',
            '🎵 The ones I listen to when I miss you',
            'Music sounds better with you in my life 🎶'
        ]
    },
    locked: {
        title: 'One File I\'m Scared To Open',
        content: 'This file contains my future. And every version of it… has you in it. That\'s why I was scared. Not of commitment — but of losing something this beautiful. I see us growing old together. I see lazy Sunday mornings and conversations that never end. I see us supporting each other through everything. I see a home filled with laughter, love, and memories we haven\'t even made yet. This isn\'t just a dream anymore—it\'s a promise I want to keep. 💍'
    }
};

const LoveOS = () => {
    const [selectedApp, setSelectedApp] = useState<string | null>(null);
    const [isUnlocking, setIsUnlocking] = useState(false);

    const handleAppClick = (appId: string, isLocked?: boolean) => {
        if (isLocked) {
            setIsUnlocking(true);
            setTimeout(() => {
                setIsUnlocking(false);
                setSelectedApp(appId);
            }, 2000);
        } else {
            setSelectedApp(appId);
        }
    };

    const closeApp = () => {
        setSelectedApp(null);
    };

    return (
        <section className="relative min-h-screen w-full py-20 md:py-32 px-6 overflow-hidden">
            {/* Background - macOS style */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
                {/* Blur overlay */}
                <div className="absolute inset-0 backdrop-blur-3xl bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* OS Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-display text-white mb-4">
                        Love OS
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 font-sans italic">
                        An operating system built on feelings
                    </p>
                </motion.div>

                {/* Desktop with app icons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {apps.map((app, index) => (
                        <motion.button
                            key={app.id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, y: -10 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAppClick(app.id, app.locked)}
                            className="folder flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="text-7xl md:text-8xl filter drop-shadow-lg">
                                {app.icon}
                            </div>
                            <p className="text-white text-sm md:text-base font-sans text-center leading-tight">
                                {app.name}
                            </p>
                        </motion.button>
                    ))}
                </div>

                {/* Unlocking animation */}
                <AnimatePresence>
                    {isUnlocking && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="text-center"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="text-6xl mb-4"
                                >
                                    🔓
                                </motion.div>
                                <p className="text-white text-xl font-sans">Unlocking...</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* App window modal */}
                <AnimatePresence>
                    {selectedApp && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeApp}
                            className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 120 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl"
                            >
                                {/* Window header - macOS style */}
                                <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                                    <button
                                        onClick={closeApp}
                                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                                    />
                                    <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
                                    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
                                    <p className="ml-4 text-white text-sm font-sans">
                                        {appContent[selectedApp].title}
                                    </p>
                                </div>

                                {/* Window content */}
                                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 overflow-y-auto max-h-[calc(80vh-48px)]">
                                    {Array.isArray(appContent[selectedApp].content) ? (
                                        <ul className="space-y-4">
                                            {(appContent[selectedApp].content as string[]).map((item, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="text-gray-200 text-lg md:text-xl leading-relaxed font-sans flex items-start gap-3"
                                                >
                                                    {item && <span className="text-romantic-400 flex-shrink-0">•</span>}
                                                    <span>{item}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 1 }}
                                            className="text-gray-200 text-lg md:text-xl leading-relaxed font-sans"
                                        >
                                            {appContent[selectedApp].content}
                                        </motion.p>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default LoveOS;
