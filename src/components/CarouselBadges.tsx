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
    <section
      className='carousel-badges-section'
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: '#000000',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: 0,
        margin: 0,
      }}
    >
      <div
        className='w-full h-full'
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'nowrap',
          }}
        >
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={badge.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)')}
              >
                <div style={{ width: '20px', height: '20px', flexShrink: 0, color: '#ffffff' }}>
                  <IconComponent className='w-full h-full' />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    lineHeight: '1.2',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {badge.title}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {badge.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CarouselBadges;
