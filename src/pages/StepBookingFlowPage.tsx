import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, LogOut } from 'lucide-react';
import logo from '../assets/images/logo.jpg';
import { ArrowButton } from '../components/ArrowButton';
import { Step1DateSelection } from '../components/steps/Step1DateSelection';
import { Step2BookingType } from '../components/steps/Step2BookingType';
import { Step3EmployeeSelection } from '../components/steps/Step3EmployeeSelection';
import { Step4ServiceSelection } from '../components/steps/Step4ServiceSelection';
import { Step5TimeSelection } from '../components/steps/Step5TimeSelection';
import { Step6Review } from '../components/steps/Step6Review';
import { Step7Completion } from '../components/steps/Step7Completion';

type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export function StepBookingFlowPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);

  // Form state
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [bookingType, setBookingType] = useState<'unassigned' | 'scheduled' | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Customer info (hardcoded for now)
  const customerName = 'John Wick';
  const customerPhone = '(555) 123-4567';

  // Reset employee selection when booking type is unassigned
  useEffect(() => {
    if (bookingType === 'unassigned') {
      setSelectedEmployee(null);
    }
  }, [bookingType]);

  const handleNext = () => {
    if (currentStep < 7) {
      // Skip employee selection (step 3) if booking type is unassigned
      if (currentStep === 2 && bookingType === 'unassigned') {
        setCurrentStep(4);
      } else {
        setCurrentStep((currentStep + 1) as StepNumber);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      // Skip employee selection (step 3) when going back if booking type is unassigned
      if (currentStep === 4 && bookingType === 'unassigned') {
        setCurrentStep(2);
      } else {
        setCurrentStep((currentStep - 1) as StepNumber);
      }
    } else {
      navigate('/');
    }
  };

  const handleFinish = () => {
    setCurrentStep(7);
  };

  const handleDownloadTicket = () => {
    // Logic to download ticket would go here
    console.log('Downloading ticket...');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleBackToHome = () => {
    // Reset all booking state
    setCurrentStep(1);
    setSelectedDate(new Date());
    setBookingType(null);
    setSelectedEmployee(null);
    setSelectedServices([]);
    setSelectedTime(null);
  };

  const totalDuration = selectedServices.reduce((total, serviceId) => {
    const services = [
      { id: 'manicure', duration: 30 },
      { id: 'pedicure', duration: 45 },
      { id: 'gel-polish', duration: 60 },
      { id: 'acrylic-nails', duration: 90 },
      { id: 'nail-art', duration: 30 },
      { id: 'spa-treatment', duration: 60 },
    ];
    const service = services.find((s) => s.id === serviceId);
    return total + (service?.duration || 0);
  }, 0);

  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return !selectedDate;
      case 2:
        return !bookingType;
      case 3:
        // Employee selection is only required for scheduled bookings
        return bookingType === 'scheduled' && !selectedEmployee;
      case 4:
        return selectedServices.length === 0;
      case 5:
        return !selectedTime;
      case 6:
        return false;
      default:
        return false;
    }
  };

  const getNextButtonText = () => {
    if (currentStep === 6) return 'Finish';
    if (currentStep === 7) return 'Done';
    return 'Next Step';
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
  };

  const handleStepChange = (newStep: StepNumber) => {
    paginate(newStep > currentStep ? 1 : -1);
    setCurrentStep(newStep);
  };

  return (
    <div className="min-h-screen w-full bg-nature-main flex flex-col font-sans text-nature-text-primary">
      {/* Hero Banner */}
      <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/nailsalon/1920/800"
            alt="Nail Salon Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 w-full px-6 py-6">
          <div className="max-w-[1400px] mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={logo} alt="AICOMPOS Logo" className="h-10 w-auto rounded-soft shadow-soft" />
              <span className="font-display text-2xl font-semibold tracking-tight text-white drop-shadow-lg">
                AICOM<span className="text-nature-primary">POS</span>
              </span>
            </div>

            <div className="flex items-center gap-4 pl-6 border-l border-white/30">
              <button className="flex items-center gap-2 px-4 py-2 rounded-soft bg-white/10 backdrop-blur-md text-sm font-medium text-white hover:bg-white/20 transition-all">
                <User className="w-4 h-4" />
                John Wick
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-nature-error transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center -mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-display font-semibold tracking-tight text-white mb-5 drop-shadow-lg leading-tight">
              Book Your
              <br />
              Appointment
            </h1>
            <p className="text-white/90 text-lg font-light max-w-2xl leading-relaxed">
              Follow these simple steps to schedule your perfect beauty experience
            </p>
          </motion.div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-nature-divider shadow-soft">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Date' },
              { num: 2, label: 'Type' },
              { num: 3, label: 'Employee' },
              { num: 4, label: 'Services' },
              { num: 5, label: 'Time' },
              { num: 6, label: 'Review' },
              { num: 7, label: 'Done' },
            ].map((step, index) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                      ${
                        currentStep === step.num
                          ? 'bg-nature-primary text-white shadow-soft scale-110'
                          : currentStep > step.num
                          ? 'bg-nature-secondary text-white'
                          : 'bg-nature-surface text-nature-text-tertiary border-2 border-nature-divider'
                      }
                    `}
                  >
                    {currentStep > step.num ? '✓' : step.num}
                  </div>
                  <div
                    className={`
                      mt-2 text-xs font-medium transition-colors duration-300
                      ${
                        currentStep === step.num
                          ? 'text-nature-primary'
                          : currentStep > step.num
                          ? 'text-nature-secondary'
                          : 'text-nature-text-tertiary'
                      }
                    `}
                  >
                    {step.label}
                  </div>
                </div>
                {index < 6 && (
                  <div className="flex-1 h-1 mx-2 relative">
                    <div className="absolute inset-0 bg-nature-divider rounded-full" />
                    <div
                      className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        currentStep > step.num ? 'bg-nature-secondary' : 'bg-transparent'
                      }`}
                      style={{ width: currentStep > step.num ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow w-full max-w-7xl mx-auto p-6 md:py-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-nature-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-nature-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        {/* Step Content with Slide Animation */}
        <div className="relative z-10 min-h-[600px] flex flex-col">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex-grow"
            >
              {currentStep === 1 && <Step1DateSelection selectedDate={selectedDate} onDateChange={setSelectedDate} />}
              {currentStep === 2 && <Step2BookingType selectedType={bookingType} onTypeChange={setBookingType} />}
              {currentStep === 3 && (
                <Step3EmployeeSelection selectedEmployee={selectedEmployee} onEmployeeChange={setSelectedEmployee} />
              )}
              {currentStep === 4 && (
                <Step4ServiceSelection selectedServices={selectedServices} onServicesChange={setSelectedServices} />
              )}
              {currentStep === 5 && (
                <Step5TimeSelection
                  selectedTime={selectedTime}
                  onTimeChange={setSelectedTime}
                  serviceDuration={totalDuration}
                />
              )}
              {currentStep === 6 && (
                <Step6Review
                  customerName={customerName}
                  customerPhone={customerPhone}
                  selectedDate={selectedDate}
                  bookingType={bookingType}
                  selectedEmployee={selectedEmployee}
                  selectedServices={selectedServices}
                  selectedTime={selectedTime}
                />
              )}
              {currentStep === 7 && (
                <Step7Completion
                  customerName={customerName}
                  customerPhone={customerPhone}
                  selectedDate={selectedDate}
                  bookingType={bookingType}
                  selectedEmployee={selectedEmployee}
                  selectedServices={selectedServices}
                  selectedTime={selectedTime}
                  onDownloadTicket={handleDownloadTicket}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 7 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between items-center mt-12 pt-8 border-t border-nature-divider"
            >
              <ArrowButton direction="left" text="Back" onClick={handleBack} />
              <ArrowButton
                direction="right"
                text={getNextButtonText()}
                onClick={currentStep === 6 ? handleFinish : handleNext}
                disabled={isNextDisabled()}
              />
            </motion.div>
          )}

          {/* Done Button for Step 7 */}
          {currentStep === 7 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center items-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToHome}
                className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-nature-primary text-nature-primary rounded-soft font-medium hover:bg-nature-primary/5 transition-all shadow-soft"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-nature-divider py-8 px-6 mt-auto bg-white/50 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-xs text-nature-text-tertiary font-light tracking-wide">
          <div>Copyright © 2024 AICOMPOS</div>
          <div>Step {currentStep} of 7</div>
        </div>
      </footer>
    </div>
  );
}
