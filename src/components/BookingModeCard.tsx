import { ArrowRight, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookingModeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function BookingModeCard({ title, description, icon: Icon, onClick }: BookingModeCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className='group relative w-full bg-white rounded-softer p-10 cursor-pointer shadow-soft hover:shadow-soft-lg transition-all duration-500 flex flex-col h-full min-h-[380px] overflow-hidden'
    >
      {/* Subtle gradient overlay on hover */}
      <div className='absolute inset-0 bg-gradient-to-br from-nature-primary/0 to-nature-secondary/0 group-hover:from-nature-primary/5 group-hover:to-nature-secondary/5 transition-all duration-500 rounded-softer' />

      {/* Content */}
      <div className='relative z-10'>
        {/* Icon Container */}
        <div className='w-20 h-20 rounded-soft bg-gradient-to-br from-nature-primary/10 to-nature-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500'>
          <Icon className='w-10 h-10 text-nature-primary' strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className='text-3xl font-display font-semibold text-nature-text-primary mb-4 tracking-tight leading-tight'>
          {title}
        </h3>

        {/* Description */}
        <p className='text-nature-text-secondary text-base leading-relaxed mb-8 flex-grow font-light'>{description}</p>

        {/* Divider */}
        <div className='w-16 h-0.5 bg-gradient-to-r from-nature-primary to-nature-secondary mb-8 group-hover:w-24 transition-all duration-500' />

        {/* Action Row */}
        <div className='flex items-center gap-3 text-nature-text-secondary group-hover:text-nature-primary transition-colors duration-300'>
          <span className='text-sm font-medium tracking-wide'>Continue</span>
          <ArrowRight className='w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300' />
        </div>
      </div>

      {/* Decorative corner element */}
      <div className='absolute bottom-0 right-0 w-24 h-24 bg-nature-accent/5 rounded-tl-full group-hover:scale-150 transition-transform duration-700 origin-bottom-right' />
    </motion.div>
  );
}
