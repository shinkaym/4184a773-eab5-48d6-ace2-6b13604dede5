import { motion } from 'framer-motion';
import { Delete } from 'lucide-react';

interface NumberPadProps {
  onNumberClick: (num: string) => void;
  onDelete: () => void;
}

export function NumberPad({ onNumberClick, onDelete }: NumberPadProps) {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'delete'];

  return (
    <div className="flex justify-center w-full" role="group" aria-label="Number pad for phone entry">
      <div className="grid grid-cols-3 gap-3 sm:gap-5">
        {numbers.map((num, idx) => {
          if (num === '') {
            return <div key={idx} className="w-20 h-20 sm:w-24 sm:h-24" aria-hidden="true" />;
          }

          if (num === 'delete') {
            return (
              <motion.button
                key={num}
                type="button"
                onClick={onDelete}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-300 active:bg-gray-100"
                aria-label="Delete last digit"
              >
                <Delete size={28} />
              </motion.button>
            );
          }

          return (
            <motion.button
              key={num}
              type="button"
              onClick={() => onNumberClick(num)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-2xl sm:text-3xl font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-300 active:bg-gray-100"
              aria-label={`Dial ${num}`}
            >
              {num}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
