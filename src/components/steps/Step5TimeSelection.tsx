import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, X } from 'lucide-react';

interface Step5TimeSelectionProps {
  selectedTime: string | null;
  onTimeChange: (time: string) => void;
  serviceDuration: number;
}

export function Step5TimeSelection({ selectedTime, onTimeChange, serviceDuration }: Step5TimeSelectionProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [conflictMessage, setConflictMessage] = useState('');

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

  const minutesToTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const checkTimeConflict = (startTime: string): { hasConflict: boolean; message: string } => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = startMinutes + serviceDuration;

    // Check all time slots that would be covered by this service
    for (let currentMinutes = startMinutes; currentMinutes < endMinutes; currentMinutes += 15) {
      const currentTime = minutesToTime(currentMinutes);

      if (storeOffTimes.includes(currentTime)) {
        return {
          hasConflict: true,
          message: `The service would run during store off hours (${currentTime}). Please select a different time.`,
        };
      }

      if (employeeOffTimes.includes(currentTime)) {
        return {
          hasConflict: true,
          message: `The service would run during employee break time (${currentTime}). Please select a different time.`,
        };
      }
    }

    return { hasConflict: false, message: '' };
  };

  const handleTimeClick = (time: string) => {
    // Skip if already disabled
    if (storeOffTimes.includes(time) || employeeOffTimes.includes(time)) {
      return;
    }

    const conflict = checkTimeConflict(time);
    if (conflict.hasConflict) {
      // Calculate end time for better context
      const startMinutes = timeToMinutes(time);
      const endMinutes = startMinutes + serviceDuration;
      const endTime = minutesToTime(endMinutes);

      const enhancedMessage = `Your selected service has a duration of ${serviceDuration} minutes (${time} - ${endTime}).\n\n${conflict.message}`;
      setConflictMessage(enhancedMessage);
      setShowDialog(true);
    } else {
      onTimeChange(time);
    }
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
      <div className="text-center mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-soft bg-gradient-to-br from-nature-primary/20 to-nature-secondary/20 mb-4 sm:mb-6"
        >
          <Clock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-nature-primary" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-nature-text-primary mb-3 sm:mb-4 px-4">
          Select Your Time
        </h2>
        <p className="text-nature-text-secondary text-base sm:text-lg font-light px-4">Choose your preferred appointment time</p>
      </div>

      {/* Time Grid */}
      <div className="bg-white rounded-softer border border-nature-divider p-4 sm:p-6 md:p-8 shadow-soft-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <div className="text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">STORE TIME</div>
            <div className="text-xs sm:text-sm font-semibold text-nature-text-primary">Thursday, December 25th 2025, 01:47 AM</div>
            <div className="text-xs text-nature-text-secondary mt-0.5">Central Standard Time (CT)</div>
          </div>
          {selectedTime && (
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-nature-primary" />
                <span className="text-nature-text-tertiary font-medium">Start</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-nature-secondary" />
                <span className="text-nature-text-tertiary font-medium">Duration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-nature-surface" />
                <span className="text-nature-text-tertiary font-medium">N/A</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 max-h-96 overflow-y-auto p-1">
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
                onClick={() => handleTimeClick(time)}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                className={`
                  relative py-2 sm:py-3 px-1.5 sm:px-2 text-[10px] sm:text-xs font-medium rounded-soft border transition-all
                  ${isStartTime ? 'bg-nature-primary text-white border-nature-primary shadow-soft z-10' : ''}
                  ${isInRange && !isStartTime ? 'bg-nature-secondary/20 text-nature-text-primary border-nature-secondary' : ''}
                  ${isDisabled ? 'bg-nature-surface/50 text-nature-text-tertiary/30 border-nature-divider/30 cursor-not-allowed opacity-40' : ''}
                  ${!isStartTime && !isInRange && !isDisabled ? 'border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5' : ''}
                `}
              >
                {time}
              </motion.button>
            );
          })}
        </div>

        {/* Selected Time Display */}
        {selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-nature-divider"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              <div className="text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider">SELECTED TIME</div>
              <div className="text-left sm:text-right">
                <div className="text-sm sm:text-base font-semibold text-nature-text-primary">{selectedTime}</div>
                <div className="text-xs text-nature-text-secondary">
                  Duration: {serviceDuration} min • Ends{' '}
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
      <div className="mt-4 sm:mt-6 bg-nature-surface/30 rounded-soft p-3 sm:p-4 border border-nature-divider">
        <div className="text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-2 sm:mb-3">AVAILABILITY LEGEND</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 text-xs">
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-nature-surface/50 border border-nature-divider/30 opacity-40 flex-shrink-0 mt-0.5" />
            <span className="text-nature-text-secondary text-[11px] sm:text-xs">
              <span className="font-medium">Store Off:</span> 9:00-9:30 AM, 6:30-7:00 PM
            </span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-nature-surface/50 border border-nature-divider/30 opacity-40 flex-shrink-0 mt-0.5" />
            <span className="text-nature-text-secondary text-[11px] sm:text-xs">
              <span className="font-medium">Employee Break:</span> 12:00-1:00 PM, 3:00-3:30 PM
            </span>
          </div>
        </div>
      </div>

      {/* Conflict Dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-softer shadow-soft-xl max-w-md w-full p-5 sm:p-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowDialog(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-nature-text-tertiary hover:text-nature-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-50 mb-3 sm:mb-4">
                <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-red-500" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-nature-text-primary mb-2">Time Conflict</h3>

              {/* Message */}
              <p className="text-sm sm:text-base text-nature-text-secondary mb-5 sm:mb-6 whitespace-pre-line">{conflictMessage}</p>

              {/* Action Button */}
              <button
                onClick={() => setShowDialog(false)}
                className="w-full bg-nature-primary text-white py-2.5 sm:py-3 rounded-soft font-semibold text-sm sm:text-base hover:bg-nature-primary/90 transition-colors"
              >
                Choose Another Time
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
