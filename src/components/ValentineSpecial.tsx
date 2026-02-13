import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ValentineSpecial() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [vaultPassword, setVaultPassword] = useState('');
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [openEnvelope, setOpenEnvelope] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Countdown to Valentine's Day (tonight midnight)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const valentinesDay = new Date('2026-02-14T00:00:00');
      const timeDiff = valentinesDay.getTime() - now.getTime();

      // Check if midnight has passed
      if (timeDiff <= 0) {
        setIsUnlocked(true);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Chocolate shards to hearts animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      isHeart: boolean;
      morphProgress: number;
    }> = [];

    // Create chocolate shards
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 2 - 0.8,
        size: Math.random() * 18 + 12,
        opacity: Math.random() * 0.4 + 0.4,
        isHeart: false,
        morphProgress: 0,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx;

        // Morph to heart
        if (p.y < canvas.height * 0.4 && !p.isHeart) {
          p.morphProgress = Math.min(p.morphProgress + 0.015, 1);
          if (p.morphProgress >= 1) p.isHeart = true;
        }

        // Reset if off screen
        if (p.y < -50) {
          p.y = canvas.height + 50;
          p.x = Math.random() * canvas.width;
          p.isHeart = false;
          p.morphProgress = 0;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (p.isHeart || p.morphProgress > 0.5) {
          // Draw heart
          ctx.font = `${p.size}px Arial`;
          ctx.fillText('❤️', p.x, p.y);
        } else {
          // Draw chocolate shard
          ctx.fillStyle = `rgba(101, 67, 33, ${p.opacity})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.size, p.y + p.size / 2);
          ctx.lineTo(p.x + p.size / 2, p.y + p.size);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleCard = (index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleVaultUnlock = () => {
    if (vaultPassword.toLowerCase() === 'kitkat') {
      setIsVaultUnlocked(true);
    }
  };

  const timelineData = [
    { title: 'The Day We Met', text: 'The universe conspired to bring us together, and in that moment, everything changed. ✨💫' },
    { title: 'The First Smile', text: 'Your smile lit up my world and I knew I wanted to see it every day for the rest of my life. 😊💕' },
    { title: 'The Moment I Knew', text: 'It was in the quiet moments, the shared laughter, that I realized you were my forever. 💖🥰' },
    { title: 'Every Memory Since', text: 'Each day with you is a treasure, a new page in our beautiful love story. 📖💝' },
  ];

  const reasons = [
    'Your laugh is my favorite sound 😄💕',
    'You make ordinary moments magical ✨🎭',
    'Your kindness inspires me daily 🌟💖',
    'You understand me like no one else 🤝💝',
    'Your smile brightens my darkest days ☀️😊',
    'You believe in me when I doubt myself 💪🥰',
    'Your hugs feel like home 🏠🤗',
    'You make me want to be better 🌱💕',
    'Your passion for life is contagious 🔥✨',
    'You see beauty in everything 🌸👀',
    'Your strength amazes me 💪😍',
    'You make me laugh until I cry 😂💖',
    'Your dreams inspire my own 🌙💫',
    'You accept all of me 🫶💝',
    'Your love feels like magic 🪄💕',
    'You challenge me to grow 🌳✨',
    'Your presence calms my chaos 🧘💖',
    'You make every day an adventure 🗺️🎉',
    'Your heart is pure gold 💛✨',
    'You are my favorite person 👑💕',
  ];

  const letters = [
    {
      title: 'Open when you feel sad',
      content:
        'My dearest Kitkat, remember that clouds are temporary, but the sun always returns. You are stronger than any storm, braver than you know, and more loved than words can express. I am here, always, ready to hold you until the sadness fades. Your smile is too precious to stay hidden for long. 💙',
    },
    {
      title: 'Open when you miss me',
      content:
        'Sweet Kitkat, close your eyes and feel my love surrounding you. Distance is just a test of how far love can travel, and ours knows no bounds. Every heartbeat carries my thoughts to you. Until we are together again, keep me close in your heart, where I will always remain. 💜',
    },
    {
      title: 'Open when you doubt yourself',
      content:
        'Beautiful Kitkat, you are capable of extraordinary things. Every challenge is proof of your strength, every obstacle a stepping stone to greatness. Never forget how amazing you are. I believe in you with every fiber of my being. Now go show the world what I already know. 💪✨',
    },
    {
      title: 'Open when you need a reminder that you are loved',
      content:
        'My precious Kitkat, you are loved beyond measure, cherished beyond words, and treasured beyond time. You are the beat in my heart, the light in my life, the reason I smile. Never doubt for a moment how deeply, completely, and eternally you are loved. Forever and always. ❤️',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white overflow-x-hidden">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => window.history.back()}
        className="fixed top-6 left-6 z-50 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-full p-4 hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-lg shadow-pink-500/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </motion.button>

      {/* Countdown Lock Screen (Before Midnight) */}
      {!isUnlocked && (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Animation */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-rose-900/50" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-6 max-w-4xl"
          >
            {/* Lock Icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-9xl mb-8"
            >
              🔒
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-200 via-rose-200 to-purple-200 bg-clip-text text-transparent"
            >
              Valentine's Special
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl text-pink-100 mb-12 font-light"
            >
              Unlocks at Midnight 💕
            </motion.p>

            {/* Countdown Timer */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-pink-400/40 rounded-3xl p-8 min-w-[140px] hover:scale-110 hover:border-pink-400/70 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/40"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      textShadow: [
                        '0 0 20px rgba(236, 72, 153, 0.5)',
                        '0 0 40px rgba(236, 72, 153, 0.8)',
                        '0 0 20px rgba(236, 72, 153, 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl font-bold bg-gradient-to-br from-pink-200 to-rose-200 bg-clip-text text-transparent mb-3"
                  >
                    {String(item.value).padStart(2, '0')}
                  </motion.div>
                  <div className="text-purple-200 uppercase text-sm tracking-widest font-semibold">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xl text-pink-200/80 font-light italic"
            >
              Something special is waiting for you, Kitkat... 💝✨
            </motion.p>
          </motion.div>
        </section>
      )}

      {/* Main Content (After Midnight) */}
      {isUnlocked && (
        <>

          {/* Landing Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* Floating Emojis */}
            <div className="absolute inset-0 overflow-hidden">
              {['🌺', '🥵', '💋', '🥰', '❤️', '🫶🏻', '😘', '🌸', '🩷', '❤️‍🩹', '🍑', '🤗', '🍓', '🍌', '😉'].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl opacity-60"
                  initial={{ y: '100vh', x: `${Math.random() * 100}vw` }}
                  animate={{
                    y: '-100vh',
                    x: `${Math.random() * 100}vw`,
                  }}
                  transition={{
                    duration: Math.random() * 15 + 20,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: 'linear',
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-rose-900/40 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="relative z-10 text-center px-6 max-w-5xl"
            >
              {/* Valentine's Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="mb-8"
              >
                <img
                  src="/valentine/360_F_1847982699_XT0QZO9yPSocBF17HzY8vPgxVGHhBomU.jpg"
                  alt="Valentine's Day"
                  className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full object-cover border-4 border-pink-400/50 shadow-2xl shadow-pink-500/50"
                />
              </motion.div>

              <div className="inline-block bg-white/20 backdrop-blur-xl rounded-[15px] px-10 py-8 mb-6 border border-white/30">
                <motion.h1
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-serif text-white drop-shadow-2xl leading-tight"
                  style={{
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(236, 72, 153, 0.6)'
                  }}
                >
                  Happy Valentine's Day <span className="text-6xl md:text-8xl">💕✨</span>
                  <br />
                  Mera Baccha <span className="text-6xl md:text-8xl">🥰💖🌹</span>
                </motion.h1>
              </div>
              <div className="inline-block bg-white/20 backdrop-blur-xl rounded-[15px] px-8 py-5 border border-white/30">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="text-2xl md:text-4xl font-light text-white italic leading-relaxed"
                  style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)' }}
                >
                  You are my favorite break in this busy world 💕✨🥰
                </motion.p>
              </div>
            </motion.div>
          </section>

          {/* Full Page Photo Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900">
            {/* Floating Emojis */}
            <div className="absolute inset-0 overflow-hidden">
              {['🌺', '🥵', '💋', '🥰', '❤️', '🫶🏻', '😘', '🌸', '🩷', '❤️‍🩹', '🍑', '🤗', '🍓', '🍌', '😉'].map((emoji, i) => (
                <motion.div
                  key={`photo-${i}`}
                  className="absolute text-4xl opacity-50"
                  initial={{ y: '100vh', x: `${Math.random() * 100}vw` }}
                  animate={{
                    y: '-100vh',
                    x: `${Math.random() * 100}vw`,
                  }}
                  transition={{
                    duration: Math.random() * 15 + 20,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: 'linear',
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>

            {/* Decorative background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative z-10 w-full h-screen flex items-center justify-center p-6"
            >
              <div className="relative w-full max-w-6xl h-[85vh] rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/30 border-4 border-pink-400/30">
                <img
                  src="/valentine/WhatsApp Image 2026-02-13 at 21.17.30.jpeg"
                  alt="Our Special Moment"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay at bottom for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Optional caption */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-10 left-0 right-0 text-center px-6"
                >
                  <div className="inline-block bg-white/20 backdrop-blur-xl rounded-[15px] px-8 py-4 border border-white/30">
                    <p className="text-3xl md:text-5xl font-serif text-white italic" style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)' }}>
                      Every moment with you is magical ✨💕
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Our Story Timeline */}
          <section className="py-28 px-6 bg-gradient-to-b from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
            </div>

            <div className="flex justify-center mb-24">
              <div className="inline-block bg-white/20 backdrop-blur-xl rounded-[15px] px-10 py-6 relative z-10 border border-white/30">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-7xl font-serif text-center text-white"
                  style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(236, 72, 153, 0.6)' }}
                >
                  Our Love Story 💕✨
                </motion.h2>
              </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    onClick={() => setActiveTimeline(activeTimeline === index ? null : index)}
                    className="cursor-pointer group"
                  >
                    <div className="relative bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-pink-400/30 rounded-3xl p-8 hover:scale-105 hover:border-pink-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/40 overflow-hidden">
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="relative z-10">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-4xl shadow-lg shadow-pink-500/50 group-hover:scale-110 transition-transform duration-300">
                          {index === 0 ? '💫' : index === 1 ? '😊' : index === 2 ? '💕' : '✨'}
                        </div>
                        <h3 className="text-2xl font-serif text-pink-100 mb-4 text-center group-hover:text-pink-50 transition-colors">
                          {item.title}
                        </h3>
                        <AnimatePresence>
                          {activeTimeline === index && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4 }}
                              className="text-gray-200 text-center leading-relaxed border-t border-pink-400/30 pt-4 mt-4"
                            >
                              {item.text}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Photo Section 1 */}
          <section className="relative py-20 px-6 bg-gradient-to-b from-purple-900 via-rose-900 to-pink-900 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden border-4 border-pink-400/40 shadow-2xl shadow-pink-500/30">
                <img
                  src="/valentine/WhatsApp Image 2026-02-13 at 21.17.31.jpeg"
                  alt="Our Beautiful Moments"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </section>

          {/* 20 Reasons */}
          <section className="py-28 px-6 bg-gradient-to-b from-rose-900 via-pink-900 to-purple-900 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-40 right-20 w-80 h-80 bg-rose-500 rounded-full blur-3xl" />
              <div className="absolute bottom-40 left-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
            </div>

            <div className="flex justify-center mb-24">
              <div className="inline-block bg-white/20 backdrop-blur-xl rounded-[15px] px-10 py-6 relative z-10 border border-white/30">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-7xl font-serif text-center text-white"
                  style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(244, 114, 182, 0.6)' }}
                >
                  20 Reasons Why I Love You Meri Jan 💕
                </motion.h2>
              </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 relative z-10">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                  onClick={() => toggleCard(index)}
                  className="perspective-1000 cursor-pointer group"
                >
                  <div className={`relative h-44 transition-all duration-700 transform-style-3d ${flippedCards.has(index) ? 'rotate-y-180' : ''}`}>
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 rounded-2xl border-3 border-amber-500/50 flex items-center justify-center p-4 group-hover:shadow-2xl group-hover:shadow-amber-500/60 group-hover:border-amber-400 transition-all duration-300 overflow-hidden" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', zIndex: 1 }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="text-center relative z-10">
                        <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">🍫</div>
                      </div>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-rose-500 via-pink-500 to-pink-600 rounded-2xl border-3 border-pink-300/50 flex items-center justify-center p-5 shadow-2xl shadow-pink-500/50" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', zIndex: 2 }}>
                      <p className="text-white text-sm md:text-base text-center leading-snug font-medium">{reason}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Photo Section 2 */}
          <section className="relative py-20 px-6 bg-gradient-to-b from-rose-900 via-purple-900 to-pink-900 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden border-4 border-pink-400/40 shadow-2xl shadow-pink-500/30">
                <img
                  src="/valentine/WhatsApp Image 2026-02-13 at 21.17.31 (2).jpeg"
                  alt="Sweet Memories"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </section>

          {/* Secret Vault */}
          <section className="py-28 px-6 bg-gradient-to-b from-purple-900 via-pink-900 to-rose-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-pink-500 rounded-full blur-3xl" />
            </div>

            <div className="flex justify-center mb-24">
              <div className="inline-block bg-white/20 backdrop-blur-xl rounded-[15px] px-10 py-6 relative z-10 border border-white/30">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-7xl font-serif text-center text-white"
                  style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(192, 132, 252, 0.6)' }}
                >
                  Secret Message Vault 💝🔐
                </motion.h2>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center relative z-10">
              {!isVaultUnlocked ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-10 cursor-pointer"
                  onClick={() => setIsVaultUnlocked(true)}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                      filter: [
                        'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))',
                        'drop-shadow(0 0 40px rgba(236, 72, 153, 0.8))',
                        'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))'
                      ]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="text-9xl md:text-[12rem]"
                  >
                    💝
                  </motion.div>
                  <p className="text-2xl text-pink-100 font-light">Click the heart to unlock my message 💕</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-pink-500/15 to-purple-500/15 backdrop-blur-2xl border-3 border-pink-400/40 rounded-3xl p-12 space-y-8 shadow-2xl shadow-pink-500/30"
                >
                  <h3 className="text-4xl font-serif text-pink-100">My Dearest Kitkat,</h3>
                  <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-100">
                    <p>
                      In the quiet moments when the world fades away, it's your name that echoes in my heart. You are the poetry I never knew how to write, the melody I never knew I needed to hear.
                    </p>
                    <p>
                      Every sunrise reminds me of your warmth, every star whispers your name. You've turned my ordinary life into an extraordinary adventure, filled with laughter, love, and endless possibilities.
                    </p>
                    <p>
                      I promise to cherish every moment, to hold your hand through every storm, to celebrate every victory, and to love you more with each passing day.
                    </p>
                    <p className="text-3xl font-serif text-pink-200 italic pt-4">Forever yours, with all my heart ❤️</p>
                  </div>
                </motion.div>
              )}
            </div>

          </section>

          {/* Photo Section 3*/}
          < section className="relative py-20 px-6 bg-gradient-to-b from-purple-900 via-pink-900 to-rose-900 overflow-hidden" >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden border-4 border-pink-400/40 shadow-2xl shadow-pink-500/30">
                <img
                  src="/valentine/valentine-day-quotes-for-girlfriend-1.jpg"
                  alt="Love Quotes"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </section >

          {/* Open When Letters*/}
          < section className="py-28 px-6 bg-gradient-to-b from-rose-900 via-purple-900 to-pink-900 relative overflow-hidden" >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-32 left-16 w-72 h-72 bg-rose-500 rounded-full blur-3xl" />
              <div className="absolute bottom-32 right-16 w-80 h-80 bg-purple-500 rounded-full blur-3xl" />
            </div>

            <div className="flex justify-center mb-24">
              <div className="inline-block bg-white/20 backdrop-blur-xl rounded-[15px] px-10 py-6 relative z-10 border border-white/30">
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-7xl font-serif text-center text-white"
                  style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(167, 139, 250, 0.6)' }}
                >
                  Open When... ✉️💕
                </motion.h2>
              </div>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 relative z-10">
              {letters.map((letter, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                >
                  <div
                    onClick={() => setOpenEnvelope(openEnvelope === index ? null : index)}
                    className="cursor-pointer group h-full"
                  >
                    <div className="bg-gradient-to-br from-purple-500/15 to-pink-500/15 backdrop-blur-xl border-2 border-purple-400/30 rounded-3xl p-10 hover:scale-105 hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/40 h-full overflow-hidden relative">
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="relative z-10">
                        <div className="flex items-center gap-5 mb-6">
                          <div className="text-6xl group-hover:scale-110 transition-transform duration-300">✉️</div>
                          <h3 className="text-2xl md:text-3xl font-serif text-purple-100 group-hover:text-pink-100 transition-colors">
                            {letter.title}
                          </h3>
                        </div>
                        <AnimatePresence>
                          {openEnvelope === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.5 }}
                              className="mt-8 pt-8 border-t-2 border-purple-400/30"
                            >
                              <p className="text-gray-100 text-lg leading-relaxed italic">{letter.content}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section >

          {/* Photo Section 4*/}
          < section className="relative py-20 px-6 bg-gradient-to-b from-rose-900 via-purple-900 to-pink-900 overflow-hidden" >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden border-4 border-pink-400/40 shadow-2xl shadow-pink-500/30">
                <img
                  src="/valentine/WhatsApp Image 2026-02-13 at 21.27.04.jpeg"
                  alt="Precious Moments"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </section >

          {/* Future With You*/}
          < section className="relative py-28 px-6 bg-gradient-to-b from-pink-900 via-purple-900 to-rose-900 overflow-hidden" >
            {/* Starry background*/}
            < div className="absolute inset-0" >
              {
                [...Array(60)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 1.8, 1],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))
              }
            </div>

            <div className="relative z-10">
              <div className="flex justify-center mb-16">
                <div className="inline-block bg-white/20 backdrop-blur-xl rounded-[15px] px-10 py-6 border border-white/30">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-serif text-center text-white"
                    style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(236, 72, 153, 0.6)' }}
                  >
                    My Forever With You 💕✨🌹
                  </motion.h2>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto space-y-10 mb-20"
              >
                <div className="bg-gradient-to-br from-pink-500/15 to-purple-500/15 backdrop-blur-2xl border-2 border-pink-400/40 rounded-3xl p-12 shadow-2xl shadow-pink-500/30">
                  <p className="text-2xl text-center text-pink-50 leading-relaxed font-light">
                    I promise to wake up every day choosing you, to build a life filled with laughter, adventure, and unconditional love. Together, we'll chase dreams, create memories, and write the most beautiful story ever told.
                  </p>
                </div>
              </motion.div>

              <div className="text-center">
                <p className="text-3xl text-purple-100 mb-12 font-light">Counting down to our next Valentine's Day</p>
                <div className="flex flex-wrap justify-center gap-8">
                  {[
                    { label: 'Days', value: countdown.days },
                    { label: 'Hours', value: countdown.hours },
                    { label: 'Minutes', value: countdown.minutes },
                    { label: 'Seconds', value: countdown.seconds },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-pink-400/40 rounded-3xl p-8 min-w-[140px] hover:scale-110 hover:border-pink-400/70 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/40"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          textShadow: [
                            '0 0 20px rgba(236, 72, 153, 0.5)',
                            '0 0 30px rgba(236, 72, 153, 0.8)',
                            '0 0 20px rgba(236, 72, 153, 0.5)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl font-bold bg-gradient-to-br from-pink-200 to-rose-200 bg-clip-text text-transparent mb-3"
                      >
                        {String(item.value).padStart(2, '0')}
                      </motion.div>
                      <div className="text-purple-200 uppercase text-sm tracking-widest font-semibold">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section >

          {/* Photo Section 5*/}
          < section className="relative py-20 px-6 bg-gradient-to-b from-pink-900 via-purple-900 to-rose-900 overflow-hidden" >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative rounded-3xl overflow-hidden border-4 border-pink-400/40 shadow-2xl shadow-pink-500/30">
                <img
                  src="/valentine/valentines-day-textimage_6_3x2.avif"
                  alt="Valentine's Day Love"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </section >

          {/* Final Proposal*/}
          < section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900" >
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(35)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl opacity-70"
                  initial={{ y: '100vh', x: `${Math.random() * 100}vw` }}
                  animate={{
                    y: '-100vh',
                    x: `${Math.random() * 100}vw`,
                  }}
                  transition={{
                    duration: Math.random() * 10 + 15,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: 'linear',
                  }}
                >
                  ❤️
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative z-10 text-center px-6 max-w-6xl mx-auto"
            >
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mb-12 w-full"
              >
                <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border-4 border-pink-400/40 shadow-2xl shadow-pink-500/30">
                  <img
                    src="/valentine/WhatsApp Image 2026-02-13 at 21.17.31 (1).jpeg"
                    alt="Mine Always"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </motion.div>

              {/* Text */}
              <div className="inline-block bg-white/20 backdrop-blur-xl rounded-[15px] px-12 py-10 border border-white/30">
                <motion.h1
                  animate={{
                    textShadow: [
                      '0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)',
                      '0 0 50px rgba(244, 114, 182, 0.8), 0 0 100px rgba(244, 114, 182, 0.6)',
                      '0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-7xl md:text-9xl lg:text-[10rem] font-serif text-white leading-tight"
                >
                  Mine Always
                  <br />
                  <span className="text-8xl md:text-[10rem]">💕✨</span>
                </motion.h1>
              </div>
            </motion.div>
          </section >

          {/* Music Toggle*/}
          < motion.button
            whileHover={{ scale: 1.15 }
            }
            whileTap={{ scale: 0.95 }}
            onClick={toggleMusic}
            className={`fixed bottom-8 right-8 w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-2xl shadow-pink-500/50 flex items-center justify-center text-4xl z-50 border-2 border-pink-300/30 ${isPlaying ? 'animate-pulse' : ''
              } hover:shadow-pink-500/70 transition-all duration-300`}
          >
            🎵
          </motion.button >

          <audio ref={audioRef} loop>
            <source src="https://www.bensound.com/bensound-music/bensound-romantic.mp3" type="audio/mpeg" />
          </audio>

          <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .border-3 {
          border-width: 3px;
        }
      `}</style>
        </>
      )}
    </div>
  );
}
