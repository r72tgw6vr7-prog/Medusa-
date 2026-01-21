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
    <main className='artists-page w-full min-h-screen relative z-10 bg-luxury-bg-dark'>
      {/* Navigation */}
      <MainNavigation />

      {/* Artists Section - exact template implementation */}
      <TeamGrid />

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default ArtistsPage;
