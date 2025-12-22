import React, { Children } from 'react';
import { Calendar, Phone, User, LogOut, Check, Clock, MapPin, ArrowLeft, Download } from 'lucide-react';
import { motion } from 'framer-motion';
interface SuccessPageProps {
  onBackToHome?: () => void;
  onDownloadTicket?: () => void;
}
export function SuccessPage({
  onBackToHome,
  onDownloadTicket
}: SuccessPageProps) {
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  const checkmarkVariants = {
    hidden: {
      scale: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  };
  return <div className="min-h-screen w-full bg-nature-main flex flex-col font-sans text-nature-text-primary">
      {/* Top Navigation */}
      <nav className="w-full border-b-2 border-nature-text-primary bg-white/80 backdrop-blur-sm px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-nature-text-primary" />
            <span className="font-black text-lg tracking-tight uppercase">
              Store Name
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wider uppercase">
              <a href="#" className="flex items-center gap-2 hover:text-nature-primary transition-colors">
                <Calendar className="w-4 h-4" />
                Appointments
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-nature-primary transition-colors">
                <Phone className="w-4 h-4" />
                Contact
              </a>
            </div>

            <div className="flex items-center gap-4 pl-8 border-l-2 border-nature-text-primary">
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-nature-text-primary text-xs font-bold uppercase tracking-wider hover:bg-nature-surface transition-colors bg-white">
                <User className="w-4 h-4" />
                Profile_Name
              </button>
              <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-nature-error transition-colors">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner Area */}
      <div className="w-full bg-white/50 backdrop-blur-sm py-8 px-6 border-b-2 border-nature-text-primary">
        <div className="max-w-[1400px] mx-auto h-32 border-2 border-dashed border-nature-text-primary/30 flex items-center justify-center bg-white/50">
          <span className="font-mono text-nature-text-tertiary uppercase tracking-widest text-sm font-bold">
            Banner Image Area
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-grow w-full max-w-[1400px] mx-auto p-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Sidebar - Steps */}
        <div className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-8 space-y-8">
            {/* Step 1 - Completed */}
            <div className="flex gap-4 relative">
              <div className="absolute left-[15px] top-10 bottom-[-24px] w-[2px] bg-nature-divider/50 -z-10" />
              <div className="w-8 h-8 rounded-full border-2 border-nature-success bg-nature-success text-white flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="pt-1 pb-8">
                <div className="text-sm tracking-wide uppercase mb-1 text-nature-text-primary font-medium">
                  Appointment
                </div>
              </div>
            </div>

            {/* Step 2 - Completed */}
            <div className="flex gap-4 relative">
              <div className="absolute left-[15px] top-10 bottom-[-24px] w-[2px] bg-nature-divider/50 -z-10" />
              <div className="w-8 h-8 rounded-full border-2 border-nature-success bg-nature-success text-white flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="pt-1 pb-8">
                <div className="text-sm tracking-wide uppercase mb-1 text-nature-text-primary font-medium">
                  Appointment Confirm
                </div>
              </div>
            </div>

            {/* Step 3 - Current */}
            <div className="flex gap-4 relative">
              <div className="w-8 h-8 rounded-full border-2 border-nature-text-primary bg-nature-text-primary text-white flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">3</span>
              </div>
              <div className="pt-1">
                <div className="text-sm tracking-wide uppercase mb-1 text-nature-text-primary font-bold">
                  Success
                </div>
                <div className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-wider">
                  // Current Step
                </div>
              </div>
            </div>

            <div className="font-mono text-[10px] text-nature-text-tertiary uppercase tracking-widest font-bold mt-8">
              Progress: 100%
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
            {/* Success Icon */}
            <motion.div variants={checkmarkVariants} className="w-32 h-32 border-4 border-nature-text-primary flex items-center justify-center mb-8 relative bg-white">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-nature-text-primary" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-nature-text-primary" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-nature-text-primary" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-nature-text-primary" />

              <Check className="w-16 h-16 stroke-[3]" />
            </motion.div>

            {/* Success Message */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-4">
                Booking Confirmed
              </h1>
              <p className="text-nature-text-tertiary font-mono text-sm md:text-base tracking-wide">
                // YOUR APPOINTMENT HAS BEEN SUCCESSFULLY SCHEDULED
              </p>
            </motion.div>

            {/* Confirmation Details Card */}
            <motion.div variants={itemVariants} className="w-full max-w-2xl relative border-4 border-nature-text-primary p-8 md:p-10 bg-white shadow-2xl mb-8">
              {/* Label Tag */}
              <div className="absolute -top-[18px] left-8 bg-white border-2 border-nature-text-primary px-4 py-1 text-[10px] font-mono font-bold uppercase tracking-widest">
                Confirmation_Details
              </div>

              {/* Confirmation Number */}
              <div className="mb-8 pb-8 border-b-2 border-nature-text-primary/20">
                <div className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-wider mb-2 font-bold">
                  Confirmation Number
                </div>
                <div className="text-3xl md:text-4xl font-black tracking-tight">
                  #BK-2024-00152
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-6">
                {/* Date & Time */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0 bg-white">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-wider mb-1 font-bold">
                      Date & Time
                    </div>
                    <div className="font-bold text-lg uppercase">
                      January 15, 2024
                    </div>
                    <div className="font-mono text-sm text-nature-text-secondary">
                      09:30 AM - 10:15 AM
                    </div>
                  </div>
                </div>

                {/* Stylist */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0 bg-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-wider mb-1 font-bold">
                      Stylist
                    </div>
                    <div className="font-bold text-lg uppercase">Sarah M.</div>
                    <div className="font-mono text-sm text-nature-text-secondary">
                      Senior Stylist
                    </div>
                  </div>
                </div>

                {/* Service */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0 bg-white">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-wider mb-1 font-bold">
                      Service
                    </div>
                    <div className="font-bold text-lg uppercase">
                      Haircut & Styling
                    </div>
                    <div className="font-mono text-sm text-nature-text-secondary">
                      45 minutes • $65.00
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0 bg-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-wider mb-1 font-bold">
                      Location
                    </div>
                    <div className="font-bold text-lg uppercase">
                      Store Name
                    </div>
                    <div className="font-mono text-sm text-nature-text-secondary">
                      123 Main Street, City, ST 12345
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 mb-6">
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={onBackToHome} className="flex-1 bg-white border-2 border-nature-text-primary text-nature-text-primary px-6 py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-nature-surface transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </motion.button>

              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={onDownloadTicket} className="flex-1 bg-nature-text-primary text-white px-6 py-4 flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-nature-text-secondary transition-colors shadow-lg">
                <Download className="w-5 h-5" />
                Download Ticket
              </motion.button>
            </motion.div>

            {/* Email Confirmation Notice */}
            <motion.div variants={itemVariants} className="w-full max-w-2xl border-2 border-dashed border-nature-text-primary/30 p-4 bg-white/50 backdrop-blur-sm">
              <p className="text-center font-mono text-xs text-nature-text-tertiary">
                A confirmation email has been sent to john.doe@example.com
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer Metadata */}
      <footer className="w-full border-t-2 border-nature-text-primary py-8 px-6 mt-auto bg-white/80 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-[10px] font-mono text-nature-text-tertiary uppercase tracking-widest font-bold opacity-70">
          <div>App_Version: 0.1.0-beta</div>
          <div>Copyright © 2024 Store Name</div>
        </div>
      </footer>
    </div>;
}