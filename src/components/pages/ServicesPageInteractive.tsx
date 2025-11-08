import React, { useMemo, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Sparkles, Zap, Shield, Heart, Euro, ChevronRight } from 'lucide-react';
import { useApp } from '../../../core/state/AppContext';
import { Button } from '../ui/button';

const categories = [
  {
    id: 'tattoo',
    title: 'Tattoo Services',
    subtitle: 'Von Basic bis Exklusiv für jeden Geschmack',
    icon: Sparkles,
    priceFrom: '120€',
  },
  {
    id: 'piercing',
    title: 'Premium Piercing',
    subtitle: 'Hygienisch mit 5+ Jahren Erfahrung',
    icon: Zap,
    priceFrom: '85€',
  },
  {
    id: 'products',
    title: 'Nachpflege Produkte',
    subtitle: 'Speziell für Tattoos und Piercings entwickelt',
    icon: Shield,
    priceFrom: '35€',
  },
  {
    id: 'plasma',
    title: 'Beratung & Planung',
    subtitle: 'Kostenlos beraten lassen und Termin sichern',
    icon: Heart,
    priceFrom: 'Kostenlos',
  },
] as const;

const serviceDetails = {
  tattoo: [
    {
      id: 'custom-tattoo',
      title: 'Basis Tattoo',
      description:
        'Präzise Linien, perfekte Platzierung und starke Farbsättigung für kleinere Motive.',
      priceFrom: 120,
      priceUnit: '€ / Stunde',
      duration: '2-4 Stunden',
      features: ['Persönliche Beratung', 'Skizzen-Erstellung', 'Alle Stilrichtungen'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'premium-tattoo',
      title: 'Premium Tattoo',
      description: 'Aufwendige Projekte mit exklusiven Pigmenten und mehrstufiger Planung.',
      priceFrom: 280,
      priceUnit: '€ / Sitzung',
      duration: '4-8 Stunden',
      features: ['Artist Matching', 'Detailverliebte Ausarbeitung', 'Premium Nachsorge'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'exclusive-tattoo',
      title: 'Exklusiv Tattoo',
      description: 'Mehrteilige Meisterwerke mit individuellen Sessions und Concierge-Service.',
      priceFrom: 450,
      priceUnit: '€ / Sitzung',
      duration: 'Ganztägig',
      features: ['Individuelle Projektplanung', 'Private Studiofläche', 'VIP Betreuung'],
      cta: 'Jetzt buchen',
    },
  ],
  piercing: [
    {
      id: 'standard-piercing',
      title: 'Basis Piercing',
      description: 'Professionelles Body Piercing inklusive Titan-Schmuck und Hygiene-Check.',
      priceFrom: 45,
      priceUnit: '€ / Piercing',
      duration: '15-30 Min',
      features: ['Sterile Einwegmaterialien', 'Titan-Schmuck', 'Nachsorgeberatung'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'premium-piercing',
      title: 'Premium Piercing',
      description: 'Premium Schmuckauswahl, Styling-Beratung und personalisierte Nachpflege.',
      priceFrom: 85,
      priceUnit: '€ / Piercing',
      duration: '30-45 Min',
      features: ['Exklusive Schmuckauswahl', 'Styling-Beratung', 'Premium Pflegeprodukte'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'exclusive-piercing',
      title: 'Exklusiv Piercing',
      description: 'Komplexe Kurationsprojekte mit mehrteiligen Schmuckkonzepten.',
      priceFrom: 150,
      priceUnit: '€ / Projekt',
      duration: '60 Min',
      features: ['Kurationsplanung', 'VIP Lounge', 'Follow-up Termine'],
      cta: 'Jetzt buchen',
    },
  ],
  products: [
    {
      id: 'basic-care',
      title: 'Basis Pflegeset',
      description: 'Essentials für perfekte Tattoo-Heilung inklusive milder Reinigung.',
      priceFrom: 25,
      priceUnit: '€',
      duration: null,
      features: ['Tattoo Cleanser', 'Healing Balm', 'Anwendungsguide'],
      cta: 'Jetzt kaufen',
    },
    {
      id: 'premium-care',
      title: 'Premium Pflegeset',
      description: 'Glanz & Schutz mit hochwertigen, veganen Pflegeprodukten.',
      priceFrom: 65,
      priceUnit: '€',
      duration: null,
      features: ['Vegan Balm', 'Hydro Spray', '24/7 Support'],
      cta: 'Jetzt kaufen',
    },
    {
      id: 'piercing-care',
      title: 'Piercing Pflege',
      description: 'Schnelle Heilung mit pH-neutraler Pflege speziell für Piercings.',
      priceFrom: 35,
      priceUnit: '€',
      duration: null,
      features: ['Saline Solution', 'Aftercare Mist', 'Sterile Pads'],
      cta: 'Jetzt kaufen',
    },
  ],
  plasma: [
    {
      id: 'consult',
      title: 'Grundberatung',
      description: 'Kostenloser Termin für Cover-Up- oder Refresh-Projekte.',
      priceFrom: 0,
      priceUnit: 'Kostenlos',
      duration: '30 Min',
      features: ['Bedarfsanalyse', 'Stilberatung', 'Zeitplanung'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'premium-consult',
      title: 'Premium Beratung',
      description: 'Intensive Konzeptionsphase inklusive Artist Matching.',
      priceFrom: 75,
      priceUnit: '€ / Termin',
      duration: '60 Min',
      features: ['Artist Matching', 'Skizzen Review', 'Budgetplanung'],
      cta: 'Jetzt buchen',
    },
    {
      id: 'vip-consult',
      title: 'VIP Beratung',
      description: 'Concierge-Service mit priorisierten Terminen und persönlicher Betreuung.',
      priceFrom: 150,
      priceUnit: '€ / Termin',
      duration: '90 Min',
      features: ['VIP Lounge', 'Concierge', 'Projekt Roadmap'],
      cta: 'Termin reservieren',
    },
  ],
} as const;

type CategoryId = keyof typeof serviceDetails;

// Standard animation variants (consistent across pages)
const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
} as const;

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
} as const;

interface ServicesPageInteractiveProps {
  className?: string;
}

const formatPrice = (priceFrom: number, priceUnit: string) => {
  if (priceFrom <= 0) return priceUnit;
  const unitWithoutEuro = priceUnit.replace(/€/g, '').trim();
  const suffix = unitWithoutEuro.length > 0 ? ` ${unitWithoutEuro}` : '';
  return `ab ${priceFrom} €${suffix}`;
};

export const ServicesPageInteractive: React.FC<ServicesPageInteractiveProps> = ({
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('tattoo');
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

  const handleCategoryChange = useCallback((categoryId: CategoryId) => {
    if (categoryId === activeCategory || isAnimating) return;
    setIsAnimating(true);
    setActiveCategory(categoryId);
    window.setTimeout(() => setIsAnimating(false), 400);
  }, [activeCategory, isAnimating]);

  // Debounced booking handler to prevent accidental double-invocation
  const handleServiceBooking = useMemo(() => {
    let t: number | undefined;
    return (serviceId: string) => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => openBooking({ service: serviceId }), 300) as unknown as number;
    };
  }, [openBooking]);

  return (
    <section className={`section-padding relative z-10 ${className}`}>
      <div className='responsive-container safe-area-padding'>
        <div className='mx-auto w-full max-w-[1104px] flex flex-col gap-16'>
          <div className='text-center space-y-8'>
            <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
              Medusa München
            </p>
            <h1 className='font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--brand-gold)]'>
              Unsere Services
            </h1>
            <p className='text-lg text-[#C0C0C0] max-w-2xl mx-auto font-body leading-relaxed'>
              Wählen Sie aus unseren Signature-Angeboten und entdecken Sie Premium-Optionen, die
              perfekt zu Ihrem Projekt passen.
            </p>
          </div>

          <div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'
            role='tablist'
            aria-label='Service-Kategorien'
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.id;
              const buttonClass = isActive
                ? 'flex flex-col h-full rounded-2xl border-2 border-[var(--brand-gold)] px-8 py-10 text-left transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--deep-black)] shadow-[0_0_32px_rgba(212,175,55,0.45)] scale-[1.02]'
                : 'flex flex-col h-full rounded-2xl border-2 border-white/10 px-8 py-10 text-left transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--deep-black)] hover:border-[var(--brand-gold)]/80 hover:scale-[1.02]';

              return (
                <button
                  key={category.id}
                  id={`tab-${category.id}`}
                  role='tab'
                  aria-selected={isActive}
                  aria-controls={`panel-${category.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={buttonClass}
                  onClick={() => handleCategoryChange(category.id as CategoryId)}
                  aria-label={`Select ${category.title} category`}
                >
                  <div className='flex items-center justify-between mb-8'>
                    <div
                      className='h-14 w-14 flex items-center justify-center'
                      style={{ borderRadius: '9999px', backgroundColor: 'var(--brand-gold)' }}
                    >
                      <IconComponent size={20} className='text-black' />
                    </div>
                    <span className='text-xs font-semibold uppercase tracking-[0.25em] text-white/60'>
                      ab {category.priceFrom}
                    </span>
                  </div>
                  <div className='space-y-8 flex-1'>
                    <h3 className='font-headline text-2xl text-(--brand-gold)'>{category.title}</h3>
                    <p className='text-sm md:text-base text-white/75 leading-relaxed font-body'>
                      {category.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={activeCategory}
              ref={containerRef}
              className='space-y-16'
              role='tabpanel'
              id={`panel-${activeCategory}`}
              aria-labelledby={`tab-${activeCategory}`}
              aria-live='polite'
              aria-label={`Showing ${activeCategoryMeta?.title} services`}
              variants={containerVariants}
              initial='initial'
              animate={inView ? 'animate' : 'initial'}
              exit='exit'
            >
              <div className='text-center space-y-8'>
                <p className='text-sm uppercase tracking-[0.25em] text-white/60'>
                  {activeCategoryMeta?.title}
                </p>
                <h2 className='font-headline text-3xl md:text-4xl text-[var(--brand-gold)]'>
                  Wählen Sie das passende Paket
                </h2>
                <p className='text-base text-white/70 max-w-2xl mx-auto font-body leading-relaxed'>
                  {activeCategoryMeta?.subtitle}
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {currentServices.map((service, index) => {
                  const stateClass =
                    index === 1
                      ? 'border-[var(--brand-gold)] shadow-[0_20px_60px_rgba(212,175,55,0.35)] scale-[1.01]'
                      : 'border-white/10 hover:border-[var(--brand-gold)]/70';

                  return (
                    <div key={service.id} className='flex flex-col h-full'>
                      <motion.div
                        variants={fadeInUpVariants}
                        className={`flex flex-col h-full rounded-3xl border-2 bg-[#222222] transition-all duration-300 ${stateClass}`}
                      >
                        <div className='flex flex-col gap-8 p-8 h-full'>
                          <div className='flex items-center justify-between'>
                            <span className='text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]/80'>
                              {index === 1 ? 'Beliebt' : 'Paket'}
                            </span>
                            <span className='text-sm font-semibold uppercase tracking-[0.2em] text-white/60'>
                              {service.duration ?? 'Flexibel'}
                            </span>
                          </div>

                          <h3 className='font-headline text-2xl md:text-3xl text-white'>
                            {service.title}
                          </h3>

                          <p className='text-base leading-7 text-white/70 flex-1 font-body'>
                            {service.description}
                          </p>

                          <div className='flex items-center gap-8 text-[var(--brand-gold)] font-semibold text-xl'>
                            <Euro size={18} />
                            <span>{formatPrice(service.priceFrom, service.priceUnit)}</span>
                          </div>

                          <ul className='space-y-8 text-sm text-white/80 font-body'>
                            {service.features.map((feature, featureIndex) => (
                              <motion.li key={featureIndex} className='flex items-center gap-8' variants={fadeInUpVariants}>
                                <ChevronRight size={16} className='text-[var(--brand-gold)] shrink-0' />
                                <span>{feature}</span>
                              </motion.li>
                            ))}
                          </ul>

                          <Button
                            onClick={() => handleServiceBooking(service.id)}
                            variant={index === 1 ? 'gold' : 'outlineGold'}
                            className={`w-full inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-200 focus:ring-2 focus:ring-[var(--brand-gold)] focus:ring-offset-2 focus:ring-offset-[var(--deep-black)]`}
                            aria-label={`${service.cta} für ${service.title}`}
                          >
                            {service.cta}
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServicesPageInteractive;
