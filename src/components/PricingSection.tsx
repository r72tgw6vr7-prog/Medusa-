import React from 'react';
import { ArrowRight, Check, Pen, Zap, MessageCircle } from 'lucide-react';
import Section from './ui/Section';

// Define the data structure for price items
interface PriceItem {
  text: string;
}

// Define the data structure for each card
type CtaVariant = 'link' | 'button';

interface PricingCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  priceItems?: PriceItem[];
  ctaText: string;
  ctaVariant: CtaVariant;
  badgeLabel?: string;
}

// Array of pricing data
const pricingData: PricingCard[] = [
  {
    icon: <Pen className='h-12 w-12 text-[var(--brand-gold)]' />,
    title: 'Custom\nTattoo Designs',
    description:
      'Individuelle Kunstwerke ab 150€/Stunde. Kostenlose Erstberatung und Design-Entwicklung.',
    priceItems: [
      { text: 'Klein (1-2h): 150-300€' },
      { text: 'Mittel (3-4h): 450-600€' },
      { text: 'Groß (6h+): 900€+' },
    ],
    ctaText: 'Alle Preise',
    ctaVariant: 'link',
  },
  {
    icon: <Zap className='h-12 w-12 text-[var(--brand-gold)]' />,
    title: 'Professionelle\nPiercings',
    description:
      'Sterile Behandlung ab 45€ inkl. Premium-Grundschmuck. Titan-Erstschmuck und Nachkontrolle inklusive.',
    priceItems: [{ text: 'Ohr: 45-80€' }, { text: 'Nase: 50-90€' }, { text: 'Speziell: ab 120€' }],
    ctaText: 'Piercing Preise',
    ctaVariant: 'link',
  },
  {
    icon: <MessageCircle className='h-12 w-12 text-[var(--brand-gold)]' />,
    title: 'Kostenlose\nBeratung',
    description: 'Design-Beratung kostenfrei. KI-Vorschau inklusive. Vor-Ort oder WhatsApp.',
    ctaText: 'Jetzt beraten lassen',
    ctaVariant: 'button',
    badgeLabel: 'Kostenlos',
  },
];

export const PricingSection: React.FC = () => {
  return (
    <Section
      className='py-16 lg:py-24 relative z-10'
      containerSize='default'
      aria-labelledby='pricing-section-title'
      id='pricing-section'
    >
      {/* Section Header */}
      <div className='text-center space-y-8 mb-16'>
        <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>Preise</p>
        <h2
          className='font-headline text-3xl md:text-4xl text-[var(--brand-gold)]'
          id='pricing-section-title'
        >
          Services mit transparenten Preisen
        </h2>
        <p className='text-base text-white/70 max-w-2xl mx-auto font-body leading-relaxed'>
          Keine versteckten Kosten – Ehrliche Beratung seit 1998
        </p>
      </div>

      {/* Cards container */}
      <div className='pricing-cards-container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {/* Map through the pricing data to generate cards */}
        {pricingData.map((card, index) => (
          <article
            key={index}
            className='pricing-card group relative flex h-full flex-col rounded-3xl border border-[var(--brand-gold)]/40 bg-[#101010] p-8 shadow-[0_0_24px_rgba(0,0,0,0.3)] transition-shadow duration-300 hover:border-[var(--brand-gold)] hover:shadow-[0_0_40px_rgba(212,175,55,0.25)]'
            data-card-type={card.title.toLowerCase().replace(/\s+/g, '-')}
          >
            {/* Free badge for the last card */}
            {card.badgeLabel && (
              <span className='pricing-card-badge free-badge absolute right-8 top-8 text-xs font-semibold uppercase tracking-wide'>
                {card.badgeLabel}
              </span>
            )}

            {/* Icon in circular container */}
            <div className='mb-8 flex justify-center'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full border border-[var(--brand-gold)]/70 bg-[#151515] flex-col h-full'>
                <div className='pricing-card-icon transition-transform duration-500 group-hover:rotate-360'>
                  {card.icon}
                </div>
              </div>
            </div>

            {/* Title section */}
            <div className='mb-8 text-center'>
              <h3 className='whitespace-pre-line font-playfair text-2xl font-semibold text-[var(--brand-gold)] md:text-3xl'>
                {card.title}
              </h3>
            </div>

            {/* Description */}
            <p className='mb-8 text-center leading-relaxed text-white/70'>{card.description}</p>

            {/* Price items */}
            {card.priceItems && (
              <ul className='pricing-card-features mb-8 grow hidden md:block'>
                {card.priceItems.map((item, i) => (
                  <li key={i} className='pricing-card-feature'>
                    <Check className='pricing-card-feature-icon' aria-hidden='true' />
                    <span className='pricing-card-feature-text'>{item.text}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA button */}
            <div className='mt-auto'>
              {card.ctaVariant === 'button' ? (
                <button type='button' className='pricing-cta-btn pricing-cta-btn--solid'>
                  {card.ctaText}
                  <ArrowRight className='h-5 w-5' aria-hidden='true' />
                </button>
              ) : (
                <button type='button' className='pricing-cta-btn pricing-cta-btn--link'>
                  {card.ctaText}
                  <ArrowRight className='h-5 w-5' aria-hidden='true' />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default PricingSection;
