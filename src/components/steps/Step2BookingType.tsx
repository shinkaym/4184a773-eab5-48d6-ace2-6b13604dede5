import { motion } from 'framer-motion';
import { CalendarX, CalendarCheck, Briefcase } from 'lucide-react';
import { BookingModeCard } from '../BookingModeCard';

interface Step2BookingTypeProps {
  selectedType: 'unassigned' | 'scheduled' | null;
  onTypeChange: (type: 'unassigned' | 'scheduled') => void;
}

export function Step2BookingType({ selectedType, onTypeChange }: Step2BookingTypeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-soft bg-gradient-to-br from-nature-primary/20 to-nature-secondary/20 mb-6"
        >
          <Briefcase className="w-8 h-8 text-nature-primary" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-nature-text-primary mb-4">
          Select Booking Type
        </h2>
        <p className="text-nature-text-secondary text-lg font-light">
          Choose how you'd like to schedule your appointment
        </p>
      </div>

      {/* Booking Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative p-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            className="relative cursor-pointer"
            onClick={() => onTypeChange('unassigned')}
          >
            {/* Selected Indicator Border */}
            {selectedType === 'unassigned' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute -inset-1 rounded-softer border-4 border-nature-primary pointer-events-none z-10"
              />
            )}
            <div className="pointer-events-none">
              <BookingModeCard
                title="Create Unassigned"
                description="Booking without assigning an employee yet. Perfect when you don't have a preference or want to be matched with the first available staff member."
                icon={CalendarX}
              />
            </div>
          </motion.div>
        </div>

        <div className="relative p-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            className="relative cursor-pointer"
            onClick={() => onTypeChange('scheduled')}
          >
            {/* Selected Indicator Border */}
            {selectedType === 'scheduled' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute -inset-1 rounded-softer border-4 border-nature-primary pointer-events-none z-10"
              />
            )}
            <div className="pointer-events-none">
              <BookingModeCard
                title="Create Scheduled"
                description="Booking with specific employee assignment. Choose your preferred staff member and schedule at their available time slots."
                icon={CalendarCheck}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
