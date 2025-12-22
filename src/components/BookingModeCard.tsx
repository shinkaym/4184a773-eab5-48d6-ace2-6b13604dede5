import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
interface BookingModeCardProps {
  title: string;
  description: string;
  icon: BoxIcon;
  onClick?: () => void;
}
export function BookingModeCard({
  title,
  description,
  icon: Icon,
  onClick
}: BookingModeCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className='group relative w-full bg-white p-8 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full min-h-[400px]'
    >

      {/* Icon Box */}
      <div className='w-16 h-16 border-2 border-nature-text-primary flex items-center justify-center mb-8 bg-nature-surface group-hover:bg-nature-accent/20 transition-colors'>
        <Icon className='w-8 h-8 text-nature-text-primary' strokeWidth={1.5} />
      </div>

      {/* Content */}
      <h3 className='text-2xl md:text-3xl font-bold text-nature-text-primary mb-4 tracking-tight'>{title}</h3>

      <p className='text-nature-text-secondary font-mono text-sm leading-relaxed mb-8 flex-grow'>{description}</p>

      {/* Divider */}
      <div className='w-full border-t border-dashed border-nature-divider mb-8' />

      {/* Action Row */}
      <div className='flex items-center justify-between mt-auto'>
        <span className='font-mono text-sm font-bold tracking-widest text-nature-text-primary'>Select Option</span>
        <ArrowRight className='w-6 h-6 text-nature-text-primary transform group-hover:translate-x-2 transition-transform duration-300' />
      </div>
    </motion.div>
  );
}