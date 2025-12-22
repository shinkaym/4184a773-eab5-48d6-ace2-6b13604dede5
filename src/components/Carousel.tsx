import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const images = [
  'https://images.unsplash.com/photo-1612887390768-fb02affea7a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmFpbHN8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5haWxzfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1619607146034-5a05296c8f9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5haWxzfGVufDB8fDB8fHww',
];

export function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className='relative w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 border-2 border-nature-text-primary/10 rounded-xl bg-nature-surface/50 backdrop-blur-sm shadow-sm'>
      {/* Main Image Area */}
      <div className='relative w-full aspect-square max-w-md bg-white rounded-lg overflow-hidden shadow-inner border border-nature-divider'>
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex'>
            {images.map((image, index) => (
              <div key={index} className='flex-[0_0_100%] min-w-0'>
                <div className='relative w-full h-full aspect-square flex items-center justify-center bg-nature-bg/30'>
                  {image ? (
                    <img src={image} alt={`Slide ${index + 1}`} className='w-full h-full object-cover' />
                  ) : (
                    <div className='flex flex-col items-center text-nature-text-tertiary'>
                      <ImageIcon size={64} className='mb-4 opacity-50' />
                      <span className='tracking-widest text-sm font-medium'>Image Placeholder</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className='absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-nature-text-primary rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-nature-primary z-10'
          aria-label='Previous slide'
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollNext}
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
            onClick={() => scrollTo(idx)}
            className={`w-3 h-3 rounded-sm transition-all duration-300 ${
              idx === selectedIndex ? 'bg-nature-primary scale-110' : 'bg-nature-surface hover:bg-nature-primary'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
