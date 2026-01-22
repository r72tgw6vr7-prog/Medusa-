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
 * - Black background (#000)
 * - White text (#fff, #ccc)
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
    title: 'Certified Excellence',
    stat: '100%',
    description: 'EU Health Standards & Munich Tattoo Association certified',
    ariaLabel: 'EU Health Standards Certified',
  },
  {
    icon: Award,
    title: 'Proven Legacy',
    stat: '25+',
    description: 'Years of trusted artistry excellence in Munich',
    ariaLabel: '25 Plus Years of Excellence',
  },
  {
    icon: Heart,
    title: 'Premium Aftercare',
    stat: '5000+',
    description: 'Satisfied clients with comprehensive healing support',
    ariaLabel: 'Premium Aftercare Support',
  },
  {
    icon: Star,
    title: 'Quality Guarantee',
    stat: '100%',
    description: 'Lifetime commitment to excellence and client satisfaction',
    ariaLabel: 'Quality Guarantee',
  },
];


export function TrustSignals() {
  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        {/* 4-Card Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {TRUST_BADGES.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                className="cool-lines-card chrome-card group relative flex flex-col h-full p-8 transition-all duration-500"
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
                style={{ boxShadow: 'var(--card-shadow)' }}
                whileHover={{
                  boxShadow:
                    'var(--card-shadow-depth), var(--card-shadow-hover-glow), var(--card-shadow-inner)',
                }}
                role="group"
                aria-label={badge.ariaLabel}
              >
                {/* Icon */}
                <motion.div
                  className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-white/10 to-white/5 border border-white/20 flex-col h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-8 h-8 text-white/90" />
                </motion.div>

                {/* Stat */}
                <div className="text-3xl md:text-4xl font-light text-white mb-4">
                  {badge.stat}
                </div>

                {/* Title */}
                <h3 className="text-sm uppercase tracking-widest text-white/80 mb-2 group-hover:text-white/90 transition-colors duration-500">
                  {badge.title}
                </h3>

                {/* Description */}
                <p className="text-sm lg:text-xs text-gray-400 leading-relaxed">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
