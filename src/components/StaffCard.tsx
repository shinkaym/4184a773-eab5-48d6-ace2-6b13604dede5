import { Users, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface StaffCardProps {
  name: string;
  image?: string;
  isSelected?: boolean;
  onClick?: () => void;
  isAnyStaff?: boolean;
}

export function StaffCard({ name, image, isSelected, onClick, isAnyStaff }: StaffCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className={`
        relative p-5 rounded-soft border cursor-pointer transition-all duration-300 flex flex-col items-center text-center bg-white overflow-hidden
        ${
          isSelected
            ? 'border-nature-primary shadow-soft-lg'
            : 'border-nature-divider hover:border-nature-primary hover:shadow-soft'
        }
      `}
    >
      {/* Subtle gradient overlay on selection */}
      {isSelected && (
        <div className='absolute inset-0 bg-gradient-to-br from-nature-primary/5 to-nature-secondary/5 pointer-events-none' />
      )}

      {/* Selection indicator */}
      {isSelected && (
        <div className='absolute top-3 right-3 w-6 h-6 rounded-full bg-nature-primary flex items-center justify-center shadow-soft z-10'>
          <Check className='w-4 h-4 text-white stroke-[3]' />
        </div>
      )}

      <div className='mb-4 relative z-10'>
        {isAnyStaff ? (
          <div className='w-20 h-20 rounded-full bg-gradient-to-br from-nature-primary/10 to-nature-secondary/10 flex items-center justify-center border-2 border-nature-divider'>
            <Users className='w-9 h-9 text-nature-primary' />
          </div>
        ) : (
          <div className='w-20 h-20 rounded-full overflow-hidden border-2 border-nature-divider shadow-soft'>
            <img src={image || 'https://i.pravatar.cc/150'} alt={name} className='w-full h-full object-cover' />
          </div>
        )}
      </div>

      <h4 className='font-semibold text-nature-text-primary text-base relative z-10'>{name}</h4>
    </motion.div>
  );
}
