// ============================================
// COMPONENT: CarouselBadges - Trust Strip
// ============================================
// PURPOSE: Display 5 trust badges in horizontal strip below StudioCarousel
// DESIGN: Matches provided screenshot - clean, minimal, white on dark

import React from 'react';
import { Award, Shield, Link2, Star, Clock } from 'lucide-react';
import Section from './ui/Section';

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
    <Section bg="dark" className="py-0">
      {/* Dark Stripe Bar - Contrasts with background */}
      <div className='w-full bg-[#0F0F0F] border-y border-white/5'>
        <div className='py-8 md:py-16'>
          {/* Horizontal Trust Strip - White badges on dark stripe */}
          <div className='flex flex-wrap justify-center items-center gap-16 md:gap-16 lg:gap-24'>
            {badges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div
                  key={badge.id}
                  className='flex items-center gap-8 text-white/90 hover:text-white transition-colors duration-300'
                >
                  {/* Icon - Bigger */}
                  <IconComponent className='w-8 h-8 md:w-9 md:h-9 text-white shrink-0' />

                  {/* Text - Bigger */}
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
    </Section>
  );
};

export default CarouselBadges;
