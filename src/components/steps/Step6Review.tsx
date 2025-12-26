import { motion } from 'framer-motion';
import { Calendar, User, Scissors, Clock, DollarSign, Phone } from 'lucide-react';
import { services } from '../../data/bookingData';
import { formatAppointmentDate, calculateTotalDuration, calculateTotalPrice, getEmployeeName } from '../../utils/bookingUtils';

interface Step6ReviewProps {
  customerName: string;
  customerPhone: string;
  selectedDate: Date;
  bookingType: 'unassigned' | 'scheduled' | null;
  selectedEmployee: string | null;
  selectedServices: string[];
  selectedTime: string | null;
}

export function Step6Review({
  customerName,
  customerPhone,
  selectedDate,
  bookingType,
  selectedEmployee,
  selectedServices,
  selectedTime,
}: Step6ReviewProps) {
  const totalDuration = calculateTotalDuration(selectedServices);
  const totalPrice = calculateTotalPrice(selectedServices);
  const employeeName = getEmployeeName(selectedEmployee);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-soft bg-gradient-to-br from-nature-primary/20 to-nature-secondary/20 mb-4 sm:mb-6"
        >
          <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-nature-primary" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-nature-text-primary mb-3 sm:mb-4 px-4">
          Review Your Booking
        </h2>
        <p className="text-nature-text-secondary text-base sm:text-lg font-light px-4">
          Please review your appointment details before confirming
        </p>
      </div>

      {/* Review Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full bg-white rounded-softer p-4 sm:p-6 md:p-8 lg:p-10 shadow-soft-xl border border-nature-divider"
      >
        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Customer Name */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">CUSTOMER</div>
              <div className="font-semibold text-sm sm:text-base text-nature-text-primary">{customerName}</div>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">PHONE</div>
              <div className="font-semibold text-sm sm:text-base text-nature-text-primary">{customerPhone}</div>
            </div>
          </div>

          {/* Appointment Date */}
          <div className="flex items-start gap-3 sm:gap-4 md:col-span-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">
                APPOINTMENT DATE
              </div>
              <div className="font-semibold text-sm sm:text-base text-nature-text-primary">{formatAppointmentDate(selectedDate)}</div>
              <div className="text-xs text-nature-text-secondary font-light">Central Standard Time (CT)</div>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">TIME</div>
              <div className="font-semibold text-sm sm:text-base text-nature-text-primary">{selectedTime}</div>
            </div>
          </div>

          {/* Technician - Only show for scheduled bookings */}
          {bookingType === 'scheduled' && (
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-nature-primary" />
              </div>
              <div className="flex-grow">
                <div className="text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-1">TECHNICIAN</div>
                <div className="font-semibold text-sm sm:text-base text-nature-text-primary">{employeeName}</div>
                <div className="text-xs text-nature-text-secondary font-light">Scheduled</div>
              </div>
            </div>
          )}

          {/* Services */}
          <div className="flex items-start gap-3 sm:gap-4 md:col-span-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0">
              <Scissors className="w-5 h-5 sm:w-6 sm:h-6 text-nature-primary" />
            </div>
            <div className="flex-grow">
              <div className="text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-2">SERVICES</div>
              <div className="space-y-2">
                {selectedServices.map((serviceId) => {
                  const service = services.find((s) => s.id === serviceId);
                  if (!service) return null;
                  return (
                    <div key={serviceId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                      <span className="font-semibold text-sm sm:text-base text-nature-text-primary">{service.name}</span>
                      <div className="flex items-center gap-3 sm:gap-4 text-xs text-nature-text-secondary">
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
              <div className="mt-4 pt-4 border-t border-nature-divider flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div className="text-xs sm:text-sm text-nature-text-secondary font-light">
                  Total Duration: {totalDuration} minutes
                </div>
                <div className="text-xl sm:text-2xl font-bold text-nature-primary">${totalPrice}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Important Note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-nature-surface/50 border border-nature-divider rounded-soft p-4 text-center"
      >
        <p className="text-xs text-nature-text-tertiary font-light">
          By clicking Finish, you confirm that all details are correct and agree to our cancellation policy.
        </p>
      </motion.div>
    </motion.div>
  );
}
