// ============================================
// PAGE ASSEMBLY: ArtistsPage
// ============================================
// PURPOSE: Japanese-inspired luxury artist showcase page
//
// COMPONENT ASSEMBLY:
// - Navigation: <MainNavigation />
// - Artist Section: <TeamGrid /> - Alternating two-column layout with curtain reveal
// - Footer: <Footer />

import React from 'react';
import { TeamGrid, Footer } from '@/components/pages';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import './ArtistsPage.css';

export function ArtistsPage() {
  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-modal focus:px-8 focus:py-4 focus:bg-brand-accent focus:text-deep-black focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className='artists-page w-full min-h-screen relative z-10 bg-luxury-bg-dark overflow-x-clip'>
        {/* Navigation */}
        <MainNavigation />

        <main id="main-content">

        {/* Artists Section - exact template implementation */}
        <TeamGrid />

        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default ArtistsPage;
