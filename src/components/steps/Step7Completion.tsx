import { motion } from 'framer-motion';
import { Check, Download, Calendar, User, Scissors, Clock, Phone } from 'lucide-react';
import { services } from '../../data/bookingData';
import {
  formatAppointmentDate,
  calculateTotalDuration,
  calculateTotalPrice,
  getEmployeeName,
} from '../../utils/bookingUtils';

interface Step7CompletionProps {
  customerName: string;
  customerPhone: string;
  selectedDate: Date;
  bookingType: 'unassigned' | 'scheduled' | null;
  selectedEmployee: string | null;
  selectedServices: string[];
  selectedTime: string | null;
  onDownloadTicket: () => void;
}

export function Step7Completion({
  customerName,
  customerPhone,
  selectedDate,
  bookingType,
  selectedEmployee,
  selectedServices,
  selectedTime,
  onDownloadTicket,
}: Step7CompletionProps) {
  const totalDuration = calculateTotalDuration(selectedServices);
  const totalPrice = calculateTotalPrice(selectedServices);
  const employeeName = getEmployeeName(selectedEmployee);

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
      className='w-full max-w-4xl mx-auto flex flex-col items-center'
    >
      {/* Success Icon */}
      <motion.div
        variants={checkmarkVariants}
        initial='hidden'
        animate='visible'
        className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 sm:border-4 border-nature-primary bg-nature-primary/5 flex items-center justify-center mb-6 sm:mb-8 shadow-soft-lg'
      >
        <Check className='w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-nature-primary stroke-[3]' />
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='text-center mb-8 sm:mb-12 px-4'
      >
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight mb-3 sm:mb-4 text-nature-text-primary'>
          Booking Confirmed!
        </h1>
        <p className='text-sm sm:text-base text-nature-text-secondary font-light'>
          Your appointment has been successfully scheduled
        </p>
      </motion.div>

      {/* Confirmation Ticket */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='w-full bg-white rounded-softer p-4 sm:p-6 md:p-8 lg:p-10 shadow-soft-xl border border-nature-divider mb-6 sm:mb-8'
      >
        {/* Details Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
          {/* Customer Name */}
          <div className='flex items-start gap-3 sm:gap-4'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
              <User className='w-5 h-5 sm:w-6 sm:h-6 text-nature-primary' />
            </div>
            <div className='flex-grow'>
              <div className='text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-1'>
                CUSTOMER
              </div>
              <div className='font-semibold text-sm sm:text-base text-nature-text-primary'>{customerName}</div>
            </div>
          </div>

          {/* Phone */}
          <div className='flex items-start gap-3 sm:gap-4'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
              <Phone className='w-5 h-5 sm:w-6 sm:h-6 text-nature-primary' />
            </div>
            <div className='flex-grow'>
              <div className='text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-1'>
                PHONE
              </div>
              <div className='font-semibold text-sm sm:text-base text-nature-text-primary'>{customerPhone}</div>
            </div>
          </div>

          {/* Appointment Date */}
          <div className='flex items-start gap-3 sm:gap-4 md:col-span-2'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
              <Calendar className='w-5 h-5 sm:w-6 sm:h-6 text-nature-primary' />
            </div>
            <div className='flex-grow'>
              <div className='text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-1'>
                APPOINTMENT DATE
              </div>
              <div className='font-semibold text-sm sm:text-base text-nature-text-primary'>
                {formatAppointmentDate(selectedDate)}
              </div>
              <div className='text-xs text-nature-text-secondary font-light'>Central Standard Time (CT)</div>
            </div>
          </div>

          {/* Time */}
          <div className='flex items-start gap-3 sm:gap-4'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
              <Clock className='w-5 h-5 sm:w-6 sm:h-6 text-nature-primary' />
            </div>
            <div className='flex-grow'>
              <div className='text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-1'>
                TIME
              </div>
              <div className='font-semibold text-sm sm:text-base text-nature-text-primary'>{selectedTime}</div>
            </div>
          </div>

          {/* Technician - Only show for scheduled bookings */}
          {bookingType === 'scheduled' && (
            <div className='flex items-start gap-3 sm:gap-4'>
              <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
                <User className='w-5 h-5 sm:w-6 sm:h-6 text-nature-primary' />
              </div>
              <div className='flex-grow'>
                <div className='text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-1'>
                  TECHNICIAN
                </div>
                <div className='font-semibold text-sm sm:text-base text-nature-text-primary'>{employeeName}</div>
                <div className='text-xs text-nature-text-secondary font-light'>Scheduled</div>
              </div>
            </div>
          )}

          {/* Services */}
          <div className='flex items-start gap-3 sm:gap-4 md:col-span-2'>
            <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
              <Scissors className='w-5 h-5 sm:w-6 sm:h-6 text-nature-primary' />
            </div>
            <div className='flex-grow'>
              <div className='text-[10px] sm:text-xs font-medium text-nature-text-tertiary tracking-wider mb-2'>
                SERVICES
              </div>
              <div className='space-y-2'>
                {selectedServices.map((serviceId) => {
                  const service = services.find((s) => s.id === serviceId);
                  if (!service) return null;
                  return (
                    <div
                      key={serviceId}
                      className='flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0'
                    >
                      <span className='font-semibold text-sm sm:text-base text-nature-text-primary'>
                        {service.name}
                      </span>
                      <div className='flex items-center gap-3 sm:gap-4 text-xs text-nature-text-secondary'>
                        <span className='flex items-center gap-1'>
                          <Clock className='w-3 h-3' />
                          {service.duration} min
                        </span>
                        <span className='font-bold text-sm'>${service.price}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='mt-4 pt-4 border-t border-nature-divider flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0'>
                <div className='text-xs sm:text-sm text-nature-text-secondary font-light'>
                  Total Duration: {totalDuration} minutes
                </div>
                <div className='text-xl sm:text-2xl font-bold text-nature-primary'>${totalPrice}</div>
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
        className='w-full max-w-md bg-nature-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-soft flex items-center justify-center gap-2 sm:gap-3 font-medium text-sm sm:text-base hover:bg-nature-primary/90 transition-all shadow-soft hover:shadow-soft-lg mb-4 sm:mb-6'
      >
        <Download className='w-4 h-4 sm:w-5 sm:h-5' />
        Download Ticket
      </motion.button>

      {/* Email Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className='w-full border-2 border-dashed border-nature-divider rounded-soft p-3 sm:p-4 bg-nature-surface/30'
      >
        <p className='text-center text-xs sm:text-sm text-nature-text-tertiary font-light'>
          A confirmation email has been sent to your registered email address
        </p>
      </motion.div>
    </motion.div>
  );
}
