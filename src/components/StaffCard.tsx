import React from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
interface StaffCardProps {
  name: string;
  role: string;
  image?: string;
  isSelected?: boolean;
  onClick?: () => void;
  isAnyStaff?: boolean;
}
export function StaffCard({
  name,
  role,
  image,
  isSelected,
  onClick,
  isAnyStaff
}: StaffCardProps) {
  return <motion.div whileHover={{
    y: -2
  }} whileTap={{
    scale: 0.98
  }} onClick={onClick} className={`
        relative p-4 border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center bg-white
        ${isSelected ? 'border-nature-text-primary shadow-lg' : 'border-nature-divider hover:border-nature-text-primary/50'}
      `}>
      {isSelected && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-nature-text-primary" />}

      <div className="mb-3">
        {isAnyStaff ? <div className="w-16 h-16 rounded-full bg-nature-surface flex items-center justify-center border border-nature-divider">
            <Users className="w-8 h-8 text-nature-text-secondary" />
          </div> : <div className="w-16 h-16 rounded-full overflow-hidden border border-nature-divider">
            <img src={image || 'https://i.pravatar.cc/150'} alt={name} className="w-full h-full object-cover" />
          </div>}
      </div>

      <h4 className="font-bold text-nature-text-primary text-sm mb-1">
        {name}
      </h4>
      <p className="font-mono text-[10px] text-nature-text-tertiary uppercase tracking-wider">
        {role}
      </p>
    </motion.div>;
}