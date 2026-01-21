import React, { useMemo, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Gem, Sparkles, Wrench, Euro, ChevronRight, ChevronDown, MessageCircle } from 'lucide-react';
import { useApp } from '../../../core/state/AppContext';
import { Button } from '../ui/button';
import { SectionHeading } from '../SectionHeading';
import { Card } from '../ui/Card';
import { MainNavigation } from '../molecules/MainNavigation';
import { Footer } from '../pages';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  servicesFadeInUpVariants as fadeInUpVariants,
  servicesContainerVariants as containerVariants,
} from '../../styles/animations';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/styles/paket-cards.css';

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

export const PiercingServicesPage: React.FC<PiercingServicesPageProps> = ({
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('stechen');
  const [selectedPacket, setSelectedPacket] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { openBooking } = useApp();
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
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
      window.setTimeout(() => setIsAnimating(false), 400);
    },
    [activeCategory, isAnimating],
  );

  const handleServiceBooking = useMemo(() => {
    let t: number | undefined;
    return (serviceId: string) => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => openBooking({ service: serviceId }), 300) as unknown as number;
    };
  }, [openBooking]);

  return (
    <main className={`piercing-services-page w-full min-h-screen relative z-10 bg-luxury-bg-dark ${className}`}>
      <MainNavigation />
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-container-main flex flex-col gap-16'>
            <SectionHeading
              eyebrow="Medusa München"
              title="Piercing"
              subtitle="Professionelles Piercing mit über 5 Jahren Erfahrung und höchsten Hygienestandards."
            />

            <div className='flex items-center justify-center gap-4 p-6 rounded-2xl bg-brand-accent/10 border border-brand-accent/20'>
              <MessageCircle size={24} className='text-brand-accent' />
              <div className='text-center'>
                <p className='font-headline text-lg text-brand-chrome'>Kostenlose Beratung</p>
                <p className='text-sm text-luxury-text-inverse/70 font-body'>Allow us to help you choose the right team member and piercing</p>
              </div>
            </div>

            <div
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-4xl mx-auto'
              aria-label='Service-Kategorien'
            >
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = activeCategory === category.id;

                const buttonContent = (
                  <>
                    <div className='flex items-center justify-between mb-8'>
                      <div
                        className='flex flex-col h-full min-h-14 min-w-14 items-center justify-center rounded-full bg-brand-accent'
                      >
                        <IconComponent size={20} className='text-luxury-text-primary' />
                      </div>
                      <span className='text-sm lg:text-xs font-semibold uppercase tracking-wider text-luxury-text-inverse/60'>
                        ab {category.priceFrom}
                      </span>
                    </div>
                    <div className='space-y-8 flex-1'>
                      <h3 className='font-headline text-2xl text-brand-chrome'>{category.title}</h3>
                      <p className='text-sm md:text-base text-luxury-text-inverse/75 leading-relaxed font-body'>
                        {category.subtitle}
                      </p>
                    </div>
                  </>
                );

                const buttonClassName =
                  'flex flex-col h-full transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-4 focus-visible:ring-offset-(--deep-black) hover-scale';

                return (
                  <Card 
                    key={category.id}
                    variant={isActive ? 'featured' : 'default'}
                    size="default"
                    className="flex flex-col h-full"
                    asChild
                  >
                    {isActive ? (
                      <button
                        type="button"
                        aria-pressed="true"
                        className={buttonClassName}
                        onClick={() => handleCategoryChange(category.id as CategoryId)}
                        aria-label={`Select ${category.title} category`}
                      >
                        {buttonContent}
                      </button>
                    ) : (
                      <button
                        type="button"
                        aria-pressed="false"
                        className={buttonClassName}
                        onClick={() => handleCategoryChange(category.id as CategoryId)}
                        aria-label={`Select ${category.title} category`}
                      >
                        {buttonContent}
                      </button>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className='w-full px-6 lg:px-12 mt-20'>
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
              <SectionHeading
                eyebrow={activeCategoryMeta?.title}
                title="Wählen Sie Ihre Option"
                subtitle={activeCategoryMeta?.subtitle}
              />

              <div className='w-full flex justify-center'>
                {isDesktop ? (
                  <div className={`inline-grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center ${
                    (currentServices.length as number) >= 5 ? 'lg:grid-cols-5' :
                    (currentServices.length as number) === 4 ? 'lg:grid-cols-4' :
                    (currentServices.length as number) === 3 ? 'lg:grid-cols-3' :
                    (currentServices.length as number) === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
                  }`}>
                    {currentServices.map((service) => {
                      const isSelected = selectedPacket === service.id;
                      const priceList = activeCategory === 'stechen' ? PREISLISTE_STECHEN[service.id] : null;
                      const hasDetails = !!(priceList && priceList.items && priceList.items.length > 0);
                      const isExpanded = expandedCard === service.id && hasDetails;
                      return (
                        <Card 
                          key={service.id} 
                          variant={isSelected ? 'featured' : 'default'}
                          className="flex flex-col h-full"
                          asChild
                        >
                          <motion.div
                            variants={fadeInUpVariants}
                            className="flex flex-col h-full min-w-(--paket-card-min-width) max-w-(--paket-card-max-width)"
                            whileHover={!isExpanded ? { scale: 1.02 } : undefined}
                            whileTap={!isExpanded ? { scale: 0.98 } : undefined}
                          >
                            <div className='flex flex-col gap-8 h-full'>
                              <div className='flex items-center justify-between'>
                                <span className='text-sm font-semibold uppercase tracking-wider text-brand-chrome/80'>
                                  {activeCategory === 'stechen' ? 'Bereich' : 'Option'}
                                </span>
                                <span className='text-sm font-semibold uppercase tracking-wider text-luxury-text-inverse/60'>
                                  {service.duration ?? 'Flexibel'}
                                </span>
                              </div>

                              <h3 className='font-headline text-2xl md:text-3xl text-luxury-text-inverse'>
                                {service.title}
                              </h3>

                              <p className='text-base leading-7 text-luxury-text-inverse/70 flex-1 font-body'>
                                {service.description}
                              </p>

                              <div className='flex items-center gap-8 text-brand-chrome font-semibold text-xl'>
                                <Euro size={18} />
                                <span>{formatPrice(service.priceFrom, service.priceUnit)}</span>
                              </div>

                              {hasDetails && (
                                <>
                                  {isExpanded ? (
                                    <button
                                      type="button"
                                      onClick={e => {
                                        e.stopPropagation();
                                        setExpandedCard(null);
                                      }}
                                      className="flex items-center justify-between w-full py-2 text-sm font-semibold text-brand-chrome/80 hover:text-brand-chrome transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--deep-black) rounded touch-target-mobile"
                                      aria-expanded="true"
                                    >
                                      <span>Preisliste ausblenden</span>
                                      <ChevronDown
                                        size={18}
                                        className="transition-transform duration-300 rotate-180"
                                      />
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={e => {
                                        e.stopPropagation();
                                        setExpandedCard(service.id);
                                      }}
                                      className="flex items-center justify-between w-full py-2 text-sm font-semibold text-brand-chrome/80 hover:text-brand-chrome transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--deep-black) rounded touch-target-mobile"
                                      aria-expanded="false"
                                    >
                                      <span>Alle Preise anzeigen</span>
                                      <ChevronDown
                                        size={18}
                                        className="transition-transform duration-300"
                                      />
                                    </button>
                                  )}
                                  <AnimatePresence>
                                    {isExpanded && (
                                      <motion.div
                                        id={`price-details-${service.id}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                      >
                                        <div className="border-t border-luxury-text-inverse/10 pt-4">
                                          <div className="paket-price-grid mb-2 text-sm lg:text-xs font-semibold uppercase tracking-wider text-luxury-text-inverse/50">
                                            <span>Piercing</span>
                                            <span className="w-12 text-right">1</span>
                                            <span className="w-12 text-right">2</span>
                                          </div>
                                          <ul className="space-y-2 divide-y divide-luxury-text-inverse/5">
                                            {priceList.items.map((item, idx) => (
                                              <li
                                                key={idx}
                                                className="paket-price-grid py-2 text-sm text-luxury-text-inverse/80"
                                              >
                                                <span className="font-body truncate">{item.name}</span>
                                                <span className="w-12 text-right font-semibold text-brand-chrome/90">{item.price1}</span>
                                                <span className="w-12 text-right font-semibold text-brand-chrome/90">{item.price2 ?? '—'}</span>
                                              </li>
                                            ))}
                                          </ul>
                                          {priceList.note && (
                                            <p className="mt-4 text-sm lg:text-xs text-luxury-text-inverse/50 italic text-center">
                                              {priceList.note}
                                            </p>
                                          )}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </>
                              )}

                              <ul className='space-y-8 text-sm text-luxury-text-inverse/80 font-body'>
                                {service.features.map((feature, featureIndex) => (
                                  <li key={featureIndex}>
                                    <motion.div
                                      className='flex items-center gap-8'
                                      variants={fadeInUpVariants}
                                    >
                                      <ChevronRight
                                        size={16}
                                        className='text-brand-chrome shrink-0'
                                      />
                                      <span>{feature}</span>
                                    </motion.div>
                                  </li>
                                ))}
                              </ul>

                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleServiceBooking(service.id);
                                }}
                                variant={isSelected ? 'chrome' : 'outlineChrome'}
                                className="w-full flex items-center justify-center rounded-xl px-8 py-6 text-base font-semibold transition-all duration-200 focus:ring-2 focus:ring-(--brand-accent) focus:ring-offset-2 focus:ring-offset-(--deep-black)"
                                aria-label={`${service.cta} für ${service.title}`}
                              >
                                {service.cta}
                              </Button>
                            </div>
                          </motion.div>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <Swiper
                    modules={[Pagination]}
                    slidesPerView={1}
                    spaceBetween={16}
                    pagination={{
                      clickable: true,
                      bulletClass: 'swiper-pagination-bullet !bg-white/30',
                      bulletActiveClass: 'swiper-pagination-bullet-active !bg-brand-accent',
                    }}
                    className='paket-cards-swiper'
                  >
                    {currentServices.map((service) => {
                      const isSelected = selectedPacket === service.id;
                      const priceList = activeCategory === 'stechen' ? PREISLISTE_STECHEN[service.id] : null;
                      const hasDetails = !!(priceList && priceList.items && priceList.items.length > 0);
                      const isExpanded = expandedCard === service.id && hasDetails;
                      return (
                        <SwiperSlide key={service.id} className='h-auto!'>
                          <Card 
                            variant={isSelected ? 'featured' : 'default'}
                            className="flex flex-col h-full"
                            asChild
                          >
                            <motion.div
                              variants={fadeInUpVariants}
                              className="flex flex-col h-full min-w-(--paket-card-min-width) max-w-(--paket-card-max-width)"
                              whileHover={!isExpanded ? { scale: 1.02 } : undefined}
                              whileTap={!isExpanded ? { scale: 0.98 } : undefined}
                            >
                              <div className='flex flex-col gap-8 h-full'>
                                <div className='flex items-center justify-between'>
                                  <span className='text-sm font-semibold uppercase tracking-wider text-brand-chrome/80'>
                                    {activeCategory === 'stechen' ? 'Bereich' : 'Option'}
                                  </span>
                                  <span className='text-sm font-semibold uppercase tracking-wider text-luxury-text-inverse/60'>
                                    {service.duration ?? 'Flexibel'}
                                  </span>
                                </div>

                                <h3 className='font-headline text-2xl md:text-3xl text-luxury-text-inverse'>
                                  {service.title}
                                </h3>

                                <p className='text-base leading-7 text-luxury-text-inverse/70 flex-1 font-body'>
                                  {service.description}
                                </p>

                                <div className='flex items-center gap-8 text-brand-chrome font-semibold text-xl'>
                                  <Euro size={18} />
                                  <span>{formatPrice(service.priceFrom, service.priceUnit)}</span>
                                </div>

                                {hasDetails && (
                                  <>
                                    {isExpanded ? (
                                      <button
                                        type="button"
                                        onClick={e => {
                                          e.stopPropagation();
                                          setExpandedCard(null);
                                        }}
                                        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-brand-chrome/80 hover:text-brand-chrome transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--deep-black) rounded touch-target-mobile"
                                        aria-expanded="true"
                                      >
                                        <span>Preisliste ausblenden</span>
                                        <ChevronDown
                                          size={18}
                                          className="transition-transform duration-300 rotate-180"
                                        />
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={e => {
                                          e.stopPropagation();
                                          setExpandedCard(service.id);
                                        }}
                                        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-brand-chrome/80 hover:text-brand-chrome transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-(--brand-accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--deep-black) rounded touch-target-mobile"
                                        aria-expanded="false"
                                      >
                                        <span>Alle Preise anzeigen</span>
                                        <ChevronDown
                                          size={18}
                                          className="transition-transform duration-300"
                                        />
                                      </button>
                                    )}
                                    <AnimatePresence>
                                      {isExpanded && (
                                        <motion.div
                                          id={`price-details-${service.id}`}
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
                                          className="overflow-hidden"
                                        >
                                          <div className="border-t border-luxury-text-inverse/10 pt-4">
                                            <div className="paket-price-grid mb-2 text-sm lg:text-xs font-semibold uppercase tracking-wider text-luxury-text-inverse/50">
                                              <span>Piercing</span>
                                              <span className="w-12 text-right">1</span>
                                              <span className="w-12 text-right">2</span>
                                            </div>
                                            <ul className="space-y-2 divide-y divide-luxury-text-inverse/5">
                                              {priceList.items.map((item, idx) => (
                                                <li
                                                  key={idx}
                                                  className="paket-price-grid py-2 text-sm text-luxury-text-inverse/80"
                                                >
                                                  <span className="font-body truncate">{item.name}</span>
                                                  <span className="w-12 text-right font-semibold text-brand-chrome/90">{item.price1}</span>
                                                  <span className="w-12 text-right font-semibold text-brand-chrome/90">{item.price2 ?? '—'}</span>
                                                </li>
                                              ))}
                                            </ul>
                                            {priceList.note && (
                                              <p className="mt-4 text-sm lg:text-xs text-luxury-text-inverse/50 italic text-center">
                                                {priceList.note}
                                              </p>
                                            )}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </>
                                )}

                                <ul className='space-y-8 text-sm text-luxury-text-inverse/80 font-body'>
                                  {service.features.map((feature, featureIndex) => (
                                    <li key={featureIndex}>
                                      <motion.div
                                        className='flex items-center gap-8'
                                        variants={fadeInUpVariants}
                                      >
                                        <ChevronRight
                                          size={16}
                                          className='text-brand-chrome shrink-0'
                                        />
                                        <span>{feature}</span>
                                      </motion.div>
                                    </li>
                                  ))}
                                </ul>

                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleServiceBooking(service.id);
                                  }}
                                  variant={isSelected ? 'chrome' : 'outlineChrome'}
                                  className="w-full flex items-center justify-center rounded-xl px-8 py-6 text-base font-semibold transition-all duration-200 focus:ring-2 focus:ring-(--brand-accent) focus:ring-offset-2 focus:ring-offset-(--deep-black)"
                                  aria-label={`${service.cta} für ${service.title}`}
                                >
                                  {service.cta}
                                </Button>
                              </div>
                            </motion.div>
                          </Card>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PiercingServicesPage;
