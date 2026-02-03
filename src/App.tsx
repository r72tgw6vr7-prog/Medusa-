import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider } from '@/core/state/AppContext';
import Meta from '@/components/Meta';
import LocalizedMeta from '@/components/LocalizedMeta';
import LocaleRouteSync from '@/i18n/LocaleRouteSync';
// Fix import path to match actual directory structure
import { SimpleMedusaProvider } from './foundation/SimpleMedusaProvider';
import { initScroll } from '@/lib/scroll';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import { MotionProvider } from '@/providers/MotionProvider';
import ScrollToTop from '@/components/ScrollToTop';
import { HomePage } from './pages/HomePage';

const useGSAPText = import.meta.env.VITE_GSAP_TEXT === 'true';
initScroll(useGSAPText ? 'scroll-full' : 'scroll-minimal');

const TattooServicesPage = lazy(() =>
  import('@/components/pages/TattooServicesPage').then((m) => ({ default: m.TattooServicesPage })),
);
const PiercingServicesPage = lazy(() =>
  import('@/components/pages/PiercingServicesPage').then((m) => ({
    default: m.PiercingServicesPage,
  })),
);
const ArtistsPage = lazy(() =>
  import('./pages/ArtistsPage').then((m) => ({ default: m.ArtistsPage })),
);
const GalleryPage = lazy(() =>
  import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })),
);
const BookingPage = lazy(() =>
  import('./pages/BookingPage').then((m) => ({ default: m.BookingPage })),
);
const AftercarePage = lazy(() =>
  import('./pages/AftercarePage').then((m) => ({ default: m.AftercarePage })),
);
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })));
const ImpressumPage = lazy(() =>
  import('./pages/ImpressumPage').then((m) => ({ default: m.ImpressumPage })),
);
const DatenschutzPage = lazy(() =>
  import('./pages/DatenschutzPage').then((m) => ({ default: m.DatenschutzPage })),
);
const AGBPage = lazy(() => import('./pages/AGBPage'));
const FAQPage = lazy(() => import('./pages/FAQPageNew').then((m) => ({ default: m.FAQPageNew })));
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);
const ArtistProfilePage = lazy(() =>
  import('./pages/ArtistProfilePage').then((m) => ({ default: m.ArtistProfilePage })),
);

function App() {
  // Texture background is now handled in main.tsx

  return (
    <SimpleMedusaProvider>
      <AppProvider initialLanguage='DE'>
        <LanguageProvider>
          <MotionProvider
            config={{
              scrollProgressEnabled: true,
              parallaxEnabled: true,
              cursorTrailEnabled: false,
            }}
          >
            <LocaleRouteSync />
            <ScrollToTop />
            <AnalyticsProvider>
              {/* All page content (texture moved to main.tsx) */}
              <div className='relative z-10' data-scroll-root>
                {' '}
                {/* Content above texture */}
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    {/* Main Routes */}
                    <Route
                      path='/'
                      element={
                        <>
                          <LocalizedMeta pageKey='home' basePath='/' canonicalPath='/' />
                          <HomePage />
                        </>
                      }
                    />
                    <Route path='/services' element={<Navigate to='/services/tattoos' replace />} />
                    <Route
                      path='/services/tattoos'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='services'
                            basePath='/services/tattoos'
                            canonicalPath='/services/tattoos'
                          />
                          <TattooServicesPage />
                        </>
                      }
                    />
                    <Route
                      path='/services/piercings'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='services'
                            basePath='/services/piercings'
                            canonicalPath='/services/piercings'
                          />
                          <PiercingServicesPage />
                        </>
                      }
                    />
                    <Route
                      path='/artists'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='artists'
                            basePath='/artists'
                            canonicalPath='/artists'
                          />
                          <ArtistsPage />
                        </>
                      }
                    />
                    <Route
                      path='/about'
                      element={
                        <>
                          <LocalizedMeta pageKey='about' basePath='/about' canonicalPath='/about' />
                          <AboutPage />
                        </>
                      }
                    />
                    <Route path='/artists/:slug' element={<ArtistProfilePage />} />
                    <Route
                      path='/gallery'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='gallery'
                            basePath='/gallery'
                            canonicalPath='/gallery'
                          />
                          <GalleryPage />
                        </>
                      }
                    />
                    <Route
                      path='/booking'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='booking'
                            basePath='/booking'
                            canonicalPath='/booking'
                          />
                          <BookingPage />
                        </>
                      }
                    />

                    {/* 301 Redirect from old pricing page to services */}
                    <Route path='/pricing' element={<Navigate to='/services' replace />} />
                    <Route path='/preise' element={<Navigate to='/services' replace />} />

                    <Route path='/aftercare' element={<AftercarePage />} />
                    <Route
                      path='/agb'
                      element={
                        <>
                          <Meta
                            title='Medusa Tattoo München | AGB'
                            description='Vorläufige AGB-Seite. Verbindliche Fassung folgt in Kürze.'
                            canonicalPath='/agb'
                          />
                          <AGBPage />
                        </>
                      }
                    />
                    <Route path='/legal' element={<LegalPage />} />
                    <Route path='/impressum' element={<ImpressumPage />} />
                    <Route path='/datenschutz' element={<DatenschutzPage />} />
                    <Route
                      path='/faq'
                      element={
                        <>
                          <LocalizedMeta pageKey='faq' basePath='/faq' canonicalPath='/faq' />
                          <FAQPage />
                        </>
                      }
                    />
                    <Route
                      path='/contact'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='contact'
                            basePath='/contact'
                            canonicalPath='/contact'
                          />
                          <ContactPage />
                        </>
                      }
                    />

                    {/* English Routes (path prefix) */}
                    <Route
                      path='/en'
                      element={
                        <>
                          <LocalizedMeta pageKey='home' basePath='/' canonicalPath='/en' />
                          <HomePage />
                        </>
                      }
                    />
                    <Route
                      path='/en/services'
                      element={<Navigate to='/en/services/tattoos' replace />}
                    />
                    <Route
                      path='/en/services/tattoos'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='services'
                            basePath='/services/tattoos'
                            canonicalPath='/en/services/tattoos'
                          />
                          <TattooServicesPage />
                        </>
                      }
                    />
                    <Route
                      path='/en/services/piercings'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='services'
                            basePath='/services/piercings'
                            canonicalPath='/en/services/piercings'
                          />
                          <PiercingServicesPage />
                        </>
                      }
                    />
                    <Route
                      path='/en/artists'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='artists'
                            basePath='/artists'
                            canonicalPath='/en/artists'
                          />
                          <ArtistsPage />
                        </>
                      }
                    />
                    <Route
                      path='/en/about'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='about'
                            basePath='/about'
                            canonicalPath='/en/about'
                          />
                          <AboutPage />
                        </>
                      }
                    />
                    <Route path='/en/artists/:slug' element={<ArtistProfilePage />} />
                    <Route
                      path='/en/gallery'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='gallery'
                            basePath='/gallery'
                            canonicalPath='/en/gallery'
                          />
                          <GalleryPage />
                        </>
                      }
                    />
                    <Route
                      path='/en/booking'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='booking'
                            basePath='/booking'
                            canonicalPath='/en/booking'
                          />
                          <BookingPage />
                        </>
                      }
                    />
                    <Route
                      path='/en/faq'
                      element={
                        <>
                          <LocalizedMeta pageKey='faq' basePath='/faq' canonicalPath='/en/faq' />
                          <FAQPage />
                        </>
                      }
                    />
                    <Route
                      path='/en/contact'
                      element={
                        <>
                          <LocalizedMeta
                            pageKey='contact'
                            basePath='/contact'
                            canonicalPath='/en/contact'
                          />
                          <ContactPage />
                        </>
                      }
                    />

                    {/* Legacy English mapping */}
                    <Route path='/en/pricing' element={<Navigate to='/en/services' replace />} />
                    <Route path='/en/preise' element={<Navigate to='/en/services' replace />} />

                    {/* 404 Route */}
                    <Route path='*' element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </div>{' '}
              {/* End content wrapper */}
            </AnalyticsProvider>
          </MotionProvider>
        </LanguageProvider>
      </AppProvider>
    </SimpleMedusaProvider>
  );
}

export default App;
