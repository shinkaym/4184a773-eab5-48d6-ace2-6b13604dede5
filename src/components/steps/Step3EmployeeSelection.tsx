import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Check, Search } from 'lucide-react';
import { staffMembers } from '../../data/bookingData';

interface Step3EmployeeSelectionProps {
  selectedEmployee: string | null;
  onEmployeeChange: (employeeId: string) => void;
}

export function Step3EmployeeSelection({ selectedEmployee, onEmployeeChange }: Step3EmployeeSelectionProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter employees based on search query
  const filteredStaff = staffMembers
    .filter((staff) => staff.id !== 'any')
    .filter((staff) => staff.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-soft bg-gradient-to-br from-nature-primary/20 to-nature-secondary/20 mb-6"
        >
          <Users className="w-8 h-8 text-nature-primary" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-display font-semibold tracking-tight text-nature-text-primary mb-4">
          Select Your Employee
        </h2>
        <p className="text-nature-text-secondary text-lg font-light">Choose your preferred staff member</p>
      </div>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-8 max-w-md mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nature-text-tertiary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-nature-divider rounded-soft text-nature-text-primary placeholder:text-nature-text-tertiary focus:outline-none focus:ring-2 focus:ring-nature-primary focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-nature-text-tertiary hover:text-nature-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>

      {/* Employee Grid */}
      {filteredStaff.length === 0 ? (
        <div className="border-2 border-dashed border-nature-divider rounded-softer p-12 text-center bg-nature-surface/30">
          <Users className="w-12 h-12 mx-auto mb-4 text-nature-text-tertiary" />
          <p className="text-nature-text-tertiary text-sm">No employees found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStaff.map((staff, index) => {
            const isSelected = selectedEmployee === staff.id;

            return (
              <motion.button
                key={staff.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => onEmployeeChange(staff.id)}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  group relative bg-white rounded-softer p-6 cursor-pointer transition-all duration-300
                  ${
                    isSelected
                      ? 'ring-4 ring-nature-primary ring-offset-4 shadow-soft-xl'
                      : 'shadow-soft hover:shadow-soft-lg'
                  }
                `}
              >
                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-3 -right-3 w-10 h-10 bg-nature-primary rounded-full flex items-center justify-center shadow-soft-lg z-10"
                  >
                    <Check className="w-6 h-6 text-white stroke-[3]" />
                  </motion.div>
                )}

                {/* Employee Image */}
                <div className="relative mb-4 mx-auto w-32 h-32">
                  <div className="relative w-full h-full">
                    <img
                      src={staff.image}
                      alt={staff.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-soft"
                    />
                    {/* Hover overlay */}
                    <div
                      className={`
                        absolute inset-0 rounded-full transition-all duration-300
                        ${isSelected ? 'bg-nature-primary/20' : 'bg-transparent group-hover:bg-nature-primary/10'}
                      `}
                    />
                  </div>
                </div>

                {/* Employee Name */}
                <div className="text-center">
                  <h3
                    className={`
                      text-lg font-semibold tracking-tight transition-colors duration-300
                      ${isSelected ? 'text-nature-primary' : 'text-nature-text-primary group-hover:text-nature-primary'}
                    `}
                  >
                    {staff.name}
                  </h3>
                </div>

                {/* Background decoration */}
                <div
                  className={`
                    absolute bottom-0 right-0 w-20 h-20 rounded-tl-full transition-all duration-500 origin-bottom-right
                    ${isSelected ? 'bg-nature-primary/10 scale-150' : 'bg-nature-accent/5 group-hover:scale-150'}
                  `}
                />
              </motion.button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
