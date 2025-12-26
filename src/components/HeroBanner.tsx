import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
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

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigate('/');
    }
  };

  return (
    <div className='relative w-full h-[400px] md:h-[480px] overflow-hidden'>
      <div className='absolute inset-0'>
        <img src={imageUrl} alt={imageAlt} className='w-full h-full object-cover' />
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70' />
      </div>

      {/* Navigation */}
      <nav className='relative z-50 w-full px-6 py-6'>
        <div className='max-w-[1400px] mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <img src={logo} alt='AICOMPOS Logo' className='h-10 w-auto rounded-soft shadow-soft' />
            <span className='font-display text-2xl font-semibold tracking-tight text-white drop-shadow-lg'>
              AICOM<span className='text-nature-primary'>POS</span>
            </span>
          </div>

          <div className='flex items-center gap-6'>
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

            <div className='flex items-center gap-4 pl-6 border-l border-white/30'>
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
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className='relative z-10 max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center -mt-16'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='max-w-3xl'
        >
          <h1
            className='text-5xl md:text-6xl font-display font-semibold tracking-tight text-white mb-5 drop-shadow-lg leading-tight'
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className='text-white/90 text-lg font-light max-w-2xl leading-relaxed'>{subtitle}</p>
        </motion.div>
      </div>
    </div>
  );
}
