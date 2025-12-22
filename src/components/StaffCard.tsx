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
        relative p-3 rounded-soft border cursor-pointer transition-all duration-300 flex flex-col items-center text-center bg-white overflow-hidden
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
        <div className='absolute top-2 right-2 w-5 h-5 rounded-full bg-nature-primary flex items-center justify-center shadow-soft z-10'>
          <Check className='w-3 h-3 text-white stroke-[3]' />
        </div>
      )}

      <div className='mb-3 relative z-10'>
        {isAnyStaff ? (
          <div className='w-14 h-14 rounded-full bg-gradient-to-br from-nature-primary/10 to-nature-secondary/10 flex items-center justify-center border-2 border-nature-divider'>
            <Users className='w-7 h-7 text-nature-primary' />
          </div>
        ) : (
          <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-nature-divider shadow-soft'>
            <img src={image || 'https://i.pravatar.cc/150'} alt={name} className='w-full h-full object-cover' />
          </div>
        )}
      </div>

      <h4 className='font-semibold text-nature-text-primary text-sm relative z-10'>{name}</h4>
    </motion.div>
  );
}
