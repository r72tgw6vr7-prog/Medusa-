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
    {
      id: 'ohrlochzauberer',
      title: 'Ohrlochzauberer',
      description: 'Kinderfreundliches Ohrlochstechen mit Aaron als Ohrlochzauberer.',
      priceFrom: 45,
      priceUnit: '€ - 80€',
      duration: '20-30 Min',
      features: ['Speziell für Kinder', 'Magisches Erlebnis', 'Titan-Schmuck inklusive'],
      cta: 'Aaron anfragen',
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

const CARD_HEIGHT_COLLAPSED = '520px';
const BACKDROP_BLUR = '8px';
const OVERLAY_EASE = [0.4, 0, 0.2, 1] as const;

export const PiercingServicesPage: React.FC<PiercingServicesPageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryId>('stechen');
  const [selectedPacket, setSelectedPacket] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [isAnimating, setIsAnimating] = useState(false);
  const { openBooking } = useApp();
  const prefersReducedMotion = useReducedMotion();

  // Modal state for piercing photos
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [selectedPhotoTitle, setSelectedPhotoTitle] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // Intersection Observer to trigger animations when in view
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.1, once: true });

  const currentServices = useMemo(() => serviceDetails[activeCategory], [activeCategory]);
  const activeCategoryMeta = useMemo(
    () => categories.find((category) => category.id === activeCategory),
    [activeCategory],
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
        navigate('/booking');
      }, 300) as unknown as number;
    };
  }, [openBooking, navigate]);

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
        className={`bg-(--card-bg) border-(--card-border) shadow-(--card-shadow) h-auto! piercing-service-card ${
          isExpanded ? 'paket-card--expanded' : 'paket-card--collapsed'
        }`}
        asChild
      >
        <motion.div
          variants={fadeInUpVariants}
          className='paket-card flex flex-col h-auto self-start cursor-pointer text-center'
          onClick={() => {
            setSelectedPacket(isSelected ? null : service.id);
            if (!isSelected) setExpandedCard(null);
          }}
          whileHover={isDesktop && !isExpanded ? { scale: 1.02 } : undefined}
          whileTap={isDesktop && !isExpanded ? { scale: 0.98 } : undefined}
        >
          <div className='flex flex-col gap-8'>
            <div className='flex items-center justify-between'>
              <span className='font-semibold text-(length:--text-sm) tracking-wide uppercase text-(--text-secondary)'>
                {activeCategory === 'stechen' ? 'Bereich' : 'Option'}
              </span>
              <span className='font-normal text-(length:--text-sm) tracking-wider uppercase text-white/60'>
                {service.duration ?? 'Flexibel'}
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
                  className='flex items-center justify-between w-full py-2 text-(length:--text-sm) font-semibold text-(--text-secondary) hover:text-(--text-secondary) transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-(--accent-chrome) focus-visible:ring-offset-2 focus-visible:ring-offset-(--card-bg) rounded'
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
                          <span>Piercing</span>
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
                                    aria-label={`${item.name} Beispielfotos anzeigen`}
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

            <ul className='space-y-4 text-(length:--text-sm) text-white/80'>
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className='flex items-center gap-4'>
                  <ChevronRight size={16} className='text-(--text-secondary) shrink-0 mt-2' />
                  <span className='font-normal text-(length:--text-base) leading-(--line-height-body)'>
                    {feature}
                  </span>
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
              className='w-full h-12 border border-(--text-secondary) rounded-3xl font-semibold text-(length:--text-sm) leading-(--line-height-body) text-white hover:bg-(--text-secondary) hover:text-black transition-all duration-200 focus-visible:ring-2 focus-visible:ring-(--accent-chrome) focus-visible:ring-offset-2 focus-visible:ring-offset-(--card-bg)'
              aria-label={`${service.cta} für ${service.title}`}
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
                      alt={`${expandedCard} piercing example ${idx + 1}`}
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
            <SectionHeading
              eyebrow='Medusa München'
              title='Piercing'
              subtitle='Professionelles Piercing mit über 5 Jahren Erfahrung und höchsten Hygienestandards.'
            />

            {/* FREE Consultation Banner */}
            <div className='flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl bg-(--accent-chrome)/10 border border-(--accent-chrome)/20 max-md:hidden'>
              <div className='flex items-center gap-4'>
                <MessageCircle size={24} className='text-(--accent-chrome)' />
                <div className='text-center'>
                  <p className='font-headline text-(length:--text-lg) text-brand-chrome'>
                    Kostenlose Beratung
                  </p>
                  <p className='text-(length:--text-sm) text-luxury-text-inverse/70 font-body'>
                    Allow us to help you choose the right team member and piercing
                  </p>
                </div>
              </div>
              <a
                href='https://wa.me/4917680196286?text=Hallo%20Medusa%20Tattoo%2C%20ich%20interessiere%20mich%20für%20eine%20kostenlose%20Beratung.'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center gap-4 px-6 py-4 bg-(--brand-accent) hover:bg-(--brand-accent-hover) text-black font-semibold text-base rounded-xl transition-all duration-200 focus:ring-2 focus:ring-(--brand-accent) focus:ring-offset-2 focus:ring-offset-(--deep-black)'
                aria-label='WhatsApp Beratung starten'
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
                      aria-pressed={isActive}
                      className='premium-pricing-card__button'
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
