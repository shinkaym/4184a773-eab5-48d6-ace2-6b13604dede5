import { motion } from 'framer-motion';
import { Check, Download, Calendar, User, Scissors, Clock, MapPin, Hash } from 'lucide-react';
import { services, staffMembers } from '../../data/bookingData';

interface Step7CompletionProps {
  selectedDate: Date;
  bookingType: 'unassigned' | 'scheduled' | null;
  selectedEmployee: string | null;
  selectedServices: string[];
  selectedTime: string | null;
  onDownloadTicket: () => void;
}

export function Step7Completion({
  selectedDate,
  bookingType,
  selectedEmployee,
  selectedServices,
  selectedTime,
  onDownloadTicket,
}: Step7CompletionProps) {
  const totalDuration = selectedServices.reduce((total, serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    return total + (service?.duration || 0);
  }, 0);

  const totalPrice = selectedServices.reduce((total, serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    return total + (service?.price || 0);
  }, 0);

  const employeeName = staffMembers.find((s) => s.id === selectedEmployee)?.name || 'Any Staff';

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

  const calculateEndTime = (startTime: string, duration: number) => {
    const [time, period] = startTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (period === 'PM' && hours !== 12 ? hours + 12 : hours) * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    const endPeriod = endHours >= 12 ? 'PM' : 'AM';
    const displayHours = endHours > 12 ? endHours - 12 : endHours === 0 ? 12 : endHours;
    return `${displayHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')} ${endPeriod}`;
  };

  const confirmationNumber = `BK-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, '0')}`;

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.2 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto flex flex-col items-center"
    >
      {/* Success Icon */}
      <motion.div
        variants={checkmarkVariants}
        initial="hidden"
        animate="visible"
        className="w-32 h-32 rounded-full border-4 border-nature-primary bg-nature-primary/5 flex items-center justify-center mb-8 shadow-soft-lg"
      >
        <Check className="w-16 h-16 text-nature-primary stroke-[3]" />
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-display font-semibold tracking-tight mb-4 text-nature-text-primary">
          Booking Confirmed!
        </h1>
        <p className="text-base text-nature-text-secondary font-light">
          Your appointment has been successfully scheduled
        </p>
      </motion.div>

      {/* Confirmation Ticket */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full bg-white rounded-softer p-10 shadow-soft-xl border border-nature-divider mb-8"
      >
        {/* Confirmation Number */}
        <div className="mb-8 pb-8 border-b border-nature-divider text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Hash className="w-5 h-5 text-nature-primary" />
            <div className="text-xs font-medium text-nature-text-tertiary tracking-wider">CONFIRMATION NUMBER</div>
          </div>
          <div className="text-3xl font-display font-bold tracking-tight text-nature-primary">
            {confirmationNumber}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date & Time */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">DATE & TIME</div>
              <div className="font-semibold text-base text-nature-text-primary">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
              </div>
              <div className="text-xs text-nature-text-secondary font-light">
                {selectedTime} - {selectedTime && calculateEndTime(selectedTime, totalDuration)}
              </div>
            </div>
          </div>

          {/* Employee */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">EMPLOYEE</div>
              <div className="font-semibold text-base text-nature-text-primary">{employeeName}</div>
              <div className="text-xs text-nature-text-secondary font-light">
                {bookingType === 'unassigned' ? 'Unassigned' : 'Scheduled'}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="flex items-start gap-4 md:col-span-2">
            <div className="w-12 h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <Scissors className="w-6 h-6 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-xs font-medium text-nature-text-tertiary tracking-wider mb-2">SERVICES</div>
              <div className="space-y-2">
                {selectedServices.map((serviceId) => {
                  const service = services.find((s) => s.id === serviceId);
                  if (!service) return null;
                  return (
                    <div key={serviceId} className="flex items-center justify-between">
                      <span className="font-semibold text-base text-nature-text-primary">{service.name}</span>
                      <div className="flex items-center gap-4 text-xs text-nature-text-secondary">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {service.duration} min
                        </span>
                        <span className="font-bold text-sm">${service.price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-nature-divider flex items-center justify-between">
                <div className="text-sm text-nature-text-secondary font-light">
                  Total Duration: {totalDuration} minutes
                </div>
                <div className="text-2xl font-bold text-nature-primary">${totalPrice}</div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4 md:col-span-2">
            <div className="w-12 h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">LOCATION</div>
              <div className="font-semibold text-base text-nature-text-primary">AICOMPOS Beauty Salon</div>
              <div className="text-xs text-nature-text-secondary font-light">
                123 Main Street, City, ST 12345
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Download Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onDownloadTicket}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full max-w-md bg-nature-primary text-white px-8 py-4 rounded-soft flex items-center justify-center gap-3 font-medium hover:bg-nature-primary/90 transition-all shadow-soft hover:shadow-soft-lg mb-6"
      >
        <Download className="w-5 h-5" />
        Download Ticket
      </motion.button>

      {/* Email Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full border-2 border-dashed border-nature-divider rounded-soft p-4 bg-nature-surface/30"
      >
        <p className="text-center text-sm text-nature-text-tertiary font-light">
          A confirmation email has been sent to your registered email address
        </p>
      </motion.div>
    </motion.div>
  );
}
