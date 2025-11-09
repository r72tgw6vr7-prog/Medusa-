import React from 'react';

interface BadgeProps {
  iconUrl: string;
  text: string;
  variant?: 'default' | 'gradient';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  iconUrl,
  text,
  variant = 'default',
  className = '',
}) => {
  const gradientStyle =
    variant === 'gradient'
      ? {
          background:
            'linear-gradient(180deg, var(--brand-gold)00, var(--brand-gold)1A, var(--brand-gold)00)',
        }
      : {};

  return (
    <div className={`flex flex-col shrink-0 items-start ${className}`}>
      <img src={iconUrl} alt={text} className='w-14 h-[70px] mx-8 object-fill' />
      <span className='text-white text-[15px] mx-px'>{text}</span>
    </div>
  );
};

export default Badge;
