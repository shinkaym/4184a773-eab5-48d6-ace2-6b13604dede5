import { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';

const images = [
  'https://images.unsplash.com/photo-1612887390768-fb02affea7a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmFpbHN8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5haWxzfGVufDB8fDB8fHww', // Forest placeholder
  'https://images.unsplash.com/photo-1619607146034-5a05296c8f9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5haWxzfGVufDB8fDB8fHww', // Forest placeholder
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 1,
  }),
};

export function Carousel() {
  const [[page, direction], setPage] = useState([0, 0]);

  // We have to find the wrapped index related to the page
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const goTo = (newIndex: number) => {
    const newDirection = newIndex > imageIndex ? 1 : -1;
    setPage([newIndex, newDirection]);
  };

  return (
    <div className='relative w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 border-2 border-nature-text-primary/10 rounded-xl bg-nature-surface/50 backdrop-blur-sm shadow-sm'>
      {/* Main Image Area */}
      <div className='relative w-full aspect-square max-w-md bg-white rounded-lg overflow-hidden shadow-inner border border-nature-divider'>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: {
                type: 'tween',
                duration: 0.5,
                ease: 'easeInOut',
              },
              opacity: {
                duration: 0.5,
              },
            }}
            className='absolute inset-0 flex items-center justify-center bg-nature-bg/30'
          >
            {images[imageIndex] ? (
              <img src={images[imageIndex]} alt={`Slide ${imageIndex + 1}`} className='w-full h-full object-cover' />
            ) : (
              <div className='flex flex-col items-center text-nature-text-tertiary'>
                <ImageIcon size={64} className='mb-4 opacity-50' />
                <span className='tracking-widest text-sm font-medium'>Image Placeholder</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className='absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-nature-text-primary rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-nature-primary z-10'
          aria-label='Previous slide'
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => paginate(1)}
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
            onClick={() => goTo(idx)}
            className={`w-3 h-3 rounded-sm transition-all duration-300 ${
              idx === imageIndex ? 'bg-nature-primary scale-110' : 'bg-nature-surface hover:bg-nature-primary'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
