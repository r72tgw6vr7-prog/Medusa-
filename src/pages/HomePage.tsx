import { HeroParallax } from '@/components/ui/hero-parallax';
import { GallerySection } from '../sections/GallerySection';
import { ProcessTimeline } from '../sections/ProcessTimeline';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { ServiceCards } from '../components/molecules';
import { TeamGrid } from '../components/pages';
import PricingSection from '../components/PricingSection';
import { PartnersAndTestimonialsSection } from '../sections/PartnersAndTestimonialsSection';
import StudioCarousel from '../components/organisms/StudioCarousel';
import { CarouselBadges } from '../components/CarouselBadges';
import { PreFooterBookingCTA } from '../components/PreFooterBookingCTA';
import ErrorBoundary from '../components/layout/ErrorBoundary';
import { LazySection } from '../components/LazySection';
import { GALLERY_IMAGES } from '@/content/gallery-images';

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

export function HomePage() {
  return (
    <ErrorBoundary>
      <div className='min-h-screen flex flex-col relative'>
        {/* Navigation */}
        <ErrorBoundary>
          <MainNavigation />
        </ErrorBoundary>

        {/* 1. Hero Section - Load immediately (above fold) */}
        <ErrorBoundary>
          <HeroParallax products={heroProducts} />
        </ErrorBoundary>

        {/* 2. Team Grid - Load immediately (likely above fold) */}
        <ErrorBoundary>
          <TeamGrid />
        </ErrorBoundary>

        {/* 3. Service Cards - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <ServiceCards />
          </ErrorBoundary>
        </LazySection>

        {/* 4. Studio Carousel - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <StudioCarousel />
          </ErrorBoundary>
        </LazySection>

        {/* 4.5. Carousel Badges - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <CarouselBadges />
          </ErrorBoundary>
        </LazySection>

        {/* 5. Pricing Section - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <PricingSection />
          </ErrorBoundary>
        </LazySection>

        {/* 6. Process Timeline - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <ProcessTimeline />
          </ErrorBoundary>
        </LazySection>

        {/* 7. Gallery Section - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <GallerySection
              title='Unsere Kunstwerke'
              subtitle='Entdecken Sie eine Auswahl unserer besten Arbeiten'
              images={sampleGalleryImages}
            />
          </ErrorBoundary>
        </LazySection>

        {/* 8. Partners & Testimonials - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <PartnersAndTestimonialsSection />
          </ErrorBoundary>
        </LazySection>

        {/* 9. Pre-Footer Booking CTA - Lazy load */}
        <LazySection>
          <ErrorBoundary>
            <PreFooterBookingCTA />
          </ErrorBoundary>
        </LazySection>

        {/* Footer - Always load */}
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

export default HomePage;
