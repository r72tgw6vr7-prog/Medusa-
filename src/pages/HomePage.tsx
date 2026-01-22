import type { ReactNode } from 'react';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { GallerySection } from '../sections/GallerySection';
import { ProcessTimeline } from '../sections/ProcessTimeline';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { BladeAccordion } from '../components/ui/BladeAccordion';
import PricingSection from '../components/PricingSection';
import { PartnersAndTestimonialsSection } from '../sections/PartnersAndTestimonialsSection';
import StudioCarousel from '../components/organisms/StudioCarousel';
import { PreFooterBookingCTA } from '../components/PreFooterBookingCTA';
import ErrorBoundary from '../components/layout/ErrorBoundary';
import { LazySection } from '../components/LazySection';
import { GALLERY_IMAGES } from '@/content/gallery-images';
import { useSectionTransition } from '@/hooks/useSectionTransition';
import { TrustSignals } from '../components/molecules/TrustSignals';
import { FAQSection } from '../components/seo/FAQSection';

// Hero parallax product data - using actual gallery images with optimized sources
const heroProducts = GALLERY_IMAGES.slice(0, 15).map((img, index) => ({
  title: img.title,
  link: '/gallery',
  thumbnail: img.optimizedSrc, // Use optimized images for better performance
  fallbackSrc: img.src, // Original as fallback
  width: img.width,
  height: img.height,
  priority: index < 3, // First 3 images are priority (above the fold)
}));

// Gallery preview data - using actual gallery images with optimized sources
const sampleGalleryImages = GALLERY_IMAGES.slice(0, 8).map((img) => ({
  id: img.id,
  imageUrl: img.optimizedSrc, // Use optimized images for better performance
  fallbackUrl: img.src, // Original as fallback
  title: img.title,
  artist: 'Medusa Tattoo',
  year: '2024',
  category: img.category,
}));

const SectionTransitionWrapper = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { ref, className: visibleClass } = useSectionTransition({ threshold: 0.2 });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`section-transition ${visibleClass} ${className}`.trim()}>
      {children}
    </div>
  );
};

export function HomePage() {
  return (
    <ErrorBoundary>
      {/* Skip to main content link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-8 focus:py-4 focus:bg-brand-accent focus:text-deep-black focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className='min-h-screen flex flex-col relative bg-luxury-bg-dark overflow-x-clip'>
        {/* Navigation */}
        <ErrorBoundary>
          <MainNavigation />
        </ErrorBoundary>

        {/* Main content landmark */}
        <main id="main-content">
          {/* 1. Hero Section - Load immediately (above fold) */}
          <ErrorBoundary>
            <SectionTransitionWrapper className='pt-[calc(var(--header-height)+40px)]'>
              <HeroParallax products={heroProducts} />
            </SectionTransitionWrapper>
          </ErrorBoundary>

        {/* 2. Artist Blade Accordion - Load immediately (second section) */}
        <ErrorBoundary>
          <SectionTransitionWrapper>
            <BladeAccordion />
          </SectionTransitionWrapper>
        </ErrorBoundary>

        {/* 3. Studio Carousel - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <SectionTransitionWrapper>
              <StudioCarousel />
            </SectionTransitionWrapper>
          </ErrorBoundary>
        </LazySection>

        {/* 4. Pricing Section - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <SectionTransitionWrapper>
              <PricingSection />
            </SectionTransitionWrapper>
          </ErrorBoundary>
        </LazySection>

        {/* 5. Trust Signals - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <SectionTransitionWrapper>
              <TrustSignals />
            </SectionTransitionWrapper>
          </ErrorBoundary>
        </LazySection>

        {/* 6. Process Timeline - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <SectionTransitionWrapper>
              <ProcessTimeline />
            </SectionTransitionWrapper>
          </ErrorBoundary>
        </LazySection>

        {/* 7. Gallery Section - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <SectionTransitionWrapper>
              <GallerySection
                title='Unsere Kunstwerke'
                subtitle='Entdecken Sie eine Auswahl unserer besten Arbeiten'
                images={sampleGalleryImages}
              />
            </SectionTransitionWrapper>
          </ErrorBoundary>
        </LazySection>

        {/* 8. FAQ Section - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <SectionTransitionWrapper>
              <FAQSection />
            </SectionTransitionWrapper>
          </ErrorBoundary>
        </LazySection>

        {/* 9. Partners & Testimonials - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <SectionTransitionWrapper>
              <PartnersAndTestimonialsSection />
            </SectionTransitionWrapper>
          </ErrorBoundary>
        </LazySection>

        {/* 11. Pre-Footer Booking CTA - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <SectionTransitionWrapper>
              <PreFooterBookingCTA />
            </SectionTransitionWrapper>
          </ErrorBoundary>
        </LazySection>

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
