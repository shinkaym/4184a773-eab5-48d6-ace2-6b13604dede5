import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/images/logo.jpg';

interface HeroBannerProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  activeNav: 'booking' | 'contact';
  customerName?: string;
  onLogout?: () => void;
}

export function HeroBanner({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  activeNav,
  customerName = 'John Wick',
  onLogout,
}: HeroBannerProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate('/');
    }
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className='relative w-full h-[400px] md:h-[480px] overflow-hidden'>
      <div className='absolute inset-0'>
        <img src={imageUrl} alt={imageAlt} className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70' />
      </div>

      {/* Navigation */}
      <nav className='relative z-50 w-full px-4 sm:px-6 py-4 sm:py-6'>
        <div className='max-w-[1400px] mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-2 sm:gap-3'>
            <img src={logo} alt='AICOMPOS Logo' className='h-8 sm:h-10 w-auto rounded-soft shadow-soft' />
            <span className='font-display text-lg sm:text-2xl font-semibold tracking-tight text-white drop-shadow-lg'>
              AICOM<span className='text-nature-primary'>POS</span>
            </span>
          </div>

          <div className='flex items-center gap-4 sm:gap-6'>
            {/* Desktop Navigation Links */}
            <div className='hidden lg:flex items-center gap-6 text-sm font-medium'>
              <button
                onClick={() => navigate('/booking')}
                className={`transition-colors cursor-pointer ${
                  activeNav === 'booking'
                    ? 'text-white hover:text-white border-b-2 border-white'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Booking
              </button>
              <button
                onClick={() => navigate('/contact')}
                className={`transition-colors cursor-pointer ${
                  activeNav === 'contact'
                    ? 'text-white hover:text-white border-b-2 border-white'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Desktop User Info */}
            <div className='hidden lg:flex items-center gap-4 pl-6 border-l border-white/30'>
              <button className='flex items-center gap-2 px-4 py-2 rounded-soft bg-white/10 backdrop-blur-md text-sm font-medium text-white hover:bg-white/20 transition-all cursor-pointer'>
                <User className='w-4 h-4' />
                {customerName}
              </button>
              <button
                onClick={handleLogout}
                className='flex items-center gap-2 text-sm font-medium text-white/90 hover:text-nature-error transition-colors cursor-pointer'
              >
                <LogOut className='w-4 h-4' />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='lg:hidden p-2 rounded-soft bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all'
              aria-label='Toggle menu'
            >
              {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='lg:hidden fixed top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl z-[100] overflow-y-auto'
          >
            {/* Mobile Menu Header */}
            <div className='flex items-center justify-between p-4 border-b border-gray-200'>
              <span className='font-display text-xl font-semibold text-gray-800'>
                AICOM<span className='text-nature-primary'>POS</span>
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className='p-2 rounded-soft hover:bg-gray-100 transition-colors'
                aria-label='Close menu'
              >
                <X className='w-5 h-5 text-gray-600' />
              </button>
            </div>

            {/* Mobile User Info */}
            <div className='p-4 border-b border-gray-200 bg-gray-50'>
              <div className='flex items-center gap-2 mb-2'>
                <User className='w-4 h-4 text-gray-600' />
                <span className='text-sm font-medium text-gray-800'>{customerName}</span>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className='p-4 space-y-2'>
              <button
                onClick={() => handleNavClick('/booking')}
                className={`w-full text-left px-4 py-3 rounded-soft font-medium transition-all ${
                  activeNav === 'booking'
                    ? 'bg-nature-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Booking
              </button>
              <button
                onClick={() => handleNavClick('/contact')}
                className={`w-full text-left px-4 py-3 rounded-soft font-medium transition-all ${
                  activeNav === 'contact'
                    ? 'bg-nature-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Contact
              </button>
            </div>

            {/* Mobile Logout Button */}
            <div className='p-4 border-t border-gray-200 mt-auto'>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className='w-full flex items-center justify-center gap-2 px-4 py-3 rounded-soft bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-all'
              >
                <LogOut className='w-4 h-4' />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className='lg:hidden fixed inset-0 bg-black/50 z-[90]'
          />
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <div className='relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 h-full flex flex-col justify-center -mt-16'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='max-w-3xl'
        >
          <h1
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-white mb-4 sm:mb-5 drop-shadow-lg leading-tight'
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className='text-white/90 text-base sm:text-lg font-light max-w-2xl leading-relaxed'>{subtitle}</p>
        </motion.div>
      </div>
    </div>
  );
}
