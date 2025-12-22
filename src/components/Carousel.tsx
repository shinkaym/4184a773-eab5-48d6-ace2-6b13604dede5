import { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const images = [
  '/image.png',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80', // Forest placeholder
];
export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };
  const swipe = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };
  return (
    <div className='relative w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 border-2 border-nature-text-primary/10 rounded-xl bg-nature-surface/50 backdrop-blur-sm shadow-sm'>
      {/* Main Image Area */}
      <div className='relative w-full aspect-square max-w-md bg-white rounded-lg overflow-hidden shadow-inner border border-nature-divider'>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
              },
              opacity: {
                duration: 0.2,
              },
            }}
            className='absolute inset-0 flex items-center justify-center bg-nature-bg/30'
          >
            {images[currentIndex] ? (
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='flex flex-col items-center text-nature-text-tertiary'>
                <ImageIcon size={64} className='mb-4 opacity-50' />
                <span className='uppercase tracking-widest text-sm font-medium'>Image Placeholder</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => swipe(-1)}
          className='absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-nature-text-primary rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-nature-primary z-10'
          aria-label='Previous slide'
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => swipe(1)}
          className='absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-nature-text-primary rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-nature-primary z-10'
          aria-label='Next slide'
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className='flex gap-3 mt-8'>
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`w-3 h-3 rounded-sm transition-all duration-300 ${
              idx === currentIndex ? 'bg-nature-text-primary scale-110' : 'bg-nature-divider hover:bg-nature-primary'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
