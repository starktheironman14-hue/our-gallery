import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
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
import TelegramMessage from './components/TelegramMessage';
import EntryGate from './components/EntryGate/EntryGate';

type Page = 'welcome' | 'navigation' | 'memory-lane' | 'midnight-chats' | 'why-you' | 'mood-meter' | 'our-world' | 'always-here' | 'forever' | 'admin' | 'write-emotions' | 'telegram-message';

function App() {
  const [entryGranted, setEntryGranted] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('welcome');

  const navigateTo = (page: Page) => setCurrentPage(page);

  // Show entry gate if not granted access
  if (!entryGranted) {
    return <EntryGate onSuccess={() => setEntryGranted(true)} />;
  }

  return (
    <div className="min-h-screen bg-midnight-950 text-white">
      <AnimatePresence mode="wait">
        {currentPage === 'welcome' && (
          <Welcome key="welcome" onEnter={() => navigateTo('navigation')} />
        )}
        {currentPage === 'navigation' && (
          <Navigation
            key="navigation"
            onSectionSelect={(section) => navigateTo(section as Page)}
          />
        )}
        {currentPage === 'memory-lane' && (
          <MemoryLane key="memory-lane" onBack={() => navigateTo('navigation')} />
        )}
        {currentPage === 'midnight-chats' && (
          <MidnightChats key="midnight-chats" onBack={() => navigateTo('navigation')} />
        )}
        {currentPage === 'why-you' && (
          <WhyYou key="why-you" onBack={() => navigateTo('navigation')} />
        )}
        {currentPage === 'mood-meter' && (
          <MoodMeter key="mood-meter" onBack={() => navigateTo('navigation')} />
        )}
        {currentPage === 'our-world' && (
          <OurWorld key="our-world" onBack={() => navigateTo('navigation')} />
        )}
        {currentPage === 'always-here' && (
          <AlwaysHere key="always-here" onBack={() => navigateTo('navigation')} />
        )}
        {currentPage === 'forever' && (
          <Forever key="forever" onBack={() => navigateTo('navigation')} />
        )}
        {currentPage === 'admin' && (
          <AdminDashboard key="admin" onBack={() => navigateTo('navigation')} />
        )}
        {currentPage === 'write-emotions' && (
          <WriteEmotions key="write-emotions" onBack={() => navigateTo('navigation')} />
        )}
        {currentPage === 'telegram-message' && (
          <TelegramMessage key="telegram-message" onBack={() => navigateTo('navigation')} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
