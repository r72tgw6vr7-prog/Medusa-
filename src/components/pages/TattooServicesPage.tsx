import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Sparkles, Zap, Shield, Euro, ChevronRight } from 'lucide-react';
import { useApp } from '@/core/state/AppContext';
import { SectionHeading } from '@/components/SectionHeading';
import { Card } from '@/components/ui/Card';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import {
  servicesFadeInUpVariants as fadeInUpVariants,
  servicesContainerVariants as containerVariants,
} from '@/styles/animations';

const categories = [
  {
    id: 'tattoo',
    title: 'Tattoo Artistry',
    subtitle: 'Von Basic bis Exklusiv für jeden Geschmack',
    icon: Sparkles,
    priceFrom: '80€',
  },
  {
    id: 'piercing',
    title: 'Custom Design',
    subtitle: 'Individuelle Entwürfe nach Ihren Wünschen',
    icon: Zap,
    priceFrom: '20€',
  },
  {
    id: 'products',
    title: 'Ink Solutions',
    subtitle: 'Professionelle Lösungen für Ihre Tattoo-Projekte',
    icon: Shield,
    priceFrom: 'TBD',
  },
] as const;

const serviceDetails = {
  tattoo: [
    {
      id: 'packet-s',
      title: 'Packet S',
      description:
        'Small tattoos - symbols, letters, souvenirs. For customers with concrete ideas.',
      priceFrom: 80,
      priceUnit: '€ - 150€',
      duration: '30 minutes',
      features: ['Persönliche Beratung', 'Kleine Motive', 'Schnelle Umsetzung'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'packet-m',
      title: 'Packet M',
      description: 'Personalized projects, unique designs. Includes aftercare guide & products.',
      priceFrom: 160,
      priceUnit: '€ - 480€',
      duration: '1-3 hours',
      features: ['Einzigartiges Design', 'Aftercare Guide', 'Premium Produkte'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'packet-l',
      title: 'Packet L',
      description:
        'Größere Projekte mit detaillierter Ausarbeitung. Includes aftercare guide & products.',
      priceFrom: 600,
      priceUnit: '€+',
      duration: '4-7 hours',
      features: ['Detailarbeit', 'Aftercare Guide', 'Premium Produkte'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'day-session',
      title: 'Complete Day Session',
      description: 'Ganztägige Session für umfangreiche Projekte und Sleeves.',
      priceFrom: 0,
      priceUnit: 'Auf Anfrage',
      duration: 'Ganztägig',
      features: ['Individuelle Planung', 'VIP Betreuung', 'Flexible Gestaltung'],
      cta: "Let's Talk",
    },
  ],
  piercing: [
    {
      id: 'dynamic-pricing',
      title: 'Dynamic Pricing',
      description: '€20 for simple motifs, symbols, letters. Price increases based on complexity.',
      priceFrom: 20,
      priceUnit: '€+',
      duration: 'Up to 2 hours',
      features: [
        'Einfache Motive ab €20',
        'Preis nach Komplexität',
        'Kleine/reguläre Designs bis 2 Std.',
      ],
      cta: 'Beratung anfragen',
    },
    {
      id: 'free-design',
      title: 'Design Service',
      description: 'Get your tattoo at Medusa → Design is FREE. Individuelle Entwürfe inklusive.',
      priceFrom: 0,
      priceUnit: 'GRATIS bei Tattoo',
      duration: 'Nach Vereinbarung',
      features: ['Design kostenlos bei Tattoo', 'Individuelle Entwürfe', 'Unbegrenzte Revisionen'],
      cta: 'Jetzt anfragen',
    },
    {
      id: 'design-only',
      title: 'Design Only',
      description: 'Nur Design ohne Tattoo. Preise nach Komplexität und Größe.',
      priceFrom: 20,
      priceUnit: '€+',
      duration: 'Nach Aufwand',
      features: ['Digitale Vorlage', 'Alle Stilrichtungen', 'Schnelle Lieferung'],
      cta: 'Anfragen',
    },
  ],
  products: [
    {
      id: 'ink-solutions-info',
      title: 'Ink Solutions',
      description: 'Weitere Informationen folgen in Kürze.',
      priceFrom: 0,
      priceUnit: 'TBD',
      duration: null,
      features: ['Coming Soon', 'Weitere Details folgen', 'Kontaktieren Sie uns'],
      cta: 'Anfragen',
    },
  ],
} as const;

type CategoryId = keyof typeof serviceDetails;

interface TattooServicesPageProps {
  className?: string;
}

const formatPrice = (priceFrom: number, priceUnit: string) => {
  if (priceFrom <= 0) return priceUnit;
  const unitWithoutEuro = priceUnit.replace(/€/g, '').trim();
  const suffix = unitWithoutEuro.length > 0 ? ` ${unitWithoutEuro}` : '';
  return `ab ${priceFrom} €${suffix}`;
};

export const TattooServicesPage: React.FC<TattooServicesPageProps> = ({ className = '' }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('tattoo');
  const [selectedPacket, setSelectedPacket] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const { openBooking } = useApp();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Intersection Observer to trigger animations when in view
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.1, once: true });
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentServices = useMemo(() => serviceDetails[activeCategory], [activeCategory]);

  // Artist page reveal pattern: IntersectionObserver with staggered delays
  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setRevealedIndices((prev) => new Set(prev).add(index));
              }, index * 200);
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: '-50px',
        },
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [currentServices.length]);
  const activeCategoryMeta = useMemo(
    () => categories.find((category) => category.id === activeCategory),
    [activeCategory],
  );

  const handleCategoryChange = useCallback(
    (categoryId: CategoryId) => {
      if (categoryId === activeCategory || isAnimating) return;
      setIsAnimating(true);
      setActiveCategory(categoryId);
      window.setTimeout(() => setIsAnimating(false), 400);
    },
    [activeCategory, isAnimating],
  );

  // Debounced booking handler to prevent accidental double-invocation
  const handleServiceBooking = useMemo(() => {
    let t: number | undefined;
    return (serviceId: string) => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => openBooking({ service: serviceId }), 300) as unknown as number;
    };
  }, [openBooking]);

  const renderServiceCard = (service: (typeof currentServices)[number], index: number) => {
    const isSelected = selectedPacket === service.id;
    const isRevealed = revealedIndices.has(index);
    return (
      <Card
        key={service.id}
        variant={isSelected ? 'featured' : 'default'}
        className='flex flex-col h-full'
        asChild
      >
        <motion.div
          ref={(el) => (observerRefs.current[index] = el)}
          variants={fadeInUpVariants}
          className={`
            paket-card pricing-card pricing-card--locked chrome-pulse flex flex-col text-center 
            cursor-pointer
            h-full
            ${isRevealed ? 'revealed' : ''}
          `}
          onClick={() => setSelectedPacket(isSelected ? null : service.id)}
          whileHover={isDesktop ? { scale: 1.02 } : undefined}
          whileTap={{ scale: 0.98 }}
          data-locked='pricing-card'
          data-index={index}
          data-selected={isSelected ? 'true' : 'false'}
          style={
            {
              '--stagger': `${index * 200}ms`,
              ...(isDesktop
                ? {
                    flex: '0 0 calc((100% - (3 * var(--space-2))) / 4)',
                    maxWidth: 'calc((100% - (3 * var(--space-2))) / 4)',
                  }
                : null),
            } as React.CSSProperties
          }
        >
          {/* Pricing card lock: do not edit structure/colors/typography */}
          <span className={`pricing-card-index ${isRevealed ? 'revealed' : ''}`} aria-hidden='true'>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className='pricing-card-overlay' aria-hidden='true' />
          <div className='pricing-card-curtain' aria-hidden='true' />
          <div className='pricing-card-content'>
            {/* Title */}
            <h3 className='font-semibold text-3xl leading-10 text-white mb-4'>{service.title}</h3>

            {/* Description */}
            <p className='font-normal text-sm leading-7 text-white/70 mb-8 flex-1'>
              {service.description}
            </p>

            {/* Price */}
            <div className='flex items-center gap-2 mb-8'>
              <Euro size={18} className='text-[color:var(--text-secondary)]' />
              <span className='font-semibold text-xl leading-7 text-[color:var(--text-secondary)]'>
                {formatPrice(service.priceFrom, service.priceUnit)}
              </span>
            </div>

            {/* List */}
            <ul className='space-y-4 mb-8'>
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className='flex items-start gap-4'>
                  <ChevronRight
                    size={16}
                    className='text-[color:var(--text-secondary)] flex-shrink-0 mt-2'
                  />
                  <span className='font-normal text-base leading-6 text-white/80'>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              onClick={() => handleServiceBooking(service.id)}
              className='
                w-full h-12
                border border-[color:var(--text-secondary)]
                rounded-3xl
                font-semibold text-sm leading-5 text-white
                hover:bg-[color:var(--text-secondary)] hover:text-black
                transition-all duration-200
              '
              aria-label={`${service.cta} für ${service.title}`}
            >
              {service.cta}
            </button>
          </div>
        </motion.div>
      </Card>
    );
  };

  return (
    <main
      className={`tattoo-services-page w-full min-h-screen relative z-10 bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32 ${className}`}
    >
      <MainNavigation />
      <Section variant='default' spacing='normal' bg='dark'>
        <Container size='default'>
          <div className='flex flex-col gap-16'>
            <SectionHeading
              eyebrow='Medusa München'
              title='Tattoo'
              subtitle='Wählen Sie aus unseren Signature-Angeboten und entdecken Sie Premium-Optionen, die perfekt zu Ihrem Projekt passen.'
            />

            <div
              className='pricing-category-container grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 justify-center justify-items-center max-w-4xl mx-auto'
              aria-label='Service-Kategorien'
            >
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = activeCategory === category.id;

                const buttonContent = (
                  <>
                    {/* Mobile layout: icon, title, price stacked */}
                    <div className='pricing-category-card-content md:hidden flex flex-col h-full items-center justify-center gap-2 py-2'>
                      <div className='pricing-category-icon flex flex-col h-full items-center justify-center w-8 h-8 rounded-full bg-(--accent-chrome)'>
                        <IconComponent size={16} className='text-luxury-text-primary' />
                      </div>
                      <h3 className='pricing-category-tier font-headline text-xs text-white text-center leading-tight px-2'>
                        {category.title}
                      </h3>
                      <span className='pricing-category-price text-xs font-semibold uppercase tracking-wider text-luxury-text-inverse/60'>
                        ab {category.priceFrom}
                      </span>
                    </div>

                    {/* Desktop layout: original design */}
                    <div className='hidden md:flex md:flex-col md:h-full'>
                      <div className='flex items-center justify-between mb-8'>
                        <div className='flex flex-col h-full min-h-14 min-w-14 items-center justify-center rounded-full bg-(--accent-chrome)'>
                          <IconComponent size={20} className='text-luxury-text-primary' />
                        </div>
                        <span className='text-base lg:text-sm font-semibold uppercase tracking-wider text-luxury-text-inverse/60'>
                          ab {category.priceFrom}
                        </span>
                      </div>
                      <div className='space-y-8 flex-1'>
                        <h3 className='font-headline text-2xl text-brand-chrome'>
                          {category.title}
                        </h3>
                        <p className='text-base lg:text-sm text-luxury-text-inverse/80 mb-8 leading-relaxed font-body'>
                          {category.subtitle}
                        </p>
                      </div>
                    </div>
                  </>
                );

                const buttonClassName = 'flex flex-col h-full min-h-25 md:min-h-auto';

                return (
                  <Card
                    key={category.id}
                    variant={isActive ? 'featured' : 'default'}
                    size='default'
                    className='pricing-category-card flex flex-col h-full'
                    asChild
                  >
                    <button
                      type='button'
                      aria-pressed={isActive ? 'true' : 'false'}
                      className={buttonClassName}
                      onClick={() => handleCategoryChange(category.id as CategoryId)}
                      aria-label={`Select ${category.title} category`}
                    >
                      {buttonContent}
                    </button>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>

        <div className='chrome-divider services-section-divider' aria-hidden='true' />

        {/* Bottom cards section - wider container */}
        <Container size='wide'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeCategory}
              ref={containerRef}
              className='space-y-12'
              aria-live='polite'
              aria-label={`Showing ${activeCategoryMeta?.title} services`}
              variants={containerVariants}
              initial='initial'
              animate={inView ? 'animate' : 'initial'}
              exit='exit'
            >
              <div className='hidden md:block'>
                <SectionHeading
                  eyebrow={activeCategoryMeta?.title}
                  title='Wählen Sie das passende Paket'
                  subtitle={activeCategoryMeta?.subtitle}
                />
              </div>

              {isDesktop ? (
                <div className='w-full flex justify-center'>
                  <div className='paket-cards-wrapper flex flex-nowrap gap-4 justify-center items-stretch overflow-x-auto overflow-y-visible scrollbar-hide w-full py-8'>
                    {currentServices.map((service, index) => renderServiceCard(service, index))}
                  </div>
                </div>
              ) : (
                <div className='w-full'>
                  <div className='mobile-paket-rail max-lg:overflow-x-auto max-lg:overflow-y-visible max-lg:scrollbar-hide max-lg:snap-x max-lg:snap-mandatory max-lg:pb-6 max-lg:-mb-6'>
                    <div className='max-lg:flex max-lg:items-start max-lg:gap-4 max-lg:px-6'>
                      {currentServices.map((service, index) => (
                        <div
                          key={service.id}
                          className='max-lg:flex-none max-lg:w-full max-lg:snap-center'
                        >
                          {renderServiceCard(service, index)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>
      <Footer />
    </main>
  );
};

export default TattooServicesPage;
