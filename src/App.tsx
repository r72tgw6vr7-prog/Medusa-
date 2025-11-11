import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from '@/components/organisms/ServicesPage';
import { ArtistsPage } from './pages/ArtistsPage';
// import { AftercarePage } from './pages/AftercarePage';
import React, { Suspense, lazy } from 'react';
// UniversalTextureBackground moved to main.tsx
const InkedGalleryPage = lazy(() => import('./pages/InkedGalleryPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
import { LegalPage } from './pages/LegalPage';
import { ImpressumPage } from './pages/ImpressumPage';
import { DatenschutzPage } from './pages/DatenschutzPage';
import AGBPage from './pages/AGBPage';
import { FAQPageNew as FAQPage } from './pages/FAQPageNew';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ServicesTestPage } from './pages/ServicesTestPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider } from '../core/state/AppContext';
import Meta from '@/components/Meta';
// Fix import path to match actual directory structure
import { BusinessProvider } from './foundation/BusinessProvider';
import ScrollToTop from '@/components/ScrollToTop';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import { ROUTES } from '../core/types/routes';
import ROUTE_CONFIG from '../core/constants/routes';

function App() {
  // Texture background is now handled in main.tsx

  return (
    <BusinessProvider>
      <AppProvider initialLanguage='DE'>
        <LanguageProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AnalyticsProvider>
              {/* All page content (texture moved to main.tsx) */}
              <div className='relative z-10' data-scroll-root>
                {' '}
                {/* Content above texture */}
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    {/* Main Routes */}
                    <Route path={ROUTE_CONFIG[ROUTES.HOME].path} element={<HomePage />} />
                    <Route
                      path={ROUTE_CONFIG[ROUTES.SERVICES].path}
                      element={
                        <>
                          <Meta
                            title='Medusa Tattoo München | Services'
                            description='Premium Tattoo- und Piercing-Services in München. Transparente Preise, Beratung und höchste Hygiene.'
                            canonicalPath={ROUTE_CONFIG[ROUTES.SERVICES].path}
                          />
                          <ServicesPage />
                        </>
                      }
                    />
                    <Route path='/services-test' element={<ServicesTestPage />} />
                    <Route
                      path={ROUTE_CONFIG[ROUTES.ARTISTS].path}
                      element={
                        <>
                          <Meta
                            title='Medusa Tattoo München | Artists'
                            description='Lernen Sie unser Team aus spezialisierten Tattoo-Künstlern kennen. Termine und Portfolios.'
                            canonicalPath={ROUTE_CONFIG[ROUTES.ARTISTS].path}
                          />
                          <ArtistsPage />
                        </>
                      }
                    />
                    <Route
                      path={ROUTE_CONFIG[ROUTES.GALLERY].path}
                      element={
                        <>
                          <Meta
                            title='Medusa Tattoo München | Gallery'
                            description='Entdecken Sie unsere Galerie: Realismus, Fine-Line, Blackwork und mehr. Aktuelle Arbeiten aus München.'
                            canonicalPath={ROUTE_CONFIG[ROUTES.GALLERY].path}
                          />
                          <Suspense fallback={<div>Loading Gallery...</div>}>
                            <InkedGalleryPage />
                          </Suspense>
                        </>
                      }
                    />

                    {/* 301 Redirect from old pricing page to services */}
                    <Route path='/pricing' element={<Navigate to={ROUTE_CONFIG[ROUTES.SERVICES].path} replace />} />
                    <Route path='/preise' element={<Navigate to={ROUTE_CONFIG[ROUTES.SERVICES].path} replace />} />

                    {/* <Route path='/aftercare' element={<AftercarePage />} /> */}
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
                    <Route
                      path={ROUTE_CONFIG[ROUTES.BOOKING].path}
                      element={
                        <>
                          <Meta
                            title='Medusa Tattoo München | Booking'
                            description='Jetzt Termin bei Medusa Tattoo München buchen – schnelle Anfrage, zuverlässige Rückmeldung.'
                            canonicalPath={ROUTE_CONFIG[ROUTES.BOOKING].path}
                          />
                          <Suspense fallback={<div>Loading Booking...</div>}>
                            <BookingPage />
                          </Suspense>
                        </>
                      }
                    />
                    <Route path={ROUTE_CONFIG[ROUTES.LEGAL].path} element={<LegalPage />} />
                    <Route path={ROUTE_CONFIG[ROUTES.IMPRESSUM].path} element={<ImpressumPage />} />
                    <Route path={ROUTE_CONFIG[ROUTES.DATENSCHUTZ].path} element={<DatenschutzPage />} />
                    <Route
                      path={ROUTE_CONFIG[ROUTES.FAQ].path}
                      element={
                        <>
                          <Meta
                            title='Medusa Tattoo München | FAQ'
                            description='Antworten zu Termin, Pflege, Preisen und Hygiene bei Medusa Tattoo München.'
                            canonicalPath={ROUTE_CONFIG[ROUTES.FAQ].path}
                          />
                          <FAQPage />
                        </>
                      }
                    />
                    <Route
                      path={ROUTE_CONFIG[ROUTES.CONTACT].path}
                      element={
                        <>
                          <Meta
                            title='Medusa Tattoo München | Kontakt'
                            description='Kontakt zu Medusa Tattoo München: Adresse, Telefon, E-Mail und Öffnungszeiten.'
                            canonicalPath={ROUTE_CONFIG[ROUTES.CONTACT].path}
                          />
                          <ContactPage />
                        </>
                      }
                    />

                    {/* 404 Route */}
                    <Route path='*' element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </div>{' '}
              {/* End content wrapper */}
            </AnalyticsProvider>
          </BrowserRouter>
        </LanguageProvider>
      </AppProvider>
    </BusinessProvider>
  );
}

export default App;
