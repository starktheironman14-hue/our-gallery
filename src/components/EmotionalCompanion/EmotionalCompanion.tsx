import { useState, useEffect } from 'react';
import WelcomeCompanion from './WelcomeCompanion';
import MoodCheckIn from './MoodCheckIn';
import WriteThoughts from './WriteThoughts';
import CompleteSentence from './CompleteSentence';
import AngerMode from './AngerMode';
import SilenceMode from './SilenceMode';

interface EmotionalCompanionProps {
    onExit: () => void;
}

type Stage = 'welcome' | 'mood' | 'thoughts' | 'sentence' | 'anger' | 'silence' | 'ending';

const EmotionalCompanion = ({ onExit }: EmotionalCompanionProps) => {
    const [stage, setStage] = useState<Stage>('welcome');
    const [userName, setUserName] = useState('');
    const [currentMood, setCurrentMood] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Check if user has visited before
        const savedName = localStorage.getItem('companion_name');
        const savedUserId = localStorage.getItem('companion_userId');

        if (savedName && savedUserId) {
            setUserName(savedName);
            setUserId(savedUserId);
            setStage('mood'); // Skip welcome for returning users
        }
    }, []);

    const handleWelcomeContinue = async (name: string) => {
        setUserName(name);

        // Create user in database
        try {
            const response = await fetch('/api/user/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem('companion_userId', data.userId);
                setUserId(data.userId);
                setStage('mood');
            }
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    const handleWelcomeNotNow = () => {
        onExit();
    };

    const handleMoodSelected = (mood: string, emoji: string) => {
        setCurrentMood(mood);

        if (mood === 'angry') {
            setStage('anger');
        } else {
            setStage('thoughts');
        }
    };

    const handleThoughtsSubmit = () => {
        setStage('sentence');
    };

    const handleSentenceComplete = () => {
        setStage('ending');
    };

    const handleAngerSubmit = () => {
        setStage('ending');
    };

    const handleSilenceBack = () => {
        setStage('mood');
    };

    // Ending stage
    if (stage === 'ending') {
        return (
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0F1A] via-[#1a0a1a] to-[#0B0F1A] overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-8">
                    <p className="text-3xl md:text-4xl text-white font-sans leading-relaxed">
                        You don't always have to be strong.
                    </p>
                    <p className="text-3xl md:text-4xl text-white font-sans leading-relaxed">
                        You just have to be honest.
                    </p>
                    <p className="text-2xl text-[#cdb4db] font-sans">
                        I'm glad you came here today.
                    </p>

                    <div className="pt-8">
                        <p className="text-xl text-white/70 font-sans italic">
                            Always here. 🤍
                        </p>
                    </div>

                    <button
                        onClick={onExit}
                        className="mt-12 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-sans hover:bg-white/20 transition-all"
                    >
                        ← Back to main
                    </button>
                </div>
            </section>
        );
    }

    return (
        <>
            {stage === 'welcome' && (
                <WelcomeCompanion
                    onContinue={handleWelcomeContinue}
                    onNotNow={handleWelcomeNotNow}
                />
            )}

            {stage === 'mood' && (
                <MoodCheckIn
                    userName={userName}
                    onMoodSelected={handleMoodSelected}
                />
            )}

            {stage === 'thoughts' && (
                <WriteThoughts
                    userName={userName}
                    currentMood={currentMood}
                    onSubmit={handleThoughtsSubmit}
                />
            )}

            {stage === 'sentence' && (
                <CompleteSentence
                    userName={userName}
                    onComplete={handleSentenceComplete}
                />
            )}

            {stage === 'anger' && (
                <AngerMode
                    userName={userName}
                    onSubmit={handleAngerSubmit}
                />
            )}

            {stage === 'silence' && (
                <SilenceMode
                    userName={userName}
                    onBack={handleSilenceBack}
                />
            )}
        </>
    );
};

export default EmotionalCompanion;
