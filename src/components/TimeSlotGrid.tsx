import React from 'react';
interface TimeSlotGridProps {
  selectedTime?: string;
  onSelect: (time: string) => void;
}
export function TimeSlotGrid({
  selectedTime,
  onSelect
}: TimeSlotGridProps) {
  const morningSlots = ['09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM', '11:30 AM'];
  const afternoonSlots = ['01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM', '04:00 PM'];
  const SlotButton = ({
    time,
    disabled = false
  }: {
    time: string;
    disabled?: boolean;
  }) => <button onClick={() => !disabled && onSelect(time)} disabled={disabled} className={`
        w-full py-3 px-2 text-xs font-mono border rounded transition-all
        ${selectedTime === time ? 'bg-nature-text-primary text-white border-nature-text-primary font-bold' : disabled ? 'bg-nature-surface/50 text-nature-text-tertiary/30 border-nature-divider/30 cursor-not-allowed decoration-slice line-through' : 'bg-white text-nature-text-secondary border-nature-divider hover:border-nature-text-primary hover:bg-nature-surface'}
      `}>
      {time}
    </button>;
  return <div className="space-y-6">
      <div>
        <h5 className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-widest mb-3">
          Morning
        </h5>
        <div className="grid grid-cols-3 gap-3">
          {morningSlots.map(time => <SlotButton key={time} time={time} disabled={time === '11:00 AM'} />)}
        </div>
      </div>

      <div>
        <h5 className="text-[10px] font-mono text-nature-text-tertiary uppercase tracking-widest mb-3">
          Afternoon
        </h5>
        <div className="grid grid-cols-3 gap-3">
          {afternoonSlots.map(time => <SlotButton key={time} time={time} />)}
        </div>
      </div>
    </div>;
}