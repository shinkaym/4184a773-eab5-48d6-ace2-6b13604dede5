import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export function ArrowButton({ direction, text, onClick, disabled = false }: ArrowButtonProps) {
  const isLeft = direction === 'left';

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02, x: disabled ? 0 : isLeft ? -4 : 4 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group overflow-hidden
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {isLeft ? (
        // Left Arrow (Back)
        <div className="relative flex items-center">
          {/* Arrow Shape */}
          <svg
            width="200"
            height="56"
            viewBox="0 0 200 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-soft"
          >
            {/* Arrow body with point on left and rounded corners */}
            <path
              d="M 44 0 L 188 0 Q 200 0 200 12 L 200 44 Q 200 56 188 56 L 44 56 Q 36 56 30 50 L 6 32 Q 2 28 6 24 L 30 6 Q 36 0 44 0 Z"
              className={`
                transition-all duration-300
                ${
                  disabled
                    ? 'fill-nature-surface-disabled'
                    : 'fill-white group-hover:fill-nature-primary/10 stroke-nature-primary stroke-[2]'
                }
              `}
            />
          </svg>

          {/* Text and Icon */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 pl-8">
            <ArrowLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                disabled ? 'text-nature-text-tertiary' : 'text-nature-primary group-hover:-translate-x-1'
              }`}
            />
            <span
              className={`text-sm font-semibold tracking-wide uppercase ${
                disabled ? 'text-nature-text-tertiary' : 'text-nature-text-primary group-hover:text-nature-primary'
              }`}
            >
              {text}
            </span>
          </div>
        </div>
      ) : (
        // Right Arrow (Next/Finish)
        <div className="relative flex items-center">
          {/* Arrow Shape */}
          <svg
            width="200"
            height="56"
            viewBox="0 0 200 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-soft"
          >
            {/* Arrow body with point on right and rounded corners */}
            <path
              d="M 12 0 Q 0 0 0 12 L 0 44 Q 0 56 12 56 L 156 56 Q 164 56 170 50 L 194 32 Q 198 28 194 24 L 170 6 Q 164 0 156 0 Z"
              className={`
                transition-all duration-300
                ${
                  disabled
                    ? 'fill-nature-surface-disabled'
                    : 'fill-nature-primary group-hover:fill-nature-primary/90'
                }
              `}
            />
          </svg>

          {/* Text and Icon */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 pr-8">
            <span
              className={`text-sm font-semibold tracking-wide uppercase ${
                disabled ? 'text-nature-text-tertiary' : 'text-white'
              }`}
            >
              {text}
            </span>
            <ArrowRight
              className={`w-5 h-5 transition-transform duration-300 ${
                disabled ? 'text-nature-text-tertiary' : 'text-white group-hover:translate-x-1'
              }`}
            />
          </div>
        </div>
      )}
    </motion.button>
  );
}
