import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Section from '../components/ui/Section';
import './HeroSection.css';
import { TRUST_BADGES, TrustBadgeItem } from './TrustBadges';

interface StatItem {
  icon: string;
  value: string;
  label: string;
}

interface HeroSectionProps {
  backgroundImage?: string;
  _overlayMedusaImage?: string;
  _title?: string;
  _subtitle?: string;
  _ctaButtons?: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
  _trustBadges?: TrustBadgeItem[];
  _stats?: StatItem[];
  children?: React.ReactNode;
}

export const HeroSection: React.FC<React.PropsWithChildren<HeroSectionProps>> = ({
  backgroundImage = '/hero/Medusa_tattoo_artwork.png',
  _title = 'Münchens Tattoo-Künstler am Marienplatz',
  _subtitle = '27 Jahre Erfahrung • 10.000+ Google Bewertungen • EU-Zertifiziert',
  _ctaButtons = [
    {
      text: 'Termin',
      href: '/booking',
      variant: 'primary',
    },
    {
      text: 'Preise ansehen',
      href: '/pricing',
      variant: 'secondary',
    },
  ],
  // We're now using hardcoded badges directly in the JSX
  _trustBadges = TRUST_BADGES,
  _stats = [
    { icon: '🎖️', value: '25+', label: 'Jahre' },
    { icon: '✓', value: '100%', label: 'Hygiene' },
    { icon: '🎨', value: 'EU-REACH', label: 'Farben' },
    { icon: '⭐', value: '10,000+', label: 'Reviews' },
    { icon: '🚇', value: '5 min', label: 'U/S-Bahn' },
  ],
  children, // children is now properly destructured
}) => {
  // CRITICAL FIX #3: Parallax effect for hero background
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Background moves slower (0.3 = 30% scroll speed)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div ref={heroRef} className='relative min-h-screen flex flex-col overflow-hidden'>
      <div className='absolute inset-0'>
        {/* Background layer with parallax */}
        <motion.div
          className='absolute inset-0 z-0 bg-[#222222]'
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            y: backgroundY,
            willChange: 'transform',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        />

        {/* Glass overlay layer */}
        <div className='absolute inset-0 z-0 bg-black/45' />

        {/* Content area */}
        <div className='relative z-10 flex-1 flex flex-col'>
          <Section 
            bg="none" 
            className="flex-1 flex flex-col justify-center py-16 lg:py-24"
            containerSize="default"
          >
            {children}
          </Section>
        </div>

      {/* Trust Badges Carousel - Positioned in bottom area as shown in white box */}
      <section
        className='trust-badges-wrapper'
        aria-label='Qualitätsmerkmale und Auszeichnungen'
      >
        <div className='trust-badges-container'>
          <div className='trust-badges-track animate-[scrollBadges_30s_linear_infinite]'>
            {/* First set of badges - Map through TRUST_BADGES */}
            {TRUST_BADGES.map((badge) => (
              <div key={badge.id} className='trust-badge-item'>
                <div className='badge-icon' aria-hidden='true'>
                  {badge.svg}
                </div>
                <span className='badge-text'>{badge.text}</span>
              </div>
            ))}

            {/* Duplicate set for infinite scrolling */}
            {TRUST_BADGES.map((badge) => (
              <div key={`${badge.id}-duplicate`} className='trust-badge-item'>
                <div className='badge-icon' aria-hidden='true'>
                  {badge.svg}
                </div>
                <span className='badge-text'>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default HeroSection;
