import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

/**
 * Loading spinner component with customizable size and color
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'var(--brand-gold)',
  className = '',
}) => {
  // Size mapping
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-40 h-40',
  };

  const sizePx = {
    sm: 16,
    md: 24,
    lg: 40,
  };

  return (
    <div className={`flex justify-center items-center ${className}`} aria-label="Loading">
      <svg
        className={`animate-spin ${sizeMap[size]}`}
        xmlns="http://www.w3.org/2000/svg"
        width={sizePx[size]}
        height={sizePx[size]}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
        <path 
          d="M12 2a10 10 0 0 1 10 10" 
          stroke="currentColor"
          strokeOpacity="0.75"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
