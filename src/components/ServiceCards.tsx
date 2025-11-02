import React from 'react';
import '../styles/ServiceCards.css';
import Section from './ui/Section';
import Button from './Button';

interface ServiceCard {
  id: string;
  backgroundImage: string;
  icon: 'crown' | 'diamond';
  struckTitle: string;
  mainTitle: string;
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
    backgroundImage: '/images/tattoo-card-bg.webp',
    icon: 'crown',
    struckTitle: 'Tattoo Artistry',
    mainTitle: 'Permanent Kunst',
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
    backgroundImage: '/images/piercing-card-bg.jpg',
    icon: 'diamond',
    struckTitle: 'Premium Piercing',
    mainTitle: 'Luxury Schmuck',
    bullets: ['Premium Schmuck', 'Professionelle Beratung', 'Hygienische Standards', 'Nachpflege'],
    price: 'ab €60',
    ctaText: 'Jetzt Entdecken',
    ctaHref: '/services#piercing',
    ctaVariant: 'primary',
  },
  {
    id: 'consultation',
    backgroundImage: '/images/consultation-card-bg.jpg',
    icon: 'diamond',
    struckTitle: 'Kostenlose Beratung',
    mainTitle: 'WhatsApp Chat',
    bullets: ['Direkte Kommunikation', 'Schnelle Antworten', 'Unverbindlich', 'Professionell'],
    price: 'Kostenlos',
    ctaText: 'Jetzt Chatten',
    ctaHref: 'https://wa.me/+4989123456789',
    ctaVariant: 'primary',
  },
];

export const ServiceCards: React.FC<ServiceCardsProps> = ({ services = DEFAULT_SERVICES }) => {
  const getIcon = (iconType: 'crown' | 'diamond') => {
    if (iconType === 'crown') {
      return <img src='/icons/crown.svg' alt='Crown icon' width={40} height={40} />;
    }
    return (
      <svg
        width={40}
        height={40}
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M20 4L24 16L20 28L16 16L20 4Z'
          stroke='#C0C0C0'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          fill='none'
        />
        <path
          d='M12 16L20 4L28 16L20 28L12 16Z'
          stroke='#C0C0C0'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          fill='none'
        />
      </svg>
    );
  };

  return (
    <Section bg="none" className="bg-texture">
      {/* Header */}
      <div className='text-center mb-16'>
        <h2
          className="font-['Playfair_Display'] text-xl md:text-2xl mb-8"
          style={{ color: 'var(--brand-gold)' }}
        >
          Alle Services Entdecken
        </h2>
        <p
          className='text-base md:text-lg max-w-2xl mx-auto'
          style={{ color: 'rgba(255,255,255,0.8)' }}
        >
          Entdecken Sie unsere zwei Hauptbereiche der Kunstfertigkeit
        </p>
      </div>

      {/* Cards Grid */}
      <div className='service-card-grid grid grid-cols-1 min-[360px]:grid-cols-2'>
        {services.map((service) => (
            <article
              key={service.id}
              className='group relative rounded-3xl overflow-hidden min-h-80 sm:min-h-[360px] md:min-h-[500px] transition-transform duration-300 hover:scale-[1.02] shadow-(--shadow-lg) hover:shadow-(--shadow-gold-intense) flex flex-col h-full'
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
                        ? 'rgba(212, 175, 55, 0.15)'
                        : 'rgba(192, 192, 192, 0.15)',
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
              <div className='absolute top-6 left-6 sm:top-8 sm:left-8 md:top-12 md:left-12 z-10'>
                {getIcon(service.icon)}
              </div>

              {/* Content */}
              <div className='service-card-padding relative h-full flex flex-col justify-end items-center'>
                {/* Text Content */}
                <div className='service-card-content text-center'>
                  {/* Struck-through Title */}
                  <div className='flex items-center gap-0 justify-center'>
                    <span
                      className="font-['Playfair_Display'] text-lg line-through"
                      style={{
                        color: 'var(--brand-gold)',
                        textDecorationColor: 'var(--brand-gold)',
                        opacity: 0.9,
                      }}
                    >
                      {service.struckTitle}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h3
                    className="font-['Poppins'] text-2xl md:text-4xl font-bold leading-tight"
                    style={{ color: 'var(--brand-white)' }}
                  >
                    {service.mainTitle}
                  </h3>

                  {/* Bullet Points */}
                  <ul className='service-card-list space-y-0'>
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
                      className="font-['Poppins'] text-2xl font-bold text-center block"
                      style={{ color: 'var(--brand-white)' }}
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
    </Section>
  );
};

export default ServiceCards;
