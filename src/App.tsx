import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Welcome from './components/Welcome';
import Navigation from './components/Navigation';
import MemoryLane from './components/MemoryLane';
import MidnightChats from './components/MidnightChats';
import WhyYou from './components/WhyYou';
import MoodMeter from './components/MoodMeter';
import OurWorld from './components/OurWorld';
import AlwaysHere from './components/AlwaysHere';
import Forever from './components/Forever';
import AdminDashboard from './components/AdminDashboard';
import WriteEmotions from './components/WriteEmotions';
import EntryGate from './components/EntryGate/EntryGate';

type Page = 'welcome' | 'navigation' | 'memory-lane' | 'midnight-chats' | 'why-you' | 'mood-meter' | 'our-world' | 'always-here' | 'forever' | 'admin' | 'write-emotions';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [entryGranted, setEntryGranted] = useState(false);

  // Entry gate will show every time - no localStorage persistence

  const handleEnterWelcome = () => {
    setCurrentPage('navigation');
  };

  const handleSectionSelect = (section: string) => {
    setCurrentPage(section as Page);
  };

  const handleBack = () => {
    setCurrentPage('navigation');
  };

  // Show entry gate if not granted access
  if (!entryGranted) {
    return <EntryGate onSuccess={() => setEntryGranted(true)} />;
  }

  return (
    <div className="min-h-screen bg-midnight-950">
      <AnimatePresence mode="wait">
        {currentPage === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.8 }}
          >
            <Welcome onEnter={handleEnterWelcome} />
          </motion.div>
        )}

        {currentPage === 'navigation' && (
          <motion.div
            key="navigation"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <Navigation onSectionSelect={handleSectionSelect} />
          </motion.div>
        )}

        {currentPage === 'memory-lane' && (
          <motion.div
            key="memory-lane"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          >
            <MemoryLane onBack={handleBack} />
          </motion.div>
        )}

        {currentPage === 'midnight-chats' && (
          <motion.div
            key="midnight-chats"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6 }}
          >
            <MidnightChats onBack={handleBack} />
          </motion.div>
        )}

        {currentPage === 'why-you' && (
          <motion.div
            key="why-you"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.6 }}
          >
            <WhyYou onBack={handleBack} />
          </motion.div>
        )}

        {currentPage === 'mood-meter' && (
          <motion.div
            key="mood-meter"
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 10 }}
            transition={{ duration: 0.6 }}
          >
            <MoodMeter onBack={handleBack} />
          </motion.div>
        )}

        {currentPage === 'our-world' && (
          <motion.div
            key="our-world"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <OurWorld onBack={handleBack} />
          </motion.div>
        )}

        {currentPage === 'always-here' && (
          <motion.div
            key="always-here"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.6 }}
          >
            <AlwaysHere onBack={handleBack} />
          </motion.div>
        )}

        {currentPage === 'forever' && (
          <motion.div
            key="forever"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Forever onBack={handleBack} />
          </motion.div>
        )}

        {currentPage === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <AdminDashboard onBack={handleBack} />
          </motion.div>
        )}

        {currentPage === 'write-emotions' && (
          <motion.div
            key="write-emotions"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
          >
            <WriteEmotions onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
