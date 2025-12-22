import React, { useState } from 'react';
import { User, Phone, Mail, Calendar, ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { findUserByPhone, getMissingFields, UserProfile } from '../data/mockUsers';

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    agreed: false,
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [foundUser, setFoundUser] = useState<UserProfile | null>(null);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ phone?: string; name?: string }>({});
  const dobInputRef = React.useRef<HTMLInputElement>(null);
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');

    // Format as (000) 000-0000
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 0) {
      return 'Phone number is required';
    }
    if (cleaned.length !== 10) {
      return 'Phone number must be 10 digits';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    let newValue = type === 'checkbox' ? checked : value;

    // Format phone number as user types
    if (name === 'phone' && typeof newValue === 'string') {
      newValue = formatPhoneNumber(newValue);
      // Clear phone error when user is typing
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }

    // Clear name error when user is typing
    if (name === 'name') {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Check for existing user when phone number changes
    if (name === 'phone' && typeof newValue === 'string') {
      const cleaned = newValue.replace(/\D/g, '');
      if (cleaned.length === 10) {
        const user = findUserByPhone(newValue);
        if (user) {
          setFoundUser(user);
          setMissingFields(getMissingFields(user));
          // Auto-fill existing data
          setFormData((prev) => ({
            ...prev,
            name: user.name,
            email: user.email || prev.email,
            dob: user.dob || prev.dob,
            agreed: user.agreed || prev.agreed,
          }));
        } else {
          setFoundUser(null);
          setMissingFields([]);
        }
      } else {
        setFoundUser(null);
        setMissingFields([]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: { phone?: string; name?: string } = {};

    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate('/booking');
  };
  const inputClasses = (fieldName: string) => {
    const hasError = fieldName === 'phone' ? errors.phone : fieldName === 'name' ? errors.name : false;
    return `
      w-full pl-10 pr-4 py-3 bg-white border-2 rounded-lg outline-none transition-all duration-200
      ${
        hasError
          ? 'border-red-500 hover:border-red-600'
          : focusedField === fieldName
          ? 'border-nature-primary shadow-[0_0_0_4px_rgba(125,142,225,0.1)]'
          : 'border-nature-divider hover:border-nature-primary/50'
      }
      text-nature-text-primary placeholder:text-nature-text-tertiary/50
    `;
  };
  const labelClasses = 'block text-xs font-bold tracking-wider text-nature-text-primary mb-2';
  return (
    <div className='w-full h-full flex flex-col justify-center p-8 md:p-12 bg-nature-surface rounded-xl shadow-xl border border-white/50 relative overflow-hidden'>
      {/* Decorative background element */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-nature-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none' />

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <h2 className='text-4xl font-bold text-nature-text-primary tracking-tight mb-10'>LOGIN</h2>

        <form className='space-y-6' onSubmit={handleSubmit}>
          {/* Phone Field - Moved to top */}
          <div className='space-y-1'>
            <label htmlFor='phone' className={labelClasses}>
              Phone Number <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <Phone
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  errors.phone
                    ? 'text-red-500'
                    : focusedField === 'phone'
                    ? 'text-nature-primary'
                    : 'text-nature-text-tertiary'
                }`}
              />
              <input
                type='tel'
                id='phone'
                name='phone'
                placeholder='(000) 000-0000'
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('phone')}
                required
              />
            </div>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-xs text-red-500 mt-1 font-medium'
              >
                {errors.phone}
              </motion.p>
            )}
          </div>

          {/* Name Field */}
          <div className='space-y-1'>
            <label htmlFor='name' className={labelClasses}>
              Full Name <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <User
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  errors.name
                    ? 'text-red-500'
                    : focusedField === 'name'
                    ? 'text-nature-primary'
                    : 'text-nature-text-tertiary'
                }`}
              />
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Full name'
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('name')}
                readOnly={!!foundUser}
                required
              />
            </div>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-xs text-red-500 mt-1 font-medium'
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* User Found Notification */}
          <AnimatePresence>
            {foundUser && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className='bg-gradient-to-r from-nature-primary/10 to-nature-accent/10 border-2 border-nature-primary/30 rounded-lg p-4'
              >
                <div className='flex items-center gap-3'>
                  <div className='bg-nature-primary/20 p-2 rounded-full'>
                    <Sparkles className='w-5 h-5 text-nature-primary' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-bold text-nature-primary'>Welcome back!</p>
                    <p className='text-lg font-bold text-nature-text-primary'>{foundUser.name}</p>
                  </div>
                </div>
                {missingFields.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.2 }}
                    className='mt-4 pt-4 border-t border-nature-primary/20'
                  >
                    <p className='text-xs font-bold text-nature-accent mb-2'>Please complete the following:</p>
                    <ul className='space-y-1'>
                      {missingFields.includes('email') && (
                        <li className='text-xs text-nature-text-secondary flex items-center gap-2'>
                          <span className='w-1.5 h-1.5 rounded-full bg-nature-accent'></span>
                          Email address
                        </li>
                      )}
                      {missingFields.includes('dob') && (
                        <li className='text-xs text-nature-text-secondary flex items-center gap-2'>
                          <span className='w-1.5 h-1.5 rounded-full bg-nature-accent'></span>
                          Date of birth
                        </li>
                      )}
                      {missingFields.includes('agreed') && (
                        <li className='text-xs text-nature-text-secondary flex items-center gap-2'>
                          <span className='w-1.5 h-1.5 rounded-full bg-nature-accent'></span>
                          Privacy Policy acceptance
                        </li>
                      )}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progressive Profiling Section */}
          {(!foundUser || (foundUser && missingFields.length > 0)) && (
            <>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Email Field */}
                {(!foundUser || missingFields.includes('email')) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className='space-y-1'
                  >
                    <label htmlFor='email' className={labelClasses}>
                      Email
                    </label>
                    <div className='relative'>
                      <Mail
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                          focusedField === 'email' || missingFields.includes('email')
                            ? 'text-nature-primary'
                            : 'text-nature-text-tertiary'
                        }`}
                      />
                      <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='name@example.com'
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={inputClasses('email')}
                      />
                    </div>
                  </motion.div>
                )}

                {/* DOB Field */}
                {(!foundUser || missingFields.includes('dob')) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className='space-y-1'
                  >
                    <label htmlFor='dob' className={labelClasses}>
                      Date of Birth
                    </label>
                    <div className='relative'>
                      <Calendar
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                          focusedField === 'dob' || missingFields.includes('dob')
                            ? 'text-nature-primary'
                            : 'text-nature-text-tertiary'
                        }`}
                      />
                      <input
                        ref={dobInputRef}
                        type='date'
                        id='dob'
                        name='dob'
                        value={formData.dob}
                        onChange={handleChange}
                        onClick={() => dobInputRef.current?.showPicker()}
                        onFocus={() => setFocusedField('dob')}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputClasses(
                          'dob'
                        )} [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer`}
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Privacy Checkbox */}
              {(!foundUser || missingFields.includes('agreed')) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className='pt-2'
                >
                  <label className='flex items-center gap-3 cursor-pointer group'>
                    <div
                      className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
                        formData.agreed
                          ? 'bg-nature-primary border-nature-primary'
                          : 'border-nature-text-primary group-hover:border-nature-primary'
                      }`}
                    >
                      {formData.agreed && <Check className='w-4 h-4 text-white' />}
                    </div>
                    <input
                      type='checkbox'
                      name='agreed'
                      checked={formData.agreed}
                      onChange={handleChange}
                      className='hidden'
                    />
                    <span className='text-sm text-nature-text-secondary font-medium group-hover:text-nature-text-primary transition-colors'>
                      I agree to the{' '}
                      <span className='underline decoration-nature-primary decoration-2 underline-offset-2 text-nature-primary'>
                        Privacy Policy
                      </span>
                    </span>
                  </label>
                </motion.div>
              )}
            </>
          )}

          {/* Submit Button */}
          <motion.button
            type='submit'
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className='w-full bg-nature-text-primary text-white h-14 rounded-lg flex items-center justify-between px-6 mt-8 group shadow-lg hover:shadow-xl transition-all'
          >
            <span className='font-bold tracking-widest'>Next Step</span>
            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
