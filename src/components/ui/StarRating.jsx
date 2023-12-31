import { useState } from 'react';
import { cn } from '../../lib/utils';

function StarRating({
  maxRating = 5,
  defaultRating = 0,
  isClickable = true,
  displayValue = true,
  size = 'default',
  onRate,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onRate(rating);
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onClick={() => isClickable && handleRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => isClickable && setTempRating(i + 1)}
            onHoverOut={() => isClickable && setTempRating(0)}
            isClickable={isClickable}
            size={size}
          />
        ))}
      </div>
      {displayValue && (
        <span
          className={cn(
            'text-tertiary font-semibold',
            size === 'default' ? 'text-xs' : 'text-base'
          )}
        >
          {tempRating || rating || ''}
        </span>
      )}
    </div>
  );
}

function Star({ onClick, full, onHoverIn, onHoverOut, isClickable, size }) {
  const dimensions = size === 'default' ? 'w-4 h-4' : 'w-8 h-8';
  return (
    <span
      className={cn(
        'block text-gold',
        isClickable && 'cursor-pointer',
        dimensions
      )}
      role="button"
      onClick={onClick}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#fbb03b"
          stroke="#fbb03b"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fbb03b"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

export default StarRating;
