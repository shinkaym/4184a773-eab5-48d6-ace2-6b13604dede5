import { motion } from 'framer-motion';
import { Calendar, User, Scissors, Clock, DollarSign, Briefcase } from 'lucide-react';
import { services, staffMembers } from '../../data/bookingData';

interface Step6ReviewProps {
  selectedDate: Date;
  bookingType: 'unassigned' | 'scheduled' | null;
  selectedEmployee: string | null;
  selectedServices: string[];
  selectedTime: string | null;
}

export function Step6Review({
  selectedDate,
  bookingType,
  selectedEmployee,
  selectedServices,
  selectedTime,
}: Step6ReviewProps) {
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
          <Briefcase className="w-8 h-8 text-nature-primary" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-nature-text-primary mb-4">
          Review Your Booking
        </h2>
        <p className="text-nature-text-secondary text-lg font-light">
          Please review your appointment details before confirming
        </p>
      </div>

      {/* Review Card */}
      <div className="bg-white rounded-softer p-8 md:p-12 shadow-soft-xl border border-nature-divider">
        <div className="space-y-8">
          {/* Date & Time */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start gap-5"
          >
            <div className="w-14 h-14 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-7 h-7 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">DATE & TIME</div>
              <h3 className="font-semibold text-lg mb-1">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
              </h3>
              <p className="text-sm text-nature-text-secondary font-light">
                {selectedTime} - {selectedTime && calculateEndTime(selectedTime, totalDuration)}
              </p>
            </div>
          </motion.div>

          {/* Booking Type */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="flex items-start gap-5"
          >
            <div className="w-14 h-14 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-7 h-7 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">BOOKING TYPE</div>
              <h3 className="font-semibold text-lg">
                {bookingType === 'unassigned' ? 'Unassigned Booking' : 'Scheduled Booking'}
              </h3>
              <p className="text-sm text-nature-text-secondary font-light">
                {bookingType === 'unassigned'
                  ? 'First available staff member'
                  : 'Specific employee assignment'}
              </p>
            </div>
          </motion.div>

          {/* Employee */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-5"
          >
            <div className="w-14 h-14 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">EMPLOYEE</div>
              <h3 className="font-semibold text-lg">{employeeName}</h3>
              <p className="text-sm text-nature-text-secondary font-light">Service provider</p>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="flex items-start gap-5"
          >
            <div className="w-14 h-14 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <Scissors className="w-7 h-7 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-xs font-medium text-nature-text-tertiary tracking-wider mb-3">
                SELECTED SERVICES
              </div>
              <div className="space-y-3">
                {selectedServices.map((serviceId) => {
                  const service = services.find((s) => s.id === serviceId);
                  if (!service) return null;
                  return (
                    <div
                      key={serviceId}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-nature-primary/5 to-nature-secondary/5 rounded-soft border-l-4 border-nature-primary"
                    >
                      <div>
                        <div className="font-semibold text-base">{service.name}</div>
                        <div className="text-xs text-nature-text-secondary mt-1 font-light flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {service.duration} minutes
                          </span>
                        </div>
                      </div>
                      <div className="text-lg font-bold">${service.price}</div>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="mt-6 pt-6 border-t border-nature-divider flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">TOTAL</div>
                  <div className="text-sm text-nature-text-secondary font-light">
                    {totalDuration} minutes • {selectedServices.length} service
                    {selectedServices.length > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-nature-primary" />
                  <div className="text-3xl font-bold tracking-tight">{totalPrice}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Important Note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 bg-nature-surface/50 border border-nature-divider rounded-soft p-4 text-center"
      >
        <p className="text-xs text-nature-text-tertiary font-light">
          By clicking Finish, you confirm that all details are correct and agree to our cancellation policy.
        </p>
      </motion.div>
    </motion.div>
  );
}
