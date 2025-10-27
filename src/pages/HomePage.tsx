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

// Sample gallery data - 4 HIGH-QUALITY headshots
const sampleGalleryImages = [
  {
    id: '1',
    imageUrl: '/images/artists/team-bio/headshots/aaron.webp',
    title: 'Künstler Portrait',
    artist: 'Aaron',
    year: '2024',
    category: 'Portrait',
  },
  {
    id: '2',
    imageUrl: '/images/artists/team-bio/headshots/angie.webp',
    title: 'Künstler Portrait',
    artist: 'Angie',
    year: '2024',
    category: 'Portrait',
  },
  {
    id: '3',
    imageUrl: '/images/artists/team-bio/headshots/loui.webp',
    title: 'Künstler Portrait',
    artist: 'Loui',
    year: '2024',
    category: 'Portrait',
  },
  {
    id: '4',
    imageUrl: '/images/artists/team-bio/headshots/oli.webp',
    title: 'Künstler Portrait',
    artist: 'Oliver',
    year: '2024',
    category: 'Portrait',
  },
];

export function HomePage() {
  return (
    <div className='min-h-screen bg-texture'>
      <MainNavigation />

      {/* 1. Hero Section */}
      <HeroSection backgroundImage='/hero/Medusa_tattoo_artwork.png' />

      {/* 2. Team Grid / Artist Gallery */}
      <TeamGrid />

      {/* 3. Service Cards */}
      <ServiceCards />

      {/* 4. Studio Carousel */}
      <StudioCarousel />

      {/* 4.5. Carousel Badges */}
      <CarouselBadges />

      {/* 5. Pricing Section */}
      <PricingSection />

      {/* 6. Process Timeline */}
      <ProcessTimeline />

      {/* 7. Gallery Section */}
      <GallerySection
        title='Unsere Kunstwerke'
        subtitle='Entdecken Sie eine Auswahl unserer besten Arbeiten'
        images={sampleGalleryImages}
      />

      {/* 8. Partners & Testimonials */}
      <PartnersAndTestimonialsSection />

      {/* 9. Pre-Footer Booking CTA */}
      <PreFooterBookingCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
