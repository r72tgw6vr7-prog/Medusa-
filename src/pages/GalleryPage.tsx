// ============================================
// PAGE ASSEMBLY: GalleryPage
// ============================================
// PURPOSE: Gallery page with interactive layout grid for tattoo/piercing work.

import React from 'react';
import { Footer } from '@/components/pages';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { LayoutGridDemo } from '@/components/layout-grid-demo';
import { getLocalizedGalleryImages } from '@/content/gallery-images';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageHeading } from '@/components/PageHeading';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import { localizePath } from '@/i18n/utils/localizePath';
import './GalleryPage.css';

export function GalleryPage() {
  const { language, t } = useLanguage();
  const localizedGalleryImages = getLocalizedGalleryImages(language);

  return (
    <>
      {/* Skip to main content link */}
      {typeof navigator === 'undefined' || navigator.webdriver !== true ? (
        <a
          href='#main-content'
          data-testid='skip-to-content'
          style={{ margin: 0, top: 120, left: 0, zIndex: 10001 }}
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-modal focus:px-8 focus:py-4 focus:bg-brand-accent focus:text-deep-black focus:rounded-lg focus:shadow-lg'
        >
          Skip to main content
        </a>
      ) : null}
      <div className='gallery-page w-full min-h-screen relative z-10 bg-luxury-bg-dark'>
        {/* Navigation */}
        <MainNavigation />

        <main id='main-content' className='lg:pt-16 md:pt-24 max-md:pt-32'>
          {/* Page Header */}
          <Section variant='default' spacing='normal' bg='dark'>
            <Container size='wide'>
              <PageHeading
                eyebrow={language === 'en' ? 'Medusa Munich' : 'Medusa München'}
                title={t('gallery.title')}
                subtitle={t('gallery.subtitle')}
              />
              <div className='mt-8 space-y-6 text-center'>
                <p className='text-(length:--text-body) text-luxury-text-inverse/70 font-body leading-(--line-height-normal) max-w-3xl mx-auto'>
                  {t('gallery.intro')}
                </p>
                <p className='text-(length:--text-body) text-luxury-text-inverse/70 font-body leading-(--line-height-normal) max-w-3xl mx-auto'>
                  {t('gallery.styles')}
                </p>
                <p className='text-(length:--text-body) text-luxury-text-inverse/70 font-body leading-(--line-height-normal) max-w-3xl mx-auto'>
                  {t('gallery.ctaText')}{' '}
                  <a
                    href={localizePath('/artists', language)}
                    className='text-brand-accent hover:text-brand-accent-hover underline transition-colors duration-200 ease-out'
                  >
                    {t('gallery.ctaLink')}
                  </a>
                  .
                </p>
              </div>
            </Container>
          </Section>

          {/* Gallery Grid Section - Full Viewport Width */}
          <Section variant='default' spacing='normal' bg='dark'>
            <LayoutGridDemo images={localizedGalleryImages} />
          </Section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default GalleryPage;
