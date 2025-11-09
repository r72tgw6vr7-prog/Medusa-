// ============================================
// PAGE ASSEMBLY: ArtistsPage
// ============================================
// PURPOSE: Assemble existing artist components into cohesive page matching Figma layout.
//
// COMPONENT ASSEMBLY (NOT building from scratch):
// - Hero Section: Custom inline hero with "Artists" title
// - Master Team Section: <OurArtists /> with 6 artist cards and trust badges below
// - Footer: <Footer />

import React from 'react';
import { TeamGrid, Footer } from '@/components/pages';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { CarouselBadges } from '@/components/CarouselBadges';
import './ArtistsPage.css';

export function ArtistsPage() {
  return (
    <main className='artists-page w-full min-h-screen relative z-10'>
      {/* Navigation */}
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      {/* Page Header - Matches Services page exactly */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-[1104px] flex flex-col gap-16'>
            <div className='text-center space-y-8'>
              <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
                Medusa München
              </p>
              <h1 className='font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--brand-gold)]'>
                Künstler
              </h1>
              <p className='text-lg text-[#C0C0C0] max-w-2xl mx-auto font-body leading-relaxed'>
                Lernen Sie unser Team aus spezialisierten Tattoo-Künstlern kennen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Grid Section */}
      <section className='section-padding relative z-10'>
        <TeamGrid containerSize='wide' />
      </section>

      {/* Trust Statistics Strip */}
      <CarouselBadges />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default ArtistsPage;
