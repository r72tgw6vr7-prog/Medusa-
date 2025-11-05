import React from 'react';

interface TrustBadgeProps {
  icon: string;
  text: string;
  className?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, text, className = '' }) => {
  return (
    <div
      className={`flex items-center gap-2 bg-[var(--deep-black)]/60 backdrop-blur-md px-4 py-3 rounded-full border border-white/10 transition-all duration-300 hover:border-[var(--brand-gold)]/40 hover:shadow-[0_0_10px_rgba(212,175,55,0.2)] ${className}`}
    >
      {icon && <img src={icon} alt='' className='w-5 h-5' aria-hidden='true' />}
      <span className='text-white font-medium text-sm whitespace-nowrap'>{text}</span>
    </div>
  );
};

export default TrustBadge;
