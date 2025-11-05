import { HeroSection } from '../sections/HeroSection';
import { GallerySection } from '../sections/GallerySection';
import { ProcessTimeline } from '../sections/ProcessTimeline';
import { MainNavigation } from '../components/molecules/MainNavigation';
import Footer from '../components/Footer';
import { ServiceCards } from '../components/ServiceCards';
import TeamGrid from '../components/TeamGrid';
import PricingSection from '../components/PricingSection';
import { PartnersAndTestimonialsSection } from '../sections/PartnersAndTestimonialsSection';
import StudioCarousel from '../components/organisms/StudioCarousel';
import { CarouselBadges } from '../components/CarouselBadges';
import { PreFooterBookingCTA } from '../components/PreFooterBookingCTA';
import ErrorBoundary from '../components/layout/ErrorBoundary';

// Sample gallery data - 4 HIGH-QUALITY headshots
const sampleGalleryImages = [
  {
    id: '1',
    imageUrl: '/assets/images/photos/artists/aaron.webp',
    title: 'Künstler Portrait',
    artist: 'Aaron',
    year: '2024',
    category: 'Portrait',
  },
  {
    id: '2',
    imageUrl: '/assets/images/photos/artists/picture.webp',
    title: 'Künstler Portrait',
    artist: 'Angie',
    year: '2024',
    category: 'Portrait',
  },
  {
    id: '3',
    imageUrl: '/assets/images/photos/artists/loui@1200w.webp',
    title: 'Künstler Portrait',
    artist: 'Loui',
    year: '2024',
    category: 'Portrait',
  },
  {
    id: '4',
    imageUrl: '/assets/images/photos/artists/oliver.webp',
    title: 'Künstler Portrait',
    artist: 'Oliver',
    year: '2024',
    category: 'Portrait',
  },
];

export function HomePage() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        {/* Navigation */}
        <ErrorBoundary>
          <MainNavigation />
        </ErrorBoundary>

        {/* 1. Hero Section */}
        <ErrorBoundary>
          <HeroSection backgroundImage='/assets/images/photos/hero/medusatattooartwork.webp' />
        </ErrorBoundary>

        {/* 2. Team Grid / Artist Gallery */}
        <ErrorBoundary>
          <TeamGrid />
        </ErrorBoundary>

        {/* 3. Service Cards */}
        <ErrorBoundary>
          <ServiceCards />
        </ErrorBoundary>

        {/* 4. Studio Carousel */}
        <ErrorBoundary>
          <StudioCarousel />
        </ErrorBoundary>

        {/* 4.5. Carousel Badges */}
        <ErrorBoundary>
          <CarouselBadges />
        </ErrorBoundary>

        {/* 5. Pricing Section */}
        <ErrorBoundary>
          <PricingSection />
        </ErrorBoundary>

        {/* 6. Process Timeline */}
        <ErrorBoundary>
          <ProcessTimeline />
        </ErrorBoundary>

        {/* 7. Gallery Section */}
        <ErrorBoundary>
          <GallerySection
            title='Unsere Kunstwerke'
            subtitle='Entdecken Sie eine Auswahl unserer besten Arbeiten'
            images={sampleGalleryImages}
          />
        </ErrorBoundary>

        {/* 8. Partners & Testimonials */}
        <ErrorBoundary>
          <PartnersAndTestimonialsSection />
        </ErrorBoundary>

        {/* 9. Pre-Footer Booking CTA */}
        <ErrorBoundary>
          <PreFooterBookingCTA />
        </ErrorBoundary>

        {/* Footer */}
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

export default HomePage;
