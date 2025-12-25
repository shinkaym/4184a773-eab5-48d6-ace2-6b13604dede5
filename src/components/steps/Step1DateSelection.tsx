import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface Step1DateSelectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function Step1DateSelection({ selectedDate, onDateChange }: Step1DateSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState<number>(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(selectedDate.getFullYear());

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const updateMonth = (newMonth: number, newYear: number) => {
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handlePreviousMonth = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    updateMonth(newMonth, newYear);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    updateMonth(newMonth, newYear);
  };

  const handleFirstMonth = () => {
    updateMonth(0, currentYear);
  };

  const handleLastMonth = () => {
    updateMonth(11, currentYear);
  };

  const handleDateSelect = (date: number) => {
    const newDate = new Date(currentYear, currentMonth, date);
    onDateChange(newDate);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-soft bg-gradient-to-br from-nature-primary/20 to-nature-secondary/20 mb-6"
        >
          <Calendar className="w-8 h-8 text-nature-primary" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-nature-text-primary mb-4">
          Select Your Date
        </h2>
        <p className="text-nature-text-secondary text-lg font-light">Choose your preferred appointment date</p>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-softer border border-nature-divider p-8 shadow-soft-lg">
        {/* Quick Selection */}
        <div className="mb-6 flex flex-wrap gap-3 justify-center">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDateSelect(1)}
            className="px-4 py-2.5 rounded-soft border border-nature-divider bg-white hover:border-nature-primary hover:bg-nature-primary/5 transition-all text-xs font-medium tracking-wide"
          >
            START OF MONTH
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const today = new Date();
              setCurrentMonth(today.getMonth());
              setCurrentYear(today.getFullYear());
              onDateChange(today);
            }}
            className="px-4 py-2.5 rounded-soft border border-nature-primary bg-nature-primary/5 hover:bg-nature-primary/10 transition-all text-xs font-medium tracking-wide flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-nature-primary" />
            TODAY
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDateSelect(31)}
            className="px-4 py-2.5 rounded-soft border border-nature-divider bg-white hover:border-nature-primary hover:bg-nature-primary/5 transition-all text-xs font-medium tracking-wide"
          >
            END OF MONTH
          </motion.button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-nature-divider">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFirstMonth}
              className="p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all"
              title="First month of year"
            >
              <ChevronsLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePreviousMonth}
              className="p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all"
              title="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-2xl font-semibold tracking-wide text-nature-text-primary">
              {monthNames[currentMonth]} {currentYear}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNextMonth}
              className="p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all"
              title="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLastMonth}
              className="p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all"
              title="Last month of year"
            >
              <ChevronsRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
            <div key={day} className="text-center pb-3">
              <div className="text-xs font-medium text-nature-text-tertiary tracking-wider">{day}</div>
            </div>
          ))}

          {(() => {
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
            const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const calendarCells = [];
            const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
            const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
            const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

            // Previous month days
            for (let i = firstDayOfMonth - 1; i >= 0; i--) {
              const date = daysInPrevMonth - i;
              const cellDate = new Date(prevYear, prevMonth, date);
              cellDate.setHours(0, 0, 0, 0);
              const isDisabled = cellDate < today;

              calendarCells.push(
                <motion.button
                  key={`prev-${date}`}
                  disabled={isDisabled}
                  onClick={() => {
                    setCurrentMonth(prevMonth);
                    setCurrentYear(prevYear);
                    handleDateSelect(date);
                  }}
                  whileHover={!isDisabled ? { scale: 1.1 } : {}}
                  whileTap={!isDisabled ? { scale: 0.95 } : {}}
                  className={`
                    aspect-square text-sm font-medium flex items-center justify-center transition-all rounded-soft
                    ${
                      isDisabled
                        ? 'text-nature-text-tertiary/30 cursor-not-allowed bg-nature-surface/50'
                        : 'text-nature-text-tertiary/60 bg-nature-surface/30 hover:bg-nature-surface/50'
                    }
                  `}
                >
                  {date}
                </motion.button>
              );
            }

            // Current month days
            for (let date = 1; date <= daysInMonth; date++) {
              const cellDate = new Date(currentYear, currentMonth, date);
              cellDate.setHours(0, 0, 0, 0);
              const isDisabled = cellDate < today;
              const isSelected =
                selectedDate.getDate() === date &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear;
              const isToday = cellDate.getTime() === today.getTime();

              calendarCells.push(
                <motion.button
                  key={`current-${date}`}
                  disabled={isDisabled}
                  onClick={() => handleDateSelect(date)}
                  whileHover={!isDisabled ? { scale: 1.1 } : {}}
                  whileTap={!isDisabled ? { scale: 0.95 } : {}}
                  className={`
                    aspect-square text-sm font-medium flex items-center justify-center transition-all rounded-soft
                    ${isSelected ? 'bg-nature-primary text-white shadow-soft scale-105' : ''}
                    ${isDisabled ? 'text-nature-text-tertiary/30 cursor-not-allowed bg-nature-surface/50' : ''}
                    ${
                      !isSelected && !isDisabled
                        ? 'bg-white border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5'
                        : ''
                    }
                    ${isToday && !isSelected ? 'ring-2 ring-nature-secondary ring-offset-2' : ''}
                  `}
                >
                  {date}
                </motion.button>
              );
            }

            // Next month days
            const totalCells = calendarCells.length;
            const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
            for (let date = 1; date <= remainingCells; date++) {
              const cellDate = new Date(nextYear, nextMonth, date);
              cellDate.setHours(0, 0, 0, 0);
              const isDisabled = cellDate < today;

              calendarCells.push(
                <motion.button
                  key={`next-${date}`}
                  disabled={isDisabled}
                  onClick={() => {
                    setCurrentMonth(nextMonth);
                    setCurrentYear(nextYear);
                    handleDateSelect(date);
                  }}
                  whileHover={!isDisabled ? { scale: 1.1 } : {}}
                  whileTap={!isDisabled ? { scale: 0.95 } : {}}
                  className={`
                    aspect-square text-sm font-medium flex items-center justify-center transition-all rounded-soft
                    ${
                      isDisabled
                        ? 'text-nature-text-tertiary/30 cursor-not-allowed bg-nature-surface/50'
                        : 'text-nature-text-tertiary/60 bg-nature-surface/30 hover:bg-nature-surface/50'
                    }
                  `}
                >
                  {date}
                </motion.button>
              );
            }

            return calendarCells;
          })()}
        </div>

        {/* Selection Info */}
        <div className="mt-6 pt-6 border-t border-nature-divider">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-nature-text-tertiary tracking-wider">SELECTED DATE</div>
            <div className="text-right">
              <div className="text-base font-semibold text-nature-text-primary">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
              </div>
              <div className="text-xs text-nature-text-secondary">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][selectedDate.getDay()]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
