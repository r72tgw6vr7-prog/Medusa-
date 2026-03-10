import { Shield, Award, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
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

const TRUST_BADGES: Record<'de' | 'en', TrustBadge[]> = {
  de: [
    {
      icon: Shield,
      title: 'Zertifizierte Qualität',
      stat: '100%',
      description: 'EU-hygienezertifiziertes Studio und anerkannte Branchenstandards.',
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
      description: 'Mehr als 5.000 Kundinnen und Kunden mit persönlicher Heilungshilfe begleitet.',
      ariaLabel: 'Premium Nachsorge und Support',
    },
    {
      icon: Star,
      title: 'Qualitätsgarantie',
      stat: '100%',
      description: 'Lebenslange Garantie auf Farbe und Handwerkskunst.',
      ariaLabel: 'Qualitätsgarantie',
    },
  ],
  en: [
    {
      icon: Shield,
      title: 'Certified Quality',
      stat: '100%',
      description: 'EU hygiene-certified studio with recognised professional standards.',
      ariaLabel: 'Certified to EU hygiene standards',
    },
    {
      icon: Award,
      title: 'Proven Experience',
      stat: '25+',
      description: 'More than 25 years of award-winning tattoo expertise.',
      ariaLabel: 'More than 25 years of experience',
    },
    {
      icon: Heart,
      title: 'Premium Aftercare',
      stat: '5000+',
      description: 'Over 5,000 clients supported with personal healing guidance.',
      ariaLabel: 'Premium aftercare and support',
    },
    {
      icon: Star,
      title: 'Quality Guarantee',
      stat: '100%',
      description: 'Lifetime commitment to colour integrity and craftsmanship.',
      ariaLabel: 'Quality guarantee',
    },
  ],
};

export function TrustSignals() {
  const { language } = useLanguage();
  const badges = TRUST_BADGES[language];

  return (
    <section className='py-32'>
      <div className='max-w-7xl mx-auto px-8'>
        {/* 4-Card Horizontal Grid */}
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12'>
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                className='cool-lines-card chrome-card premium-interactive group relative flex h-full flex-col items-center rounded-(--card-radius) border border-(--card-border) bg-(--card-bg) p-(--space-4) text-center md:p-8'
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
                style={{
                  boxShadow: 'var(--premium-elevation), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                }}
                whileHover={{
                  boxShadow:
                    'var(--premium-elevation-hover), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
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
