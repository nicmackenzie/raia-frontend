import { useState } from 'react';
import { inputVariants } from './Input';
import { cn } from '../../lib/utils';

const TimePicker = ({ variant, size, className, onTimeSet, id, ...props }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const timeOptions = [
    '09:00AM',
    '09:30AM',
    '10:00AM',
    '10:30AM',
    '11:00AM',
    '11:30AM',
    '12:00PM',
    '12:30PM',
    '01:00PM',
    '01:30PM',
    '02:00PM',
    '03:30PM',
    '04:00PM',
    '05:30PM',
    '06:00PM',
  ];

  const handleTimeChange = time => {
    setSelectedTime(time);
    setShowTimeDropdown(false);
    onTimeSet(time);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={selectedTime}
        onClick={() => setShowTimeDropdown(!showTimeDropdown)}
        placeholder="Select a time"
        className={cn(inputVariants({ variant, size, className }))}
        onChange={e => onTimeSet(e.target.value)}
        id={id}
        autoComplete="false"
        {...props}
      />
      {showTimeDropdown && (
        <ul className="absolute mt-2 p-2 border rounded shadow bg-white">
          {timeOptions.map((time, index) => (
            <li
              key={index}
              className="cursor-pointer py-1 px-2 hover:bg-gray-200 text-xs"
              onClick={() => handleTimeChange(time)}
            >
              {time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimePicker;
