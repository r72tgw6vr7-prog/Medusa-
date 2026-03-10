import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/i18n/utils/localizePath';
import {
  servicesFadeInUpVariants as fadeInUpVariants,
  servicesContainerVariants as containerVariants,
} from '@/styles/animations';

const categories = [
  {
    id: 'tattoo',
    icon: Sparkles,
  },
  {
    id: 'piercing',
    icon: Zap,
  },
  {
    id: 'products',
    icon: Shield,
  },
] as const;

const serviceDetails = {
  tattoo: [
    {
      id: 'packet-s',
      priceFrom: 80,
    },
    {
      id: 'packet-m',
      priceFrom: 160,
    },
    {
      id: 'packet-l',
      priceFrom: 600,
    },
    {
      id: 'day-session',
      priceFrom: 0,
    },
  ],
  piercing: [
    {
      id: 'dynamic-pricing',
      priceFrom: 20,
    },
    {
      id: 'free-design',
      priceFrom: 0,
    },
    {
      id: 'design-only',
      priceFrom: 20,
    },
  ],
  products: [
    {
      id: 'ink-solutions-info',
      priceFrom: 0,
      duration: null,
    },
  ],
} as const;

type CategoryId = keyof typeof serviceDetails;

interface TattooServicesPageProps {
  className?: string;
}

export const TattooServicesPage: React.FC<TattooServicesPageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
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

  const categoryTitle = useCallback(
    (categoryId: CategoryId) => t(`services.tattooServicesPage.categories.${categoryId}.title`),
    [t],
  );

  const categorySubtitle = useCallback(
    (categoryId: CategoryId) => t(`services.tattooServicesPage.categories.${categoryId}.subtitle`),
    [t],
  );

  const categoryPriceFrom = useCallback(
    (categoryId: CategoryId) => t(`services.tattooServicesPage.categories.${categoryId}.priceFrom`),
    [t],
  );

  const serviceKey = useCallback(
    (categoryId: CategoryId, serviceId: string) =>
      `services.tattooServicesPage.services.${categoryId}.${serviceId}`,
    [],
  );

  const formatPriceI18n = useCallback(
    (priceFrom: number, priceUnit: string) => {
      if (priceFrom <= 0) return priceUnit;
      return `${t('services.pricing.fromShort')} ${priceFrom} €${priceUnit}`;
    },
    [t],
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
      t = window.setTimeout(() => {
        openBooking({ service: serviceId });
        navigate(localizePath('/booking', language));
      }, 300) as unknown as number;
    };
  }, [language, openBooking, navigate]);

  const renderServiceCard = (service: (typeof currentServices)[number], index: number) => {
    const isSelected = selectedPacket === service.id;
    const isRevealed = revealedIndices.has(index);
    const baseKey = serviceKey(activeCategory, service.id);
    const title = t(`${baseKey}.title`);
    const description = t(`${baseKey}.description`);
    const priceUnit = t(`${baseKey}.priceUnit`);
    const features = t(`${baseKey}.features`).split('\n');
    const cta = t(`${baseKey}.cta`);

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
            <h3 className='font-semibold text-3xl leading-10 text-white mb-4'>{title}</h3>

            {/* Description */}
            <p className='font-normal text-sm leading-7 text-white/70 mb-8 flex-1'>{description}</p>

            {/* Price */}
            <div className='flex items-center gap-2 mb-8'>
              <Euro size={18} className='text-[color:var(--text-secondary)]' />
              <span className='font-semibold text-xl leading-7 text-[color:var(--text-secondary)]'>
                {formatPriceI18n(service.priceFrom, priceUnit)}
              </span>
            </div>

            {/* List */}
            <ul className='space-y-4 mb-8'>
              {features.map((feature, featureIndex) => (
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
              aria-label={t('services.tattooServicesPage.labels.bookServiceAria', { cta, title })}
            >
              {cta}
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
            <h1 className='sr-only'>{t('services.tattooServicesPage.heading.title')}</h1>
            <SectionHeading
              eyebrow={t('services.tattooServicesPage.heading.eyebrow')}
              title={t('services.tattooServicesPage.heading.title')}
              subtitle={t('services.tattooServicesPage.heading.subtitle')}
            />

            <div
              className='premium-pricing-category-container grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 justify-center justify-items-stretch max-w-5xl mx-auto'
              aria-label={t('services.tattooServicesPage.labels.serviceCategoriesAria')}
            >
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = activeCategory === category.id;
                const title = categoryTitle(category.id);
                const subtitle = categorySubtitle(category.id);
                const priceFrom = categoryPriceFrom(category.id);

                const buttonContent = (
                  <>
                    <div className='premium-pricing-card__icon'>
                      <IconComponent size={20} className='text-luxury-text-primary' />
                    </div>
                    <div className='premium-pricing-card__body'>
                      <div className='premium-pricing-card__header'>
                        <h3 className='premium-pricing-card__title'>{title}</h3>
                        <span className='premium-pricing-card__price'>
                          {t('services.pricing.fromShort')} {priceFrom}
                        </span>
                      </div>
                      <p className='premium-pricing-card__subtitle'>{subtitle}</p>
                    </div>
                  </>
                );

                return (
                  <Card
                    key={category.id}
                    variant={isActive ? 'featured' : 'default'}
                    size='default'
                    className='premium-pricing-card'
                    asChild
                  >
                    <button
                      type='button'
                      aria-pressed={isActive ? 'true' : 'false'}
                      className='premium-pricing-card__button flex flex-col h-full'
                      onClick={() => handleCategoryChange(category.id as CategoryId)}
                      aria-label={t('services.tattooServicesPage.labels.selectCategoryAria', {
                        category: title,
                      })}
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
              aria-label={t('services.tattooServicesPage.labels.showingServicesAria', {
                category: activeCategoryMeta ? categoryTitle(activeCategoryMeta.id) : '',
              })}
              variants={containerVariants}
              initial='initial'
              animate={inView ? 'animate' : 'initial'}
              exit='exit'
            >
              <div className='hidden md:block'>
                <SectionHeading
                  eyebrow={activeCategoryMeta ? categoryTitle(activeCategoryMeta.id) : undefined}
                  title={t('services.tattooServicesPage.labels.choosePackage')}
                  subtitle={
                    activeCategoryMeta ? categorySubtitle(activeCategoryMeta.id) : undefined
                  }
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
