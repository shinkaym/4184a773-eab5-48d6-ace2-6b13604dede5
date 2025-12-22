import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { BookingModePage } from './pages/BookingModePage';
import { BookingPage } from './pages/BookingPage';
import { motion, AnimatePresence } from 'framer-motion';
export function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'booking' | 'appointment'>('appointment');
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <div className="relative w-full h-full">
            <LoginPage />
            <button onClick={() => setCurrentPage('booking')} className="fixed bottom-4 left-4 z-50 px-4 py-2 bg-nature-primary text-white text-xs font-bold rounded shadow-lg opacity-50 hover:opacity-100 transition-opacity">
              DEMO: Go to Booking
            </button>
          </div>;
      case 'booking':
        return <div className="relative w-full h-full">
            <BookingModePage onBack={() => setCurrentPage('login')} />
            <button onClick={() => setCurrentPage('appointment')} className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-nature-primary text-white text-xs font-bold rounded shadow-lg opacity-50 hover:opacity-100 transition-opacity">
              DEMO: Go to Appointment
            </button>
          </div>;
      case 'appointment':
        return <BookingPage onComplete={() => setCurrentPage('login')} />;
    }
  };
  return <AnimatePresence mode="wait">
      <motion.div key={currentPage} initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="w-full h-full">
        {renderPage()}
      </motion.div>
    </AnimatePresence>;
}