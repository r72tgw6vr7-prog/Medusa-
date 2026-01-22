import React, { useMemo, useState, useCallback, useRef, lazy, Suspense } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Sparkles, Zap, Shield, Euro, ChevronRight } from 'lucide-react';
import { useApp } from '../../../core/state/AppContext';
import { SectionHeading } from '../SectionHeading';
import { Card } from '../ui/Card';
import { MainNavigation } from '../molecules/MainNavigation';
import { Footer } from '../pages';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import {
  servicesFadeInUpVariants as fadeInUpVariants,
  servicesContainerVariants as containerVariants,
} from '../../styles/animations';

// Dynamic imports for Swiper to reduce initial bundle
const SwiperComponent = lazy(() => 
  Promise.all([
    import('swiper/react'),
    import('swiper/modules'),
    import('swiper/css'),
    import('swiper/css/pagination')
  ]).then(([swiperReact, swiperModules]) => ({
    default: ({ children, ...props }: any) => {
      const { Swiper, SwiperSlide } = swiperReact;
      const { Pagination } = swiperModules;
      return (
        <Swiper modules={[Pagination]} {...props}>
          {children}
        </Swiper>
      );
    }
  }))
);

const SwiperSlideComponent = lazy(() => 
  import('swiper/react').then(({ SwiperSlide }) => ({ default: SwiperSlide }))
);

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
      <motion.div
        key={service.id}
        variants={fadeInUpVariants}
        className="
          paket-card flex flex-col text-center 
          cursor-pointer
          h-full
        "
        onClick={() => setSelectedPacket(isSelected ? null : service.id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Top labels */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-semibold text-sm tracking-[0.7px] uppercase text-[color:var(--text-secondary)]">
            Paket
          </span>
          <span className="font-normal text-sm tracking-[1.4px] uppercase text-white/60">
            {service.duration ?? 'Flexibel'}
          </span>
        </div>

        {/* Heading */}
        <h3 className="font-headline font-normal text-[length:var(--text-h3)] leading-[36px] text-white mb-6">
          {service.title}
        </h3>

        {/* Description */}
        <p className="font-normal text-sm leading-[28px] text-white/70 mb-8 flex-1">
          {service.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-8">
          <Euro size={18} className="text-[color:var(--text-secondary)]" />
          <span className="font-semibold text-xl leading-7 text-[color:var(--text-secondary)]">
            {formatPrice(service.priceFrom, service.priceUnit)}
          </span>
        </div>

        {/* List */}
        <ul className="space-y-4 mb-8">
          {service.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start gap-3">
              <ChevronRight
                size={16}
                className="text-[color:var(--text-secondary)] flex-shrink-0 mt-1"
              />
              <span className="font-normal text-base leading-[23px] text-white/80">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <button
          onClick={() => handleServiceBooking(service.id)}
          className="
            w-full h-[50px]
            border border-[color:var(--text-secondary)]
            rounded-[24px]
            font-semibold text-sm leading-5 text-white
            hover:bg-[color:var(--text-secondary)] hover:text-black
            transition-all duration-200
          "
          aria-label={`${service.cta} für ${service.title}`}
        >
          {service.cta}
        </button>
      </motion.div>
    );
  };

  return (
    <main className={`tattoo-services-page w-full min-h-screen relative z-10 bg-luxury-bg-dark ${className}`}>
      <MainNavigation />
      <Section variant="default" spacing="normal" bg="dark">
        <Container size="default">
          <div className='flex flex-col gap-16'>
            <SectionHeading
              eyebrow="Medusa München"
              title="Tattoo"
              subtitle="Wählen Sie aus unseren Signature-Angeboten und entdecken Sie Premium-Optionen, die perfekt zu Ihrem Projekt passen."
            />

            <div
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center justify-items-center max-w-4xl mx-auto'
              aria-label='Service-Kategorien'
            >
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isActive = activeCategory === category.id;

              const buttonContent = (
                <>
                  <div className='flex items-center justify-between mb-8'>
                    <div
                      className='flex flex-col h-full min-h-14 min-w-14 items-center justify-center rounded-full bg-[var(--accent-chrome)]'
                    >
                      <IconComponent size={20} className='text-luxury-text-primary' />
                    </div>
                    <span className='text-base lg:text-sm font-semibold uppercase tracking-wider text-luxury-text-inverse/60'>
                      ab {category.priceFrom}
                    </span>
                  </div>
                  <div className='space-y-8 flex-1'>
                    <h3 className='font-headline text-2xl text-brand-chrome'>{category.title}</h3>
                    <p className="text-base lg:text-sm text-luxury-text-inverse/80 mb-8 leading-relaxed font-body">
                      {category.subtitle}
                    </p>
                  </div>
                </>
              );

              const buttonClassName =
                'flex flex-col h-full';

              return (
                <Card 
                  key={category.id}
                  variant={isActive ? 'featured' : 'default'}
                  size="default"
                  className="flex flex-col h-full"
                  asChild
                >
                  <button
                    type="button"
                    aria-pressed={isActive}
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

        {/* Bottom cards section - wider container */}
        <Container size="wide" className="mt-20 overflow-x-clip">
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
                <div className={`paket-cards-wrapper lg:grid lg:grid-cols-4 lg:gap-4 lg:justify-center lg:justify-items-center ${
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
                <div className='w-full overflow-x-clip'>
                  <Suspense
                    fallback={
                      <div className="min-h-100 flex items-center justify-center text-luxury-text-inverse">
                        Loading...
                      </div>
                    }
                  >
                    <SwiperComponent
                      slidesPerView={1}
                      spaceBetween={16}
                      pagination={{
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet !bg-white/30',
                        bulletActiveClass: 'swiper-pagination-bullet-active !bg-[var(--accent-chrome)]',
                      }}
                      className='paket-cards-swiper'
                    >
                      {currentServices.map((service) => (
                        <SwiperSlideComponent key={service.id} className='h-auto! w-full'>
                          {renderServiceCard(service)}
                        </SwiperSlideComponent>
                      ))}
                    </SwiperComponent>
                  </Suspense>
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
