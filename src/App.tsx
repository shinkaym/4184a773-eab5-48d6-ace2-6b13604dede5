import React, { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { BookingModePage } from './pages/BookingModePage';
import { AppointmentPage } from './pages/AppointmentPage';
import { AppointmentSelectionPage } from './pages/AppointmentSelectionPage';
import { SuccessPage } from './pages/SuccessPage';
import { motion, AnimatePresence } from 'framer-motion';
export function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'booking' | 'appointment' | 'confirm' | 'success'>('appointment');
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
        return <div className="relative w-full h-full">
            <AppointmentPage onNext={() => setCurrentPage('confirm')} onBack={() => setCurrentPage('booking')} />
            <button onClick={() => setCurrentPage('confirm')} className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-nature-primary text-white text-xs font-bold rounded shadow-lg opacity-50 hover:opacity-100 transition-opacity">
              DEMO: Go to Confirm
            </button>
          </div>;
      case 'confirm':
        return <div className="relative w-full h-full">
            <AppointmentSelectionPage />
            <button onClick={() => setCurrentPage('success')} className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-nature-primary text-white text-xs font-bold rounded shadow-lg opacity-50 hover:opacity-100 transition-opacity">
              DEMO: Go to Success
            </button>
          </div>;
      case 'success':
        return <div className="relative w-full h-full">
            <SuccessPage onBackToHome={() => setCurrentPage('login')} onDownloadTicket={() => console.log('Download ticket')} />
            <button onClick={() => setCurrentPage('login')} className="fixed bottom-4 left-4 z-50 px-4 py-2 bg-nature-primary text-white text-xs font-bold rounded shadow-lg opacity-50 hover:opacity-100 transition-opacity">
              DEMO: Back to Login
            </button>
          </div>;
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