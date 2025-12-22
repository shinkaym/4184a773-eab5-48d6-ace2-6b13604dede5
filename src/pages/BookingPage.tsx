import { useState, useEffect } from 'react';
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
  ArrowLeft,
  Check,
  Clock,
  MapPin,
  Download,
  Briefcase,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StaffCard } from '../components/StaffCard';
import { StepIndicator } from '../components/StepIndicator';
import logo from '../assets/images/logo.jpg';

export function BookingPage() {
  const navigate = useNavigate();
  // Step management
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1 - Appointment selection state
  const [selectedStaff, setSelectedStaff] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<number>(15);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('09:30 AM');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const staffMembers = [
    {
      id: 'any',
      name: 'Any Staff',
      image: '',
    },
    {
      id: 'sarah-1',
      name: 'Sarah M.',
      image: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 'mike-1',
      name: 'Mike R.',
      image: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 'jenny-1',
      name: 'Jenny K.',
      image: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 'sarah-2',
      name: 'Sarah M.',
      image: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 'mike-2',
      name: 'Mike R.',
      image: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 'jenny-2',
      name: 'Jenny K.',
      image: 'https://i.pravatar.cc/150?img=5',
    },
  ];
  // Carousel configuration
  const cardsPerPage = 4; // Show 4 cards per page on desktop
  const totalPages = Math.ceil(staffMembers.length / cardsPerPage);

  // Service categories
  const categories = [
    { id: 'all', name: 'All Services', icon: '✨' },
    { id: 'nails', name: 'Nails', icon: '💅' },
    { id: 'spa', name: 'Spa & Wellness', icon: '🧖' },
    { id: 'beauty', name: 'Beauty', icon: '💄' },
  ];

  // Services data
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

  // Filter services by category
  const filteredServices =
    selectedCategory === 'all' ? services : services.filter((service) => service.category === selectedCategory);

  // Calculate total duration of selected services
  const totalDuration = selectedServices.reduce((total, serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    return total + (service?.duration || 0);
  }, 0);

  // Generate time slots for full day in 15-minute intervals (9 AM to 7 PM)
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
  const disabledTimeSlots = ['11:00 AM', '11:15 AM', '02:00 PM', '02:15 PM']; // Example time-off slots

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  // Helper function to convert time string to minutes from midnight
  const timeToMinutes = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes =
      (period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours) * 60 + minutes;
    return totalMinutes;
  };

  // Check if a time slot is within the selected appointment duration
  const isTimeInRange = (timeSlot: string) => {
    if (!selectedTime) return false;
    const startMinutes = timeToMinutes(selectedTime);
    const currentMinutes = timeToMinutes(timeSlot);
    const endMinutes = startMinutes + totalDuration;
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  };

  // Auto-scroll carousel logic
  useEffect(() => {
    if (!isHoveringCarousel && currentStep === 1 && totalPages > 1) {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval);
    }
  }, [isHoveringCarousel, currentStep, totalPages]);

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Animation variants
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

  const checkmarkVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  };

  // Navigation handlers
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
    // Implement download logic here
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className='min-h-screen w-full bg-nature-main flex flex-col font-sans text-nature-text-primary'>
      {/* Hero Banner with Overlay Navigation */}
      <div className='relative w-full h-[400px] md:h-[500px] overflow-hidden'>
        {/* Banner Image */}
        <div className='absolute inset-0'>
          <img
            src='https://picsum.photos/seed/nailsalon/1920/800'
            alt='Nail Salon Banner'
            className='w-full h-full object-cover'
          />
          {/* Overlay gradient for better text readability */}
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70' />
        </div>

        {/* Navigation Overlay */}
        <nav className='relative z-10 w-full px-6 py-6'>
          <div className='max-w-[1400px] mx-auto flex justify-between items-center'>
            <div className='flex items-center gap-3'>
              <img src={logo} alt='AICOMPOS Logo' className='h-8 w-auto shadow-lg' />
              <span className='font-black text-lg tracking-tight text-nature-text-primary drop-shadow-lg'>
                AICOM
                <span className='text-white drop-shadow-md'>POS</span>
              </span>
            </div>

            <div className='flex items-center gap-8'>
              <div className='hidden md:flex items-center gap-6 text-xs font-bold tracking-wider'>
                <a
                  href='#'
                  className='flex items-center gap-2 text-white hover:text-nature-primary transition-colors drop-shadow-md'
                >
                  <Calendar className='w-4 h-4' />
                  Appointments
                </a>
                <a
                  href='#'
                  className='flex items-center gap-2 text-white hover:text-nature-primary transition-colors drop-shadow-md'
                >
                  <Phone className='w-4 h-4' />
                  Contact
                </a>
              </div>

              <div className='flex items-center gap-4 pl-8 border-l-2 border-white/40'>
                <button className='flex items-center gap-2 px-4 py-2 border-2 border-white text-xs font-bold tracking-wider hover:bg-white/20 transition-colors bg-white/10 backdrop-blur-sm text-white'>
                  <User className='w-4 h-4' />
                  John Wick
                </button>
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-2 text-xs font-bold tracking-wider text-white hover:text-nature-error transition-colors drop-shadow-md'
                >
                  <LogOut className='w-4 h-4' />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content Overlay */}
        <div className='relative z-10 max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='max-w-3xl'
          >
            <h1 className='text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl leading-tight'>
              Professional
              <br />
              Beauty Services
            </h1>
            <p className='text-white/90 text-lg md:text-xl font-medium max-w-2xl drop-shadow-lg leading-relaxed'>
              Experience premium nail care and styling services with our expert team. Book your appointment in just a
              few simple steps.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className='flex-grow w-full max-w-[1400px] mx-auto p-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12'>
        {/* Left Sidebar - Steps */}
        <div className='lg:col-span-3 hidden lg:block'>
          <div className='sticky top-8'>
            <div className='mb-12'>
              <StepIndicator
                number={1}
                title='Appointment'
                status={currentStep === 1 ? 'current' : currentStep > 1 ? 'completed' : 'upcoming'}
              />
              <StepIndicator
                number={2}
                title='Appointment Confirm'
                status={currentStep === 2 ? 'current' : currentStep > 2 ? 'completed' : 'upcoming'}
              />
              <StepIndicator number={3} title='Success' status={currentStep === 3 ? 'current' : 'upcoming'} isLast />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='lg:col-span-9'>
          {/* Step 1: Appointment Selection */}
          {currentStep === 1 && (
            <motion.div
              key='step1'
              variants={containerVariants}
              initial='hidden'
              animate='visible'
              className='relative p-8 md:p-12 bg-white shadow-xl'
            >
              <motion.h1 variants={itemVariants} className='text-3xl md:text-4xl font-black tracking-tighter mb-12'>
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
                    <div className='text-[10px] font-mono text-nature-text-tertiary tracking-wider mb-1 font-bold'>
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

              {/* Select Employee Section */}
              <motion.div variants={itemVariants} className='mb-10'>
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center gap-3'>
                    <Scissors className='w-5 h-5' />
                    <h2 className='text-xl font-black tracking-tight'>Select Employee</h2>
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

                {/* Carousel Container */}
                <div
                  className='relative'
                  onMouseEnter={() => setIsHoveringCarousel(true)}
                  onMouseLeave={() => setIsHoveringCarousel(false)}
                >
                  {/* Navigation Buttons - Only show if there are multiple pages */}
                  {totalPages > 1 && (
                    <>
                      <button
                        onClick={handlePrevPage}
                        className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white border-2 border-nature-text-primary flex items-center justify-center hover:bg-nature-surface transition-colors shadow-lg'
                        aria-label='Previous page'
                      >
                        <ChevronLeft className='w-5 h-5' />
                      </button>

                      <button
                        onClick={handleNextPage}
                        className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white border-2 border-nature-text-primary flex items-center justify-center hover:bg-nature-surface transition-colors shadow-lg'
                        aria-label='Next page'
                      >
                        <ChevronRight className='w-5 h-5' />
                      </button>
                    </>
                  )}

                  {/* Carousel Wrapper */}
                  <div className='overflow-hidden'>
                    <motion.div
                      className='flex gap-4'
                      animate={{
                        x: `-${currentPage * 100}%`,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      {staffMembers.map((staff, index) => (
                        <div key={index} className='min-w-[calc(25%-0.75rem)] flex-shrink-0'>
                          <StaffCard
                            name={staff.name}
                            image={staff.image}
                            isAnyStaff={staff.id === 'any'}
                            isSelected={selectedStaff === staff.id}
                            onClick={() => setSelectedStaff(staff.id)}
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Carousel Indicators - Only show if there are multiple pages */}
                  {totalPages > 1 && (
                    <div className='flex justify-center gap-2 mt-6'>
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentPage
                              ? 'bg-nature-text-primary w-8'
                              : 'bg-nature-divider hover:bg-nature-text-tertiary'
                          }`}
                          aria-label={`Go to page ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Select Date Section */}
              <motion.div variants={itemVariants} className='mb-10'>
                <div className='flex items-center gap-3 mb-6'>
                  <Calendar className='w-5 h-5' />
                  <h2 className='text-xl font-black tracking-tight'>Select Date</h2>
                </div>

                <div className='border-2 border-nature-divider rounded-lg p-6 bg-white max-w-md'>
                  <div className='flex items-center justify-between mb-6'>
                    <button className='p-1 hover:bg-nature-surface rounded transition-colors'>
                      <ChevronLeft className='w-5 h-5' />
                    </button>
                    <span className='font-mono font-bold text-sm tracking-widest'>Jan 2024</span>
                    <button className='p-1 hover:bg-nature-surface rounded transition-colors'>
                      <ChevronRight className='w-5 h-5' />
                    </button>
                  </div>

                  <div className='grid grid-cols-7 gap-2'>
                    {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
                      <div key={day} className='text-center text-[10px] font-mono text-nature-text-tertiary font-bold'>
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
              </motion.div>

              {/* Select Services Section */}
              <motion.div variants={itemVariants} className='mb-10'>
                <div className='flex items-center justify-between mb-6'>
                  <div className='flex items-center gap-3'>
                    <Scissors className='w-5 h-5' />
                    <h2 className='text-xl font-black tracking-tight'>Select Services</h2>
                  </div>
                  {selectedServices.length > 0 && (
                    <div className='px-4 py-2 bg-nature-text-primary text-white text-xs font-mono font-bold'>
                      {selectedServices.length} SELECTED • {totalDuration} MIN
                    </div>
                  )}
                </div>

                {/* Category Filter */}
                <div className='mb-6 flex flex-wrap gap-3'>
                  {categories.map((category) => {
                    const isSelected = selectedCategory === category.id;
                    const categoryCount =
                      category.id === 'all'
                        ? services.length
                        : services.filter((s) => s.category === category.id).length;
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          relative px-6 py-3 border-2 transition-all font-bold text-sm tracking-wider
                          ${
                            isSelected
                              ? 'bg-nature-text-primary text-white border-nature-text-primary shadow-lg'
                              : 'bg-white text-nature-text-secondary border-nature-divider hover:border-nature-text-primary'
                          }
                        `}
                      >
                        {/* Corner accent for selected */}
                        {isSelected && <div className='absolute -top-1 -right-1 w-3 h-3 bg-nature-primary' />}
                        <span className='mr-2'>{category.icon}</span>
                        {category.name}
                        <span
                          className={`ml-2 text-xs font-mono ${
                            isSelected ? 'text-white/80' : 'text-nature-text-tertiary'
                          }`}
                        >
                          ({categoryCount})
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {filteredServices.length === 0 ? (
                  <div className='col-span-full border-2 border-dashed border-nature-divider p-12 text-center bg-nature-surface/30'>
                    <Scissors className='w-12 h-12 mx-auto mb-4 text-nature-text-tertiary' />
                    <p className='text-nature-text-tertiary font-mono text-sm'>No services found in this category</p>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {filteredServices.map((service) => {
                      const isSelected = selectedServices.includes(service.id);
                      return (
                        <motion.button
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            relative overflow-hidden border-2 transition-all text-left
                            ${
                              isSelected
                                ? 'border-nature-text-primary bg-white shadow-lg'
                                : 'border-nature-divider hover:border-nature-text-primary bg-white'
                            }
                          `}
                        >
                          {/* Service Image */}
                          <div className='relative h-40 overflow-hidden'>
                            <img src={service.image} alt={service.name} className='w-full h-full object-cover' />
                            {/* Image overlay gradient */}
                            <div
                              className={`absolute inset-0 transition-all ${
                                isSelected ? 'bg-nature-primary/20' : 'bg-gradient-to-t from-black/40 to-transparent'
                              }`}
                            />

                            {/* Checkmark indicator */}
                            <div className='absolute top-4 right-4'>
                              <div
                                className={`
                                  w-8 h-8 border-2 flex items-center justify-center transition-all backdrop-blur-sm
                                  ${
                                    isSelected
                                      ? 'bg-nature-text-primary border-nature-text-primary'
                                      : 'bg-white/90 border-white'
                                  }
                                `}
                              >
                                {isSelected && <Check className='w-5 h-5 text-white stroke-[3]' />}
                              </div>
                            </div>
                          </div>

                          {/* Service Info */}
                          <div className='p-6'>
                            <div className='mb-3'>
                              <h3
                                className={`text-lg font-black tracking-tight mb-1 ${
                                  isSelected ? 'text-nature-text-primary' : ''
                                }`}
                              >
                                {service.name}
                              </h3>
                              <div className='text-[10px] font-mono text-nature-text-tertiary tracking-wider font-bold'>
                                {service.duration} MINUTES
                              </div>
                            </div>

                            <div className='text-2xl font-black tracking-tighter'>${service.price}</div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </motion.div>

              {/* Select Time Section */}
              <motion.div variants={itemVariants} className='mb-10'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-xl font-black tracking-tight flex items-center gap-3'>
                    <span className='w-5 h-5 rounded-full border-2 border-nature-text-primary flex items-center justify-center'>
                      <span className='w-2 h-2 bg-nature-text-primary rounded-full'></span>
                    </span>
                    Available Times
                  </h2>
                  <div className='text-xs font-mono text-nature-text-tertiary tracking-wider'>
                    <span className='font-bold'>Jan 15</span>
                    {totalDuration > 0 && <span className='ml-2'>• Duration: {totalDuration} min</span>}
                  </div>
                </div>

                {selectedServices.length === 0 ? (
                  <div className='border-2 border-dashed border-nature-divider p-12 text-center bg-nature-surface/30'>
                    <Clock className='w-12 h-12 mx-auto mb-4 text-nature-text-tertiary' />
                    <p className='text-nature-text-tertiary font-mono text-sm'>
                      Please select at least one service to see available times
                    </p>
                  </div>
                ) : (
                  <div className='border-2 border-nature-divider p-6 bg-white'>
                    <div className='flex items-center justify-between mb-4'>
                      <div className='text-[10px] font-mono text-nature-text-tertiary tracking-widest font-bold'>
                        15-MINUTE INTERVALS • 9:00 AM - 7:00 PM
                      </div>
                      {selectedTime && (
                        <div className='flex items-center gap-2 text-xs font-mono'>
                          <div className='flex items-center gap-1'>
                            <div className='w-3 h-3 bg-nature-text-primary' />
                            <span className='text-nature-text-tertiary'>Start</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <div className='w-3 h-3 bg-nature-primary' />
                            <span className='text-nature-text-tertiary'>Duration</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-96 overflow-y-auto'>
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
                              py-3 px-2 text-xs font-mono border-2 transition-all relative
                              ${
                                isStartTime
                                  ? 'bg-nature-text-primary text-white border-nature-text-primary font-bold z-10'
                                  : ''
                              }
                              ${
                                isInRange && !isStartTime
                                  ? 'bg-nature-primary/30 text-nature-text-primary border-nature-primary font-bold'
                                  : ''
                              }
                              ${
                                isDisabled
                                  ? 'bg-nature-surface/50 text-nature-text-tertiary/30 border-nature-divider/30 cursor-not-allowed line-through'
                                  : ''
                              }
                              ${
                                !isStartTime && !isInRange && !isDisabled
                                  ? 'border-nature-divider hover:border-nature-text-primary hover:bg-nature-surface'
                                  : ''
                              }
                            `}
                          >
                            {/* Start time indicator */}
                            {isStartTime && <div className='absolute -top-1 -right-1 w-3 h-3 bg-nature-primary' />}
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
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
                  onClick={handleNext}
                  className='bg-nature-text-primary text-white px-8 py-4 flex items-center gap-3 font-bold tracking-widest hover:bg-nature-text-secondary transition-colors shadow-lg'
                >
                  Next Step
                  <ArrowRight className='w-5 h-5' />
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Appointment Confirmation */}
          {currentStep === 2 && (
            <motion.div
              key='step2'
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className='relative border-2 border-nature-text-primary p-8 md:p-12 bg-white shadow-xl'
            >
              <h1 className='text-3xl md:text-4xl font-black tracking-tighter mb-12'>Review Your Booking</h1>

              {/* Booking Details */}
              <div className='space-y-8 mb-12'>
                {/* Date & Time */}
                <div className='flex items-start gap-6'>
                  <div className='w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0'>
                    <Calendar className='w-6 h-6' />
                  </div>
                  <div className='flex-grow'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h3 className='font-bold text-lg mb-1'>January 15, 2024</h3>
                        <p className='font-mono text-sm text-nature-text-secondary'>
                          {selectedTime} -{' '}
                          {(() => {
                            // Calculate end time based on total duration
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
                  </div>
                </div>

                {/* Staff Member */}
                <div className='flex items-start gap-6'>
                  <div className='w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0'>
                    <User className='w-6 h-6' />
                  </div>
                  <div className='flex-grow'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h3 className='font-bold text-lg mb-1'>
                          {staffMembers.find((s) => s.id === selectedStaff)?.name || 'Any Staff'}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Details */}
                <div className='flex items-start gap-6'>
                  <div className='w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0'>
                    <Scissors className='w-6 h-6' />
                  </div>
                  <div className='flex-grow'>
                    <h3 className='font-bold text-lg mb-4'>Selected Services</h3>
                    <div className='space-y-3'>
                      {selectedServices.map((serviceId) => {
                        const service = services.find((s) => s.id === serviceId);
                        if (!service) return null;
                        return (
                          <div
                            key={serviceId}
                            className='flex items-center justify-between p-4 bg-nature-surface/30 border-l-4 border-nature-primary'
                          >
                            <div>
                              <div className='font-bold text-base'>{service.name}</div>
                              <div className='font-mono text-xs text-nature-text-secondary mt-1'>
                                {service.duration} minutes
                              </div>
                            </div>
                            <div className='text-lg font-black'>${service.price}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Total Summary */}
                    <div className='mt-6 pt-6 border-t-2 border-nature-text-primary flex items-center justify-between'>
                      <div>
                        <div className='text-[10px] font-mono text-nature-text-tertiary tracking-wider font-bold mb-1'>
                          TOTAL
                        </div>
                        <div className='font-mono text-sm text-nature-text-secondary'>
                          {totalDuration} minutes • {selectedServices.length} service
                          {selectedServices.length > 1 ? 's' : ''}
                        </div>
                      </div>
                      <div className='text-3xl font-black tracking-tighter'>
                        $
                        {selectedServices.reduce((total, serviceId) => {
                          const service = services.find((s) => s.id === serviceId);
                          return total + (service?.price || 0);
                        }, 0)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Information */}
                <div className='flex items-start gap-6'>
                  <div className='w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0'>
                    <Briefcase className='w-6 h-6' />
                  </div>
                  <div className='flex-grow'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h3 className='font-bold text-lg mb-1'>John Doe</h3>
                        <p className='font-mono text-sm text-nature-text-secondary'>(555) 123-4567</p>
                        <p className='font-mono text-sm text-nature-text-secondary'>john.doe@example.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className='w-full h-px bg-nature-text-primary mb-8' />

              {/* Action Footer */}
              <div className='flex justify-between items-center gap-4'>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleBack}
                  className='bg-white border-2 border-nature-text-primary text-nature-text-primary px-8 py-4 flex items-center gap-3 font-bold tracking-widest hover:bg-nature-surface transition-colors'
                >
                  <ArrowLeft className='w-5 h-5' />
                  Back
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleConfirm}
                  className='bg-nature-text-primary text-white px-8 py-4 flex items-center gap-3 font-bold tracking-widest hover:bg-nature-text-secondary transition-colors shadow-lg'
                >
                  Confirm Booking
                  <Check className='w-5 h-5' />
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
              className='flex flex-col items-center'
            >
              {/* Success Icon */}
              <motion.div
                variants={checkmarkVariants}
                className='w-32 h-32 border-4 border-nature-text-primary flex items-center justify-center mb-8 relative bg-white'
              >
                <Check className='w-16 h-16 stroke-[3]' />
              </motion.div>

              {/* Success Message */}
              <motion.div variants={itemVariants} className='text-center mb-12'>
                <h1 className='text-4xl md:text-5xl font-black tracking-tighter mb-4'>Booking Confirmed</h1>
              </motion.div>

              {/* Confirmation Details Card */}
              <motion.div
                variants={itemVariants}
                className='w-full max-w-2xl relative border-4 border-nature-text-primary p-8 md:p-10 bg-white shadow-2xl mb-8'
              >
                {/* Confirmation Number */}
                <div className='mb-8 pb-8 border-b-2 border-nature-text-primary/20'>
                  <div className='text-[10px] font-mono text-nature-text-tertiary tracking-wider mb-2 font-bold'>
                    Confirmation Number
                  </div>
                  <div className='text-3xl md:text-4xl font-black tracking-tight'>#BK-2024-00152</div>
                </div>

                {/* Details Grid */}
                <div className='space-y-6'>
                  {/* Date & Time */}
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0 bg-white'>
                      <Calendar className='w-6 h-6' />
                    </div>
                    <div className='flex-grow'>
                      <div className='text-[10px] font-mono text-nature-text-tertiary tracking-wider mb-1 font-bold'>
                        Date & Time
                      </div>
                      <div className='font-bold text-lg'>January 15, 2024</div>
                      <div className='font-mono text-sm text-nature-text-secondary'>
                        {selectedTime} -{' '}
                        {(() => {
                          // Calculate end time based on total duration
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

                  {/* Stylist */}
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0 bg-white'>
                      <User className='w-6 h-6' />
                    </div>
                    <div className='flex-grow'>
                      <div className='text-[10px] font-mono text-nature-text-tertiary tracking-wider mb-1 font-bold'>
                        Employee
                      </div>
                      <div className='font-bold text-lg'>
                        {staffMembers.find((s) => s.id === selectedStaff)?.name || 'Any Staff'}
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0 bg-white'>
                      <Scissors className='w-6 h-6' />
                    </div>
                    <div className='flex-grow'>
                      <div className='text-[10px] font-mono text-nature-text-tertiary tracking-wider mb-1 font-bold'>
                        Services
                      </div>
                      {selectedServices.map((serviceId) => {
                        const service = services.find((s) => s.id === serviceId);
                        if (!service) return null;
                        return (
                          <div key={serviceId} className='font-bold text-lg'>
                            {service.name}
                          </div>
                        );
                      })}
                      <div className='font-mono text-sm text-nature-text-secondary mt-2'>
                        {totalDuration} minutes • $
                        {selectedServices.reduce((total, serviceId) => {
                          const service = services.find((s) => s.id === serviceId);
                          return total + (service?.price || 0);
                        }, 0)}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0 bg-white'>
                      <MapPin className='w-6 h-6' />
                    </div>
                    <div className='flex-grow'>
                      <div className='text-[10px] font-mono text-nature-text-tertiary tracking-wider mb-1 font-bold'>
                        Location
                      </div>
                      <div className='font-bold text-lg text-nature-text-primary'>AICOMPOS</div>
                      <div className='font-mono text-sm text-nature-text-secondary'>
                        123 Main Street, City, ST 12345
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className='w-full max-w-2xl flex flex-col sm:flex-row gap-4 mb-6'>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleBackToHome}
                  className='flex-1 bg-white border-2 border-nature-text-primary text-nature-text-primary px-6 py-4 flex items-center justify-center gap-3 font-bold tracking-widest hover:bg-nature-surface transition-colors'
                >
                  <ArrowLeft className='w-5 h-5' />
                  Back to Home
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleDownloadTicket}
                  className='flex-1 bg-nature-text-primary text-white px-6 py-4 flex items-center justify-center gap-3 font-bold tracking-widest hover:bg-nature-text-secondary transition-colors shadow-lg'
                >
                  <Download className='w-5 h-5' />
                  Download Ticket
                </motion.button>
              </motion.div>

              {/* Email Confirmation Notice */}
              <motion.div
                variants={itemVariants}
                className='w-full max-w-2xl border-2 border-dashed border-nature-text-primary/30 p-4 bg-white/50 backdrop-blur-sm'
              >
                <p className='text-center font-mono text-xs text-nature-text-tertiary'>
                  A confirmation email has been sent to john.doe@example.com
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer Metadata */}
      <footer className='w-full border-t-2 border-nature-text-primary py-8 px-6 mt-auto bg-white/80 backdrop-blur-sm'>
        <div className='max-w-[1400px] mx-auto flex justify-between items-center text-[10px] font-mono text-nature-text-tertiary tracking-widest font-bold opacity-70'>
          <div>Copyright © 2024 AICOMPOS</div>
        </div>
      </footer>
    </div>
  );
}
