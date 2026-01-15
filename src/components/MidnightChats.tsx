'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Use same interface as before
interface Message {
    _id: string;
    sender: string;
    text: string;
    time: string;
}

interface MidnightChatsProps {
    onBack: () => void;
}

const initialConversationSeed = [
    { sender: 'aaru', text: 'Hello baby 💕', time: '11:47 PM' },
    { sender: 'shubhi', text: 'Ha babu 🥰', time: '11:48 PM' },
    { sender: 'aaru', text: 'I love you so much mera baccha 💖', time: '11:49 PM' },
    { sender: 'shubhi', text: 'I love you too so much mera betu 💝', time: '11:50 PM' },
    { sender: 'aaru', text: 'Tumhari smile dekh ke din ban jata hai 😊', time: '11:52 PM' },
    { sender: 'shubhi', text: 'Aww baby 🥺💕 tumhari baatein sun ke dil khush ho jata hai', time: '11:53 PM' },
    { sender: 'aaru', text: 'Chlo ji aaj saf saf khta hu 😌', time: '11:55 PM' },
    { sender: 'shubhi', text: 'Itni si bat h 😄', time: '11:56 PM' },
    { sender: 'aaru', text: 'Mujhe tumse pyar h 💗', time: '11:57 PM' },
    { sender: 'shubhi', text: 'Mujhe tumse pyar h 💖', time: '11:58 PM' },
    { sender: 'aaru', text: 'Good night sweet dreams take care of yourself 🌙✨', time: '12:01 AM' },
    { sender: 'shubhi', text: 'Good night sweet dreams take care of yourself 💫😴', time: '12:02 AM' },
    { sender: 'aaru', text: 'Bye betu 👋💕', time: '12:03 AM' },
    { sender: 'shubhi', text: 'Bye betu 👋💝', time: '12:03 AM' },
];

const emojiCategories = [
    { name: 'Love & Hearts 💘', emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '😍', '😻', '😘', '🥰', '😚', '💏', '💑', '🫶', '👐', '🤲'] },
    { name: 'Smilies & Emotions 😊', emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '🤡', '💩'] },
    { name: 'People & Body 👋', emojis: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '👀', '👁', '👅', '👄', '💋', '👶', '👧', '🧒', '👦', '👩', '🧑', '👨', '👱‍♀️', '👱', '👱‍♂️'] },
    { name: 'Animals & Nature 🌸', emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦋', '💐', '🌸', '🏵️', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷', '🌱', '🌲', '🌳', '🌴', '🌵', '🌾', '🌿', '🍀', '🍁', '🍂', '🍃'] },
    { name: 'Food & Drink 🍓', emojis: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🥑', '🍆', '🌶', '🌽', '🥕', '🥔', '🥖', '🥨', '🥯', '🥞', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🥚', '🍳', '🥘', '🍲', '🥣', '🥗', '🍿', '🧂', '🥫', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠', '🥡', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯'] }
];

const MidnightChats = ({ onBack }: MidnightChatsProps) => {
    // Auth state: 'locked', 'aaru', 'shubhi'
    const [accessState, setAccessState] = useState<'locked' | 'aaru' | 'shubhi'>('locked');
    const [pin, setPin] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [activeCategory, setActiveCategory] = useState(0);

    // Delete Interaction State
    const [showDeleteMenu, setShowDeleteMenu] = useState<string | null>(null); // holds message _id
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToCategory = (index: number) => {
        setActiveCategory(index);
        categoryRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // --- Backend Integration ---
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch('/api/messages');
                const data = await res.json();

                if (Array.isArray(data) && data.length === 0) {
                    await seedDatabase();
                } else {
                    setMessages(data);
                }
            } catch (err) {
                console.error("Failed to fetch messages", err);
                setMessages(initialConversationSeed.map(m => ({ ...m, _id: Math.random().toString() })));
            }
        };
        fetchMessages();

        const interval = setInterval(async () => {
            try {
                const res = await fetch('/api/messages');
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setMessages(prev => {
                        if (prev.length !== data.length) return data;
                        return prev;
                    });
                }
            } catch (e) { }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const seedDatabase = async () => {
        for (const msg of initialConversationSeed) {
            await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(msg)
            });
        }
        const res = await fetch('/api/messages');
        const data = await res.json();
        setMessages(data);
    };

    useEffect(() => {
        if (accessState !== 'locked') {
            scrollToBottom();
        }
    }, [messages, accessState]);

    const handlePinSubmit = (enteredPin: string) => {
        if (enteredPin === '2004') {
            setAccessState('aaru');
        } else if (enteredPin === '2005') {
            setAccessState('shubhi');
        } else {
            setPin('');
            alert('Wrong passcode! Hint: Her year of birth');
        }
    };

    const handlePinClick = (digit: string) => {
        const newPin = pin + digit;
        setPin(newPin);

        if (newPin.length === 4) {
            setTimeout(() => handlePinSubmit(newPin), 300);
        }
    };

    const handleBackspace = () => {
        setPin(pin.slice(0, -1));
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const senderId = accessState === 'aaru' ? 'aaru' : 'shubhi';

        const msgPayload = {
            sender: senderId,
            text: newMessage,
            time: currentTime
        };

        const tempId = Math.random().toString();
        const optimisticMsg = { ...msgPayload, _id: tempId };
        setMessages(prev => [...prev, optimisticMsg]);
        setNewMessage('');
        setShowEmojiPicker(false);

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(msgPayload)
            });
            const savedMsg = await res.json();
            setMessages(prev => prev.map(m => m._id === tempId ? savedMsg : m));
        } catch (err) {
            console.error("Failed to save message", err);
        }
    };

    const handleEmojiClick = (emoji: string) => {
        setNewMessage(prev => prev + emoji);
    };

    const startLongPress = (id: string) => {
        longPressTimeout.current = setTimeout(() => {
            setShowDeleteMenu(id);
        }, 600);
    };

    const cancelLongPress = () => {
        if (longPressTimeout.current) {
            clearTimeout(longPressTimeout.current);
            longPressTimeout.current = null;
        }
    };

    const confirmDelete = async () => {
        if (!showDeleteMenu) return;

        const idToDelete = showDeleteMenu;
        setShowDeleteMenu(null);

        setMessages(prev => prev.filter(m => m._id !== idToDelete));

        try {
            await fetch(`/api/messages?id=${idToDelete}`, { method: 'DELETE' });
        } catch (err) {
            console.error("Failed to delete", err);
        }
    };

    if (accessState === 'locked') {
        return (
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden"
            >
                <div className="absolute inset-0 z-0 opacity-30 blur-xl"
                    style={{ backgroundImage: 'url(/kitkat-snap.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                />

                <div className="relative z-10 w-full max-w-sm">
                    <button
                        onClick={onBack}
                        className="absolute -top-16 left-0 text-white text-xl flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        ← Back
                    </button>

                    <div className="text-center mb-10">
                        <span className="text-5xl mb-4 block">🔒</span>
                        <h2 className="text-2xl font-sans font-medium text-white mb-2">Midnight Chats</h2>
                        <p className="text-white/60 font-sans text-sm">Enter Passcode to Enter</p>
                    </div>

                    <div className="flex justify-center gap-4 mb-12">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className={`w-4 h-4 rounded-full border-2 border-white transition-all ${i < pin.length ? 'bg-white' : 'bg-transparent'}`} />
                        ))}
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-white/40 text-xs font-sans">
                            Hint: For Kitkat password is her year of birth 🎂
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 max-w-[280px] mx-auto">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button key={num} onClick={() => handlePinClick(num.toString())} className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl font-sans backdrop-blur-md transition-all active:scale-95 flex items-center justify-center">
                                {num}
                            </button>
                        ))}
                        <div />
                        <button onClick={() => handlePinClick('0')} className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl font-sans backdrop-blur-md transition-all active:scale-95 flex items-center justify-center">
                            0
                        </button>
                        <button onClick={handleBackspace} className="w-16 h-16 rounded-full text-white text-xl flex items-center justify-center hover:text-red-400 transition-colors">
                            ⌫
                        </button>
                    </div>
                </div>
            </motion.section>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen z-0"
            style={{
                backgroundImage: 'url(/kitkat-snap.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

            <div className="relative z-10 h-screen flex flex-col max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-none flex items-center justify-between px-4 py-3 bg-black/50 backdrop-blur-md rounded-b-3xl mx-2 mt-2"
                >
                    <button
                        onClick={onBack}
                        className="text-white text-2xl hover:scale-110 transition-transform"
                    >
                        ←
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">❤️</span>
                        <span className="text-white font-sans font-medium text-lg">
                            {accessState === 'aaru' ? 'Chatting as Aaru' : 'Chatting as Kitkat'}
                        </span>
                        <span className="text-xl">💕</span>
                    </div>
                    <div className="flex gap-3">
                        <button className="text-white text-2xl hover:scale-110 transition-transform">📞</button>
                        <button className="text-white text-2xl hover:scale-110 transition-transform">📹</button>
                    </div>
                </motion.div>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
                    {messages.map((msg, index) => {
                        const isMyMessage = (accessState === 'aaru' && msg.sender === 'aaru') ||
                            (accessState === 'shubhi' && msg.sender === 'shubhi');

                        return (
                            <motion.div
                                key={msg._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[75%] ${isMyMessage ? 'items-end' : 'items-start'} flex flex-col`}
                                    onTouchStart={() => startLongPress(msg._id)}
                                    onTouchEnd={cancelLongPress}
                                    onMouseDown={() => startLongPress(msg._id)}
                                    onMouseUp={cancelLongPress}
                                    onMouseLeave={cancelLongPress}
                                    onContextMenu={(e) => { e.preventDefault(); setShowDeleteMenu(msg._id); }}
                                >
                                    <div
                                        className={`px-4 py-3 rounded-2xl backdrop-blur-md ${isMyMessage
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
                                            : 'bg-white/90 text-gray-900 rounded-bl-sm'
                                            } shadow-lg break-words cursor-pointer select-none transition-transform active:scale-95`}
                                    >
                                        <p className="text-base font-sans leading-relaxed">{msg.text}</p>
                                    </div>
                                    <span className="text-xs text-white/70 mt-1 px-1 font-sans">{msg.time}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                    <div ref={chatEndRef} />
                </div>

                <AnimatePresence>
                    {showDeleteMenu && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-xs w-full text-center"
                            >
                                <h3 className="text-white text-lg font-medium mb-4">Delete this message?</h3>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => setShowDeleteMenu(null)}
                                        className="px-4 py-2 text-white/70 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="px-6 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-xl font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showEmojiPicker && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-sm h-72 bg-black/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden z-30"
                        >
                            <div className="flex overflow-x-auto p-2 gap-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {emojiCategories.map((cat, i) => (
                                    <button
                                        key={i}
                                        onClick={() => scrollToCategory(i)}
                                        className={`px-3 py-1.5 text-xs whitespace-nowrap rounded-full transition-all duration-300 ${activeCategory === i
                                            ? 'bg-white text-black font-bold shadow-lg'
                                            : 'text-white/50 hover:text-white/80 hover:bg-white/10'
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                            <div className="h-full overflow-y-auto p-4 pb-14 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {emojiCategories.map((category, catIndex) => (
                                    <div key={catIndex} ref={el => { if (el) categoryRefs.current[catIndex] = el; }} className="mb-6">
                                        <h3 className="text-white/30 text-[10px] font-sans uppercase tracking-widest mb-2 px-1">
                                            {category.name}
                                        </h3>
                                        <div className="grid grid-cols-7 gap-2">
                                            {category.emojis.map((emoji, emoIndex) => (
                                                <button key={emoIndex} onClick={() => handleEmojiClick(emoji)} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-all active:scale-95 text-xl">
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-none px-4 pb-6 pt-2"
                >
                    <div className="bg-black/60 backdrop-blur-md rounded-full px-2 py-2 flex items-center gap-2 relative z-40">
                        <button className="p-2 text-white text-2xl hover:scale-110 transition-transform flex-shrink-0">📷</button>
                        <div className="flex-1 bg-white/20 rounded-full flex items-center px-4 py-2 transition-all focus-within:bg-white/30">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                onClick={() => setShowEmojiPicker(false)}
                                placeholder={`Send as ${accessState === 'aaru' ? 'Aaru' : 'Kitkat'}...`}
                                className="bg-transparent border-none outline-none text-white placeholder-white/70 w-full font-sans text-base"
                            />
                        </div>
                        {newMessage.trim() ? (
                            <button onClick={handleSendMessage} className="px-4 py-2 text-blue-400 font-bold hover:scale-105 transition-transform">SEND</button>
                        ) : (
                            <div className="flex gap-1">
                                <button className="p-2 text-white text-2xl hover:scale-110 transition-transform">🎤</button>
                                <button
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className={`p-2 text-2xl hover:scale-110 transition-transform ${showEmojiPicker ? 'text-yellow-400' : 'text-white'}`}
                                >
                                    😊
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default MidnightChats;
