import { useState, useCallback } from 'react';
import {
  Calendar,
  Phone,
  User,
  LogOut,
  Scissors,
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowLeft,
  Check,
  Clock,
  MapPin,
  Download,
  Briefcase,
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { StaffCard } from '../components/StaffCard';
import { StepIndicator } from '../components/StepIndicator';
import logo from '../assets/images/logo.jpg';

export function BookingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Embla Carousel refs
  const [emblaStaffRef, emblaStaffApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });
  const [emblaCategoryRef, emblaCategoryApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  // Step 1 state
  const [selectedStaff, setSelectedStaff] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('09:30 AM');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth()); // 0 = January, 11 = December
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const staffMembers = [
    { id: 'any', name: 'Any Staff', image: '' },
    { id: 'sarah-1', name: 'Sarah M.', image: 'https://i.pravatar.cc/150?img=1' },
    { id: 'mike-1', name: 'Mike R.', image: 'https://i.pravatar.cc/150?img=3' },
    { id: 'jenny-1', name: 'Jenny K.', image: 'https://i.pravatar.cc/150?img=5' },
    { id: 'sarah-2', name: 'Sarah M.', image: 'https://i.pravatar.cc/150?img=1' },
    { id: 'mike-2', name: 'Mike R.', image: 'https://i.pravatar.cc/150?img=3' },
    { id: 'jenny-2', name: 'Jenny K.', image: 'https://i.pravatar.cc/150?img=5' },
  ];

  const categories = [
    {
      id: 'all',
      name: 'All Services',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop',
    },
    {
      id: 'nails',
      name: 'Nails',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=100&h=100&fit=crop',
    },
    {
      id: 'spa',
      name: 'Spa & Wellness',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=100&h=100&fit=crop',
    },
    {
      id: 'beauty',
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=100&h=100&fit=crop',
    },
  ];

  const services = [
    {
      id: 'manicure',
      name: 'Manicure',
      category: 'nails',
      duration: 30,
      price: 35,
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
    },
    {
      id: 'pedicure',
      name: 'Pedicure',
      category: 'nails',
      duration: 45,
      price: 45,
      image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=300&fit=crop',
    },
    {
      id: 'gel-polish',
      name: 'Gel Polish',
      category: 'nails',
      duration: 60,
      price: 55,
      image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&h=300&fit=crop',
    },
    {
      id: 'acrylic-nails',
      name: 'Acrylic Nails',
      category: 'nails',
      duration: 90,
      price: 75,
      image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=300&fit=crop',
    },
    {
      id: 'nail-art',
      name: 'Nail Art',
      category: 'beauty',
      duration: 30,
      price: 25,
      image: 'https://images.unsplash.com/photo-1599206676335-193c82b13c9e?w=400&h=300&fit=crop',
    },
    {
      id: 'spa-treatment',
      name: 'Spa Treatment',
      category: 'spa',
      duration: 60,
      price: 65,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop',
    },
  ];

  const filteredServices =
    selectedCategory === 'all' ? services : services.filter((service) => service.category === selectedCategory);

  const totalDuration = selectedServices.reduce((total, serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    return total + (service?.duration || 0);
  }, 0);

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
  const disabledTimeSlots = ['09:00 AM', '09:15 AM', '06:30 PM', '06:45 PM'];

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const timeToMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes =
      (period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours) * 60 + minutes;
    return totalMinutes;
  };

  const isTimeInRange = (timeSlot: string) => {
    if (!selectedTime) return false;
    const startMinutes = timeToMinutes(selectedTime);
    const currentMinutes = timeToMinutes(timeSlot);
    const endMinutes = startMinutes + totalDuration;
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const handleConfirm = () => {
    setCurrentStep(3);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleDownloadTicket = () => {
    console.log('Downloading ticket...');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handlePreviousMonth = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    // Reset selected date to first valid date of new month
    const today = new Date();
    if (newYear === today.getFullYear() && newMonth === today.getMonth()) {
      setSelectedDate(today.getDate());
    } else {
      setSelectedDate(1);
    }
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    // Reset selected date to first valid date of new month
    const today = new Date();
    if (newYear === today.getFullYear() && newMonth === today.getMonth()) {
      setSelectedDate(today.getDate());
    } else {
      setSelectedDate(1);
    }
  };

  const handleFirstMonth = () => {
    setCurrentMonth(0);

    // Reset selected date to first valid date
    const today = new Date();
    if (currentYear === today.getFullYear() && 0 === today.getMonth()) {
      setSelectedDate(today.getDate());
    } else {
      setSelectedDate(1);
    }
  };

  const handleLastMonth = () => {
    setCurrentMonth(11);

    // Reset selected date to first valid date
    const today = new Date();
    if (currentYear === today.getFullYear() && 11 === today.getMonth()) {
      setSelectedDate(today.getDate());
    } else {
      setSelectedDate(1);
    }
  };

  // Embla scroll handlers
  const scrollStaffPrev = useCallback(() => {
    if (emblaStaffApi) emblaStaffApi.scrollPrev();
  }, [emblaStaffApi]);

  const scrollStaffNext = useCallback(() => {
    if (emblaStaffApi) emblaStaffApi.scrollNext();
  }, [emblaStaffApi]);

  const scrollCategoryPrev = useCallback(() => {
    if (emblaCategoryApi) emblaCategoryApi.scrollPrev();
  }, [emblaCategoryApi]);

  const scrollCategoryNext = useCallback(() => {
    if (emblaCategoryApi) emblaCategoryApi.scrollNext();
  }, [emblaCategoryApi]);

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

  return (
    <div className='min-h-screen w-full bg-nature-main flex flex-col font-sans text-nature-text-primary'>
      {/* Hero Banner */}
      <div className='relative w-full h-[380px] md:h-[450px] overflow-hidden'>
        <div className='absolute inset-0'>
          <img
            src='https://picsum.photos/seed/nailsalon/1920/800'
            alt='Nail Salon Banner'
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70' />
        </div>

        {/* Navigation */}
        <nav className='relative z-10 w-full px-4 sm:px-6 py-4 sm:py-6'>
          <div className='max-w-[1400px] mx-auto flex justify-between items-center'>
            <div className='flex items-center gap-2 sm:gap-3'>
              {/* Hamburger Menu Button - Mobile/Tablet only */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className='lg:hidden p-2 rounded-soft bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all'
                aria-label='Toggle menu'
              >
                {mobileMenuOpen ? <X className='w-5 h-5 text-white' /> : <Menu className='w-5 h-5 text-white' />}
              </button>

              <img src={logo} alt='AICOMPOS Logo' className='h-8 sm:h-10 w-auto rounded-soft shadow-soft' />
              <span className='font-display text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-white drop-shadow-lg'>
                AICOM<span className='text-nature-primary'>POS</span>
              </span>
            </div>

            <div className='flex items-center gap-3 sm:gap-6 md:gap-8'>
              {/* Desktop Navigation Links */}
              <div className='hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium'>
                <a href='#' className='flex items-center gap-2 text-white/90 hover:text-white transition-colors'>
                  <Calendar className='w-4 h-4' />
                  Appointments
                </a>
                <a href='#' className='flex items-center gap-2 text-white/90 hover:text-white transition-colors'>
                  <Phone className='w-4 h-4' />
                  Contact
                </a>
              </div>

              <div className='flex items-center gap-2 sm:gap-3 md:gap-4 pl-3 sm:pl-4 md:pl-6 border-l border-white/30'>
                <button className='flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-soft bg-white/10 backdrop-blur-md text-xs sm:text-sm font-medium text-white hover:bg-white/20 transition-all'>
                  <User className='w-3 h-3 sm:w-4 sm:h-4' />
                  <span className='hidden sm:inline'>John Wick</span>
                  <span className='sm:hidden'>John</span>
                </button>
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-white/90 hover:text-nature-error transition-colors'
                >
                  <LogOut className='w-3 h-3 sm:w-4 sm:h-4' />
                  <span className='hidden md:inline'>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className='lg:hidden overflow-hidden'
              >
                <div className='mt-4 py-4 px-4 bg-white/10 backdrop-blur-md rounded-soft'>
                  <div className='flex flex-col gap-3'>
                    <a
                      href='#'
                      className='flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-soft transition-all'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Calendar className='w-5 h-5' />
                      <span className='font-medium'>Appointments</span>
                    </a>
                    <a
                      href='#'
                      className='flex items-center gap-3 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-soft transition-all'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Phone className='w-5 h-5' />
                      <span className='font-medium'>Contact</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Content */}
        <div className='relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 h-full flex flex-col justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='max-w-3xl'
          >
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-white mb-4 sm:mb-5 drop-shadow-lg leading-tight'>
              Professional
              <br />
              Beauty Services
            </h1>
            <p className='text-white/90 text-sm sm:text-base md:text-lg font-light max-w-2xl leading-relaxed'>
              Experience premium nail care and styling services with our expert team. Book your appointment in just a
              few simple steps.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-grow w-full max-w-[1400px] mx-auto p-4 sm:p-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12'>
        {/* Left Sidebar - Steps */}
        <div className='lg:col-span-3 hidden lg:block'>
          <div className='sticky top-8'>
            <div className='mb-12 bg-white/50 backdrop-blur-sm rounded-softer p-6 shadow-soft'>
              <StepIndicator
                number={1}
                title='Appointment'
                status={currentStep === 1 ? 'current' : currentStep > 1 ? 'completed' : 'upcoming'}
              />
              <StepIndicator
                number={2}
                title='Confirm Details'
                status={currentStep === 2 ? 'current' : currentStep > 2 ? 'completed' : 'upcoming'}
              />
              <StepIndicator number={3} title='Success' status={currentStep === 3 ? 'current' : 'upcoming'} isLast />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='lg:col-span-9'>
          <AnimatePresence mode='wait'>
            {/* Step 1: Appointment Selection */}
            {currentStep === 1 && (
              <motion.div
                key='step1'
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                exit={{ opacity: 0, y: -20 }}
                className='bg-white rounded-softer p-8 md:p-12 shadow-soft-lg'
              >
                <motion.h1
                  variants={itemVariants}
                  className='text-3xl md:text-4xl font-display font-semibold tracking-tight mb-8 md:mb-12'
                >
                  Select Appointment
                </motion.h1>

                {/* Client Info */}
                <motion.div
                  variants={itemVariants}
                  className='mb-10 p-4 sm:p-5 bg-gradient-to-br from-nature-primary/5 to-nature-secondary/5 rounded-soft border-l-4 border-nature-primary'
                >
                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4'>
                    <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-nature-primary/15 flex items-center justify-center flex-shrink-0'>
                      <User className='w-6 h-6 sm:w-7 sm:h-7 text-nature-primary' />
                    </div>
                    <div className='flex-grow'>
                      <div className='text-xs font-medium text-nature-text-tertiary tracking-wider mb-1'>CLIENT</div>
                      <div className='font-semibold text-lg sm:text-xl'>John Doe</div>
                    </div>
                    <div className='text-left sm:text-right text-sm text-nature-text-secondary font-light w-full sm:w-auto'>
                      <div>ID: #83920</div>
                      <div>(555) 123-4567</div>
                    </div>
                  </div>
                </motion.div>

                {/* Select Employee */}
                <motion.div variants={itemVariants} className='mb-10'>
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
                    <div className='flex items-center gap-3'>
                      <Scissors className='w-5 h-5 text-nature-primary' />
                      <h2 className='text-xl md:text-2xl font-display font-semibold tracking-tight'>Select Employee</h2>
                    </div>
                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                      <div className='relative flex-grow sm:flex-grow-0'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nature-text-tertiary' />
                        <input
                          type='text'
                          placeholder='Search staff...'
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className='w-full sm:w-auto pl-10 pr-4 py-2.5 border border-nature-divider rounded-soft text-sm focus:border-nature-primary focus:outline-none focus:ring-2 focus:ring-nature-primary/20 transition-all bg-white'
                        />
                      </div>
                      <div className='flex gap-1 sm:gap-2 justify-center sm:justify-start'>
                        <button
                          onClick={scrollStaffPrev}
                          className='p-1.5 sm:p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all'
                          aria-label='Previous staff'
                        >
                          <ChevronLeft className='w-4 h-4 sm:w-5 sm:h-5' />
                        </button>
                        <button
                          onClick={scrollStaffNext}
                          className='p-1.5 sm:p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all'
                          aria-label='Next staff'
                        >
                          <ChevronRight className='w-4 h-4 sm:w-5 sm:h-5' />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className='overflow-hidden py-2' ref={emblaStaffRef}>
                    <div className='flex gap-3 px-1'>
                      {staffMembers.map((staff) => (
                        <div key={staff.id} className='flex-[0_0_160px] min-w-0'>
                          <StaffCard
                            name={staff.name}
                            image={staff.image}
                            isAnyStaff={staff.id === 'any'}
                            isSelected={selectedStaff === staff.id}
                            onClick={() => setSelectedStaff(staff.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Select Date */}
                <motion.div variants={itemVariants} className='mb-10'>
                  <div className='flex items-center gap-3 mb-6'>
                    <Calendar className='w-5 h-5 text-nature-primary' />
                    <h2 className='text-xl md:text-2xl font-display font-semibold tracking-tight'>Select Date</h2>
                  </div>

                  <div className='relative rounded-softer border border-nature-divider p-4 sm:p-6 md:p-8 bg-gradient-to-br from-white to-nature-surface/30 max-w-2xl mx-auto shadow-soft'>
                    {/* Quick Selection */}
                    <div className='mb-6 flex flex-wrap gap-3'>
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={(() => {
                          const today = new Date();
                          const isStartDisabled =
                            currentYear < today.getFullYear()
                              ? true
                              : currentYear > today.getFullYear()
                              ? false
                              : currentMonth < today.getMonth()
                              ? true
                              : currentMonth > today.getMonth()
                              ? false
                              : 1 < today.getDate();
                          return isStartDisabled;
                        })()}
                        onClick={() => setSelectedDate(1)}
                        className='px-4 py-2.5 rounded-soft border border-nature-divider bg-white hover:border-nature-primary hover:bg-nature-primary/5 transition-all text-xs font-medium tracking-wide disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-nature-divider disabled:hover:bg-white'
                      >
                        START OF MONTH
                      </motion.button>
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedDate(new Date().getDate());
                          setCurrentMonth(new Date().getMonth());
                          setCurrentYear(new Date().getFullYear());
                        }}
                        className='px-4 py-2.5 rounded-soft border border-nature-primary bg-nature-primary/5 hover:bg-nature-primary/10 transition-all text-xs font-medium tracking-wide flex items-center gap-2'
                      >
                        <span className='w-2 h-2 rounded-full bg-nature-primary' />
                        TODAY
                      </motion.button>
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={(() => {
                          const today = new Date();
                          const isEndDisabled =
                            currentYear < today.getFullYear()
                              ? true
                              : currentYear > today.getFullYear()
                              ? false
                              : currentMonth < today.getMonth()
                              ? true
                              : currentMonth > today.getMonth()
                              ? false
                              : 31 < today.getDate();
                          return isEndDisabled;
                        })()}
                        onClick={() => setSelectedDate(31)}
                        className='px-4 py-2.5 rounded-soft border border-nature-divider bg-white hover:border-nature-primary hover:bg-nature-primary/5 transition-all text-xs font-medium tracking-wide disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-nature-divider disabled:hover:bg-white'
                      >
                        END OF MONTH
                      </motion.button>
                    </div>

                    {/* Month Navigation */}
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-nature-divider'>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <motion.button
                          whileHover={{ x: -2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleFirstMonth}
                          className='p-1.5 sm:p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all'
                          title='First month of year'
                        >
                          <ChevronsLeft className='w-4 h-4 sm:w-5 sm:h-5' />
                        </motion.button>
                        <motion.button
                          whileHover={{ x: -2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handlePreviousMonth}
                          className='p-1.5 sm:p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all'
                          title='Previous month'
                        >
                          <ChevronLeft className='w-4 h-4 sm:w-5 sm:h-5' />
                        </motion.button>
                      </div>
                      <div className='flex flex-col items-center'>
                        <span className='font-display text-xl sm:text-2xl font-semibold tracking-wide text-nature-text-primary'>
                          {monthNames[currentMonth]} {currentYear}
                        </span>
                      </div>
                      <div className='flex items-center gap-1 sm:gap-2'>
                        <motion.button
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleNextMonth}
                          className='p-1.5 sm:p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all'
                          title='Next month'
                        >
                          <ChevronRight className='w-4 h-4 sm:w-5 sm:h-5' />
                        </motion.button>
                        <motion.button
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleLastMonth}
                          className='p-1.5 sm:p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all'
                          title='Last month of year'
                        >
                          <ChevronsRight className='w-4 h-4 sm:w-5 sm:h-5' />
                        </motion.button>
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className='grid grid-cols-7 gap-2'>
                      {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
                        <div key={day} className='text-center pb-3'>
                          <div className='text-xs font-medium text-nature-text-tertiary tracking-wider'>{day}</div>
                        </div>
                      ))}

                      {(() => {
                        // Calculate days in current month
                        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

                        // Calculate first day of month (0 = Sunday, 6 = Saturday)
                        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

                        // Calculate days in previous month
                        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

                        // Get current date for comparison
                        const today = new Date();
                        today.setHours(0, 0, 0, 0); // Reset time to compare only dates

                        // Create array for calendar cells
                        const calendarCells = [];

                        // Previous month info
                        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

                        // Next month info
                        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
                        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

                        // Add previous month's trailing dates
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
                                setSelectedDate(date);
                              }}
                              whileHover={!isDisabled ? { scale: 1.1 } : {}}
                              whileTap={!isDisabled ? { scale: 0.95 } : {}}
                              className={`
                                aspect-square text-sm font-medium flex items-center justify-center transition-all rounded-soft
                                ${
                                  isDisabled
                                    ? 'text-nature-text-tertiary/30 cursor-not-allowed bg-nature-surface/50 border border-nature-divider/50'
                                    : 'text-nature-text-tertiary/60 bg-nature-surface/30 hover:bg-nature-surface/50 hover:text-nature-text-tertiary/80'
                                }
                              `}
                            >
                              {date}
                            </motion.button>
                          );
                        }

                        // Add current month's dates
                        for (let date = 1; date <= daysInMonth; date++) {
                          const isSelected = date === selectedDate;
                          const cellDate = new Date(currentYear, currentMonth, date);
                          cellDate.setHours(0, 0, 0, 0);
                          const isDisabled = cellDate < today;

                          const isToday = cellDate.getTime() === today.getTime();

                          calendarCells.push(
                            <motion.button
                              key={`current-${date}`}
                              disabled={isDisabled}
                              onClick={() => setSelectedDate(date)}
                              whileHover={!isDisabled ? { scale: 1.1 } : {}}
                              whileTap={!isDisabled ? { scale: 0.95 } : {}}
                              className={`
                                aspect-square text-sm font-medium flex items-center justify-center transition-all rounded-soft
                                ${isSelected ? 'bg-nature-primary text-white shadow-soft scale-105' : ''}
                                ${
                                  isDisabled
                                    ? 'text-nature-text-tertiary/30 cursor-not-allowed bg-nature-surface/50 border border-nature-divider/50'
                                    : ''
                                }
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

                        // Add next month's leading dates to fill the grid
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
                                setSelectedDate(date);
                              }}
                              whileHover={!isDisabled ? { scale: 1.1 } : {}}
                              whileTap={!isDisabled ? { scale: 0.95 } : {}}
                              className={`
                                aspect-square text-sm font-medium flex items-center justify-center transition-all rounded-soft
                                ${
                                  isDisabled
                                    ? 'text-nature-text-tertiary/30 cursor-not-allowed bg-nature-surface/50 border border-nature-divider/50'
                                    : 'text-nature-text-tertiary/60 bg-nature-surface/30 hover:bg-nature-surface/50 hover:text-nature-text-tertiary/80'
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
                    <div className='mt-6 pt-6 border-t border-nature-divider'>
                      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                        <div className='text-xs font-medium text-nature-text-tertiary tracking-wider'>
                          SELECTED DATE
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='text-left sm:text-right'>
                            <div className='text-sm sm:text-base font-semibold text-nature-text-primary'>
                              {monthNames[currentMonth]} {selectedDate}, {currentYear}
                            </div>
                            <div className='text-xs text-nature-text-secondary'>
                              {
                                ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
                                  selectedDate % 7
                                ]
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Select Services */}
                <motion.div variants={itemVariants} className='mb-10'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6'>
                    <div className='flex items-center gap-3'>
                      <Scissors className='w-5 h-5 text-nature-primary' />
                      <h2 className='text-xl md:text-2xl font-display font-semibold tracking-tight'>Select Services</h2>
                    </div>
                    {selectedServices.length > 0 && (
                      <div className='px-4 py-2 bg-nature-primary rounded-soft text-white text-xs font-medium w-fit'>
                        {selectedServices.length} SELECTED • {totalDuration} MIN
                      </div>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div className='mb-6 relative'>
                    <div className='flex items-center justify-between mb-4'>
                      <div className='text-xs sm:text-sm font-medium text-nature-text-tertiary'>CATEGORIES</div>
                      <div className='flex gap-1 sm:gap-2'>
                        <button
                          onClick={scrollCategoryPrev}
                          className='p-1.5 sm:p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all'
                          aria-label='Previous category'
                        >
                          <ChevronLeft className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                        <button
                          onClick={scrollCategoryNext}
                          className='p-1.5 sm:p-2 rounded-soft border border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5 transition-all'
                          aria-label='Next category'
                        >
                          <ChevronRight className='w-3 h-3 sm:w-4 sm:h-4' />
                        </button>
                      </div>
                    </div>
                    <div className='overflow-hidden py-2' ref={emblaCategoryRef}>
                      <div className='flex gap-2 sm:gap-3 px-1'>
                        {categories.map((category) => {
                          const isSelected = selectedCategory === category.id;
                          const categoryCount =
                            category.id === 'all'
                              ? services.length
                              : services.filter((s) => s.category === category.id).length;
                          return (
                            <div key={category.id} className='flex-[0_0_auto] min-w-0'>
                              <motion.button
                                onClick={() => setSelectedCategory(category.id)}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={`
                                  px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 rounded-soft border transition-all font-medium text-xs sm:text-sm flex items-center gap-2 sm:gap-3 whitespace-nowrap
                                  ${
                                    isSelected
                                      ? 'bg-nature-primary text-white border-nature-primary shadow-soft scale-[1.02]'
                                      : 'bg-white text-nature-text-secondary border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5'
                                  }
                                `}
                              >
                                <img
                                  src={category.image}
                                  alt={category.name}
                                  className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-soft object-cover flex-shrink-0'
                                />
                                <span className='hidden sm:inline'>{category.name}</span>
                                <span className='sm:hidden'>{category.name.split(' ')[0]}</span>
                                <span
                                  className={`text-xs ${isSelected ? 'text-white/80' : 'text-nature-text-tertiary'}`}
                                >
                                  ({categoryCount})
                                </span>
                              </motion.button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {filteredServices.length === 0 ? (
                    <div className='border-2 border-dashed border-nature-divider rounded-softer p-8 md:p-12 text-center bg-nature-surface/30'>
                      <Scissors className='w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-nature-text-tertiary' />
                      <p className='text-nature-text-tertiary text-xs sm:text-sm'>No services found in this category</p>
                    </div>
                  ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
                      {filteredServices.map((service) => {
                        const isSelected = selectedServices.includes(service.id);
                        return (
                          <motion.button
                            key={service.id}
                            onClick={() => toggleService(service.id)}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                              relative overflow-hidden rounded-soft border transition-all text-left
                              ${
                                isSelected
                                  ? 'border-nature-primary bg-white shadow-soft-lg'
                                  : 'border-nature-divider hover:border-nature-primary bg-white hover:shadow-soft'
                              }
                            `}
                          >
                            {/* Service Image */}
                            <div className='relative h-32 sm:h-36 md:h-40 overflow-hidden'>
                              <img src={service.image} alt={service.name} className='w-full h-full object-cover' />
                              <div
                                className={`absolute inset-0 transition-all ${
                                  isSelected ? 'bg-nature-primary/10' : 'bg-gradient-to-t from-black/20 to-transparent'
                                }`}
                              />

                              {/* Checkmark */}
                              <div className='absolute top-2 right-2 sm:top-3 sm:right-3'>
                                <div
                                  className={`
                                    w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center transition-all backdrop-blur-sm
                                    ${
                                      isSelected
                                        ? 'bg-nature-primary border-nature-primary'
                                        : 'bg-white/90 border-white'
                                    }
                                  `}
                                >
                                  {isSelected && <Check className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white stroke-[3]' />}
                                </div>
                              </div>
                            </div>

                            {/* Service Info */}
                            <div className='p-3 sm:p-4 md:p-5'>
                              <h3
                                className={`text-base sm:text-lg font-semibold tracking-tight mb-1 ${
                                  isSelected ? 'text-nature-text-primary' : ''
                                }`}
                              >
                                {service.name}
                              </h3>
                              <div className='text-xs font-medium text-nature-text-tertiary tracking-wide mb-2 sm:mb-3'>
                                {service.duration} MINUTES
                              </div>
                              <div className='text-xl sm:text-2xl font-bold tracking-tight'>${service.price}</div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>

                {/* Select Time */}
                <motion.div variants={itemVariants} className='mb-10'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6'>
                    <h2 className='text-xl md:text-2xl font-display font-semibold tracking-tight flex items-center gap-3'>
                      <Clock className='w-5 h-5 text-nature-primary' />
                      Available Times
                    </h2>
                    <div className='text-xs font-medium text-nature-text-tertiary tracking-wide'>
                      <span className='font-semibold'>Jan 15</span>
                      {totalDuration > 0 && <span className='ml-2'>• Duration: {totalDuration} min</span>}
                    </div>
                  </div>

                  {selectedServices.length === 0 ? (
                    <div className='border-2 border-dashed border-nature-divider rounded-softer p-8 md:p-12 text-center bg-nature-surface/30'>
                      <Clock className='w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-nature-text-tertiary' />
                      <p className='text-nature-text-tertiary text-xs sm:text-sm'>
                        Please select at least one service to see available times
                      </p>
                    </div>
                  ) : (
                    <div className='rounded-softer border border-nature-divider p-4 sm:p-5 md:p-6 bg-white'>
                      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4'>
                        <div className='text-xs font-medium text-nature-text-tertiary tracking-wider'>
                          15-MIN INTERVALS • 9:00 AM - 7:00 PM
                        </div>
                        {selectedTime && (
                          <div className='flex items-center gap-2 sm:gap-3 text-xs flex-wrap'>
                            <div className='flex items-center gap-1.5'>
                              <div className='w-3 h-3 rounded-sm bg-nature-primary' />
                              <span className='text-nature-text-tertiary font-medium'>Start</span>
                            </div>
                            <div className='flex items-center gap-1.5'>
                              <div className='w-3 h-3 rounded-sm bg-nature-secondary' />
                              <span className='text-nature-text-tertiary font-medium'>Duration</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5 sm:gap-2 max-h-96 overflow-y-auto'>
                        {timeSlots.map((time) => {
                          const isStartTime = time === selectedTime;
                          const isInRange = isTimeInRange(time);
                          const isDisabled = disabledTimeSlots.includes(time);
                          return (
                            <button
                              key={time}
                              disabled={isDisabled}
                              onClick={() => setSelectedTime(time)}
                              className={`
                                py-2 sm:py-2.5 px-1.5 sm:px-2 text-xs font-medium rounded-soft border transition-all
                                ${isStartTime ? 'bg-nature-primary text-white border-nature-primary shadow-soft' : ''}
                                ${
                                  isInRange && !isStartTime
                                    ? 'bg-nature-secondary/20 text-nature-text-primary border-nature-secondary'
                                    : ''
                                }
                                ${
                                  isDisabled
                                    ? 'bg-nature-surface/50 text-nature-text-tertiary/30 border-nature-divider/30 cursor-not-allowed'
                                    : ''
                                }
                                ${
                                  !isStartTime && !isInRange && !isDisabled
                                    ? 'border-nature-divider hover:border-nature-primary hover:bg-nature-primary/5'
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
                  )}
                </motion.div>

                {/* Next Button */}
                <motion.div variants={itemVariants} className='flex justify-end pt-6 border-t border-nature-divider'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className='bg-nature-primary text-white px-10 py-4 rounded-soft flex items-center gap-3 font-medium tracking-wide hover:bg-nature-primary/90 transition-all shadow-soft hover:shadow-soft-lg'
                  >
                    Next Step
                    <ArrowRight className='w-5 h-5' />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Confirmation */}
            {currentStep === 2 && (
              <motion.div
                key='step2'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className='bg-white rounded-softer p-4 sm:p-6 md:p-8 lg:p-12 shadow-soft-lg'
              >
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-display font-semibold tracking-tight mb-6 sm:mb-8 md:mb-12'>
                  Review Your Booking
                </h1>

                <div className='space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-10 md:mb-12'>
                  {/* Date & Time */}
                  <div className='flex items-start gap-3 sm:gap-4 md:gap-5'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
                      <Calendar className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-nature-primary' />
                    </div>
                    <div className='flex-grow'>
                      <h3 className='font-semibold text-base sm:text-lg mb-1'>January 15, 2024</h3>
                      <p className='text-xs sm:text-sm text-nature-text-secondary font-light'>
                        {selectedTime} -{' '}
                        {(() => {
                          const [time, period] = selectedTime.split(' ');
                          const [hours, minutes] = time.split(':').map(Number);
                          const totalMinutes =
                            (period === 'PM' && hours !== 12 ? hours + 12 : hours) * 60 + minutes + totalDuration;
                          const endHours = Math.floor(totalMinutes / 60) % 24;
                          const endMinutes = totalMinutes % 60;
                          const endPeriod = endHours >= 12 ? 'PM' : 'AM';
                          const displayHours = endHours > 12 ? endHours - 12 : endHours === 0 ? 12 : endHours;
                          return `${displayHours.toString().padStart(2, '0')}:${endMinutes
                            .toString()
                            .padStart(2, '0')} ${endPeriod}`;
                        })()}
                      </p>
                    </div>
                  </div>

                  {/* Staff */}
                  <div className='flex items-start gap-3 sm:gap-4 md:gap-5'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
                      <User className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-nature-primary' />
                    </div>
                    <div className='flex-grow'>
                      <h3 className='font-semibold text-base sm:text-lg'>
                        {staffMembers.find((s) => s.id === selectedStaff)?.name || 'Any Staff'}
                      </h3>
                      <p className='text-xs sm:text-sm text-nature-text-secondary font-light'>Employee</p>
                    </div>
                  </div>

                  {/* Services */}
                  <div className='flex items-start gap-3 sm:gap-4 md:gap-5'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
                      <Scissors className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-nature-primary' />
                    </div>
                    <div className='flex-grow'>
                      <h3 className='font-semibold text-base sm:text-lg mb-3 sm:mb-4'>Selected Services</h3>
                      <div className='space-y-2 sm:space-y-3'>
                        {selectedServices.map((serviceId) => {
                          const service = services.find((s) => s.id === serviceId);
                          if (!service) return null;
                          return (
                            <div
                              key={serviceId}
                              className='flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-nature-primary/5 to-nature-secondary/5 rounded-soft border-l-4 border-nature-primary'
                            >
                              <div>
                                <div className='font-semibold text-sm sm:text-base'>{service.name}</div>
                                <div className='text-xs text-nature-text-secondary mt-1 font-light'>
                                  {service.duration} minutes
                                </div>
                              </div>
                              <div className='text-base sm:text-lg font-bold'>${service.price}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Total */}
                      <div className='mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-nature-divider flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                        <div>
                          <div className='text-xs font-medium text-nature-text-tertiary tracking-wider mb-1'>TOTAL</div>
                          <div className='text-xs sm:text-sm text-nature-text-secondary font-light'>
                            {totalDuration} minutes • {selectedServices.length} service
                            {selectedServices.length > 1 ? 's' : ''}
                          </div>
                        </div>
                        <div className='text-2xl sm:text-3xl font-bold tracking-tight'>
                          $
                          {selectedServices.reduce((total, serviceId) => {
                            const service = services.find((s) => s.id === serviceId);
                            return total + (service?.price || 0);
                          }, 0)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Client */}
                  <div className='flex items-start gap-3 sm:gap-4 md:gap-5'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
                      <Briefcase className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-nature-primary' />
                    </div>
                    <div className='flex-grow'>
                      <h3 className='font-semibold text-base sm:text-lg mb-1'>John Doe</h3>
                      <p className='text-xs sm:text-sm text-nature-text-secondary font-light'>(555) 123-4567</p>
                      <p className='text-xs sm:text-sm text-nature-text-secondary font-light'>john.doe@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-nature-divider'>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBack}
                    className='bg-white border-2 border-nature-primary text-nature-primary px-6 sm:px-8 py-3 sm:py-3.5 rounded-soft flex items-center justify-center gap-2 sm:gap-3 font-medium hover:bg-nature-primary/5 transition-all order-2 sm:order-1'
                  >
                    <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
                    Back
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirm}
                    className='bg-nature-primary text-white px-6 sm:px-10 py-3 sm:py-3.5 rounded-soft flex items-center justify-center gap-2 sm:gap-3 font-medium hover:bg-nature-primary/90 transition-all shadow-soft hover:shadow-soft-lg order-1 sm:order-2'
                  >
                    Confirm Booking
                    <Check className='w-4 h-4 sm:w-5 sm:h-5' />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {currentStep === 3 && (
              <motion.div
                key='step3'
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                exit={{ opacity: 0 }}
                className='flex flex-col items-center px-4'
              >
                {/* Success Icon */}
                <motion.div
                  variants={checkmarkVariants}
                  className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-3 sm:border-4 border-nature-primary bg-nature-primary/5 flex items-center justify-center mb-6 sm:mb-8 shadow-soft-lg'
                >
                  <Check className='w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-nature-primary stroke-[3]' />
                </motion.div>

                {/* Success Message */}
                <motion.div variants={itemVariants} className='text-center mb-6 sm:mb-8 md:mb-12'>
                  <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight mb-3 sm:mb-4'>
                    Booking Confirmed
                  </h1>
                  <p className='text-xs sm:text-sm md:text-base text-nature-text-secondary font-light px-4'>
                    Your appointment has been successfully booked
                  </p>
                </motion.div>

                {/* Confirmation Card */}
                <motion.div
                  variants={itemVariants}
                  className='w-full max-w-2xl bg-white rounded-softer p-6 sm:p-8 md:p-10 shadow-soft-xl mb-6 sm:mb-8'
                >
                  {/* Confirmation Number */}
                  <div className='mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-nature-divider'>
                    <div className='text-xs font-medium text-nature-text-tertiary tracking-wider mb-2'>
                      CONFIRMATION NUMBER
                    </div>
                    <div className='text-2xl sm:text-3xl font-display font-bold tracking-tight'>#BK-2024-00152</div>
                  </div>

                  {/* Details */}
                  <div className='space-y-4 sm:space-y-5 md:space-y-6'>
                    <div className='flex items-start gap-3 sm:gap-4'>
                      <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
                        <Calendar className='w-5 h-5 sm:w-6 sm:h-6 text-nature-primary' />
                      </div>
                      <div className='flex-grow'>
                        <div className='text-xs font-medium text-nature-text-tertiary tracking-wider mb-1'>
                          DATE & TIME
                        </div>
                        <div className='font-semibold text-base sm:text-lg'>January 15, 2024</div>
                        <div className='text-xs sm:text-sm text-nature-text-secondary font-light'>
                          {selectedTime} -{' '}
                          {(() => {
                            const [time, period] = selectedTime.split(' ');
                            const [hours, minutes] = time.split(':').map(Number);
                            const totalMinutes =
                              (period === 'PM' && hours !== 12 ? hours + 12 : hours) * 60 + minutes + totalDuration;
                            const endHours = Math.floor(totalMinutes / 60) % 24;
                            const endMinutes = totalMinutes % 60;
                            const endPeriod = endHours >= 12 ? 'PM' : 'AM';
                            const displayHours = endHours > 12 ? endHours - 12 : endHours === 0 ? 12 : endHours;
                            return `${displayHours.toString().padStart(2, '0')}:${endMinutes
                              .toString()
                              .padStart(2, '0')} ${endPeriod}`;
                          })()}
                        </div>
                      </div>
                    </div>

                    <div className='flex items-start gap-3 sm:gap-4'>
                      <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
                        <User className='w-5 h-5 sm:w-6 sm:h-6 text-nature-primary' />
                      </div>
                      <div className='flex-grow'>
                        <div className='text-xs font-medium text-nature-text-tertiary tracking-wider mb-1'>
                          EMPLOYEE
                        </div>
                        <div className='font-semibold text-base sm:text-lg'>
                          {staffMembers.find((s) => s.id === selectedStaff)?.name || 'Any Staff'}
                        </div>
                      </div>
                    </div>

                    <div className='flex items-start gap-3 sm:gap-4'>
                      <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
                        <Scissors className='w-5 h-5 sm:w-6 sm:h-6 text-nature-primary' />
                      </div>
                      <div className='flex-grow'>
                        <div className='text-xs font-medium text-nature-text-tertiary tracking-wider mb-1'>
                          SERVICES
                        </div>
                        {selectedServices.map((serviceId) => {
                          const service = services.find((s) => s.id === serviceId);
                          if (!service) return null;
                          return (
                            <div key={serviceId} className='font-semibold text-base sm:text-lg'>
                              {service.name}
                            </div>
                          );
                        })}
                        <div className='text-xs sm:text-sm text-nature-text-secondary mt-2 font-light'>
                          {totalDuration} minutes • $
                          {selectedServices.reduce((total, serviceId) => {
                            const service = services.find((s) => s.id === serviceId);
                            return total + (service?.price || 0);
                          }, 0)}
                        </div>
                      </div>
                    </div>

                    <div className='flex items-start gap-3 sm:gap-4'>
                      <div className='w-10 h-10 sm:w-12 sm:h-12 rounded-soft border-2 border-nature-primary/20 bg-nature-primary/5 flex items-center justify-center flex-shrink-0'>
                        <MapPin className='w-5 h-5 sm:w-6 sm:h-6 text-nature-primary' />
                      </div>
                      <div className='flex-grow'>
                        <div className='text-xs font-medium text-nature-text-tertiary tracking-wider mb-1'>
                          LOCATION
                        </div>
                        <div className='font-semibold text-base sm:text-lg text-nature-text-primary'>AICOMPOS</div>
                        <div className='text-xs sm:text-sm text-nature-text-secondary font-light'>
                          123 Main Street, City, ST 12345
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  variants={itemVariants}
                  className='w-full max-w-2xl flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6'
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBackToHome}
                    className='flex-1 bg-white border-2 border-nature-primary text-nature-primary px-4 sm:px-6 py-3 sm:py-3.5 rounded-soft flex items-center justify-center gap-2 sm:gap-3 font-medium hover:bg-nature-primary/5 transition-all text-sm sm:text-base'
                  >
                    <ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
                    Back to Home
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadTicket}
                    className='flex-1 bg-nature-primary text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-soft flex items-center justify-center gap-2 sm:gap-3 font-medium hover:bg-nature-primary/90 transition-all shadow-soft hover:shadow-soft-lg text-sm sm:text-base'
                  >
                    <Download className='w-4 h-4 sm:w-5 sm:h-5' />
                    Download Ticket
                  </motion.button>
                </motion.div>

                {/* Email Notice */}
                <motion.div
                  variants={itemVariants}
                  className='w-full max-w-2xl border-2 border-dashed border-nature-divider rounded-soft p-3 sm:p-4 bg-nature-surface/30'
                >
                  <p className='text-center text-xs sm:text-sm text-nature-text-tertiary font-light'>
                    A confirmation email has been sent to john.doe@example.com
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className='w-full border-t border-nature-divider py-8 px-6 mt-auto bg-white/50 backdrop-blur-sm'>
        <div className='max-w-[1400px] mx-auto flex justify-between items-center text-xs text-nature-text-tertiary font-light tracking-wide'>
          <div>Copyright © 2024 AICOMPOS</div>
        </div>
      </footer>
    </div>
  );
}
