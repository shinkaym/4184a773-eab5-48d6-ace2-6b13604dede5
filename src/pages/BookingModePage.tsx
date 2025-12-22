import { ArrowLeft, CalendarX, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { BookingModeCard } from '../components/BookingModeCard';
interface BookingModePageProps {
  onBack: () => void;
}
export function BookingModePage({ onBack }: BookingModePageProps) {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div className='min-h-screen w-full bg-nature-main p-4 md:p-8 flex flex-col relative overflow-hidden'>
      {/* Background Grid Overlay */}
      {/*<div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
       />*/}

      <div className='relative z-10 max-w-7xl mx-auto w-full flex flex-col min-h-[calc(100vh-4rem)]'>
        {/* Header */}
        <header className='flex justify-between items-start mb-16 md:mb-24'>
          <motion.button
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            onClick={onBack}
            className='flex items-center gap-2 px-6 py-3 bg-white border-2 border-nature-text-primary font-bold uppercase tracking-wider hover:bg-nature-surface transition-colors shadow-md hover:shadow-lg group'
          >
            <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
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
          <motion.div variants={itemVariants} className='mb-12'>
            <h1 className='text-4xl md:text-6xl font-black tracking-tighter text-nature-text-primary uppercase mb-4'>
              Select Booking Mode
            </h1>
            <p className='text-nature-text-tertiary font-mono text-sm md:text-base tracking-wide'>
              // CHOOSE HOW YOU WANT TO SCHEDULE THIS APPOINTMENT
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch'>
            <motion.div variants={itemVariants} className='h-full'>
              <BookingModeCard
                title='Create Unassigned'
                description='Create appointment without assigning an employee yet. Best for flexible scheduling.'
                icon={CalendarX}
                onClick={() => console.log('Unassigned selected')}
              />
            </motion.div>

            <motion.div variants={itemVariants} className='h-full'>
              <BookingModeCard
                title='Create Scheduled'
                description='Create appointment with specific employee assignment. Best for direct booking.'
                icon={CalendarCheck}
                onClick={() => console.log('Scheduled selected')}
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
            delay: 0.5,
          }}
          className='mt-16 pt-6 border-t-2 border-nature-text-primary w-full'
        ></motion.footer>
      </div>
    </div>
  );
}
