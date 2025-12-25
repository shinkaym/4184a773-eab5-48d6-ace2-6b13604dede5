import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface Step5TimeSelectionProps {
  selectedTime: string | null;
  onTimeChange: (time: string) => void;
  serviceDuration: number;
}

export function Step5TimeSelection({ selectedTime, onTimeChange, serviceDuration }: Step5TimeSelectionProps) {
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 19;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        const time = `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Store off hours (first and last slots)
  const storeOffTimes = ['09:00 AM', '09:15 AM', '06:30 PM', '06:45 PM'];

  // Employee off hours (some middle slots)
  const employeeOffTimes = ['12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '03:00 PM', '03:15 PM'];

  const timeToMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes =
      (period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours) * 60 + minutes;
    return totalMinutes;
  };

  const isTimeInRange = (timeSlot: string) => {
    if (!selectedTime) return false;
    const startMinutes = timeToMinutes(selectedTime);
    const currentMinutes = timeToMinutes(timeSlot);
    const endMinutes = startMinutes + serviceDuration;
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
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
          <Clock className="w-8 h-8 text-nature-primary" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-nature-text-primary mb-4">
          Select Your Time
        </h2>
        <p className="text-nature-text-secondary text-lg font-light">Choose your preferred appointment time</p>
      </div>

      {/* Time Grid */}
      <div className="bg-white rounded-softer border border-nature-divider p-8 shadow-soft-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-medium text-nature-text-tertiary tracking-wider">
            15-MIN INTERVALS • 9:00 AM - 7:00 PM
          </div>
          {selectedTime && (
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-nature-primary" />
                <span className="text-nature-text-tertiary font-medium">Start Time</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-nature-secondary" />
                <span className="text-nature-text-tertiary font-medium">Duration ({serviceDuration} min)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-nature-surface" />
                <span className="text-nature-text-tertiary font-medium">Unavailable</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-96 overflow-y-auto">
          {timeSlots.map((time, index) => {
            const isStartTime = time === selectedTime;
            const isInRange = isTimeInRange(time);
            const isStoreOff = storeOffTimes.includes(time);
            const isEmployeeOff = employeeOffTimes.includes(time);
            const isDisabled = isStoreOff || isEmployeeOff;

            return (
              <motion.button
                key={time}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                disabled={isDisabled}
                onClick={() => onTimeChange(time)}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                className={`
                  relative py-3 px-2 text-xs font-medium rounded-soft border transition-all
                  ${isStartTime ? 'bg-nature-primary text-white border-nature-primary shadow-soft z-10' : ''}
                  ${isInRange && !isStartTime ? 'bg-nature-secondary/20 text-nature-text-primary border-nature-secondary' : ''}
                  ${isDisabled ? 'bg-nature-surface/50 text-nature-text-tertiary/30 border-nature-divider/30 cursor-not-allowed' : ''}
                  ${!isStartTime && !isInRange && !isDisabled ? 'border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5' : ''}
                `}
              >
                {time}
                {isDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-px bg-nature-text-tertiary/30 rotate-45" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected Time Display */}
        {selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-nature-divider"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-nature-text-tertiary tracking-wider">SELECTED TIME</div>
              <div className="text-right">
                <div className="text-base font-semibold text-nature-text-primary">{selectedTime}</div>
                <div className="text-xs text-nature-text-secondary">
                  Duration: {serviceDuration} minutes • Ends at{' '}
                  {(() => {
                    const [time, period] = selectedTime.split(' ');
                    const [hours, minutes] = time.split(':').map(Number);
                    const totalMinutes =
                      (period === 'PM' && hours !== 12 ? hours + 12 : hours) * 60 + minutes + serviceDuration;
                    const endHours = Math.floor(totalMinutes / 60) % 24;
                    const endMinutes = totalMinutes % 60;
                    const endPeriod = endHours >= 12 ? 'PM' : 'AM';
                    const displayHours = endHours > 12 ? endHours - 12 : endHours === 0 ? 12 : endHours;
                    return `${displayHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')} ${endPeriod}`;
                  })()}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 bg-nature-surface/30 rounded-soft p-4 border border-nature-divider">
        <div className="text-xs font-medium text-nature-text-tertiary tracking-wider mb-3">AVAILABILITY LEGEND</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-nature-surface/50 border border-nature-divider/30 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-nature-text-tertiary/30 rotate-45" />
              </div>
            </div>
            <span className="text-nature-text-secondary">
              <span className="font-medium">Store Off Hours:</span> 9:00-9:30 AM, 6:30-7:00 PM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-nature-surface/50 border border-nature-divider/30 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-nature-text-tertiary/30 rotate-45" />
              </div>
            </div>
            <span className="text-nature-text-secondary">
              <span className="font-medium">Employee Break:</span> 12:00-1:00 PM, 3:00-3:30 PM
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
