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
import './GalleryPage.css';

export function GalleryPage() {
  const { t } = useLanguage();

  return (
    <main className='gallery-page w-full min-h-screen relative z-10 bg-luxury-bg-dark'>
      {/* Navigation */}
      <MainNavigation />

      {/* Page Header */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-276 flex flex-col gap-16'>
            <PageHeading
              eyebrow="Medusa München"
              title={t('gallery.title')}
              subtitle={t('gallery.subtitle')}
            />
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <LayoutGridDemo images={GALLERY_IMAGES} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default GalleryPage;
