import { ArrowLeft, CalendarX, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookingModeCard } from '../components/BookingModeCard';

export function BookingModePage() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className='min-h-screen w-full bg-nature-main p-6 md:p-12 flex flex-col relative overflow-hidden'>
      {/* Subtle background decoration */}
      <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-nature-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3' />
      <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-nature-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3' />

      <div className='relative z-10 max-w-6xl mx-auto w-full flex flex-col min-h-[calc(100vh-6rem)]'>
        {/* Header */}
        <header className='flex justify-between items-start mb-20 md:mb-28'>
          <motion.button
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onClick={() => navigate('/')}
            className='flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-soft text-nature-text-secondary font-medium tracking-wide hover:bg-white hover:shadow-soft transition-all duration-300 group'
          >
            <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300' />
            Back
          </motion.button>
        </header>

        {/* Main Content */}
        <motion.main
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='flex-grow flex flex-col justify-center'
        >
          <motion.div variants={itemVariants} className='mb-16 text-center'>
            <h1 className='text-5xl md:text-7xl font-display font-semibold tracking-tight text-nature-text-primary mb-6 leading-tight'>
              Select Your
              <br />
              Booking Type
            </h1>
            <p className='text-lg text-nature-text-secondary font-light max-w-2xl mx-auto'>
              Choose how you'd like to schedule your appointment
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto w-full'>
            <motion.div variants={itemVariants} className='h-full'>
              <BookingModeCard
                title='Create Unassigned'
                description='Create appointment without assigning an employee yet. Best for flexible scheduling.'
                icon={CalendarX}
                onClick={() => navigate('/appointment')}
              />
            </motion.div>

            <motion.div variants={itemVariants} className='h-full'>
              <BookingModeCard
                title='Create Scheduled'
                description='Create appointment with specific employee assignment. Best for direct booking.'
                icon={CalendarCheck}
                onClick={() => navigate('/appointment')}
              />
            </motion.div>
          </div>
        </motion.main>

        {/* Footer Metadata */}
        <motion.footer
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
            duration: 0.6,
          }}
          className='mt-20 pt-8 border-t border-nature-divider-light w-full'
        >
          <div className='flex justify-center items-center text-xs text-nature-text-tertiary font-light tracking-wider'>
            Choose your preferred booking method to continue
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
