import { useState } from 'react';
import { Calendar, Phone, User, LogOut, Scissors, ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaffCard } from '../components/StaffCard';
interface AppointmentPageProps {
  onNext?: () => void;
  onBack?: () => void;
}
export function AppointmentPage({ onNext }: AppointmentPageProps) {
  const [selectedStaff, setSelectedStaff] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [selectedTime, setSelectedTime] = useState<string>('09:30 AM');
  const [searchQuery, setSearchQuery] = useState('');
  const staffMembers = [
    {
      id: 'any',
      name: 'Any Staff',
      role: 'Earliest',
      image: '',
    },
    {
      id: 'sarah',
      name: 'Sarah M.',
      role: 'Stylist',
      image: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 'mike',
      name: 'Mike R.',
      role: 'Senior',
      image: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 'jenny',
      name: 'Jenny K.',
      role: 'Colorist',
      image: 'https://i.pravatar.cc/150?img=5',
    },
  ];
  const morningTimes = ['09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM', '11:30 AM'];
  const afternoonTimes = ['01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM', '04:00 PM'];
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div className='min-h-screen w-full bg-nature-main flex flex-col font-sans text-nature-text-primary'>
      {/* Top Navigation */}
      <nav className='w-full border-b-2 border-nature-text-primary bg-white/80 backdrop-blur-sm px-6 py-4'>
        <div className='max-w-[1400px] mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-nature-text-primary' />
            <span className='font-black text-lg tracking-tight uppercase'>Store Name</span>
          </div>

          <div className='flex items-center gap-8'>
            <div className='hidden md:flex items-center gap-6 text-xs font-bold tracking-wider uppercase'>
              <a href='#' className='flex items-center gap-2 hover:text-nature-primary transition-colors'>
                <Calendar className='w-4 h-4' />
                Appointments
              </a>
              <a href='#' className='flex items-center gap-2 hover:text-nature-primary transition-colors'>
                <Phone className='w-4 h-4' />
                Contact
              </a>
            </div>

            <div className='flex items-center gap-4 pl-8 border-l-2 border-nature-text-primary'>
              <button className='flex items-center gap-2 px-4 py-2 border-2 border-nature-text-primary text-xs font-bold uppercase tracking-wider hover:bg-nature-surface transition-colors bg-white'>
                <User className='w-4 h-4' />
                John Wick
              </button>
              <button className='flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-nature-error transition-colors'>
                <LogOut className='w-4 h-4' />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner Area */}
      <div className='w-full bg-white/50 backdrop-blur-sm py-8 px-6 border-b-2 border-nature-text-primary'>
        <div className='max-w-[1400px] mx-auto h-32 border-2 border-dashed border-nature-text-primary/30 flex items-center justify-center bg-white/50'>
          <span className='font-mono text-nature-text-tertiary uppercase tracking-widest text-sm font-bold'>
            Banner Image Area
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className='flex-grow w-full max-w-[1400px] mx-auto p-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12'>
        {/* Left Sidebar - Steps */}
        <div className='lg:col-span-3 hidden lg:block'>
          <div className='sticky top-8 space-y-8'>
            {/* Step 1 - Current */}
            <div className='flex gap-4 relative'>
              <div className='absolute left-[15px] top-10 bottom-[-24px] w-[2px] bg-nature-divider/50 -z-10' />
              <div className='w-8 h-8 rounded-full border-2 border-nature-text-primary bg-nature-text-primary text-white flex items-center justify-center flex-shrink-0'>
                <span className='text-sm font-bold'>1</span>
              </div>
              <div className='pt-1 pb-8'>
                <div className='text-sm tracking-wide uppercase mb-1 text-nature-text-primary font-bold'>
                  Appointment
                </div>
                <div className='text-[10px] font-mono text-nature-text-tertiary uppercase tracking-wider'>
                  // Current Step
                </div>
              </div>
            </div>

            {/* Step 2 - Upcoming */}
            <div className='flex gap-4 relative'>
              <div className='absolute left-[15px] top-10 bottom-[-24px] w-[2px] bg-nature-divider/50 -z-10' />
              <div className='w-8 h-8 rounded-full border-2 border-nature-divider bg-transparent text-nature-text-tertiary flex items-center justify-center flex-shrink-0'>
                <span className='text-sm font-bold'>2</span>
              </div>
              <div className='pt-1 pb-8'>
                <div className='text-sm tracking-wide uppercase mb-1 text-nature-text-tertiary font-medium'>
                  Appointment Confirm
                </div>
              </div>
            </div>

            {/* Step 3 - Upcoming */}
            <div className='flex gap-4 relative'>
              <div className='w-8 h-8 rounded-full border-2 border-nature-divider bg-transparent text-nature-text-tertiary flex items-center justify-center flex-shrink-0'>
                <span className='text-sm font-bold'>3</span>
              </div>
              <div className='pt-1'>
                <div className='text-sm tracking-wide uppercase mb-1 text-nature-text-tertiary font-medium'>
                  Success
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='lg:col-span-9'>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='relative border-4 border-nature-text-primary p-8 md:p-12 bg-white shadow-xl'
          >
            <motion.h1
              variants={itemVariants}
              className='text-3xl md:text-4xl font-black tracking-tighter uppercase mb-12'
            >
              Select Appointment
            </motion.h1>

            {/* Client Info Section */}
            <motion.div
              variants={itemVariants}
              className='mb-10 p-4 bg-nature-surface/30 border-l-4 border-nature-primary'
            >
              <div className='flex items-center gap-4'>
                <div className='w-12 h-12 rounded-full bg-nature-primary/20 flex items-center justify-center'>
                  <User className='w-6 h-6 text-nature-primary' />
                </div>
                <div className='flex-grow'>
                  <div className='text-[10px] font-mono text-nature-text-tertiary uppercase tracking-wider mb-1 font-bold'>
                    Client
                  </div>
                  <div className='font-bold text-lg'>John Doe</div>
                </div>
                <div className='text-right text-sm font-mono text-nature-text-secondary'>
                  <div>ID: #83920</div>
                  <div>(555) 123-4567</div>
                </div>
              </div>
            </motion.div>

            {/* Select Professional Section */}
            <motion.div variants={itemVariants} className='mb-10'>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-3'>
                  <Scissors className='w-5 h-5' />
                  <h2 className='text-xl font-black uppercase tracking-tight'>Select Professional</h2>
                </div>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nature-text-tertiary' />
                  <input
                    type='text'
                    placeholder='Search staff...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='pl-10 pr-4 py-2 border-2 border-nature-divider rounded-lg text-sm focus:border-nature-primary focus:outline-none transition-colors'
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {staffMembers.map((staff) => (
                  <StaffCard
                    key={staff.id}
                    name={staff.name}
                    role={staff.role}
                    image={staff.image}
                    isAnyStaff={staff.id === 'any'}
                    isSelected={selectedStaff === staff.id}
                    onClick={() => setSelectedStaff(staff.id)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Select Date & Time Section */}
            <motion.div variants={itemVariants} className='grid md:grid-cols-2 gap-8 mb-10'>
              {/* Calendar */}
              <div>
                <div className='flex items-center gap-3 mb-6'>
                  <Calendar className='w-5 h-5' />
                  <h2 className='text-xl font-black uppercase tracking-tight'>Select Date</h2>
                </div>

                <div className='border-2 border-nature-divider rounded-lg p-6 bg-white'>
                  <div className='flex items-center justify-between mb-6'>
                    <button className='p-1 hover:bg-nature-surface rounded transition-colors'>
                      <ChevronLeft className='w-5 h-5' />
                    </button>
                    <span className='font-mono font-bold text-sm tracking-widest uppercase'>Jan 2024</span>
                    <button className='p-1 hover:bg-nature-surface rounded transition-colors'>
                      <ChevronRight className='w-5 h-5' />
                    </button>
                  </div>

                  <div className='grid grid-cols-7 gap-2'>
                    {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
                      <div
                        key={day}
                        className='text-center text-[10px] font-mono text-nature-text-tertiary uppercase font-bold'
                      >
                        {day}
                      </div>
                    ))}

                    {[...Array(31)].map((_, i) => {
                      const date = i + 1;
                      const isSelected = date === selectedDate;
                      const isDisabled = date === 11;
                      return (
                        <button
                          key={i}
                          disabled={isDisabled}
                          onClick={() => setSelectedDate(date)}
                          className={`
                            aspect-square text-sm flex items-center justify-center rounded transition-all
                            ${isSelected ? 'bg-nature-text-primary text-white font-bold' : ''}
                            ${isDisabled ? 'text-nature-text-tertiary/30 line-through cursor-not-allowed' : ''}
                            ${!isSelected && !isDisabled ? 'hover:bg-nature-surface' : ''}
                          `}
                        >
                          {date}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Available Times */}
              <div>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-black uppercase tracking-tight flex items-center gap-3'>
                    <span className='w-5 h-5 rounded-full border-2 border-nature-text-primary flex items-center justify-center'>
                      <span className='w-2 h-2 bg-nature-text-primary rounded-full'></span>
                    </span>
                    Available Times
                  </h2>
                  <span className='text-xs font-mono text-nature-text-tertiary uppercase tracking-wider'>Jan 15</span>
                </div>

                <div className='space-y-6'>
                  {/* Morning */}
                  <div>
                    <div className='text-[10px] font-mono text-nature-text-tertiary uppercase tracking-widest mb-3 font-bold'>
                      Morning
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                      {morningTimes.map((time) => {
                        const isSelected = time === selectedTime;
                        const isDisabled = time === '11:00 AM';
                        return (
                          <button
                            key={time}
                            disabled={isDisabled}
                            onClick={() => setSelectedTime(time)}
                            className={`
                              py-3 px-2 text-xs font-mono border-2 rounded transition-all
                              ${
                                isSelected
                                  ? 'bg-nature-text-primary text-white border-nature-text-primary font-bold'
                                  : ''
                              }
                              ${
                                isDisabled
                                  ? 'bg-nature-surface/50 text-nature-text-tertiary/30 border-nature-divider/30 cursor-not-allowed line-through'
                                  : ''
                              }
                              ${
                                !isSelected && !isDisabled
                                  ? 'border-nature-divider hover:border-nature-text-primary hover:bg-nature-surface'
                                  : ''
                              }
                            `}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Afternoon */}
                  <div>
                    <div className='text-[10px] font-mono text-nature-text-tertiary uppercase tracking-widest mb-3 font-bold'>
                      Afternoon
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                      {afternoonTimes.map((time) => {
                        const isSelected = time === selectedTime;
                        return (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`
                              py-3 px-2 text-xs font-mono border-2 rounded transition-all
                              ${
                                isSelected
                                  ? 'bg-nature-text-primary text-white border-nature-text-primary font-bold'
                                  : 'border-nature-divider hover:border-nature-text-primary hover:bg-nature-surface'
                              }
                            `}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Divider */}
            <div className='w-full h-px bg-nature-text-primary mb-8' />

            {/* Next Button */}
            <motion.div variants={itemVariants} className='flex justify-end'>
              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={onNext}
                className='bg-nature-text-primary text-white px-8 py-4 flex items-center gap-3 font-bold uppercase tracking-widest hover:bg-nature-text-secondary transition-colors shadow-lg'
              >
                Next Step
                <ArrowRight className='w-5 h-5' />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer Metadata */}
      <footer className='w-full border-t-2 border-nature-text-primary py-8 px-6 mt-auto bg-white/80 backdrop-blur-sm'>
        <div className='max-w-[1400px] mx-auto flex justify-between items-center text-[10px] font-mono text-nature-text-tertiary uppercase tracking-widest font-bold opacity-70'>
          <div>Copyright © 2024 Store Name</div>
        </div>
      </footer>
    </div>
  );
}
