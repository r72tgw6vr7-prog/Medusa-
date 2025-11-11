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
import { Section, PageHeader } from '@/components/atoms';

export function ArtistsPage() {
  return (
    <main className='artists-page w-full min-h-screen relative z-10'>
      {/* Navigation */}
      <MainNavigation />
      {/* Page Header - standardized */}
      <Section spacing='md'>
        <div className='mx-auto w-full max-w-[1104px]'>
          <PageHeader
            eyebrow='Medusa München'
            title='Künstler'
            subtitle='Lernen Sie unser Team aus spezialisierten Tattoo-Künstlern kennen.'
            alignment='center'
            maxWidth='md'
          />
        </div>
      </Section>

      {/* Artists Grid Section */}
      <Section spacing='md'>
        <TeamGrid containerSize='wide' />
      </Section>

      {/* Trust Statistics Strip */}
      <CarouselBadges />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default ArtistsPage;
