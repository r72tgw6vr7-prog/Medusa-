import { useState, useEffect, useRef } from 'react';
import { Palette, Camera, Hexagon, Droplets, Heart, Circle, Zap, Star } from 'lucide-react';
import { useMedusaDesignSystem } from '../../foundation';

interface ServiceHighlightsProps {
  onServiceClick?: (serviceId: string) => void;
}

export function ServiceHighlights({ onServiceClick }: ServiceHighlightsProps) {
  const { language } = useMedusaDesignSystem();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (cardId: string) => {
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const content = {
    DE: {
      tattooTitle: 'Tattoo Style Navigator',
      tattooSubtitle: 'Entdecke Deinen perfekten Stil',
      piercingTitle: 'Premium Piercing Collection',
      piercingSubtitle: 'Professionelle Körperkunst',
      exploreStyle: 'Stil erkunden',
      bookConsultation: 'Beratung buchen',
      tattooStyles: [
        {
          id: 'traditional',
          name: 'Traditional',
          subtitle: 'Old School',
          description: 'Klassische amerikanische Tattoo-Kunst',
          priceRange: '€180-450',
          icon: Palette,
        },
        {
          id: 'realistisch',
          name: 'Realistisch',
          subtitle: 'Photorealistic',
          description: 'Fotorealistische Meisterwerke',
          priceRange: '€300-800',
          icon: Camera,
        },
        {
          id: 'blackgrey',
          name: 'Black & Grey',
          subtitle: 'Monochrom',
          description: 'Elegante Grauschattierungen',
          priceRange: '€220-550',
          icon: Circle,
        },
        {
          id: 'neotraditional',
          name: 'Neo-Traditional',
          subtitle: 'Modern Classic',
          description: 'Moderne Interpretation klassischer Stile',
          priceRange: '€250-650',
          icon: Star,
        },
        {
          id: 'geometric',
          name: 'Geometric',
          subtitle: 'Minimalist',
          description: 'Präzise geometrische Muster',
          priceRange: '€200-500',
          icon: Hexagon,
        },
        {
          id: 'watercolor',
          name: 'Watercolor',
          subtitle: 'Artistic',
          description: 'Fließende Aquarell-Effekte',
          priceRange: '€280-700',
          icon: Droplets,
        },
      ],
      piercingCategories: [
        {
          id: 'ear-face',
          name: 'Ohr & Gesicht',
          subtitle: 'Klassische Eleganz',
          locations: ['Helix', 'Tragus', 'Nostril', 'Septum'],
          startingPrice: 'ab €45',
          icon: Circle,
          description: 'Vielseitige Optionen für dezente bis markante Looks',
        },
        {
          id: 'body',
          name: 'Körper',
          subtitle: 'Expressive Kunst',
          locations: ['Navel', 'Nipple', 'Dermal', 'Industrial'],
          startingPrice: 'ab €65',
          icon: Heart,
          description: 'Professionelle Körperpiercings mit Premium-Schmuck',
        },
        {
          id: 'dermal-surface',
          name: 'Dermal & Surface',
          subtitle: 'Moderne Innovation',
          locations: ['Microdermal', 'Surface Bar', 'Custom'],
          startingPrice: 'ab €85',
          icon: Zap,
          description: 'Innovative Techniken für einzigartige Platzierungen',
        },
      ],
    },
    EN: {
      tattooTitle: 'Tattoo Style Navigator',
      tattooSubtitle: 'Discover Your Perfect Style',
      piercingTitle: 'Premium Piercing Collection',
      piercingSubtitle: 'Professional Body Art',
      exploreStyle: 'Explore Style',
      bookConsultation: 'Book Consultation',
      tattooStyles: [
        {
          id: 'traditional',
          name: 'Traditional',
          subtitle: 'Old School',
          description: 'Classic American tattoo artistry',
          priceRange: '€180-450',
          icon: Palette,
        },
        {
          id: 'realistisch',
          name: 'Realistic',
          subtitle: 'Photorealistic',
          description: 'Photorealistic masterpieces',
          priceRange: '€300-800',
          icon: Camera,
        },
        {
          id: 'blackgrey',
          name: 'Black & Grey',
          subtitle: 'Monochrome',
          description: 'Elegant grayscale artworks',
          priceRange: '€220-550',
          icon: Circle,
        },
        {
          id: 'neotraditional',
          name: 'Neo-Traditional',
          subtitle: 'Modern Classic',
          description: 'Modern interpretation of classic styles',
          priceRange: '€250-650',
          icon: Star,
        },
        {
          id: 'geometric',
          name: 'Geometric',
          subtitle: 'Minimalist',
          description: 'Precise geometric patterns',
          priceRange: '€200-500',
          icon: Hexagon,
        },
        {
          id: 'watercolor',
          name: 'Watercolor',
          subtitle: 'Artistic',
          description: 'Flowing watercolor effects',
          priceRange: '€280-700',
          icon: Droplets,
        },
      ],
      piercingCategories: [
        {
          id: 'ear-face',
          name: 'Ear & Face',
          subtitle: 'Classic Elegance',
          locations: ['Helix', 'Tragus', 'Nostril', 'Septum'],
          startingPrice: 'from €45',
          icon: Circle,
          description: 'Versatile options for subtle to statement looks',
        },
        {
          id: 'body',
          name: 'Body',
          subtitle: 'Expressive Art',
          locations: ['Navel', 'Nipple', 'Dermal', 'Industrial'],
          startingPrice: 'from €65',
          icon: Heart,
          description: 'Professional body piercings with premium jewelry',
        },
        {
          id: 'dermal-surface',
          name: 'Dermal & Surface',
          subtitle: 'Modern Innovation',
          locations: ['Microdermal', 'Surface Bar', 'Custom'],
          startingPrice: 'from €85',
          icon: Zap,
          description: 'Innovative techniques for unique placements',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section
      ref={sectionRef}
      className='relative py-32 lg:py-40 bg-brand-background'
      aria-label={language === 'DE' ? 'Stil Navigator' : 'Style Navigator'}
    >
      <div className='responsive-container safe-area-padding'>
        {/* TATTOO STYLES SECTION */}
        <div
          className={`mb-24 lg:mb-32 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Section Header */}
          <div className='text-center mb-16'>
            <h2 className='text-headline-lg font-headline text-brand-gold mb-8'>{t.tattooTitle}</h2>
            <p className='text-body-large font-body text-brand-chrome max-w-2xl mx-auto'>
              {t.tattooSubtitle}
            </p>
          </div>

          {/* Dark Glassmorphism Container */}
          <div
            className='relative p-8 lg:p-16 rounded-3xl'
            style={{
              background: 'rgba(34, 34, 34, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Honeycomb Pattern Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16'>
              {t.tattooStyles.map((style) => {
                const IconComponent = style.icon;
                const isHovered = hoveredCard === style.id;

                return (
                  <div
                    key={style.id}
                    className={`relative group cursor-pointer transition-all duration-500 ${
                      isHovered ? 'transform -translate-y-3' : ''
                    }`}
                    onMouseEnter={() => handleMouseEnter(style.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => onServiceClick?.(style.id)}
                    role='button'
                    tabIndex={0}
                    onKeyDown={(e) =>
                      (e.key === 'Enter' || e.key === ' ') && onServiceClick?.(style.id)
                    }
                  >
                    {/* Hexagonal Card */}
                    <div
                      className={`relative h-64 lg:h-80 rounded-2xl overflow-hidden transition-all duration-500 ${
                        isHovered
                          ? 'border-2 border-brand-gold shadow-gold-glow'
                          : 'border border-brand-chrome/20'
                      }`}
                      style={{
                        background: 'rgba(34, 34, 34, 0.95)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                      }}
                    >
                      {/* Geometric Background Pattern */}
                      <div className='absolute inset-0 opacity-5'>
                        <div
                          className='w-full h-full'
                          style={{
                            backgroundImage: `
                              radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(192, 192, 192, 0.05) 0%, transparent 50%)
                            `,
                          }}
                        ></div>
                      </div>

                      {/* Content */}
                      <div className='relative p-8 h-full flex flex-col justify-between'>
                        {/* Icon */}
                        <div className='flex justify-center mb-8'>
                          <div
                            className={`p-4 rounded-full transition-all duration-500 ${
                              isHovered
                                ? 'bg-brand-gold/20 scale-110 shadow-gold-glow-subtle'
                                : 'bg-brand-chrome/10'
                            }`}
                          >
                            <IconComponent
                              size={32}
                              className={`transition-colors duration-500 ${
                                isHovered ? 'text-brand-gold' : 'text-brand-chrome'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Style Info */}
                        <div className='text-center flex-1'>
                          <h3
                            className={`text-headline-md font-headline mb-2 transition-colors duration-500 ${
                              isHovered ? 'text-brand-white' : 'text-brand-gold'
                            }`}
                          >
                            {style.name}
                          </h3>
                          <p className='text-body-small font-body text-brand-chrome/80 mb-0'>
                            {style.subtitle}
                          </p>
                          <p className='text-body-small font-body text-brand-white/70 mb-8'>
                            {style.description}
                          </p>
                        </div>

                        {/* Price Range - Appears on Hover */}
                        <div
                          className={`text-center transition-all duration-500 ${
                            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                          }`}
                        >
                          <div className='px-8 py-0 rounded-xl bg-brand-gold/10 border border-brand-gold/30 mb-8 flex flex-col h-full'>
                            <span className='text-body-small font-body text-brand-gold font-medium'>
                              {style.priceRange}
                            </span>
                          </div>
                          <span className='text-body-small font-body text-brand-chrome group-hover:text-brand-gold transition-colors duration-300 font-medium'>
                            {t.exploreStyle} →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PIERCING COLLECTION SECTION */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Section Header */}
          <div className='text-center mb-16'>
            <h2 className='text-headline-lg font-headline text-brand-chrome mb-8'>
              {t.piercingTitle}
            </h2>
            <p className='text-body-large font-body text-brand-chrome/80 max-w-2xl mx-auto'>
              {t.piercingSubtitle}
            </p>
          </div>

          {/* 3 Vertical Glass Cards */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16'>
            {t.piercingCategories.map((category) => {
              const IconComponent = category.icon;
              const isHovered = hoveredCard === category.id;

              return (
                <div
                  key={category.id}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    isHovered ? 'transform -translate-y-2' : ''
                  }`}
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => onServiceClick?.(category.id)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={(e) =>
                    (e.key === 'Enter' || e.key === ' ') && onServiceClick?.(category.id)
                  }
                >
                  {/* Vertical Glass Card */}
                  <div
                    className={`relative h-96 lg:h-112 rounded-2xl overflow-hidden transition-all duration-500 ${
                      isHovered
                        ? 'border border-brand-gold/50 shadow-gold-glow-subtle'
                        : 'border border-brand-chrome/20'
                    }`}
                    style={{
                      background: 'rgba(34, 34, 34, 0.95)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Gold Accent Line at Top */}
                    <div
                      className={`h-1 w-full transition-all duration-500 ${
                        isHovered
                          ? 'bg-linear-to-r from-brand-gold via-brand-gold to-brand-gold shadow-gold-glow-subtle'
                          : 'bg-linear-to-r from-transparent via-brand-chrome/50 to-transparent'
                      }`}
                    ></div>

                    {/* Content */}
                    <div className='p-8 h-full flex flex-col'>
                      {/* Icon */}
                      <div className='flex justify-center mb-8'>
                        <div
                          className={`p-4 rounded-full transition-all duration-500 ${
                            isHovered
                              ? 'bg-brand-chrome/20 scale-110 shadow-chrome-glow-subtle'
                              : 'bg-brand-chrome/10'
                          }`}
                        >
                          <IconComponent
                            size={28}
                            className={`transition-colors duration-500 ${
                              isHovered ? 'text-brand-chrome' : 'text-brand-chrome/70'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Category Info */}
                      <div className='text-center mb-8'>
                        <h3
                          className={`text-headline-md font-headline mb-2 transition-colors duration-500 ${
                            isHovered ? 'text-brand-white' : 'text-brand-chrome'
                          }`}
                        >
                          {category.name}
                        </h3>
                        <p className='text-body-small font-body text-brand-chrome/60 mb-8'>
                          {category.subtitle}
                        </p>
                        <p className='text-body-small font-body text-brand-white/70'>
                          {category.description}
                        </p>
                      </div>

                      {/* Locations */}
                      <div className='flex-1 mb-8'>
                        <div className='grid grid-cols-2 gap-0'>
                          {category.locations.map((location) => (
                            <div
                              key={location}
                              className='px-0 py-0 rounded-lg bg-brand-chrome/5 border border-brand-chrome/20 text-center flex flex-col h-full'
                            >
                              <span className='text-body-small font-body text-brand-chrome/80'>
                                {location}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Starting Price - Appears on Hover */}
                      <div
                        className={`text-center transition-all duration-500 ${
                          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                      >
                        <div className='px-8 py-0 rounded-xl bg-brand-chrome/10 border border-brand-chrome/30 mb-8 flex flex-col h-full'>
                          <span className='text-body-small font-body text-brand-chrome font-medium'>
                            {category.startingPrice}
                          </span>
                        </div>
                        <span className='text-body-small font-body text-brand-chrome group-hover:text-brand-gold transition-colors duration-300 font-medium'>
                          {t.bookConsultation} →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
