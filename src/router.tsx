import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
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
import ErrorPage from './components/ErrorPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Welcome /> },
            { path: 'navigation', element: <Navigation /> },
            { path: 'memory-lane', element: <MemoryLane /> },
            { path: 'midnight-chats', element: <MidnightChats /> },
            { path: 'why-you', element: <WhyYou /> },
            { path: 'mood-meter', element: <MoodMeter /> },
            { path: 'our-world', element: <OurWorld /> },
            { path: 'always-here', element: <AlwaysHere /> },
            { path: 'forever', element: <Forever /> },
            { path: 'admin', element: <AdminDashboard /> },
            { path: 'write-emotions', element: <WriteEmotions /> },
            { path: 'telegram-message', element: <TelegramMessage /> },
        ],
    },
]);
