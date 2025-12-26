import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface Step1BookingTypeProps {
  selectedType: 'unassigned' | 'scheduled' | null;
  onTypeChange: (type: 'unassigned' | 'scheduled') => void;
}

export function Step1BookingType({ selectedType, onTypeChange }: Step1BookingTypeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className='w-full max-w-5xl mx-auto'
    >
      {/* Header */}
      <div className='text-center mb-12'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='inline-flex items-center justify-center w-16 h-16 rounded-soft bg-gradient-to-br from-nature-primary/20 to-nature-secondary/20 mb-6'
        >
          <Briefcase className='w-8 h-8 text-nature-primary' />
        </motion.div>
        <h2 className='text-4xl md:text-5xl font-display font-semibold tracking-tight text-nature-text-primary mb-4'>
          Select Booking Type
        </h2>
        <p className='text-nature-text-secondary text-lg font-light'>
          Choose how you'd like to schedule your appointment
        </p>
      </div>

      {/* Booking Type Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
        {/* Scheduled Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onTypeChange('scheduled')}
          className={`
            relative cursor-pointer rounded-softer p-12 min-h-[200px]
            flex items-center justify-center text-center
            transition-all duration-150
            ${
              selectedType === 'scheduled'
                ? 'bg-nature-primary text-white shadow-soft-lg'
                : 'bg-white text-nature-text-secondary hover:bg-nature-surface shadow-soft hover:shadow-soft-lg'
            }
          `}
        >
          <p className='text-lg font-light leading-relaxed'>Booking with specific employee assignment.</p>
        </motion.div>

        {/* Unassigned Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onTypeChange('unassigned')}
          className={`
            relative cursor-pointer rounded-softer p-12 min-h-[200px]
            flex items-center justify-center text-center
            transition-all duration-150
            ${
              selectedType === 'unassigned'
                ? 'bg-nature-primary text-white shadow-soft-lg'
                : 'bg-white text-nature-text-secondary hover:bg-nature-surface shadow-soft hover:shadow-soft-lg'
            }
          `}
        >
          <p className='text-lg font-light leading-relaxed'>Booking without assigning an employee yet.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
