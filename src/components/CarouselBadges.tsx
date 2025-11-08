// ============================================
// COMPONENT: CarouselBadges - Trust Strip
// ============================================
// PURPOSE: Display 5 trust badges in horizontal strip below StudioCarousel
// DESIGN: Matches provided screenshot - clean, minimal, white on dark

import React from 'react';
import { Award, Shield, Link2, Star, Clock } from 'lucide-react';
// Section removed to prevent default vertical padding

interface Badge {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}

const badges: Badge[] = [
  {
    id: 'years',
    icon: Award,
    title: '25+',
    subtitle: 'Jahre',
  },
  {
    id: 'hygiene',
    icon: Shield,
    title: '100%',
    subtitle: 'Hygiene',
  },
  {
    id: 'eu-reach',
    icon: Link2,
    title: 'EU-REACH',
    subtitle: 'Farben',
  },
  {
    id: 'customers',
    icon: Star,
    title: '10,000+',
    subtitle: 'Kunden',
  },
  {
    id: 'location',
    icon: Clock,
    title: '5 min',
    subtitle: 'U/S-Bahn',
  },
];

export const CarouselBadges: React.FC = () => {
  return (
    <section className='carousel-badges-section py-0 bg-transparent'>
      <div className='w-full bg-black/30 border-y border-white/5 py-0'>
        <div className='max-w-[1104px] mx-auto px-8'>
          <div className='flex flex-wrap justify-center items-center gap-16 md:gap-16 lg:gap-24'>
            {badges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div
                  key={badge.id}
                  className='flex items-center gap-8 text-white/90 hover:text-white transition-colors duration-300'
                >
                  <IconComponent className='w-8 h-8 md:w-9 md:h-9 text-white shrink-0' />
                  <div className='flex flex-col leading-tight'>
                    <span className='font-inter text-base md:text-lg font-semibold whitespace-nowrap'>
                      {badge.title}
                    </span>
                    <span className='font-inter text-sm md:text-base text-white/70 whitespace-nowrap'>
                      {badge.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselBadges;
