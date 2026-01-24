import React, { useMemo, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  Gem,
  Sparkles,
  Wrench,
  Euro,
  ChevronRight,
  ChevronDown,
  MessageCircle,
} from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useApp } from '@/core/state/AppContext';
import { SectionHeading } from '../SectionHeading';
import { Card } from '../ui/Card';
import { MainNavigation } from '../molecules/MainNavigation';
import { Footer } from '../pages';
import {
  servicesFadeInUpVariants as fadeInUpVariants,
  servicesContainerVariants as containerVariants,
} from '../../styles/animations';

// ============================================
// PREISLISTE DATA - STECHEN (Piercing Prices)
// ============================================
interface PriceItem {
  name: string;
  price1: string;
  price2?: string;
}

interface RegionPriceList {
  items: PriceItem[];
  note?: string;
}

const PREISLISTE_STECHEN: Record<string, RegionPriceList> = {
  ohr: {
    items: [
      { name: 'Ohrläppchen | Lobe', price1: '35,-', price2: '65,-' },
      { name: 'Helix (Forward/Hidden)', price1: '60,-', price2: '110,-' },
      { name: 'Flat', price1: '70,-' },
      { name: 'Tragus', price1: '60,-' },
      { name: 'Anti-Tragus', price1: '70,-' },
      { name: 'Conch', price1: '70,-' },
      { name: 'Rook', price1: '70,-' },
      { name: 'Daith', price1: '70,-' },
      { name: 'Industrial', price1: '80,-' },
      { name: 'Snug', price1: '70,-' },
      { name: 'Transverse Lobe', price1: '60,-' },
      { name: 'Surface Tragus', price1: '90,-' },
    ],
  },
  mund: {
    items: [
      { name: 'Lippe | Lip', price1: '70,-', price2: '130,-' },
      { name: 'Grübchen | Cheek', price1: '80,-', price2: '150,-' },
      { name: 'Dahlia', price1: '80,-', price2: '150,-' },
      { name: 'Lippenband | Lipband', price1: '70,-' },
      { name: 'Zunge | Tongue', price1: '80,-', price2: '150,-' },
      { name: 'Snake Eye', price1: '90,-' },
    ],
  },
  gesicht: {
    items: [
      { name: 'Augenbraue | Eyebrow', price1: '70,-', price2: '130,-' },
      { name: 'Bridge', price1: '70,-' },
      { name: 'Nase | Nose', price1: '60,-', price2: '110,-' },
      { name: 'Septum', price1: '80,-' },
      { name: 'Anti Eyebrow (Surface)', price1: '90,-' },
      { name: 'Dermal Anchor', price1: '80,-', price2: '150,-' },
      { name: 'Skindiver', price1: '80,-', price2: '150,-' },
    ],
  },
  koerper: {
    items: [
      { name: 'Brustwarze | Nipple', price1: '80,-', price2: '150,-' },
      { name: 'Bauchnabel | Belly Button', price1: '80,-', price2: '150,-' },
      { name: 'Surface', price1: '90,-', price2: '160,-' },
      { name: 'Dermal Anchor', price1: '80,-', price2: '150,-' },
      { name: 'Skindiver', price1: '80,-', price2: '150,-' },
    ],
  },
  intim: {
    items: [
      { name: 'Frau | Woman', price1: '90,-', price2: '170,-' },
      { name: 'Mann | Men', price1: '90,-', price2: '170,-' },
    ],
    note: 'mind. 18 Jahre / min. 18 Years',
  },
};

const categories = [
  {
    id: 'stechen',
    title: 'Stechen',
    subtitle: 'Professionelles Piercing mit Titan-Schmuck',
    icon: Sparkles,
    priceFrom: '35€',
  },
  {
    id: 'jewelry',
    title: 'Jewelry',
    subtitle: 'Titan-Schmuck in Silber, Gold & Rosé',
    icon: Gem,
    priceFrom: 'Inklusive',
  },
  {
    id: 'extras',
    title: 'Extra Services',
    subtitle: 'Wechseln, Entfernen & Pflege',
    icon: Wrench,
    priceFrom: '5€',
  },
] as const;

const serviceDetails = {
  stechen: [
    {
      id: 'ohr',
      title: 'Ohr | Ear',
      description: 'Lobe, Helix, Tragus, Conch, Rook, Daith, Industrial und mehr.',
      priceFrom: 35,
      priceUnit: '€ - 110€',
      duration: '15-30 Min',
      features: ['Titan-Schmuck inklusive', 'Sterile Einwegmaterialien', 'Nachsorgeberatung'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'mund',
      title: 'Mund | Mouth',
      description: 'Lippe, Grübchen, Dahlia, Lippenband, Zunge, Snake Eye.',
      priceFrom: 70,
      priceUnit: '€ - 150€',
      duration: '15-30 Min',
      features: ['Titan-Schmuck inklusive', 'Mundspülung inklusive', 'Pflegehinweise'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'gesicht',
      title: 'Gesicht | Face',
      description: 'Augenbraue, Bridge, Nase, Septum, Anti Eyebrow, Dermal Anchor.',
      priceFrom: 60,
      priceUnit: '€ - 150€',
      duration: '15-30 Min',
      features: ['Titan-Schmuck inklusive', 'Sterile Umgebung', 'Follow-up möglich'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'koerper',
      title: 'Körper | Body',
      description: 'Brustwarze, Bauchnabel, Surface, Dermal Anchor, Skindiver.',
      priceFrom: 80,
      priceUnit: '€ - 160€',
      duration: '20-45 Min',
      features: ['Titan-Schmuck inklusive', 'Anatomie-Check', 'Premium Nachsorge'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'intim',
      title: 'Intim | Intimate',
      description: 'Professionelle Intim-Piercings. Mindestalter 18 Jahre.',
      priceFrom: 90,
      priceUnit: '€ - 170€',
      duration: '30-45 Min',
      features: ['Titan-Schmuck inklusive', 'Private Atmosphäre', 'mind. 18 Jahre'],
      cta: 'Beratung anfragen',
    },
  ],
  jewelry: [
    {
      id: 'titanium',
      title: 'Titanium Schmuck',
      description: 'Hochwertiger Titan-Schmuck in Silber - bei jedem Piercing inklusive.',
      priceFrom: 0,
      priceUnit: 'Inklusive',
      duration: null,
      features: ['Hypoallergen', 'Implant-Grade Titan', 'Silber Finish'],
      cta: 'Mehr erfahren',
    },
    {
      id: 'upgrades',
      title: 'Upgrades',
      description: 'Veredeln Sie Ihren Schmuck mit Gold, Rosé oder Glitzer.',
      priceFrom: 5,
      priceUnit: '€+',
      duration: null,
      features: ['Titan Gold: +€5', 'Titan Rosé: +€5', 'Glitzer: +€5'],
      cta: 'Upgrade wählen',
    },
  ],
  extras: [
    {
      id: 'entfernen',
      title: 'Entfernen',
      description: 'Professionelles Entfernen von Piercings und Implantaten.',
      priceFrom: 5,
      priceUnit: '€ - 25€',
      duration: '5-15 Min',
      features: ['Standard: €5', 'Dermal/Skindiver: €10', 'Implantat: €25'],
      cta: 'Termin buchen',
    },
    {
      id: 'service',
      title: 'Service',
      description: 'Einsetzen, Wechseln, Kürzen und Pflege bei Problemen.',
      priceFrom: 5,
      priceUnit: '€ - 15€',
      duration: '5-20 Min',
      features: ['Einsetzen: €5-10', 'Wechseln: €5-10', 'Kürzen: €5-10'],
      cta: 'Termin buchen',
    },
    {
      id: 'probleme',
      title: 'Probleme & Pflege',
      description: 'Hilfe bei eingewachsenen Piercings und Wildfleisch.',
      priceFrom: 5,
      priceUnit: '€ - 15€',
      duration: '10-20 Min',
      features: ['Eingewachsen: €5-15', 'Wildfleisch: €5-15', 'Beratung inklusive'],
      cta: 'Hilfe anfragen',
    },
    {
      id: 'implantat',
      title: 'Implantat',
      description: 'Professionelles Einsetzen und Entfernen von Implantaten.',
      priceFrom: 25,
      priceUnit: '€ - 50€',
      duration: '20-45 Min',
      features: ['Einsetzen: €50', 'Entfernen: €25', 'Beratung vorab'],
      cta: 'Beratung anfragen',
    },
  ],
} as const;

type CategoryId = keyof typeof serviceDetails;

interface PiercingServicesPageProps {
  className?: string;
}

const formatPrice = (priceFrom: number, priceUnit: string) => {
  if (priceFrom <= 0) return priceUnit;
  const unitWithoutEuro = priceUnit.replace(/€/g, '').trim();
  const suffix = unitWithoutEuro.length > 0 ? ` ${unitWithoutEuro}` : '';
  return `ab ${priceFrom} €${suffix}`;
};

export const PiercingServicesPage: React.FC<PiercingServicesPageProps> = ({ className = '' }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('stechen');
  const [selectedPacket, setSelectedPacket] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [isAnimating, setIsAnimating] = useState(false);
  const { openBooking } = useApp();

  // Intersection Observer to trigger animations when in view
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.1, once: true });

  const currentServices = useMemo(() => serviceDetails[activeCategory], [activeCategory]);
  const activeCategoryMeta = useMemo(
    () => categories.find((category) => category.id === activeCategory),
    [activeCategory],
  );

  const handleCategoryChange = useCallback(
    (categoryId: CategoryId) => {
      if (categoryId === activeCategory || isAnimating) return;
      setIsAnimating(true);
      setActiveCategory(categoryId);
      setSelectedPacket(null);
      setExpandedCard(null);
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

  const renderServiceCard = (service: (typeof currentServices)[number]) => {
    const isSelected = selectedPacket === service.id;
    const priceList = activeCategory === 'stechen' ? PREISLISTE_STECHEN[service.id] : null;
    const hasDetails = !!(priceList && priceList.items && priceList.items.length > 0);
    const isExpanded = expandedCard === service.id && hasDetails;
    return (
      <Card
        key={service.id}
        variant={isSelected ? 'featured' : 'default'}
        size='default'
        className='bg-(--card-bg) border-(--card-border) shadow-(--card-shadow) h-auto'
        asChild
      >
        <motion.div
          variants={fadeInUpVariants}
          className='paket-card flex flex-col h-auto cursor-pointer text-center'
          onClick={() => {
            setSelectedPacket(isSelected ? null : service.id);
            if (!isSelected) setExpandedCard(null);
          }}
          whileHover={isDesktop && !isExpanded ? { scale: 1.02 } : undefined}
          whileTap={isDesktop && !isExpanded ? { scale: 0.98 } : undefined}
        >
          <div className='flex flex-col gap-8'>
            <div className='flex items-center justify-between'>
              <span className='font-semibold text-sm tracking-[0.7px] uppercase text-[color:var(--text-secondary)]'>
                {activeCategory === 'stechen' ? 'Bereich' : 'Option'}
              </span>
              <span className='font-normal text-sm tracking-[1.4px] uppercase text-white/60'>
                {service.duration ?? 'Flexibel'}
              </span>
            </div>

            <h3 className='font-headline font-normal text-[length:var(--text-h3)] leading-9 text-white'>
              {service.title}
            </h3>

            <p className='font-normal text-sm leading-7 text-white/70'>{service.description}</p>

            <div className='flex items-center gap-2'>
              <Euro size={18} className='text-[color:var(--text-secondary)]' />
              <span className='font-semibold text-xl leading-7 text-[color:var(--text-secondary)]'>
                {formatPrice(service.priceFrom, service.priceUnit)}
              </span>
            </div>

            {hasDetails && (
              <div className='relative'>
                <button
                  type='button'
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerUp={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard((prev) => (prev === service.id ? null : service.id));
                  }}
                  className='flex items-center justify-between w-full py-2 text-sm font-semibold text-(--text-secondary) hover:text-(--text-secondary) transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-(--accent-chrome) focus-visible:ring-offset-2 focus-visible:ring-offset-(--card-bg) rounded'
                  aria-expanded={isExpanded}
                  aria-controls={`price-details-${service.id}`}
                >
                  <span>{isExpanded ? 'Preisliste ausblenden' : 'Alle Preise anzeigen'}</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={`price-details-${service.id}`}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className='absolute left-0 right-0 top-full z-20 mt-2'
                      onPointerDown={(e) => e.stopPropagation()}
                      onPointerUp={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className='bg-(--card-bg) border border-white/10 rounded-2xl p-4 shadow-(--card-shadow)'>
                        <div className='paket-price-grid mb-2 text-xs font-semibold uppercase tracking-wider text-white/50'>
                          <span>Piercing</span>
                          <span className='w-12 text-right'>1</span>
                          <span className='w-12 text-right'>2</span>
                        </div>
                        <ul className='space-y-2'>
                          {priceList.items.map((item, idx) => (
                            <li
                              key={idx}
                              className='paket-price-grid text-sm text-white/80 py-2 border-b border-white/5 last:border-b-0 flex flex-col h-full'
                            >
                              <span className='truncate'>{item.name}</span>
                              <span className='w-12 text-right font-semibold text-(--text-secondary)/90'>
                                {item.price1}
                              </span>
                              <span className='w-12 text-right font-semibold text-(--text-secondary)/90'>
                                {item.price2 ?? '—'}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {priceList.note && (
                          <p className='mt-4 text-xs text-white/50 italic text-center'>
                            {priceList.note}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <ul className='space-y-4 text-sm text-white/80'>
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className='flex items-center gap-4'>
                  <ChevronRight
                    size={16}
                    className='text-[color:var(--text-secondary)] shrink-0 mt-2'
                  />
                  <span className='font-normal text-base leading-6'>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleServiceBooking(service.id);
              }}
              className='w-full h-12 border border-[color:var(--text-secondary)] rounded-3xl font-semibold text-sm leading-5 text-white hover:bg-[color:var(--text-secondary)] hover:text-black transition-all duration-200 focus-visible:ring-2 focus-visible:ring-(--accent-chrome) focus-visible:ring-offset-2 focus-visible:ring-offset-(--card-bg)'
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
      className={`piercing-services-page w-full min-h-screen relative z-10 bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32 ${className}`}
    >
      <MainNavigation />
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-container-main flex flex-col text-center gap-4 max-md:gap-16'>
            <SectionHeading
              eyebrow='Medusa München'
              title='Piercing'
              subtitle='Professionelles Piercing mit über 5 Jahren Erfahrung und höchsten Hygienestandards.'
            />

            {/* FREE Consultation Banner */}
            <div className='flex items-center justify-center gap-4 p-6 rounded-2xl bg-[var(--accent-chrome)]/10 border border-[var(--accent-chrome)]/20 max-md:hidden'>
              <MessageCircle size={24} className='text-[var(--accent-chrome)]' />
              <div className='text-center'>
                <p className='font-headline text-lg text-brand-chrome'>Kostenlose Beratung</p>
                <p className='text-sm text-luxury-text-inverse/70 font-body'>
                  Allow us to help you choose the right team member and piercing
                </p>
              </div>
            </div>

            {/* Top 3 Category Cards - Centered */}
            <div
              className='pricing-category-container grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 justify-center justify-items-center max-w-4xl mx-auto'
              aria-label='Service-Kategorien'
            >
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = activeCategory === category.id;

                const buttonContent = (
                  <>
                    <div className='pricing-category-card-content md:hidden flex flex-col h-full items-center justify-center gap-2 py-2'>
                      <div className='pricing-category-icon flex flex-col h-full items-center justify-center w-8 h-8 rounded-full bg-[var(--accent-chrome)]'>
                        <IconComponent size={16} className='text-luxury-text-primary' />
                      </div>
                      <h3 className='pricing-category-tier font-headline text-xs text-white text-center leading-tight px-2'>
                        {category.title}
                      </h3>
                      <span className='pricing-category-price text-xs font-semibold uppercase tracking-wider text-luxury-text-inverse/60'>
                        ab {category.priceFrom}
                      </span>
                    </div>

                    <div className='hidden md:flex md:flex-col md:h-full'>
                      <div className='flex items-center justify-between mb-8'>
                        <div className='flex flex-col h-full h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-chrome)]'>
                          <IconComponent size={20} className='text-luxury-text-primary' />
                        </div>
                        <span className='text-xs font-semibold uppercase tracking-wider text-luxury-text-inverse/60'>
                          ab {category.priceFrom}
                        </span>
                      </div>
                      <div className='space-y-8 flex-1'>
                        <h3 className='font-headline text-2xl text-brand-chrome'>
                          {category.title}
                        </h3>
                        <p className='text-sm md:text-base text-luxury-text-inverse/75 leading-relaxed font-body'>
                          {category.subtitle}
                        </p>
                      </div>
                    </div>
                  </>
                );

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
                      aria-pressed={isActive}
                      className='flex flex-col h-full min-h-25 md:min-h-auto transition-transform duration-300'
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
        </div>

        <div className='chrome-divider services-section-divider' aria-hidden='true' />

        {/* Bottom cards section - wider container */}
        <div className='w-full px-6 lg:px-12 md:mt-20 max-md:mt-0'>
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
                  title='Wählen Sie Ihre Option'
                  subtitle={activeCategoryMeta?.subtitle}
                />
              </div>

              {isDesktop ? (
                <div className='w-full flex justify-center'>
                  <div className='paket-cards-wrapper flex flex-nowrap gap-4 justify-center items-start overflow-x-auto overflow-y-visible scrollbar-hide w-full py-8'>
                    {currentServices.map((service) => renderServiceCard(service))}
                  </div>
                </div>
              ) : (
                <div className='w-full'>
                  <div className='mobile-paket-rail max-lg:overflow-x-auto max-lg:overflow-y-visible max-lg:scrollbar-hide max-lg:snap-x max-lg:snap-mandatory max-lg:pb-6 max-lg:-mb-6'>
                    <div className='max-lg:flex max-lg:items-start max-lg:gap-4 max-lg:px-6'>
                      {currentServices.map((service) => (
                        <div
                          key={service.id}
                          className='max-lg:flex-none max-lg:w-full max-lg:snap-center max-lg:self-start'
                        >
                          {renderServiceCard(service)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PiercingServicesPage;
