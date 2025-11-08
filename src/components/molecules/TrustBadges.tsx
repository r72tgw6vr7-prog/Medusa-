import React from 'react';
import { TRUST_BADGES } from '../../sections/TrustBadges';
import styles from '../organisms/OurArtists.module.css';

interface TrustBadgesProps {
  className?: string;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ className = '' }) => {
  return (
    <section className={`w-full py-4 md:py-6 bg-black/80 ${className}`} data-texture-bg>
      <div className='max-w-[1104px] mx-auto px-8 md:px-8'>
        {/* Trust Badges Section - Animated from right to left */}
        <div className='relative overflow-hidden'>
          <div
            className='flex gap-8 md:gap-8 animate-[scrollBadges_30s_linear_infinite] w-fit hover:animation-pause transition duration-200 ease-out'
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 64px, black calc(100% - 64px), transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 64px, black calc(100% - 64px), transparent 100%)',
            }}
          >
            {/* First set of badges */}
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.id}
                className='flex flex-row items-center gap-0 md:gap-8 min-w-48 md:min-w-60 h-16 md:h-[92px] px-0 md:px-8 shrink-0'
              >
                {/* Gold Badge Icon */}
                <div className='w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full border-2 border-[var(--brand-gold)] bg-[var(--brand-gold)]/15 p-0 md:p-0 transition-all duration-300 hover:scale-105 hover:bg-[var(--brand-gold)]/25 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3),0_0_25px_rgba(212,175,55,0.5)] shrink-0'>
                  {badge.svg}
                </div>
                {/* Badge Text */}
                <span className='text-white font-inter text-xs md:text-sm font-semibold text-left leading-tight flex-1 min-w-0'>
                  {badge.text}
                </span>
              </div>
            ))}

            {/* Duplicate set for infinite scrolling */}
            {TRUST_BADGES.map((badge) => (
              <div
                key={`${badge.id}-duplicate`}
                className='flex flex-row items-center gap-0 md:gap-8 min-w-48 md:min-w-60 h-16 md:h-[92px] px-0 md:px-8 shrink-0'
              >
                {/* Gold Badge Icon */}
                <div className='w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full border-2 border-[var(--brand-gold)] bg-[var(--brand-gold)]/15 p-0 md:p-0 transition-all duration-300 hover:scale-105 hover:bg-[var(--brand-gold)]/25 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3),0_0_25px_rgba(212,175,55,0.5)] shrink-0'>
                  {badge.svg}
                </div>
                {/* Badge Text */}
                <span className='text-white font-inter text-xs md:text-sm font-semibold text-left leading-tight flex-1 min-w-0'>
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
