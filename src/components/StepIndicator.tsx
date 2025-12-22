import React from 'react';
import { Check } from 'lucide-react';
interface StepProps {
  number: number;
  title: string;
  subtitle?: string;
  status: 'current' | 'completed' | 'upcoming';
  isLast?: boolean;
}
export function StepIndicator({
  number,
  title,
  subtitle,
  status,
  isLast
}: StepProps) {
  const getCircleStyles = () => {
    switch (status) {
      case 'current':
        return 'bg-nature-text-primary text-white border-nature-text-primary';
      case 'completed':
        return 'bg-nature-success text-white border-nature-success';
      case 'upcoming':
        return 'bg-transparent text-nature-text-tertiary border-nature-divider';
    }
  };
  const getTextStyles = () => {
    switch (status) {
      case 'current':
        return 'text-nature-text-primary font-bold';
      case 'completed':
        return 'text-nature-text-primary font-medium';
      case 'upcoming':
        return 'text-nature-text-tertiary font-medium';
    }
  };
  return <div className="flex gap-4 relative">
      {/* Vertical Line */}
      {!isLast && <div className="absolute left-[15px] top-10 bottom-[-24px] w-[2px] bg-nature-divider/50 -z-10" />}

      {/* Circle Indicator */}
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${getCircleStyles()}`}>
        {status === 'completed' ? <Check className="w-4 h-4" /> : <span className="text-sm font-bold">{number}</span>}
      </div>

      {/* Text Content */}
      <div className="pt-1 pb-8">
        <div className={`text-sm tracking-wide uppercase mb-1 ${getTextStyles()}`}>
          {title}
        </div>
        {subtitle && <div className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-wider">
            {subtitle}
          </div>}
      </div>
    </div>;
}