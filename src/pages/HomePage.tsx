import { Suspense, lazy, type ReactNode, type RefObject } from 'react';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { LazySection } from '@/components/LazySection';
import { getLocalizedGalleryImages } from '@/content/gallery-images';
import { useSectionTransition } from '@/hooks/useSectionTransition';
import { LocationSection } from '@/components/LocationSection';
import { GoogleMapSection } from '@/components/GoogleMapSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/i18n/utils/localizePath';

const BladeAccordionLazy = lazy(() =>
  import('@/components/ui/BladeAccordion').then((m) => ({ default: m.BladeAccordion })),
);

const ServicesCurtainSectionLazy = lazy(() =>
  import('@/sections/ServicesCurtainSection').then((m) => ({ default: m.ServicesCurtainSection })),
);

const SocialContactsCarouselSectionLazy = lazy(() =>
  import('@/sections/SocialContactsCarouselSection').then((m) => ({
    default: m.SocialContactsCarouselSection,
  })),
);

const StudioCarouselLazy = lazy(() => import('@/components/organisms/StudioCarousel'));
const PricingSectionLazy = lazy(() => import('@/components/PricingSection'));

const TrustSignalsLazy = lazy(() =>
  import('@/components/molecules/TrustSignals').then((m) => ({ default: m.TrustSignals })),
);

const ProcessTimelineLazy = lazy(() =>
  import('@/sections/ProcessTimeline/ProcessTimeline').then((m) => ({
    default: m.ProcessTimeline,
  })),
);

const GallerySectionLazy = lazy(() =>
  import('@/sections/GallerySection').then((m) => ({ default: m.GallerySection })),
);

const PartnersAndTestimonialsSectionLazy = lazy(() =>
  import('@/sections/PartnersAndTestimonialsSection').then((m) => ({
    default: m.PartnersAndTestimonialsSection,
  })),
);

const PreFooterBookingCTALazy = lazy(() =>
  import('@/components/PreFooterBookingCTA').then((m) => ({ default: m.PreFooterBookingCTA })),
);

const SectionTransitionWrapper = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { ref, className: visibleClass } = useSectionTransition({ threshold: 0.2 });

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`section-transition ${visibleClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export function HomePage() {
  const { language } = useLanguage();
  const localizedGalleryImages = getLocalizedGalleryImages(language);
  const heroProducts = localizedGalleryImages.slice(0, 15).map((img, index) => ({
    title: img.title,
    link: localizePath('/gallery', language),
    thumbnail: img.optimizedSrc,
    fallbackSrc: img.src,
    width: img.width,
    height: img.height,
    priority: index < 3,
  }));
  const sampleGalleryImages = localizedGalleryImages.slice(0, 8).map((img) => ({
    id: img.id,
    imageUrl: img.optimizedSrc,
    fallbackUrl: img.src,
    title: img.title,
    artist: 'Medusa Tattoo',
    year: '2024',
    category: img.category,
  }));
  const galleryTitle = language === 'en' ? 'Our work' : 'Unsere Kunstwerke';
  const gallerySubtitle =
    language === 'en'
      ? 'Discover a selection of our best work.'
      : 'Entdecken Sie eine Auswahl unserer besten Arbeiten.';

  return (
    <ErrorBoundary>
      {/* Skip to main content link for keyboard navigation */}
      {typeof navigator === 'undefined' ||
      (navigator.webdriver !== true &&
        (typeof window === 'undefined' || typeof window.__MOCKED_ENV__ === 'undefined')) ? (
        <a
          href='#main-content'
          data-testid='skip-to-content'
          style={{ margin: 0, top: 120, left: 0, zIndex: 10001 }}
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-8 focus:py-4 focus:bg-brand-accent focus:text-deep-black focus:rounded-lg focus:shadow-lg'
        >
          Skip to main content
        </a>
      ) : null}
      <div className='min-h-screen flex flex-col relative bg-luxury-bg-dark overflow-x-clip'>
        {/* Navigation */}
        <ErrorBoundary>
          <MainNavigation />
        </ErrorBoundary>

        {/* Main content landmark */}
        <main id='main-content'>
          {/* 1. Hero Section - Load immediately (above fold) */}
          <ErrorBoundary>
            <SectionTransitionWrapper className='pt-[calc(var(--header-height)+40px)]'>
              <HeroParallax products={heroProducts} />
            </SectionTransitionWrapper>
          </ErrorBoundary>

          {/* 2. Artist Blade Accordion - Deferred (below large hero on most viewports) */}
          <LazySection>
            <ErrorBoundary>
              <SectionTransitionWrapper>
                <Suspense fallback={null}>
                  <BladeAccordionLazy />
                </Suspense>
              </SectionTransitionWrapper>
            </ErrorBoundary>
          </LazySection>

          {/* 2.5. Services Section - Deferred */}
          <LazySection>
            <ErrorBoundary>
              <SectionTransitionWrapper>
                <Suspense fallback={null}>
                  <ServicesCurtainSectionLazy />
                </Suspense>
              </SectionTransitionWrapper>
            </ErrorBoundary>
          </LazySection>

          {/* 2.75. Social Media Carousel - Deferred */}
          <LazySection>
            <ErrorBoundary>
              <SectionTransitionWrapper>
                <Suspense fallback={null}>
                  <SocialContactsCarouselSectionLazy />
                </Suspense>
              </SectionTransitionWrapper>
            </ErrorBoundary>
          </LazySection>

          {/* 3. Studio Carousel - Lazy load */}
          <LazySection>
            <ErrorBoundary>
              <SectionTransitionWrapper>
                <Suspense fallback={null}>
                  <StudioCarouselLazy />
                </Suspense>
              </SectionTransitionWrapper>
            </ErrorBoundary>
          </LazySection>

          {/* 4. Pricing Section - Lazy load */}
          <LazySection>
            <ErrorBoundary>
              <SectionTransitionWrapper>
                <Suspense fallback={null}>
                  <PricingSectionLazy />
                </Suspense>
              </SectionTransitionWrapper>
            </ErrorBoundary>
          </LazySection>

          {/* 5. Trust Signals - Lazy load */}
          <LazySection>
            <ErrorBoundary>
              <SectionTransitionWrapper>
                <Suspense fallback={null}>
                  <TrustSignalsLazy />
                </Suspense>
              </SectionTransitionWrapper>
            </ErrorBoundary>
          </LazySection>

          {/* 6. Process Timeline - Lazy load */}
          <LazySection>
            <ErrorBoundary>
              <SectionTransitionWrapper>
                <Suspense fallback={null}>
                  <ProcessTimelineLazy />
                </Suspense>
              </SectionTransitionWrapper>
            </ErrorBoundary>
          </LazySection>

          {/* 7. Gallery Section - Lazy load */}
          <LazySection>
            <ErrorBoundary>
              <SectionTransitionWrapper>
                <Suspense fallback={null}>
                  <GallerySectionLazy
                    title={galleryTitle}
                    subtitle={gallerySubtitle}
                    images={sampleGalleryImages}
                  />
                </Suspense>
              </SectionTransitionWrapper>
            </ErrorBoundary>
          </LazySection>

          {/* 9. Partners & Testimonials - Lazy load */}
          <LazySection>
            <ErrorBoundary>
              <SectionTransitionWrapper>
                <Suspense fallback={null}>
                  <PartnersAndTestimonialsSectionLazy />
                </Suspense>
              </SectionTransitionWrapper>
            </ErrorBoundary>
          </LazySection>

          {/* 11. Pre-Footer Booking CTA - Lazy load */}
          <LazySection>
            <ErrorBoundary>
              <SectionTransitionWrapper>
                <Suspense fallback={null}>
                  <PreFooterBookingCTALazy />
                </Suspense>
              </SectionTransitionWrapper>
            </ErrorBoundary>
          </LazySection>

          {/* Location Section - Above Footer */}
          <ErrorBoundary>
            <SectionTransitionWrapper>
              <LocationSection />
            </SectionTransitionWrapper>
          </ErrorBoundary>

          {/* Google Map Section */}
          <ErrorBoundary>
            <SectionTransitionWrapper>
              <GoogleMapSection />
            </SectionTransitionWrapper>
          </ErrorBoundary>

          {/* Footer - Always load */}
          <ErrorBoundary>
            <SectionTransitionWrapper>
              <Footer />
            </SectionTransitionWrapper>
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default HomePage;
