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
import TeamGrid from '../components/TeamGrid';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { CarouselBadges } from '../components/CarouselBadges';
import Footer from '../components/Footer';
import './ArtistsPage.css';

export function ArtistsPage() {
  return (
    <main className='artists-page w-full min-h-screen relative z-10'>
      {/* Navigation */}
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      {/* Artists Section with TeamGrid (matches homepage cards) */}
      <section className='artists-section pt-24 md:pt-24 pb-16 md:pb-24 relative z-10' data-texture-bg>
        <div className='container max-w-[1320px] mx-auto px-8 md:px-8'>
          {/* Unified heading section applied: matches ServicesPageInteractive styling */}
          <div className='text-center mb-16'>
            <h1 className='typo-h1 text-[var(--brand-gold)]'>Künstler</h1>
            <p className='typo-subtitle text-[#C0C0C0]'>
              Lernen Sie unser Team aus spezialisierten Tattoo-Künstlern kennen.
            </p>
          </div>
          {/* FIX 11: Reduced from 1440px to 1320px */}
          <TeamGrid />
        </div>
      </section>

      {/* Trust Statistics Strip */}
      <CarouselBadges />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default ArtistsPage;
