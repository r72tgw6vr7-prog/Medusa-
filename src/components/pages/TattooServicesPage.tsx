import React, { useMemo, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Sparkles, Zap, Shield, Euro, ChevronRight } from 'lucide-react';
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
      description: 'Größere Projekte mit detaillierter Ausarbeitung. Includes aftercare guide & products.',
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
      features: ['Einfache Motive ab €20', 'Preis nach Komplexität', 'Kleine/reguläre Designs bis 2 Std.'],
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

export const TattooServicesPage: React.FC<TattooServicesPageProps> = ({
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('tattoo');
  const [selectedPacket, setSelectedPacket] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { openBooking } = useApp();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

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
    return (
      <Card
        key={service.id}
        variant={isSelected ? 'featured' : 'default'}
        className="flex flex-col h-full"
        asChild
      >
        <motion.div
          variants={fadeInUpVariants}
          className="paket-card flex flex-col h-full cursor-pointer"
          onClick={() => setSelectedPacket(isSelected ? null : service.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className='flex flex-col gap-8 h-full'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-semibold uppercase tracking-wider text-brand-chrome/80'>
                Paket
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
              onClick={() => handleServiceBooking(service.id)}
              variant='outlineChrome'
              className='w-full flex items-center justify-center rounded-lg px-4 py-4 text-sm font-semibold transition-all duration-200 focus:ring-2 focus:ring-(--brand-accent) focus:ring-offset-2 focus:ring-offset-(--deep-black)'
              aria-label={`${service.cta} für ${service.title}`}
            >
              {service.cta}
            </Button>
          </div>
        </motion.div>
      </Card>
    );
  };

  return (
    <main className={`tattoo-services-page w-full min-h-screen relative z-10 bg-luxury-bg-dark ${className}`}>
      <MainNavigation />
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-container-main flex flex-col gap-16'>
            <SectionHeading
              eyebrow="Medusa München"
              title="Tattoo"
            subtitle="Wählen Sie aus unseren Signature-Angeboten und entdecken Sie Premium-Optionen, die perfekt zu Ihrem Projekt passen."
          />

          <div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center justify-items-center max-w-4xl mx-auto'
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

        {/* Bottom cards section - wider container */}
        <div className='w-full max-w-container-packages mx-auto px-6 lg:px-12 mt-20'>
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
                title="Wählen Sie das passende Paket"
                subtitle={activeCategoryMeta?.subtitle}
              />

              {isDesktop ? (
                <div className={`paket-cards-wrapper lg:grid lg:grid-cols-1 lg:gap-16 lg:justify-center lg:justify-items-center ${
                  (currentServices.length as number) >= 4 ? 'lg:grid-cols-4' :
                  (currentServices.length as number) === 3 ? 'lg:grid-cols-3' :
                  (currentServices.length as number) === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
                }`}>
                  {currentServices.map((service) => (
                    <React.Fragment key={service.id}>
                      {renderServiceCard(service)}
                    </React.Fragment>
                  ))}
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
                  {currentServices.map((service) => (
                    <SwiperSlide key={service.id} className='h-auto!'>
                      {renderServiceCard(service)}
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
    </section>
      <Footer />
    </main>
  );
};

export default TattooServicesPage;
