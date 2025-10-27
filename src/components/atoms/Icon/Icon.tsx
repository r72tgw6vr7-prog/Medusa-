import React from 'react';

interface IconProps {
  name: string; // Icon identifier
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'currentColor',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <span className={`inline-flex items-center justify-center ${sizeStyles[size]} ${className}`}>
      <img
        src={`/assets/icons/${name}.svg`}
        alt={name}
        className='w-full h-full'
        style={{ color }}
      />
    </span>
  );
};

export default Icon;
