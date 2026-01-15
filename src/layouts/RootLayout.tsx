import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const RootLayout = () => {
    const location = useLocation();
    const element = useOutlet();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full min-h-screen"
            >
                {element}
            </motion.div>
        </AnimatePresence>
    );
};

export default RootLayout;
