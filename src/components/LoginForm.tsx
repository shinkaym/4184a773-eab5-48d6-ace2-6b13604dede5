import React, { useState } from 'react';
import { User, Phone, Mail, Calendar, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
  const dobInputRef = React.useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/booking');
  };
  const inputClasses = (fieldName: string) => `
    w-full pl-10 pr-4 py-3 bg-white border-2 rounded-lg outline-none transition-all duration-200
    ${
      focusedField === fieldName
        ? 'border-nature-primary shadow-[0_0_0_4px_rgba(125,142,225,0.1)]'
        : 'border-nature-divider hover:border-nature-primary/50'
    }
    text-nature-text-primary placeholder:text-nature-text-tertiary/50
  `;
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
          {/* Name Field */}
          <div className='space-y-1'>
            <label htmlFor='name' className={labelClasses}>
              Full Name
            </label>
            <div className='relative'>
              <User
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedField === 'name' ? 'text-nature-primary' : 'text-nature-text-tertiary'
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
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className='space-y-1'>
            <label htmlFor='phone' className={labelClasses}>
              Phone Number
            </label>
            <div className='relative'>
              <Phone
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedField === 'phone' ? 'text-nature-primary' : 'text-nature-text-tertiary'
                }`}
              />
              <input
                type='tel'
                id='phone'
                name='phone'
                placeholder='(555) 000-0000'
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('phone')}
              />
            </div>
          </div>

          {/* Progressive Profiling Separator */}
          <div className='flex items-center gap-4 py-2 opacity-60'>
            <span className='text-[10px] font-mono tracking-widest text-nature-text-tertiary whitespace-nowrap'>
              [ PROGRESSIVE PROFILING ]
            </span>
            <div className='h-px bg-nature-divider flex-grow'></div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Email Field */}
            <div className='space-y-1'>
              <label htmlFor='email' className={labelClasses}>
                Email
              </label>
              <div className='relative'>
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'email' ? 'text-nature-primary' : 'text-nature-text-tertiary'
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
            </div>

            {/* DOB Field */}
            <div className='space-y-1'>
              <label htmlFor='dob' className={labelClasses}>
                Date of Birth
              </label>
              <div className='relative'>
                <Calendar
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'dob' ? 'text-nature-primary' : 'text-nature-text-tertiary'
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
            </div>
          </div>

          {/* Privacy Checkbox */}
          <div className='pt-2'>
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
          </div>

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
