import React from 'react';
import { Calendar, Phone, User, LogOut, Scissors, ArrowLeft, Check, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { StepIndicator } from '../components/StepIndicator';
interface AppointmentSelectionPageProps {
  onBack?: () => void;
  onConfirm?: () => void;
}
export function AppointmentSelectionPage({
  onBack,
  onConfirm
}: AppointmentSelectionPageProps) {
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
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-nature-text-primary text-xs font-bold uppercase tracking-wider hover:bg-nature-surface transition-colors">
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
          <div className="sticky top-8">
            <div className="mb-12">
              <StepIndicator number={1} title="Appointment" status="completed" />
              <StepIndicator number={2} title="Appointment Confirm" subtitle="// Current Step" status="current" />
              <StepIndicator number={3} title="Success" status="upcoming" isLast />
            </div>

            <div className="font-mono text-[10px] text-nature-text-tertiary uppercase tracking-widest font-bold">
              Progress: 67%
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="relative border-2 border-nature-text-primary p-8 md:p-12 bg-white shadow-xl">
            {/* Step Label Tag */}
            <div className="absolute -top-[14px] left-8 bg-nature-text-primary text-white px-4 py-1 text-[10px] font-mono font-bold uppercase tracking-widest">
              Booking_Summary
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-12">
              Review Your Booking
            </h1>

            {/* Booking Details */}
            <div className="space-y-8 mb-12">
              {/* Date & Time */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg uppercase mb-1">
                        January 15, 2024
                      </h3>
                      <p className="font-mono text-sm text-nature-text-secondary">
                        09:30 AM - 10:15 AM
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-widest font-bold px-3 py-1 border border-nature-text-primary/20 bg-nature-surface/50">
                      Appointment_Time
                    </span>
                  </div>
                </div>
              </div>

              {/* Staff Member */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg uppercase mb-1">
                        Sarah M.
                      </h3>
                      <p className="font-mono text-sm text-nature-text-secondary">
                        Senior Stylist
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-widest font-bold px-3 py-1 border border-nature-text-primary/20 bg-nature-surface/50">
                      Assigned_Staff
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0">
                  <Scissors className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg uppercase mb-1">
                        Haircut & Styling
                      </h3>
                      <p className="font-mono text-sm text-nature-text-secondary">
                        Duration: 45 minutes
                      </p>
                      <p className="font-mono text-sm text-nature-text-secondary">
                        Price: $65.00
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-widest font-bold px-3 py-1 border border-nature-text-primary/20 bg-nature-surface/50">
                      Service_Details
                    </span>
                  </div>
                </div>
              </div>

              {/* Client Information */}
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 border-2 border-nature-text-primary flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg uppercase mb-1">
                        John Doe
                      </h3>
                      <p className="font-mono text-sm text-nature-text-secondary">
                        +1 (555) 123-4567
                      </p>
                      <p className="font-mono text-sm text-nature-text-secondary">
                        john.doe@example.com
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-widest font-bold px-3 py-1 border border-nature-text-primary/20 bg-nature-surface/50">
                      Client_Info
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-nature-text-primary mb-8" />

            {/* Action Footer */}
            <div className="flex justify-between items-center gap-4">
              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={onBack} className="bg-white border-2 border-nature-text-primary text-nature-text-primary px-8 py-4 flex items-center gap-3 font-bold uppercase tracking-widest hover:bg-nature-surface transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back
              </motion.button>

              <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={onConfirm} className="bg-nature-text-primary text-white px-8 py-4 flex items-center gap-3 font-bold uppercase tracking-widest hover:bg-nature-text-secondary transition-colors shadow-lg">
                Confirm Booking
                <Check className="w-5 h-5" />
              </motion.button>
            </div>
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