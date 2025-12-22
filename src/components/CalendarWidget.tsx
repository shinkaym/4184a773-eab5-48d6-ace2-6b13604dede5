import { ChevronLeft, ChevronRight } from 'lucide-react';
export function CalendarWidget() {
  const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  // Simplified calendar data for Jan 2024
  const dates = [{
    day: '',
    disabled: true
  }, {
    day: '1',
    disabled: false
  }, {
    day: '2',
    disabled: false
  }, {
    day: '3',
    disabled: false
  }, {
    day: '4',
    disabled: false,
    selected: true
  }, {
    day: '5',
    disabled: false
  }, {
    day: '6',
    disabled: false
  }, {
    day: '7',
    disabled: false
  }, {
    day: '8',
    disabled: false
  }, {
    day: '9',
    disabled: false
  }, {
    day: '10',
    disabled: false
  }, {
    day: '11',
    disabled: false
  }, {
    day: '12',
    disabled: false
  }, {
    day: '13',
    disabled: false
  }, {
    day: '14',
    disabled: false
  }, {
    day: '15',
    disabled: false,
    highlighted: true
  }, {
    day: '16',
    disabled: false
  }, {
    day: '17',
    disabled: false
  }, {
    day: '18',
    disabled: false
  }, {
    day: '19',
    disabled: false
  }, {
    day: '20',
    disabled: false
  }, {
    day: '21',
    disabled: false
  }, {
    day: '22',
    disabled: false
  }, {
    day: '23',
    disabled: false
  }, {
    day: '24',
    disabled: false
  }, {
    day: '25',
    disabled: false
  }, {
    day: '26',
    disabled: false
  }, {
    day: '27',
    disabled: false
  }, {
    day: '28',
    disabled: false
  }, {
    day: '29',
    disabled: false
  }, {
    day: '30',
    disabled: false
  }, {
    day: '31',
    disabled: false
  }];
  return (
    <div className='border border-nature-divider rounded-lg p-6 bg-white'>
      <div className='flex items-center justify-between mb-6'>
        <button className='p-1 hover:bg-nature-surface rounded transition-colors'>
          <ChevronLeft className='w-4 h-4 text-nature-text-secondary' />
        </button>
        <span className='font-mono font-bold text-sm tracking-widest'>Jan 2024</span>
        <button className='p-1 hover:bg-nature-surface rounded transition-colors'>
          <ChevronRight className='w-4 h-4 text-nature-text-secondary' />
        </button>
      </div>

      <div className='grid grid-cols-7 gap-y-4 text-center'>
        {days.map((day) => (
          <div key={day} className='text-[10px] font-mono text-nature-text-tertiary'>
            {day}
          </div>
        ))}

        {dates.map((date, i) => (
          <div key={i} className='flex justify-center'>
            {date.day && (
              <button
                className={`
                  w-8 h-8 text-sm flex items-center justify-center rounded-sm transition-all
                  ${date.highlighted ? 'bg-nature-text-primary text-white font-bold' : ''}
                  ${date.selected ? 'font-bold border-b-2 border-nature-text-primary' : ''}
                  ${!date.highlighted && !date.selected ? 'text-nature-text-secondary hover:bg-nature-surface' : ''}
                `}
              >
                {date.day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}