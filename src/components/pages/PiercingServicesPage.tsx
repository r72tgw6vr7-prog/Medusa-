import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/i18n/utils/localizePath';
import React, { useMemo, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Gem,
  Sparkles,
  Wrench,
  Euro,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  MessageSquare,
  Info,
} from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useApp } from '@/core/state/AppContext';
import { SectionHeading } from '../SectionHeading';
import { Card } from '../ui/Card';
import { MainNavigation } from '../molecules/MainNavigation';
import { Footer } from '../pages';
import { PiercingPhotoModal } from '../molecules/PiercingPhotoModal';
import { piercingPhotoMap, type PiercingPhotoCategory } from '@/constants/piercingPhotos';
import {
  servicesFadeInUpVariants as fadeInUpVariants,
  servicesContainerVariants as containerVariants,
} from '../../styles/animations';
import '../../styles/pricing-table-mobile.css';

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
  ohrlochzauberer: {
    items: [
      { name: 'Kinderohrlochstechen (mit Zauberer-Erlebnis)', price1: '45,-', price2: '80,-' },
    ],
    note: 'Speziell für Kinder – mit Aaron als Ohrlochzauberer',
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

type CategoryId = 'stechen' | 'jewelry' | 'extras';

interface PiercingServicesPageProps {
  className?: string;
}

const formatPrice = (priceFrom: number, priceUnit: string) => {
  if (priceFrom <= 0) return priceUnit;
  const unitWithoutEuro = priceUnit.replace(/€/g, '').trim();
  const suffix = unitWithoutEuro.length > 0 ? ` ${unitWithoutEuro}` : '';
  return `ab ${priceFrom} €${suffix}`;
};

const CARD_HEIGHT_COLLAPSED = '660px';
const BACKDROP_BLUR = '8px';
const OVERLAY_EASE = [0.4, 0, 0.2, 1] as const;

export const PiercingServicesPage: React.FC<PiercingServicesPageProps> = ({ className = '' }) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('stechen');
  const [selectedPacket, setSelectedPacket] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isAnimating, setIsAnimating] = useState(false);
  const { openBooking } = useApp();
  const prefersReducedMotion = useReducedMotion();

  const categories = useMemo(
    () => [
      {
        id: 'stechen',
        title: t('services.piercingServicesPage.categories.stechen.title'),
        subtitle: t('services.piercingServicesPage.categories.stechen.subtitle'),
        icon: Sparkles,
        priceFrom: t('services.piercingServicesPage.categories.stechen.priceFrom'),
      },
      {
        id: 'jewelry',
        title: t('services.piercingServicesPage.categories.jewelry.title'),
        subtitle: t('services.piercingServicesPage.categories.jewelry.subtitle'),
        icon: Gem,
        priceFrom: t('services.piercingServicesPage.categories.jewelry.priceFrom'),
      },
      {
        id: 'extras',
        title: t('services.piercingServicesPage.categories.extras.title'),
        subtitle: t('services.piercingServicesPage.categories.extras.subtitle'),
        icon: Wrench,
        priceFrom: t('services.piercingServicesPage.categories.extras.priceFrom'),
      },
    ],
    [t],
  );

  const serviceDetails = useMemo(
    () => ({
      stechen: [
        {
          id: 'ohr',
          title: t('services.piercingServicesPage.services.stechen.ohr.title'),
          description: t('services.piercingServicesPage.services.stechen.ohr.description'),
          priceFrom: 35,
          priceUnit: t('services.piercingServicesPage.services.stechen.ohr.priceUnit'),
          duration: t('services.piercingServicesPage.services.stechen.ohr.duration'),
          features: t('services.piercingServicesPage.services.stechen.ohr.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.stechen.ohr.cta'),
        },
        {
          id: 'mund',
          title: t('services.piercingServicesPage.services.stechen.mund.title'),
          description: t('services.piercingServicesPage.services.stechen.mund.description'),
          priceFrom: 70,
          priceUnit: t('services.piercingServicesPage.services.stechen.mund.priceUnit'),
          duration: t('services.piercingServicesPage.services.stechen.mund.duration'),
          features: t('services.piercingServicesPage.services.stechen.mund.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.stechen.mund.cta'),
        },
        {
          id: 'gesicht',
          title: t('services.piercingServicesPage.services.stechen.gesicht.title'),
          description: t('services.piercingServicesPage.services.stechen.gesicht.description'),
          priceFrom: 60,
          priceUnit: t('services.piercingServicesPage.services.stechen.gesicht.priceUnit'),
          duration: t('services.piercingServicesPage.services.stechen.gesicht.duration'),
          features: t('services.piercingServicesPage.services.stechen.gesicht.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.stechen.gesicht.cta'),
        },
        {
          id: 'koerper',
          title: t('services.piercingServicesPage.services.stechen.koerper.title'),
          description: t('services.piercingServicesPage.services.stechen.koerper.description'),
          priceFrom: 80,
          priceUnit: t('services.piercingServicesPage.services.stechen.koerper.priceUnit'),
          duration: t('services.piercingServicesPage.services.stechen.koerper.duration'),
          features: t('services.piercingServicesPage.services.stechen.koerper.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.stechen.koerper.cta'),
        },
        {
          id: 'intim',
          title: t('services.piercingServicesPage.services.stechen.intim.title'),
          description: t('services.piercingServicesPage.services.stechen.intim.description'),
          priceFrom: 90,
          priceUnit: t('services.piercingServicesPage.services.stechen.intim.priceUnit'),
          duration: t('services.piercingServicesPage.services.stechen.intim.duration'),
          features: t('services.piercingServicesPage.services.stechen.intim.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.stechen.intim.cta'),
        },
        {
          id: 'ohrlochzauberer',
          title: t('services.piercingServicesPage.services.stechen.ohrlochzauberer.title'),
          description: t(
            'services.piercingServicesPage.services.stechen.ohrlochzauberer.description',
          ),
          priceFrom: 45,
          priceUnit: t('services.piercingServicesPage.services.stechen.ohrlochzauberer.priceUnit'),
          duration: t('services.piercingServicesPage.services.stechen.ohrlochzauberer.duration'),
          features: t('services.piercingServicesPage.services.stechen.ohrlochzauberer.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.stechen.ohrlochzauberer.cta'),
        },
      ],
      jewelry: [
        {
          id: 'titanium',
          title: t('services.piercingServicesPage.services.jewelry.titanium.title'),
          description: t('services.piercingServicesPage.services.jewelry.titanium.description'),
          priceFrom: 0,
          priceUnit: t('services.piercingServicesPage.services.jewelry.titanium.priceUnit'),
          duration: '',
          features: t('services.piercingServicesPage.services.jewelry.titanium.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.jewelry.titanium.cta'),
        },
        {
          id: 'upgrades',
          title: t('services.piercingServicesPage.services.jewelry.upgrades.title'),
          description: t('services.piercingServicesPage.services.jewelry.upgrades.description'),
          priceFrom: 5,
          priceUnit: t('services.piercingServicesPage.services.jewelry.upgrades.priceUnit'),
          duration: '',
          features: t('services.piercingServicesPage.services.jewelry.upgrades.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.jewelry.upgrades.cta'),
        },
      ],
      extras: [
        {
          id: 'entfernen',
          title: t('services.piercingServicesPage.services.extras.entfernen.title'),
          description: t('services.piercingServicesPage.services.extras.entfernen.description'),
          priceFrom: 5,
          priceUnit: t('services.piercingServicesPage.services.extras.entfernen.priceUnit'),
          duration: t('services.piercingServicesPage.services.extras.entfernen.duration'),
          features: t('services.piercingServicesPage.services.extras.entfernen.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.extras.entfernen.cta'),
        },
        {
          id: 'service',
          title: t('services.piercingServicesPage.services.extras.service.title'),
          description: t('services.piercingServicesPage.services.extras.service.description'),
          priceFrom: 5,
          priceUnit: t('services.piercingServicesPage.services.extras.service.priceUnit'),
          duration: t('services.piercingServicesPage.services.extras.service.duration'),
          features: t('services.piercingServicesPage.services.extras.service.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.extras.service.cta'),
        },
        {
          id: 'probleme',
          title: t('services.piercingServicesPage.services.extras.probleme.title'),
          description: t('services.piercingServicesPage.services.extras.probleme.description'),
          priceFrom: 5,
          priceUnit: t('services.piercingServicesPage.services.extras.probleme.priceUnit'),
          duration: t('services.piercingServicesPage.services.extras.probleme.duration'),
          features: t('services.piercingServicesPage.services.extras.probleme.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.extras.probleme.cta'),
        },
        {
          id: 'implantat',
          title: t('services.piercingServicesPage.services.extras.implantat.title'),
          description: t('services.piercingServicesPage.services.extras.implantat.description'),
          priceFrom: 25,
          priceUnit: t('services.piercingServicesPage.services.extras.implantat.priceUnit'),
          duration: t('services.piercingServicesPage.services.extras.implantat.duration'),
          features: t('services.piercingServicesPage.services.extras.implantat.features')
            .split('\n')
            .filter(Boolean),
          cta: t('services.piercingServicesPage.services.extras.implantat.cta'),
        },
      ],
    }),
    [t],
  );

  // Modal state for piercing photos
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedPhotoTitle, setSelectedPhotoTitle] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // Intersection Observer to trigger animations when in view
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.1, once: true });

  const currentServices = useMemo(
    () => serviceDetails[activeCategory],
    [activeCategory, serviceDetails],
  );
  const activeCategoryMeta = useMemo(
    () => categories.find((category) => category.id === activeCategory),
    [activeCategory, categories],
  );

  const activePhotos = useMemo(() => {
    if (!expandedCard) return [];
    if (expandedCard in piercingPhotoMap) {
      return piercingPhotoMap[expandedCard as PiercingPhotoCategory];
    }
    return [];
  }, [expandedCard]);

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
      t = window.setTimeout(() => {
        openBooking({ service: serviceId });
        navigate(localizePath('/booking', language));
      }, 300) as unknown as number;
    };
  }, [language, openBooking, navigate]);

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
        className={`bg-(--card-bg) border-(--card-border) shadow-(--card-shadow) piercing-service-card ${
          isExpanded ? 'paket-card--expanded' : 'paket-card--collapsed'
        }`}
        asChild
      >
        <motion.div
          variants={fadeInUpVariants}
          className='paket-card flex h-full flex-col self-start cursor-pointer text-center'
          onClick={() => {
            setSelectedPacket(isSelected ? null : service.id);
            if (!isSelected) setExpandedCard(null);
          }}
          whileHover={isDesktop && !isExpanded ? { scale: 1.02 } : undefined}
          whileTap={isDesktop && !isExpanded ? { scale: 0.98 } : undefined}
        >
          <div className='flex h-full flex-col gap-8'>
            <div className='flex flex-1 flex-col gap-8'>
              <div className='flex items-center justify-between'>
                <span className='font-semibold text-(length:--text-sm) tracking-wide uppercase text-(--text-secondary)'>
                  {activeCategory === 'stechen'
                    ? t('services.piercingServicesPage.labels.area')
                    : t('services.piercingServicesPage.labels.option')}
                </span>
                <span className='font-normal text-(length:--text-sm) tracking-wider uppercase text-white/60'>
                  {service.duration || t('services.piercingServicesPage.labels.flexible')}
                </span>
              </div>

              <h3 className='font-headline font-normal text-(length:--text-h3) leading-(--line-height-headline) text-white wrap-break-word'>
                {service.title}
              </h3>

              <p className='font-normal text-(length:--text-sm) leading-(--line-height-body) text-white/70'>
                {service.description}
              </p>

              <div className='flex items-center gap-2'>
                <Euro size={18} className='text-(--text-secondary)' />
                <span className='font-semibold text-(length:--text-xl) leading-(--line-height-body) text-(--text-secondary)'>
                  {formatPrice(service.priceFrom, service.priceUnit)}
                </span>
              </div>

              <ul className='space-y-4 text-(length:--text-sm) text-white/80'>
                {service.features.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className='flex items-center gap-4'>
                    <ChevronRight size={16} className='text-(--text-secondary) shrink-0 mt-2' />
                    <span className='font-normal text-(length:--text-base) leading-(--line-height-body)'>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {hasDetails && (
              <div className='relative mt-auto'>
                <button
                  type='button'
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerUp={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedCard((prev) => (prev === service.id ? null : service.id));
                  }}
                  className='flex items-center justify-between w-full py-2 text-(length:--text-sm) font-semibold text-(--text-secondary) hover:text-(--text-secondary) transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-(--accent-chrome) focus-visible:ring-offset-2 focus-visible:ring-offset-(--card-bg) rounded'
                  aria-expanded={isExpanded}
                  aria-controls={`price-details-${service.id}`}
                >
                  <span>
                    {isExpanded
                      ? t('services.piercingServicesPage.labels.hidePriceList')
                      : t('services.piercingServicesPage.labels.showAllPrices')}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      id={`price-details-${service.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className='mt-4 overflow-hidden'
                      onPointerDown={(e) => e.stopPropagation()}
                      onPointerUp={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className='bg-(--card-bg) border border-white/10 rounded-2xl p-4 shadow-(--card-shadow)'>
                        <div className='paket-price-grid mb-2 text-(length:--text-xs) font-semibold uppercase tracking-wider text-white/50'>
                          <span>{t('services.piercingServicesPage.labels.priceGridName')}</span>
                          <span className='w-12 text-right'>1</span>
                          <span className='w-12 text-right'>2</span>
                        </div>
                        <ul className='space-y-2'>
                          {priceList.items.map((item, idx) => (
                            <li
                              key={idx}
                              className='paket-price-grid text-(length:--text-sm) text-white/80 py-2 border-b border-white/5 last:border-b-0 flex flex-col h-full'
                            >
                              <span className='piercing-name-cell whitespace-normal leading-snug'>
                                {item.name}
                                {isMobile && (
                                  <button
                                    className='piercing-info-button'
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleOpenPhotoModal(
                                        item.name,
                                        service.id as PiercingPhotoCategory,
                                      );
                                    }}
                                    aria-label={t(
                                      'services.piercingServicesPage.labels.examplePhotosAria',
                                      { name: item.name },
                                    )}
                                    type='button'
                                  >
                                    <Info size={16} className='piercing-info-icon' />
                                  </button>
                                )}
                              </span>
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
                          <p className='mt-4 text-(length:--text-xs) text-white/50 italic text-center'>
                            {priceList.note}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <button
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleServiceBooking(service.id);
              }}
              className='w-full h-12 border border-(--text-secondary) rounded-3xl font-semibold text-(length:--text-sm) leading-(--line-height-body) text-white hover:bg-(--text-secondary) hover:text-black transition-all duration-200 focus-visible:ring-2 focus-visible:ring-(--accent-chrome) focus-visible:ring-offset-2 focus-visible:ring-offset-(--card-bg)'
              aria-label={t('services.piercingServicesPage.labels.bookServiceAria', {
                cta: service.cta,
                title: service.title,
              })}
            >
              {service.cta}
            </button>
            <AnimatePresence>
              {isExpanded && activePhotos.length > 0 && !isMobile && (
                <motion.div
                  className='piercing-photo-grid'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: OVERLAY_EASE }}
                  aria-hidden='true'
                >
                  {activePhotos.slice(0, 4).map((photo, idx) => (
                    <motion.img
                      key={`${expandedCard}-photo-${idx}`}
                      src={photo}
                      alt={t('services.piercingServicesPage.labels.photoAlt', {
                        category: expandedCard,
                        index: idx + 1,
                      })}
                      className='piercing-photo-grid__item'
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.96 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.35,
                        delay: prefersReducedMotion ? 0 : idx * 0.05,
                        ease: OVERLAY_EASE,
                      }}
                      loading='lazy'
                      decoding='async'
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Card>
    );
  };

  // Handle opening the piercing photo modal
  const handleOpenPhotoModal = (piercingName: string, photoCategory: PiercingPhotoCategory) => {
    // Convert readonly array to regular array with spread operator to fix TypeScript error
    const photos = [...(piercingPhotoMap[photoCategory] || [])];
    setSelectedPhotoTitle(piercingName);
    setSelectedPhotos(photos);
    setPhotoModalOpen(true);
  };

  // Handle closing the modal
  const handleClosePhotoModal = () => {
    setPhotoModalOpen(false);
  };

  return (
    <main
      className={`piercing-services-page w-full min-h-screen relative z-10 bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32 ${className}`}
      style={{ '--piercing-card-collapsed-height': CARD_HEIGHT_COLLAPSED } as React.CSSProperties}
    >
      <MainNavigation />
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-container-main flex flex-col text-center gap-4 max-md:gap-16'>
            <h1 className='sr-only'>{t('services.piercingServicesPage.heading.title')}</h1>
            <SectionHeading
              eyebrow={t('services.piercingServicesPage.heading.eyebrow')}
              title={t('services.piercingServicesPage.heading.title')}
              subtitle={t('services.piercingServicesPage.heading.subtitle')}
            />

            {/* FREE Consultation Banner */}
            <div className='flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl bg-(--accent-chrome)/10 border border-(--accent-chrome)/20 max-md:hidden'>
              <div className='flex items-center gap-4'>
                <MessageCircle size={24} className='text-(--accent-chrome)' />
                <div className='text-center'>
                  <p className='font-headline text-(length:--text-lg) text-brand-chrome'>
                    {t('services.piercingServicesPage.consultation.title')}
                  </p>
                  <p className='text-(length:--text-sm) text-luxury-text-inverse/70 font-body'>
                    {t('services.piercingServicesPage.consultation.subtitle')}
                  </p>
                </div>
              </div>
              <a
                href='https://wa.me/4917680196286?text=Hallo%20Medusa%20Tattoo%2C%20ich%20interessiere%20mich%20für%20eine%20kostenlose%20Beratung.'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center gap-4 px-6 py-4 bg-(--brand-accent) hover:bg-(--brand-accent-hover) text-black font-semibold text-base rounded-xl transition-all duration-200 focus:ring-2 focus:ring-(--brand-accent) focus:ring-offset-2 focus:ring-offset-(--deep-black)'
                aria-label={t('services.piercingServicesPage.consultation.whatsAppAria')}
              >
                <MessageSquare size={20} />
                WhatsApp
              </a>
            </div>

            {/* Top 3 Category Cards - Centered */}
            <div
              className='premium-pricing-category-container grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 justify-center justify-items-stretch max-w-5xl mx-auto'
              aria-label='Service-Kategorien'
            >
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = activeCategory === category.id;

                const buttonContent = (
                  <>
                    <div className='premium-pricing-card__icon'>
                      <IconComponent size={20} className='text-luxury-text-primary' />
                    </div>
                    <div className='premium-pricing-card__body'>
                      <div className='premium-pricing-card__header'>
                        <h3 className='premium-pricing-card__title'>{category.title}</h3>
                        <span className='premium-pricing-card__price'>ab {category.priceFrom}</span>
                      </div>
                      <p className='premium-pricing-card__subtitle'>{category.subtitle}</p>
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
                      className='premium-pricing-card__button'
                      onClick={() => handleCategoryChange(category.id as CategoryId)}
                      aria-label={t('services.piercingServicesPage.labels.selectCategoryAria', {
                        category: category.title,
                      })}
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
              aria-label={t('services.piercingServicesPage.labels.showingServicesAria', {
                category: activeCategoryMeta?.title,
              })}
              variants={containerVariants}
              initial='initial'
              animate={inView ? 'animate' : 'initial'}
              exit='exit'
            >
              <div className='hidden md:block'>
                <SectionHeading
                  eyebrow={activeCategoryMeta?.title}
                  title={t('services.piercingServicesPage.labels.chooseOption')}
                  subtitle={activeCategoryMeta?.subtitle}
                />
              </div>

              <AnimatePresence>
                {expandedCard && (
                  <motion.div
                    className='piercing-backdrop'
                    style={{ '--piercing-backdrop-blur': BACKDROP_BLUR } as React.CSSProperties}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: OVERLAY_EASE }}
                    aria-hidden='true'
                  />
                )}
              </AnimatePresence>
              {isDesktop ? (
                <div className='w-full flex justify-center'>
                  <div className='paket-cards-wrapper flex flex-wrap gap-4 justify-center items-start w-full py-8 max-w-7xl mx-auto'>
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

      {/* Photo Modal */}
      <PiercingPhotoModal
        isOpen={photoModalOpen}
        onClose={handleClosePhotoModal}
        title={selectedPhotoTitle}
        photos={selectedPhotos}
      />
    </main>
  );
};

export default PiercingServicesPage;
