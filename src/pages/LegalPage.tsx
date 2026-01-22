import React, { useState } from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { PageHeading } from '../components/PageHeading';
import { Card } from '@/components/ui/Card';

export const LegalPage: React.FC = () => {
  const [showBackToTop, _setShowBackToTop] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='min-h-screen bg-luxury-bg-dark'>
      <MainNavigation />

      <main>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-container-main'>
            {/* Page Header - Standardized */}
            <PageHeading
              eyebrow='Medusa München'
              title='Allgemeine Geschäftsbedingungen'
              subtitle='MEDUSA TATTOO MÜNCHEN'
            />

            {/* Table of Contents */}
            <Card
              variant="default"
              size="default"
              className="w-full min-w-0 overflow-hidden lg:overflow-visible"
              asChild
            >
              <nav className="w-full">
                <h2 className='text-2xl font-semibold text-brand-accent mb-8'>Inhaltsverzeichnis</h2>
                <ul className='space-y-0 text-brand-lightGray wrap-break-word lg:break-normal'>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-1')}
                      className='hover:text-brand-accent transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-chrome touch-target-mobile touch-target-mobile-inline'
                    >
                      § 1 Geltungsbereich
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-2')}
                      className='hover:text-brand-accent transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-chrome touch-target-mobile touch-target-mobile-inline'
                    >
                      § 2 Leistungen
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-3')}
                      className='hover:text-brand-accent transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-chrome touch-target-mobile touch-target-mobile-inline'
                    >
                      § 3 Termine und Stornierung
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-4')}
                      className='hover:text-brand-accent transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-chrome touch-target-mobile touch-target-mobile-inline'
                    >
                      § 4 Preise und Zahlung
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-5')}
                      className='hover:text-brand-accent transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-chrome touch-target-mobile touch-target-mobile-inline'
                    >
                      § 5 Gesundheit und Eignung
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-6')}
                      className='hover:text-brand-accent transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-chrome touch-target-mobile touch-target-mobile-inline'
                    >
                      § 6 Nachsorge und Haftung
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-7')}
                      className='hover:text-brand-accent transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-chrome touch-target-mobile touch-target-mobile-inline'
                    >
                      § 7 Urheberrecht
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-8')}
                      className='hover:text-brand-accent transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-chrome touch-target-mobile touch-target-mobile-inline'
                    >
                      § 8 Datenschutz
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-9')}
                      className='hover:text-brand-accent transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-brand-chrome touch-target-mobile touch-target-mobile-inline'
                    >
                      § 9 Schlussbestimmungen
                    </button>
                  </li>
                </ul>
              </nav>
            </Card>

            {/* Content Sections */}
            {[
              {
                id: 'section-1',
                title: '§ 1 Geltungsbereich',
                content: [
                  '(1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Dienstleistungen, die von MEDUSA TATTOO MÜNCHEN, Altheimer Eck 11, 80331 München, nachfolgend "Anbieter" genannt, angeboten werden.',
                  '(2) Die AGB gelten für Verträge über Tattoo- und Piercing-Dienstleistungen zwischen dem Anbieter und dem Kunden (Verbraucher oder Unternehmer).',
                  '(3) Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.',
                ],
              },
              {
                id: 'section-2',
                title: '§ 2 Leistungen',
                content: [
                  '(1) Der Anbieter bietet Tattoo- und Piercing-Dienstleistungen an.',
                  '(2) Die Leistungen umfassen die Beratung, das Stechen von Tattoos und Piercings sowie die Nachsorgeberatung.',
                  '(3) Alle Dienstleistungen werden nach den aktuellen hygienischen Standards und gesetzlichen Vorschriften durchgeführt.',
                ],
              },
              {
                id: 'section-3',
                title: '§ 3 Termine und Stornierung',
                content: [
                  '(1) Termine können online über die Website oder telefonisch vereinbart werden.',
                  '(2) Bei Stornierung bis 24 Stunden vor dem Termin fallen keine Kosten an.',
                  '(3) Bei kurzfristiger Absage (weniger als 24 Stunden) oder Nichterscheinen wird eine Ausfallgebühr in Höhe von 50% des vereinbarten Preises fällig.',
                ],
              },
              {
                id: 'section-4',
                title: '§ 4 Preise und Zahlung',
                content: [
                  '(1) Die Preise richten sich nach Aufwand, Größe und Komplexität der Leistung.',
                  '(2) Zahlungen sind bar, per EC-Karte oder Kreditkarte möglich.',
                  '(3) Bei größeren Arbeiten kann eine Anzahlung verlangt werden.',
                ],
              },
              {
                id: 'section-5',
                title: '§ 5 Gesundheit und Eignung',
                content: [
                  '(1) Der Kunde versichert, dass er gesundheitlich geeignet für die Leistung ist.',
                  '(2) Bei Zweifeln an der Eignung kann der Anbieter die Leistung verweigern.',
                  '(3) Der Kunde ist verpflichtet, Vorerkrankungen und Medikamente mitzuteilen.',
                ],
              },
              {
                id: 'section-6',
                title: '§ 6 Nachsorge und Haftung',
                content: [
                  '(1) Der Anbieter stellt Nachsorgehinweise zur Verfügung.',
                  '(2) Für Folgen unsachgemäßer Nachsorge übernimmt der Anbieter keine Haftung.',
                  '(3) Die Haftung ist auf Vorsatz und grobe Fahrlässigkeit beschränkt.',
                ],
              },
              {
                id: 'section-7',
                title: '§ 7 Urheberrecht',
                content: [
                  '(1) Designs des Anbieters sind urheberrechtlich geschützt.',
                  '(2) Die kommerzielle Nutzung von Tattoo-Designs bedarf der schriftlichen Zustimmung.',
                  '(3) Kunden-Designs bleiben Eigentum des Kunden.',
                ],
              },
              {
                id: 'section-8',
                title: '§ 8 Datenschutz',
                content: [
                  '(1) Die Verarbeitung personenbezogener Daten erfolgt gemäß DSGVO.',
                  '(2) Details sind in der separaten Datenschutzerklärung zu finden.',
                  '(3) Der Kunde hat das Recht auf Auskunft, Berichtigung und Löschung seiner Daten.',
                ],
              },
              {
                id: 'section-9',
                title: '§ 9 Schlussbestimmungen',
                content: [
                  '(1) Es gilt deutsches Recht.',
                  '(2) Gerichtsstand ist München.',
                  '(3) Änderungen und Ergänzungen dieser AGB bedürfen der Schriftform. Dies gilt auch für die Änderung dieser Schriftformklausel.',
                  '(4) Mündliche Nebenabreden bestehen nicht.',
                ],
              },
            ].map((section) => (
              <Card
                key={section.id}
                variant="default"
                size="default"
                className="w-full min-w-0 overflow-hidden lg:overflow-visible"
                asChild
              >
                <div>
                  <h3 className="font-headline text-xl text-luxury-text-inverse mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    <ul className="space-y-2 ml-6 list-disc">
                      {section.content.map((item: string, index: number) => (
                        <li key={index} className="text-base lg:text-sm text-luxury-text-inverse/70">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </main>

    <Footer />

    {/* Back to Top Button */}
    {showBackToTop && (
      <button
        onClick={scrollToTop}
        className='fixed bottom-8 right-8 bg-brand-chrome text-luxury-text-primary p-8 rounded-xl shadow-lg hover:bg-accent-hover transition-all duration-200 z-50 focus:outline-none focus:ring-2 focus:ring-brand-chrome focus:ring-offset-2 focus:ring-offset-luxury-bg-dark'
        aria-label='Zurück nach oben'
      >
        <p className="text-xs md:text-sm uppercase tracking-widest text-luxury-text-inverse/60 mb-6">Zurück nach oben</p>
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 10l7-7m0 0l7 7m-7-7v18'
          />
        </svg>
      </button>
    )}
  </div>
);
};

export default LegalPage;
