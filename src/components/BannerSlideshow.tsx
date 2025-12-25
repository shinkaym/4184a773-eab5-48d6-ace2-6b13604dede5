import { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import { Pause, Play } from 'lucide-react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1612887390768-fb02affea7a6?w=800&auto=format&fit=crop&q=80',
    alt: 'Relaxing spa treatment with natural stones',
  },
  {
    url: 'https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=800&auto=format&fit=crop&q=80',
    alt: 'Peaceful spa environment with candles',
  },
  {
    url: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&auto=format&fit=crop&q=80',
    alt: 'Luxury spa wellness experience',
  },
  {
    url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&auto=format&fit=crop&q=80',
    alt: 'Tranquil spa massage setting',
  },
];

export function BannerSlideshow() {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayPlugin.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, 'loading' | 'loaded' | 'error'>>(
    Object.fromEntries(images.map((_, idx) => [idx, 'loading']))
  );

  const handleImageLoad = useCallback((index: number) => {
    setImageLoadStates((prev) => ({ ...prev, [index]: 'loaded' }));
  }, []);

  const handleImageError = useCallback((index: number) => {
    setImageLoadStates((prev) => ({ ...prev, [index]: 'error' }));
  }, []);

  const toggleAutoplay = useCallback(() => {
    const autoplay = autoplayPlugin.current;
    if (!autoplay) return;

    if (isPlaying) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="w-[80%] mx-auto"
      role="region"
      aria-label="Spa services slideshow"
      aria-live="polite"
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <div className="relative aspect-[4/3] bg-gray-200">
                  {/* Loading State */}
                  {imageLoadStates[index] === 'loading' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    </div>
                  )}

                  {/* Error State */}
                  {imageLoadStates[index] === 'error' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500">
                      <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">Image unavailable</p>
                    </div>
                  )}

                  {/* Image */}
                  <img
                    src={image.url}
                    alt={image.alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoadStates[index] === 'loaded' ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Play/Pause Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={toggleAutoplay}
            className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Pause size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Play size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
                idx === selectedIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${idx + 1} of ${images.length}`}
              aria-current={idx === selectedIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
