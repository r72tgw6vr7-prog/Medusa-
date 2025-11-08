import React from 'react';
import Section from '../../ui/Section';
import Button from '../../atoms/Button/Button';
// Note: ServiceCards uses Tailwind classes - CSS module not currently needed
// import styles from './ServiceCards.module.css';

interface ServiceCard {
  id: string;
  backgroundImage: string;
  icon: 'crown' | 'diamond' | 'diamond-piercing' | 'diamond-consultation';
  struckTitle: string;
  mainTitle: string;
  description: string;
  bullets: string[];
  price: string;
  ctaText: string;
  ctaHref: string;
  ctaVariant: 'primary' | 'secondary';
}

interface ServiceCardsProps {
  services?: ServiceCard[];
}

const DEFAULT_SERVICES: ServiceCard[] = [
  {
    id: 'tattoo',
    backgroundImage: '/assets/images/photos/backgrounds/tattoo-card-bg.webp',
    icon: 'crown',
    struckTitle: 'Tattoo Artistry',
    mainTitle: 'Permanent Kunst',
    description: 'Hochwertige Tattoos von erfahrenen Künstlern mit individuellen Designs und steriler Arbeitsweise.',
    bullets: [
      'Individuelle Designs',
      'Erfahrene Künstler',
      'Sterile Arbeitsweise',
      'Nachbetreuung',
    ],
    price: 'ab €180/Std',
    ctaText: 'Jetzt Entdecken',
    ctaHref: '/services#tattoo',
    ctaVariant: 'primary',
  },
  {
    id: 'piercing',
    backgroundImage: '/assets/images/photos/backgrounds/piercing-card-bg.webp',
    icon: 'diamond-piercing',
    struckTitle: 'Premium Piercing',
    mainTitle: 'Luxury Schmuck',
    description: 'Erstklassiger Schmuck und sterile Verfahren für sichere und stilvolle Piercings.',
    bullets: ['Premium Schmuck', 'Professionelle Beratung', 'Hygienische Standards', 'Nachpflege'],
    price: 'ab €60',
    ctaText: 'Jetzt Entdecken',
    ctaHref: '/services#piercing',
    ctaVariant: 'primary',
  },
];

export const ServiceCards: React.FC<ServiceCardsProps> = ({ services = DEFAULT_SERVICES }) => {
  const getIcon = (iconType: 'crown' | 'diamond' | 'diamond-piercing' | 'diamond-consultation') => {
    if (iconType === 'crown') {
      return (
        <img 
          src="/Crown.svg" 
          alt="Crown icon" 
          width={48} 
          height={48}
          style={{ width: '48px', height: '48px' }}
        />
      );
    }
    
    // The main piercing diamond icon - high visibility light gray diamond
    if (iconType === 'diamond-piercing') {
      return (
        <svg
          width="48"
          height="48"
          viewBox="0 0 30 30" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M15 3L4 11L15 27L26 11L15 3Z"
            stroke="#CCCCCC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path 
            d="M15 3L4 11L15 27L26 11L15 3Z"
            fill="none"
          />
        </svg>
      );
    }
    
    // For consultation or any other diamond variant, use a regular diamond
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 2L2 9L12 22L22 9L12 2Z" 
          stroke="white" 
          strokeWidth="1.5" 
          fill="none"
        />
      </svg>
    );
  };

  return (
    <Section className="relative z-10">
      {/* Header */}
      <div className='text-center mb-16'>
        <h2
          className="font-['Playfair_Display'] text-xl md:text-2xl mb-8 text-[var(--brand-gold)]"
        >
          Alle Services Entdecken
        </h2>
        <p
          className='text-base md:text-lg max-w-2xl mx-auto text-white/80'
        >
          Entdecken Sie unsere zwei Hauptbereiche der Kunstfertigkeit
        </p>
      </div>

      {/* Cards Grid */}
      <div className='service-card-grid grid grid-cols-1 min-[360px]:grid-cols-2'>
        {services.map((service) => (
            <article
              key={service.id}
              className='group relative rounded-3xl overflow-hidden min-h-80 sm:min-h-[360px] md:min-h-[500px] transition-transform duration-300 hover:scale-[1.02] shadow-lg hover:shadow-gold-glow border border-[var(--brand-gold)]/20 hover:border-[var(--brand-gold)]/60 flex flex-col h-full'
              aria-label={`${service.mainTitle} service card`}
            >
              {/* Background Image with Gradient Overlay */}
              <div
                className='absolute inset-0'
                style={{
                  backgroundImage: `url(${service.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Background Tint */}
                <div
                  className='absolute inset-0'
                  style={{
                    backgroundColor:
                      service.id === 'tattoo'
                        ? 'rgba(var(--brand-gold-rgb), 0.15)'
                        : 'rgba(var(--chrome-silver-rgb), 0.15)',
                  }}
                />
                {/* Dark Gradient Overlay */}
                <div
                  className='absolute inset-0'
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 100%)',
                  }}
                />
              </div>

              {/* Positioned icon (gold circle removed) */}
              <div className='absolute top-8 left-8 md:top-12 md:left-12 z-10'>
                {getIcon(service.icon)}
              </div>

              {/* Content */}
              <div className='service-card-padding relative h-full flex flex-col justify-end items-center'>
                {/* Text Content */}
                <div className='service-card-content text-center'>
                  {/* Small Label Title */}
                  <div className='flex items-center gap-0 justify-center mt-16'>
                    <span
                      className="font-['Playfair_Display'] text-sm tracking-wider"
                      style={{
                        color: 'var(--brand-gold)',
                        fontSize: '14px',
                        fontWeight: 400,
                        letterSpacing: '1px'
                      }}
                    >
                      {service.struckTitle}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h3
                    className="font-['Poppins'] text-3xl md:text-5xl font-bold leading-tight mt-0"
                    style={{ color: '#FFFFFF' }}
                  >
                    {service.mainTitle}
                  </h3>

                  {/* Description */}
                  <p className="text-base mt-16" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: '80%', margin: '16px auto 0' }}>
                    {service.description}
                  </p>
                  
                  {/* Bullet Points */}
                  <ul className='service-card-list space-y-0 mt-16'>
                    {service.bullets.map((bullet, index) => (
                      <li
                        key={index}
                        className="service-card-list-item text-white font-['Inter'] text-sm"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Price and CTA */}
                  <div className='service-card-footer'>
                    <span
                      className="font-['Poppins'] text-2xl font-bold text-center block mt-24"
                      style={{ color: '#FFFFFF' }}
                    >
                      {service.price}
                    </span>

                    <a
                      href={service.ctaHref}
                      className="no-underline"
                    >
                      <Button 
                        variant={service.ctaVariant}
                        className="w-full text-center justify-center"
                      >
                        {service.ctaText}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      {/* WhatsApp Consultation Button */}
      <div className='mt-24 flex justify-center'>
        <a
          href='https://wa.me/+4989123456789'
          target='_blank'
          rel='noopener noreferrer'
          className='group relative inline-flex items-center justify-center gap-16 px-32 py-16 rounded-2xl border-2 border-brand-gold/60 bg-transparent hover:bg-brand-gold/10 transition-all duration-300 hover:shadow-gold-glow hover:border-brand-gold hover:scale-105'
          aria-label='Kostenlose WhatsApp Beratung'
        >
          {/* WhatsApp Icon */}
          <img 
            src='/icons/whatsapp.svg'
            alt='WhatsApp'
            className='w-24 h-24 text-brand-gold group-hover:scale-110 transition-transform duration-300'
            style={{ filter: 'invert(68%) sepia(47%) saturate(476%) hue-rotate(359deg) brightness(95%) contrast(87%)' }}
          />
          
          {/* Button Text */}
          <span className="font-['Poppins'] text-lg md:text-xl font-semibold text-brand-gold transition-colors duration-300">
            Kostenlose WhatsApp Beratung
          </span>
        </a>
      </div>
    </Section>
  );
};

export default ServiceCards;
