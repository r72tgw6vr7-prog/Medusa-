import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './components/organisms/ServicesPage';
import { ArtistsPage } from './pages/ArtistsPage';
import { AftercarePage } from './pages/AftercarePage';
import React, { Suspense, lazy } from 'react';
const EnhancedGalleryPage = lazy(() => import('./pages/EnhancedGalleryPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
import { LegalPage } from './pages/LegalPage';
import { ImpressumPage } from './pages/ImpressumPage';
import { DatenschutzPage } from './pages/DatenschutzPage';
import AGBPage from './pages/AGBPage';
import { FAQPageNew as FAQPage } from './pages/FAQPageNew';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import DeveloperDiagnostics from './pages/DeveloperDiagnostics';
import { ServicesTestPage } from './pages/ServicesTestPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider } from '../core/state/AppContext';
import Meta from './components/Meta';
import { SimpleMedusaProvider } from './foundation/index';

function App() {
  return (
    <SimpleMedusaProvider>
      <AppProvider initialLanguage='DE'>
        <LanguageProvider>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Main Routes */}
                <Route path='/' element={<HomePage />} />
                <Route
                  path='/services'
                  element={
                    <>
                      <Meta
                        title='Medusa Tattoo München | Services'
                        description='Premium Tattoo- und Piercing-Services in München. Transparente Preise, Beratung und höchste Hygiene.'
                        canonicalPath='/services'
                      />
                      <ServicesPage />
                    </>
                  }
                />
                <Route path='/services-test' element={<ServicesTestPage />} />
                <Route
                  path='/artists'
                  element={
                    <>
                      <Meta
                        title='Medusa Tattoo München | Artists'
                        description='Lernen Sie unser Team aus spezialisierten Tattoo-Künstlern kennen. Termine und Portfolios.'
                        canonicalPath='/artists'
                      />
                      <ArtistsPage />
                    </>
                  }
                />
                <Route
                  path='/gallery'
                  element={
                    <>
                      <Meta
                        title='Medusa Tattoo München | Gallery'
                        description='Entdecken Sie unsere Galerie: Realismus, Fine-Line, Blackwork und mehr. Aktuelle Arbeiten aus München.'
                        canonicalPath='/gallery'
                      />
                      <Suspense fallback={<div>Loading Gallery...</div>}>
                        <EnhancedGalleryPage />
                      </Suspense>
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
                <Route
                  path='/booking'
                  element={
                    <>
                      <Meta
                        title='Medusa Tattoo München | Booking'
                        description='Jetzt Termin bei Medusa Tattoo München buchen – schnelle Anfrage, zuverlässige Rückmeldung.'
                        canonicalPath='/booking'
                      />
                      <Suspense fallback={<div>Loading Booking...</div>}>
                        <BookingPage />
                      </Suspense>
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
                      <Meta
                        title='Medusa Tattoo München | FAQ'
                        description='Antworten zu Termin, Pflege, Preisen und Hygiene bei Medusa Tattoo München.'
                        canonicalPath='/faq'
                      />
                      <FAQPage />
                    </>
                  }
                />
                <Route
                  path='/contact'
                  element={
                    <>
                      <Meta
                        title='Medusa Tattoo München | Kontakt'
                        description='Kontakt zu Medusa Tattoo München: Adresse, Telefon, E-Mail und Öffnungszeiten.'
                        canonicalPath='/contact'
                      />
                      <ContactPage />
                    </>
                  }
                />

                {/* Diagnostics */}
                <Route path='/diagnostics' element={<DeveloperDiagnostics />} />

                {/* 404 Route */}
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LanguageProvider>
      </AppProvider>
    </SimpleMedusaProvider>
  );
}

export default App;
