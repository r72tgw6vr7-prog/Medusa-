import { Shield, Award, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import './TrustSignals.css';

/**
 * TrustSignals Component - 4-Card Horizontal Metallic Neon Design
 *
 * Features:
 * - 4 horizontal cards with metallic surface materials
 * - World-class neon glowing light effects on hover
 * - Premium hover states with light expansion
 * - Responsive: desktop row → mobile stack
 *
 * BRAND COMPLIANCE:
 * - Black background (deep-black)
 * - White text (brand-white)
 * - Neon cyan glow effects
 */

type TrustBadge = {
  icon: typeof Shield;
  title: string;
  stat: string;
  description: string;
  ariaLabel: string;
};

const TRUST_BADGES: TrustBadge[] = [
  {
    icon: Shield,
    title: 'Zertifizierte Qualität',
    stat: '100%',
    description: 'EU-Hygienezertifiziertes Studio & Verband anerkannt.',
    ariaLabel: 'Zertifiziert nach EU-Hygienestandards',
  },
  {
    icon: Award,
    title: 'Bewährte Erfahrung',
    stat: '25+',
    description: 'Über 25 Jahre preisgekrönte Tattoo-Expertise.',
    ariaLabel: 'Über 25 Jahre Erfahrung',
  },
  {
    icon: Heart,
    title: 'Premium Nachsorge',
    stat: '5000+',
    description: '5 000+ Kunden betreut mit persönlicher Heilungshilfe.',
    ariaLabel: 'Premium Nachsorge und Support',
  },
  {
    icon: Star,
    title: 'Qualitätsgarantie',
    stat: '100%',
    description: 'Lebenslange Garantie auf Farbe & Handwerkskunst.',
    ariaLabel: 'Qualitätsgarantie',
  },
];

export function TrustSignals() {
  return (
    <section className='py-32'>
      <div className='max-w-7xl mx-auto px-8'>
        {/* 4-Card Horizontal Grid */}
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12'>
          {TRUST_BADGES.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                className='cool-lines-card chrome-card group relative flex flex-col items-center text-center h-full p-(--space-4) md:p-8 transition-all duration-500 bg-(--card-bg) border border-(--card-border) rounded-(--card-radius)'
                initial={{ opacity: 0, y: 40 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }}
                viewport={{ once: true, margin: '-50px' }}
                style={{ boxShadow: 'var(--card-shadow-depth), var(--card-shadow-glow)' }}
                whileHover={{
                  boxShadow:
                    'var(--card-shadow-depth), var(--card-shadow-hover-glow), var(--card-shadow-inner)',
                }}
                role='group'
                aria-label={badge.ariaLabel}
              >
                {/* Icon */}
                <motion.div
                  className='mb-(--space-4) md:mb-8 flex items-center justify-center'
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className='trust-signals__icon-glow w-8 h-8 text-white' />
                </motion.div>

                {/* Stat */}
                <div className='font-headline text-(length:--text-h3) md:text-(length:--text-h2) font-light text-white mb-4 leading-(--line-height-tight)'>
                  {badge.stat}
                </div>

                {/* Title */}
                <h3 className='font-body text-(length:--text-label) uppercase tracking-widest text-brand-chrome/80 font-semibold mb-2 transition-colors duration-500'>
                  {badge.title}
                </h3>

                {/* Description */}
                <p className='font-body text-(length:--text-sm) lg:text-(length:--text-xs) text-brand-chrome/70 leading-(--line-height-normal)'>
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
