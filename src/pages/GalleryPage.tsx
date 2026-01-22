// ============================================
// PAGE ASSEMBLY: GalleryPage
// ============================================
// PURPOSE: Gallery page with interactive layout grid for tattoo/piercing work.

import React from 'react';
import { Footer } from '@/components/pages';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { LayoutGridDemo } from '@/components/layout-grid-demo';
import { GALLERY_IMAGES } from '@/content/gallery-images';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeading } from '../components/PageHeading';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import './GalleryPage.css';

export function GalleryPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-modal focus:px-8 focus:py-4 focus:bg-brand-accent focus:text-deep-black focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className='gallery-page w-full min-h-screen relative z-10 bg-luxury-bg-dark'>
        {/* Navigation */}
        <MainNavigation />

        <main id="main-content">

      {/* Page Header */}
      <Section variant="default" spacing="normal" bg="dark">
        <Container size="wide">
          <PageHeading
            eyebrow="Medusa München"
            title={t('gallery.title')}
            subtitle={t('gallery.subtitle')}
          />
        </Container>
      </Section>

      {/* Gallery Grid Section - Full Viewport Width */}
      <Section variant="default" spacing="normal" bg="dark">
        <LayoutGridDemo images={GALLERY_IMAGES} />
      </Section>

        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default GalleryPage;
