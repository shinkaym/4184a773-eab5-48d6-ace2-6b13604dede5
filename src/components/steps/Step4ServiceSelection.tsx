import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Check, Clock, DollarSign } from 'lucide-react';
import { categories, services } from '../../data/bookingData';
import useEmblaCarousel from 'embla-carousel-react';

interface Step4ServiceSelectionProps {
  selectedServices: string[];
  onServicesChange: (services: string[]) => void;
}

export function Step4ServiceSelection({ selectedServices, onServicesChange }: Step4ServiceSelectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    slidesToScroll: 'auto',
  });

  const filteredServices =
    selectedCategory === 'all' ? services : services.filter((service) => service.category === selectedCategory);

  const totalDuration = selectedServices.reduce((total, serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    return total + (service?.duration || 0);
  }, 0);

  const totalPrice = selectedServices.reduce((total, serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    return total + (service?.price || 0);
  }, 0);

  const toggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      onServicesChange(selectedServices.filter((id) => id !== serviceId));
    } else {
      onServicesChange([...selectedServices, serviceId]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-soft bg-gradient-to-br from-nature-primary/20 to-nature-secondary/20 mb-6"
        >
          <Scissors className="w-8 h-8 text-nature-primary" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-nature-text-primary mb-4">
          Select Your Services
        </h2>
        <p className="text-nature-text-secondary text-lg font-light">
          Choose one or more services for your appointment
        </p>
      </div>

      {/* Summary Badge */}
      {selectedServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-nature-primary to-nature-secondary text-white px-8 py-4 rounded-soft shadow-soft-lg">
            <div className="flex items-center gap-2">
              <Scissors className="w-5 h-5" />
              <span className="font-semibold">{selectedServices.length} Selected</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">{totalDuration} min</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              <span className="font-semibold">${totalPrice}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <div className="text-xs font-medium text-nature-text-tertiary tracking-wider mb-4 text-center">CATEGORIES</div>
        <div className="relative -mx-6 px-6 -my-2 py-2">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-4 py-3 pb-4 cursor-grab active:cursor-grabbing select-none">
            {categories.map((category, index) => {
              const isSelected = selectedCategory === category.id;
              const categoryCount =
                category.id === 'all'
                  ? services.length
                  : services.filter((s) => s.category === category.id).length;

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex-shrink-0 px-8 py-4 rounded-softer border transition-all duration-150
                    font-semibold text-base flex items-center gap-4
                    ${
                      isSelected
                        ? 'bg-nature-primary text-white border-nature-primary shadow-soft-lg scale-105'
                        : 'bg-white text-nature-text-secondary border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5'
                    }
                  `}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-10 h-10 rounded-soft object-cover flex-shrink-0"
                  />
                  <span className="whitespace-nowrap">{category.name}</span>
                  <span className={`text-sm ${isSelected ? 'text-white/80' : 'text-nature-text-tertiary'}`}>
                    ({categoryCount})
                  </span>
                </motion.button>
              );
            })}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="border-2 border-dashed border-nature-divider rounded-softer p-12 text-center bg-nature-surface/30">
          <Scissors className="w-12 h-12 mx-auto mb-4 text-nature-text-tertiary" />
          <p className="text-nature-text-tertiary text-sm">No services found in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const isSelected = selectedServices.includes(service.id);

            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => toggleService(service.id)}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  group relative overflow-hidden rounded-softer border transition-all text-left
                  ${
                    isSelected
                      ? 'border-nature-primary bg-white shadow-soft-xl ring-4 ring-nature-primary/20'
                      : 'border-nature-divider hover:border-nature-primary bg-white hover:shadow-soft-lg'
                  }
                `}
              >
                {/* Service Image */}
                <div className="relative h-40 overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  <div
                    className={`absolute inset-0 transition-all ${
                      isSelected ? 'bg-nature-primary/20' : 'bg-gradient-to-t from-black/30 to-transparent'
                    }`}
                  />

                  {/* Checkmark */}
                  <div className="absolute top-3 right-3">
                    <div
                      className={`
                        w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all backdrop-blur-sm
                        ${isSelected ? 'bg-nature-primary border-nature-primary scale-110' : 'bg-white/90 border-white'}
                      `}
                    >
                      {isSelected && <Check className="w-5 h-5 text-white stroke-[3]" />}
                    </div>
                  </div>
                </div>

                {/* Service Info */}
                <div className="p-5">
                  <h3
                    className={`text-lg font-semibold tracking-tight mb-2 transition-colors ${
                      isSelected ? 'text-nature-primary' : 'text-nature-text-primary'
                    }`}
                  >
                    {service.name}
                  </h3>

                  {/* Duration and Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-nature-text-tertiary">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-medium tracking-wide">{service.duration} MIN</span>
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-nature-text-primary">${service.price}</div>
                  </div>

                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-nature-surface rounded-soft">
                    <span className="text-xs font-medium text-nature-text-tertiary uppercase">
                      {categories.find((c) => c.id === service.category)?.name.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Background decoration */}
                <div
                  className={`
                  absolute bottom-0 right-0 w-20 h-20 rounded-tl-full transition-all duration-500 origin-bottom-right
                  ${isSelected ? 'bg-nature-primary/10 scale-150' : 'bg-nature-accent/5 group-hover:scale-150'}
                `}
                />
              </motion.button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
