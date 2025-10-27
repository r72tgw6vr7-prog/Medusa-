import React from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import Footer from '../components/Footer';

export const ImpressumPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-brand-background text-brand-white flex flex-col'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      <main className='flex-1'>
        <section className='section-padding'>
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-4xl'>
              {/* Unified heading section applied: matches ServicesPageInteractive styling */}
              <div className='text-center mb-16'>
                <h1 className='typo-h1 text-[#D4AF37]'>Impressum</h1>
                <p className='typo-subtitle text-[#C0C0C0]'>Medusa Tattoo München</p>
              </div>

              <div className='space-y-16'>
                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>Angaben gemäß § 5 TMG</h2>
                  <div className='space-y-0 text-brand-white/85'>
                    <p className='font-semibold'>MEDUSA TATTOO MÜNCHEN</p>
                    <p>Inhaberin: [Inhabername einfügen]</p>
                    <p>Altheimer Eck 11</p>
                    <p>80331 München</p>
                    <p>Deutschland</p>
                  </div>
                </section>

                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>Kontakt</h2>
                  <div className='space-y-0 text-brand-white/85'>
                    <p>Telefon: +49 (0) 89 269 313</p>
                    <p>E-Mail: info@medusa-tattoo.de</p>
                    <p>Website: www.medusa-tattoo.de</p>
                  </div>
                </section>

                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>Umsatzsteuer-ID</h2>
                  <div className='space-y-0 text-brand-white/85'>
                    <p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</p>
                    <p>[USt-IdNr einfügen oder: Kleinunternehmer gemäß § 19 UStG]</p>
                    <p>Steuernummer: [Steuernummer einfügen]</p>
                    <p className='text-sm text-white/60'>Finanzamt München</p>
                  </div>
                </section>

                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                  </h2>
                  <div className='space-y-0 text-brand-white/85'>
                    <p>[Vollständiger Name der verantwortlichen Person]</p>
                    <p>Altheimer Eck 11</p>
                    <p>80331 München</p>
                  </div>
                </section>

                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>
                    Berufshaftpflichtversicherung
                  </h2>
                  <div className='space-y-0 text-brand-white/85'>
                    <p>Versicherer: [Name der Versicherungsgesellschaft]</p>
                    <p>Geltungsbereich: Deutschland/EU</p>
                    <p>Deckungssumme: [Betrag in EUR]</p>
                  </div>
                </section>

                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>Streitschlichtung</h2>
                  <p className='text-brand-white/85'>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                    bereit:
                  </p>
                  <a
                    href='https://ec.europa.eu/consumers/odr'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex text-brand-gold hover:text-brand-gold/80 underline transition-colors duration-200 ease-out'
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                  <p className='text-sm text-white/80'>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </section>

                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>Haftung für Inhalte</h2>
                  <p className='text-sm text-white/80 leading-relaxed'>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen
                    Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind
                    wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                    gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen,
                    die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </section>

                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>Haftung für Links</h2>
                  <p className='text-sm text-white/80 leading-relaxed'>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                    keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                    Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                    Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </section>

                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>Urheberrecht</h2>
                  <p className='font-semibold text-brand-white/90'>
                    © 2025 MEDUSA TATTOO MÜNCHEN. Alle Rechte vorbehalten.
                  </p>
                  <p className='text-sm text-white/80 leading-relaxed'>
                    Alle auf dieser Website verwendeten Bilder, Texte und grafischen Gestaltungen
                    sind urheberrechtlich geschützt. Die Vervielfältigung, Bearbeitung, Verbreitung
                    und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                    der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                  <p className='text-sm text-white/80 leading-relaxed'>
                    Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden
                    die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine
                    Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
                    Hinweis.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ImpressumPage;
