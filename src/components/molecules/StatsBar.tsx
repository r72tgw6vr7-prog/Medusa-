import React from 'react';

interface StatItem {
  icon: string;
  value: string;
  label: string;
}

interface StatsBarProps {
  stats: StatItem[];
  className?: string;
}

export const StatsBar: React.FC<StatsBarProps> = ({ stats, className = '' }) => {
  return (
    <div
      className={`w-full bg-[var(--deep-black)]/80 backdrop-blur-sm border-t border-b border-white/10 py-4 ${className}`}
    >
      <div className='container mx-auto'>
        <div className='flex flex-wrap justify-between items-center gap-8 md:gap-8'>
          {stats.map((stat, index) => (
            <div
              key={`stat-${index}`}
              className='flex flex-col items-center justify-center text-center flex-1 min-w-[150px] md:min-w-0'
            >
              <img src={stat.icon} alt='' className='w-8 h-8 mb-0' aria-hidden='true' />
              <p className='text-[var(--brand-gold)] font-bold text-xl md:text-2xl'>{stat.value}</p>
              <p className='text-white text-sm'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
