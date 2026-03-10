import React from 'react';

interface TrustBadgeProps {
  icon: string;
  text: string;
  className?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, text, className = '' }) => {
  return (
    <div
      className={`flex items-center gap-2 bg-(--deep-black)/60 backdrop-blur-md px-4 py-3 rounded-full border border-white/10 transition-all duration-300 hover:border-(--brand-accent)/40 hover:shadow-(--shadow-chrome-sm) ${className}`}
    >
      {icon && <img src={icon} alt='' className='w-5 h-5' aria-hidden='true' loading='lazy' width='20' height='20' decoding='async' />}
      <span className='text-luxury-text-inverse font-medium text-(length:--text-sm) font-body whitespace-nowrap'>
        {text}
      </span>
    </div>
  );
};

export default TrustBadge;
