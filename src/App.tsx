import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { BookingModePage } from './pages/BookingModePage';
import { BookingPage } from './pages/BookingPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/booking" element={<BookingModePage />} />
        <Route path="/appointment" element={<BookingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}