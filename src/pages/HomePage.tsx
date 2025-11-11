import { InkedNavigation } from '../components/organisms/InkedNavigation';
import { EnhancedHero } from '../components/organisms/EnhancedHero';
import { ScrollingShowcase } from '../components/ScrollingShowcase';
import { InkedStorySection } from '../components/organisms/InkedStorySection';
import { PreFooterBookingCTA } from '../components/PreFooterBookingCTA';
import { Footer } from '../components/pages';
import ErrorBoundary from '../components/layout/ErrorBoundary';
import { CarouselBadges } from '../components/CarouselBadges';


export function HomePage() {
  return (
    <ErrorBoundary>
      <div className='min-h-screen flex flex-col'>
        {/* Navigation - Inked Style */}
        <ErrorBoundary>
          <InkedNavigation />
        </ErrorBoundary>

        {/* 1. Enhanced Hero Section - Inked Style */}
        <ErrorBoundary>
          <div className="section-spacing">
            <EnhancedHero 
              fallbackImage=""
              title="PERSONALIZED TATTOOS, TAILORED FOR YOU"
              subtitle="Artistic Ink"
              description="Creating skilled unique artistry with clean and safe techniques, we specialize in creating bespoke tattoos that reflect your individuality with skill and care."
              primaryCTA={{
                text: "Our Works",
                href: "/gallery"
              }}
            />
          </div>
        </ErrorBoundary>

        {/* 2. Team Grid / Artist Gallery - Inked Style */}
        <ErrorBoundary>
          <div className="section-spacing">
            <InkedStorySection />
          </div>
        </ErrorBoundary>

        
        
        {/* 5. Scrolling Showcase - Matches Inked Template */}
        <ErrorBoundary>
          <div className="section-spacing">
            <div className="showcase-heading">
              <h2>Inked Showcase</h2>
            </div>
            <ScrollingShowcase 
              images={[
                { src: '/images/showcase/showcase-01.jpg', alt: 'Tattoo Art Showcase 1' },
                { src: '/images/showcase/showcase-02.jpg', alt: 'Tattoo Art Showcase 2' },
                { src: '/images/showcase/showcase-03.jpg', alt: 'Tattoo Art Showcase 3' },
                { src: '/images/showcase/showcase-04.jpg', alt: 'Tattoo Art Showcase 4' },
                { src: '/images/showcase/showcase-05.jpg', alt: 'Tattoo Art Showcase 5' },
                { src: '/images/showcase/showcase-06.jpg', alt: 'Tattoo Art Showcase 6' },
                { src: '/images/showcase/showcase-07.jpg', alt: 'Tattoo Art Showcase 7' },
                { src: '/images/showcase/showcase-08.jpg', alt: 'Tattoo Art Showcase 8' },
                // Duplicate a few more to match the scrolling effect in webflow template
                { src: '/images/showcase/showcase-01.jpg', alt: 'Tattoo Art Showcase 9' },
                { src: '/images/showcase/showcase-02.jpg', alt: 'Tattoo Art Showcase 10' },
                { src: '/images/showcase/showcase-03.jpg', alt: 'Tattoo Art Showcase 11' },
                { src: '/images/showcase/showcase-04.jpg', alt: 'Tattoo Art Showcase 12' },
              ]}
              className="inked-showcase"
            />
          </div>
        </ErrorBoundary>
        
        {/* 6. Carousel Badges - Visual accent */}
        <ErrorBoundary>
          <div className="section-spacing">
            <CarouselBadges />
          </div>
        </ErrorBoundary>

        {/* 7. Pre-Footer Booking CTA */}
        <ErrorBoundary>
          <div className="section-spacing">
            <PreFooterBookingCTA />
          </div>
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
