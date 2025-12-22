import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepProps {
  number: number;
  title: string;
  subtitle?: string;
  status: 'current' | 'completed' | 'upcoming';
  isLast?: boolean;
}

export function StepIndicator({ number, title, subtitle, status, isLast }: StepProps) {
  const getCircleStyles = () => {
    switch (status) {
      case 'current':
        return 'bg-nature-primary text-white border-nature-primary shadow-soft';
      case 'completed':
        return 'bg-nature-success text-white border-nature-success';
      case 'upcoming':
        return 'bg-white text-nature-text-tertiary border-nature-divider';
    }
  };

  const getTextStyles = () => {
    switch (status) {
      case 'current':
        return 'text-nature-text-primary font-semibold';
      case 'completed':
        return 'text-nature-text-secondary font-medium';
      case 'upcoming':
        return 'text-nature-text-tertiary font-medium';
    }
  };

  return (
    <div className='flex gap-4 relative'>
      {/* Vertical Line */}
      {!isLast && (
        <div className='absolute left-[17px] top-10 bottom-[-24px] w-[2px] bg-gradient-to-b from-nature-divider to-nature-divider/30' />
      )}

      {/* Circle Indicator */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${getCircleStyles()}`}
      >
        {status === 'completed' ? (
          <Check className='w-5 h-5 stroke-[3]' />
        ) : (
          <span className='text-sm font-semibold'>{number}</span>
        )}
      </motion.div>

      {/* Text Content */}
      <div className='pt-1 pb-8'>
        <div className={`text-base tracking-wide mb-1 transition-colors ${getTextStyles()}`}>{title}</div>
        {subtitle && <div className='text-xs text-nature-text-tertiary tracking-wide font-light'>{subtitle}</div>}
      </div>
    </div>
  );
}
