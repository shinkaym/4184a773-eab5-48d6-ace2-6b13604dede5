import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BannerSlideshow } from '../components/BannerSlideshow';
import { NumberPad } from '../components/NumberPad';
import { Check, ArrowLeft, CheckCircle } from 'lucide-react';

type FormStep = 'phone' | 'details';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  phone?: string;
  consent?: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<FormStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    consent: false,
  });
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  const validatePhone = (phone: string): string | undefined => {
    if (phone.length !== 10) return 'Phone number must be 10 digits';
    if (!/^\d{10}$/.test(phone)) return 'Phone number must contain only digits';
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email) return undefined;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address';
    return undefined;
  };

  const validateDOB = (dob: Date | null): string | undefined => {
    if (!dob) return undefined;
    const today = new Date();
    const minAge = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    if (dob > today) return 'Date of birth cannot be in the future';
    if (dob < minAge) return 'Please enter a valid date of birth';
    return undefined;
  };

  const handleNumberClick = (num: string) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber(phoneNumber + num);
      setErrors({ ...errors, phone: undefined });
    }
  };

  const handleDelete = () => {
    setPhoneNumber(phoneNumber.slice(0, -1));
    setErrors({ ...errors, phone: undefined });
  };

  const handleBack = () => {
    setStep('phone');
    setErrors({});
  };

  const handleCheckIn = () => {
    const phoneError = validatePhone(phoneNumber);
    if (phoneError) {
      setErrors({ phone: phoneError });
      return;
    }
    setErrors({});
    setStep('details');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {
      lastName: !formData.lastName ? 'Last name is required' : undefined,
      email: validateEmail(formData.email),
      dob: validateDOB(dateOfBirth),
    };

    const hasErrors = Object.values(newErrors).some((error) => error !== undefined);
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setProgress(1);

    // Animate progress bar
    const duration = 1500;
    const interval = 20;
    const steps = duration / interval;
    const increment = 99 / steps;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, interval);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, duration));
      setProgress(100);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/booking');
      }, 2000);
    } catch (error) {
      clearInterval(progressInterval);
      setErrors({ email: 'An error occurred. Please try again.' });
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const getMaxDate = () => {
    return new Date();
  };

  const getMinDate = () => {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 120);
    return minDate;
  };

  const formatPhoneDisplay = (phone: string) => {
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  };

  return (
    <div className='min-h-screen w-full flex flex-col lg:flex-row'>
      {/* Left Panel - Larger - Hidden on mobile */}
      <div className='hidden lg:flex lg:flex-[3] relative overflow-hidden flex-col items-center justify-center px-8 bg-gradient-to-br from-nature-primary via-nature-secondary to-nature-primary/80'>
        {/* Banner Slideshow */}
        <BannerSlideshow />

        {/* Decorative Elements */}
        <div className='absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl' />
        <div className='absolute bottom-32 right-32 w-40 h-40 bg-white/10 rounded-full blur-3xl' />
      </div>

      {/* Right Panel - Smaller */}
      <div className='flex-1 lg:flex-[2] bg-white flex flex-col min-h-screen relative overflow-hidden'>
        {/* Progress Bar */}
        {isLoading && !showSuccess && (
          <div className='absolute top-0 left-0 right-0 h-1 bg-gray-200 z-50'>
            <motion.div
              className='h-full bg-green-500'
              initial={{ width: '1%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        )}
        <div className='flex-1 flex flex-col p-4 sm:p-8'>
          {/* Header */}
          <div className='relative text-center mb-6 sm:mb-8'>
            {step === 'details' && (
              <button
                type='button'
                onClick={handleBack}
                className='absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300'
                aria-label='Go back to phone number entry'
              >
                <ArrowLeft className='w-4 h-4' />
                <span className='text-sm font-medium'>Back</span>
              </button>
            )}
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-1'>Please Sign In!</h2>
          </div>

          {/* Content Area */}
          <div className='flex-1 flex flex-col justify-center overflow-y-auto overflow-x-hidden'>
            <AnimatePresence mode='wait'>
              {step === 'phone' ? (
                <motion.div
                  key='phone'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className='space-y-4 sm:space-y-6 px-2 sm:px-0'
                >
                  {/* Phone Input Label */}
                  <div className='text-center'>
                    <h3 className='text-base sm:text-lg font-semibold text-gray-700 mb-4'>Enter Your Phone #</h3>

                    {/* Phone Display */}
                    <div className='w-full max-w-sm mx-auto mb-4'>
                      <div
                        className={`pb-2 border-b-2 text-center transition-colors ${
                          errors.phone ? 'border-red-400' : 'border-gray-300'
                        }`}
                      >
                        <div
                          className='text-lg sm:text-xl font-semibold text-gray-800 tracking-wider min-h-[28px]'
                          aria-label='Phone number display'
                          aria-live='polite'
                        >
                          {phoneNumber ? (
                            formatPhoneDisplay(phoneNumber)
                          ) : (
                            <span className='text-gray-400 text-sm'>( _ _ _ ) _ _ _ - _ _ _ _</span>
                          )}
                        </div>
                      </div>
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className='text-red-600 text-xs sm:text-sm mt-2'
                          role='alert'
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Number Pad */}
                  <NumberPad onNumberClick={handleNumberClick} onDelete={handleDelete} />

                  {/* Check In Button */}
                  <div className='pt-4 sm:pt-6'>
                    <motion.button
                      whileHover={phoneNumber.length === 10 ? { scale: 1.02 } : {}}
                      whileTap={phoneNumber.length === 10 ? { scale: 0.98 } : {}}
                      onClick={handleCheckIn}
                      disabled={phoneNumber.length !== 10}
                      className={`w-full max-w-sm mx-auto block py-3 rounded-lg font-bold text-sm sm:text-base tracking-wider transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 ${
                        phoneNumber.length === 10
                          ? 'bg-orange-500 text-white hover:bg-orange-600 cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      aria-label='Check in with phone number'
                    >
                      CHECK IN
                    </motion.button>
                  </div>
                </motion.div>
              ) : showSuccess ? (
                <motion.div
                  key='success'
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className='text-center py-12'
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
                  >
                    <CheckCircle className='w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-4' />
                  </motion.div>
                  <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2'>Success!</h3>
                  <p className='text-sm sm:text-base text-gray-600'>Redirecting to booking...</p>
                </motion.div>
              ) : (
                <motion.form
                  key='details'
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className='space-y-3 sm:space-y-4 max-w-md mx-auto w-full px-2 sm:px-0'
                >
                  {/* First Name */}
                  <div>
                    <label htmlFor='firstName' className='block text-sm sm:text-base font-semibold text-gray-700 mb-2'>
                      First Name
                    </label>
                    <input
                      id='firstName'
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder='Enter your first name'
                      className={`w-full px-1 py-2.5 text-base border-b-2 focus:outline-none transition-colors bg-transparent ${
                        errors.firstName
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-300 focus:border-gray-600'
                      }`}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    />
                    {errors.firstName && (
                      <p id='firstName-error' className='text-red-600 text-sm mt-1' role='alert'>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor='lastName' className='block text-sm sm:text-base font-semibold text-gray-700 mb-2'>
                      Last Name <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='lastName'
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder='Enter your last name'
                      className={`w-full px-1 py-2.5 text-base border-b-2 focus:outline-none transition-colors bg-transparent ${
                        errors.lastName
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-300 focus:border-gray-600'
                      }`}
                      required
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    />
                    {errors.lastName && (
                      <p id='lastName-error' className='text-red-600 text-sm mt-1' role='alert'>
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Phone Number (read-only) */}
                  <div>
                    <label htmlFor='phone' className='block text-sm sm:text-base font-semibold text-gray-700 mb-2'>
                      Phone Number
                    </label>
                    <input
                      id='phone'
                      type='tel'
                      value={formatPhoneDisplay(phoneNumber)}
                      readOnly
                      className='w-full px-1 py-2.5 text-base border-b-2 border-gray-300 bg-transparent text-gray-600 cursor-not-allowed'
                      aria-label='Phone number (read-only)'
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor='email' className='block text-sm sm:text-base font-semibold text-gray-700 mb-2'>
                      Email
                    </label>
                    <input
                      id='email'
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='example@email.com'
                      className={`w-full px-1 py-2.5 text-base border-b-2 focus:outline-none transition-colors bg-transparent ${
                        errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-gray-600'
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id='email-error' className='text-red-600 text-sm mt-1' role='alert'>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label htmlFor='dob' className='block text-sm sm:text-base font-semibold text-gray-700 mb-2'>
                      Date of Birth
                    </label>
                    <DatePicker
                      selected={dateOfBirth}
                      onChange={(date: Date | null) => {
                        setDateOfBirth(date);
                        setErrors((prev) => ({ ...prev, dob: undefined }));
                      }}
                      maxDate={getMaxDate()}
                      minDate={getMinDate()}
                      dateFormat='MM/dd/yyyy'
                      placeholderText='Select date of birth'
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode='select'
                      className={`w-full px-1 py-2.5 sm:py-3 text-base sm:text-lg border-b-2 focus:outline-none transition-colors bg-transparent cursor-pointer ${
                        errors.dob ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-gray-600'
                      }`}
                      wrapperClassName='w-full'
                      calendarClassName='custom-datepicker'
                      aria-invalid={errors.dob ? 'true' : 'false'}
                      aria-describedby={errors.dob ? 'dob-error' : undefined}
                    />
                    {errors.dob && (
                      <p id='dob-error' className='text-red-600 text-sm mt-1' role='alert'>
                        {errors.dob}
                      </p>
                    )}
                  </div>

                  {/* Privacy Consent */}
                  <div className='pt-2'>
                    <label className='flex items-start gap-2 cursor-pointer group'>
                      <div className='relative flex-shrink-0 mt-0.5'>
                        <input
                          id='consent'
                          type='checkbox'
                          name='consent'
                          checked={formData.consent}
                          onChange={handleChange}
                          className='sr-only peer'
                          aria-invalid={!!errors.consent}
                          aria-describedby={errors.consent ? 'consent-error' : undefined}
                        />
                        <div
                          className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all peer-focus:ring-2 peer-focus:ring-gray-300 peer-focus:ring-offset-2 ${
                            formData.consent
                              ? 'bg-gray-800 border-gray-800'
                              : errors.consent
                              ? 'border-red-400'
                              : 'border-gray-300 group-hover:border-gray-400'
                          }`}
                        >
                          {formData.consent && <Check className='w-3 h-3 text-white' />}
                        </div>
                      </div>
                      <span className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                        By checking the box, you consent to receive messages sent by us. For more information, please
                        read our{' '}
                        <a
                          href='/privacy-policy'
                          className='text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p id='consent-error' className='text-red-600 text-sm mt-1 ml-7' role='alert'>
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  {/* Done Button */}
                  <div className='pt-4 sm:pt-6'>
                    <motion.button
                      type='submit'
                      disabled={isLoading}
                      whileHover={!isLoading ? { scale: 1.02 } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                      className={`w-full py-3 rounded-lg font-bold text-sm sm:text-base tracking-wider transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 ${
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {isLoading ? (
                        <span className='flex items-center justify-center gap-2'>
                          <svg
                            className='animate-spin h-5 w-5 text-white'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                          >
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                            ></circle>
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        'Done'
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
