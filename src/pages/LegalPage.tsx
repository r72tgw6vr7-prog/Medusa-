import React, { useEffect, useState } from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { PageBackground } from '../components/atoms/PageBackground';

export const LegalPage: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <PageBackground>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      <main className='flex-1'>
        <section className='section-padding relative z-10'>
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-[1104px]'>
              {/* Page Header - Matches Services page exactly */}
              <div className='text-center space-y-8 mb-16'>
                <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
                  Medusa München
                </p>
                <h1 className='font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--brand-gold)]'>
                  Allgemeine Geschäftsbedingungen
                </h1>
                <p className='text-lg text-[#C0C0C0] max-w-2xl mx-auto font-body leading-relaxed'>
                  MEDUSA TATTOO MÜNCHEN
                </p>
              </div>

              {/* Table of Contents */}
              <nav className='rounded-3xl border-2 border-white/10 bg-[#222222] p-8 mb-16'>
                <h2 className='text-2xl font-semibold text-brand-gold mb-8'>Inhaltsverzeichnis</h2>
                <ul className='space-y-0 text-brand-lightGray'>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-1')}
                      className='hover:text-brand-gold transition-colors duration-200 ease-out'
                    >
                      § 1 Geltungsbereich
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-2')}
                      className='hover:text-brand-gold transition-colors duration-200 ease-out'
                    >
                      § 2 Leistungen
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-3')}
                      className='hover:text-brand-gold transition-colors duration-200 ease-out'
                    >
                      § 3 Termine und Stornierung
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-4')}
                      className='hover:text-brand-gold transition-colors duration-200 ease-out'
                    >
                      § 4 Preise und Zahlung
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-5')}
                      className='hover:text-brand-gold transition-colors duration-200 ease-out'
                    >
                      § 5 Gesundheit und Eignung
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-6')}
                      className='hover:text-brand-gold transition-colors duration-200 ease-out'
                    >
                      § 6 Nachsorge und Haftung
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-7')}
                      className='hover:text-brand-gold transition-colors duration-200 ease-out'
                    >
                      § 7 Urheberrecht
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-8')}
                      className='hover:text-brand-gold transition-colors duration-200 ease-out'
                    >
                      § 8 Datenschutz
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('section-9')}
                      className='hover:text-brand-gold transition-colors duration-200 ease-out'
                    >
                      § 9 Schlussbestimmungen
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Content Sections */}
              <div className='space-y-16'>
                {/* § 1 Geltungsbereich */}
                <section id='section-1' className='scroll-mt-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold mb-8'>
                    § 1 Geltungsbereich
                  </h2>
                  <div className='space-y-8 text-brand-lightGray leading-relaxed'>
                    <p>
                      (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
                      Dienstleistungen, die von MEDUSA TATTOO MÜNCHEN, Altheimer Eck 11, 80331
                      München (nachfolgend "Studio" genannt), erbracht werden.
                    </p>
                    <p>
                      (2) Mit der Vereinbarung eines Termins oder der Inanspruchnahme unserer
                      Dienstleistungen akzeptiert der Kunde diese Geschäftsbedingungen in ihrer zum
                      Zeitpunkt des Vertragsschlusses gültigen Fassung.
                    </p>
                    <p>
                      (3) Abweichende, entgegenstehende oder ergänzende Allgemeine
                      Geschäftsbedingungen des Kunden werden nur dann und insoweit
                      Vertragsbestandteil, als das Studio ihrer Geltung ausdrücklich schriftlich
                      zugestimmt hat.
                    </p>
                  </div>
                </section>

                {/* § 2 Leistungen */}
                <section id='section-2' className='scroll-mt-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold mb-8'>§ 2 Leistungen</h2>
                  <div className='space-y-8 text-brand-lightGray leading-relaxed'>
                    <p>
                      (1) Das Studio bietet professionelle Tattoo- und Piercing-Dienstleistungen
                      unter Einhaltung höchster Hygiene- und Qualitätsstandards an.
                    </p>
                    <p>
                      (2) Vor jeder Sitzung findet ein verpflichtendes Beratungsgespräch statt, in
                      dem der Kundenwunsch besprochen, die Durchführbarkeit geprüft und über Risiken
                      sowie Nachsorge aufgeklärt wird.
                    </p>
                    <p>
                      (3) Alle Designs werden individuell nach Kundenwunsch erstellt oder angepasst.
                      Das Studio behält sich das Recht vor, die Ausführung bestimmter Motive aus
                      künstlerischen, ethischen oder rechtlichen Gründen abzulehnen.
                    </p>
                    <p>
                      (4) Es werden ausschließlich sterile Einwegmaterialien verwendet. Alle
                      Arbeitsmaterialien entsprechen den gesetzlichen Vorgaben und den Richtlinien
                      des Robert Koch-Instituts.
                    </p>
                  </div>
                </section>

                {/* § 3 Termine und Stornierung */}
                <section id='section-3' className='scroll-mt-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold mb-8'>
                    § 3 Termine und Stornierung
                  </h2>
                  <div className='space-y-8 text-brand-lightGray leading-relaxed'>
                    <p>
                      (1) Termine können online über unsere Website, telefonisch oder persönlich im
                      Studio vereinbart werden.
                    </p>
                    <p>
                      (2) Für Projekte ab einem Wert von 150€ ist bei Terminbestätigung eine
                      Anzahlung in Höhe von 50% des voraussichtlichen Gesamtpreises zu leisten. Die
                      Anzahlung dient der Reservierung des Termins und wird auf den Endpreis
                      angerechnet.
                    </p>
                    <p>
                      (3) Eine kostenfreie Stornierung des Termins ist bis zu 48 Stunden vor dem
                      vereinbarten Termin möglich. Die Stornierung muss telefonisch oder per E-Mail
                      erfolgen.
                    </p>
                    <p>
                      (4) Bei Stornierung weniger als 48 Stunden vor dem Termin oder bei
                      Nicht-Erscheinen ohne Absage verfällt die geleistete Anzahlung. Das Studio
                      behält sich vor, in begründeten Ausnahmefällen (z.B. Krankheit mit ärztlichem
                      Attest) von dieser Regelung abzusehen.
                    </p>
                    <p>
                      (5) Bei Verspätung von mehr als 15 Minuten kann der Termin verfallen. Die
                      verbleibende Zeit kann nach Ermessen des Künstlers genutzt werden, wobei keine
                      Gewähr für die Fertigstellung des geplanten Motivs gegeben werden kann.
                    </p>
                    <p>
                      (6) Das Studio behält sich vor, Termine aus wichtigem Grund (z.B. Krankheit
                      des Künstlers) abzusagen. In diesem Fall wird ein Ersatztermin angeboten und
                      bereits geleistete Anzahlungen werden vollständig zurückerstattet oder auf den
                      neuen Termin übertragen.
                    </p>
                  </div>
                </section>

                {/* § 4 Preise und Zahlung */}
                <section id='section-4' className='scroll-mt-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold mb-8'>
                    § 4 Preise und Zahlung
                  </h2>
                  <div className='space-y-8 text-brand-lightGray leading-relaxed'>
                    <p>
                      (1) Die Preise richten sich nach dem Aufwand, der Größe, der Komplexität des
                      Motivs sowie der benötigten Arbeitszeit. Eine Preisindikation wird im
                      Beratungsgespräch gegeben. Der endgültige Preis wird nach Fertigstellung
                      festgelegt.
                    </p>
                    <p>
                      (2) Alternativ können Pauschalpreise für bestimmte Motive oder Projekte
                      vereinbart werden. Diese werden vor Beginn der Arbeit schriftlich
                      festgehalten.
                    </p>
                    <p>
                      (3) Der Mindestpreis für Tattoo-Arbeiten beträgt 80€, unabhängig von Größe
                      oder Aufwand.
                    </p>
                    <p>
                      (4) Alle angegebenen Preise verstehen sich als Endpreise inklusive der
                      gesetzlichen Mehrwertsteuer.
                    </p>
                    <p>
                      (5) Die Zahlung erfolgt nach Fertigstellung der Arbeit. Akzeptierte
                      Zahlungsarten sind Bargeld, EC-Karte und gängige Kreditkarten. Eine geleistete
                      Anzahlung wird auf den Endpreis angerechnet.
                    </p>
                    <p>
                      (6) Bei mehrteiligen Projekten, die mehrere Sitzungen erfordern, ist nach
                      jeder Sitzung der anteilige Betrag zu zahlen.
                    </p>
                  </div>
                </section>

                {/* § 5 Gesundheit und Eignung */}
                <section id='section-5' className='scroll-mt-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold mb-8'>
                    § 5 Gesundheit und Eignung
                  </h2>
                  <div className='space-y-8 text-brand-lightGray leading-relaxed'>
                    <p>
                      (1) Tattoo- und Piercing-Dienstleistungen werden nur an Personen erbracht, die
                      das 18. Lebensjahr vollendet haben. Das Alter ist durch Vorlage eines gültigen
                      Lichtbildausweises nachzuweisen.
                    </p>
                    <p>
                      (2) Vor der Behandlung ist ein Gesundheitsfragebogen wahrheitsgemäß und
                      vollständig auszufüllen. Falsche oder unvollständige Angaben können zum
                      Ausschluss von der Behandlung führen und entbinden das Studio von jeglicher
                      Haftung.
                    </p>
                    <p>
                      (3) Von der Behandlung ausgeschlossen sind Personen mit folgenden Bedingungen:
                    </p>
                    <ul className='list-disc list-inside ml-8 space-y-0'>
                      <li>Schwangerschaft oder Stillzeit</li>
                      <li>Akute oder chronische Hautkrankheiten im Behandlungsbereich</li>
                      <li>Blutgerinnungsstörungen oder Einnahme blutverdünnender Medikamente</li>
                      <li>Diabetes mellitus (ohne ärztliche Unbedenklichkeitsbescheinigung)</li>
                      <li>Immunschwäche oder Einnahme immunsuppressiver Medikamente</li>
                      <li>Epilepsie (ohne ärztliche Unbedenklichkeitsbescheinigung)</li>
                      <li>Bekannte Allergien gegen Farbstoffe oder Metalle</li>
                    </ul>
                    <p>
                      (4) Das Studio behält sich das Recht vor, Kunden unter Alkohol- oder
                      Drogeneinfluss von der Behandlung auszuschließen. In diesem Fall verfällt die
                      Anzahlung.
                    </p>
                    <p>
                      (5) Bei Unsicherheiten bezüglich der gesundheitlichen Eignung empfiehlt das
                      Studio die Einholung einer ärztlichen Unbedenklichkeitsbescheinigung vor der
                      Behandlung.
                    </p>
                  </div>
                </section>

                {/* § 6 Nachsorge und Haftung */}
                <section id='section-6' className='scroll-mt-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold mb-8'>
                    § 6 Nachsorge und Haftung
                  </h2>
                  <div className='space-y-8 text-brand-lightGray leading-relaxed'>
                    <p>
                      (1) Nach jeder Behandlung erhält der Kunde eine ausführliche schriftliche
                      Pflegeanleitung. Die gewissenhafte Befolgung dieser Anweisungen ist essentiell
                      für den Heilungserfolg.
                    </p>
                    <p>
                      (2) Der Kunde verpflichtet sich, die Nachsorgeanweisungen sorgfältig zu
                      befolgen und das Tattoo oder Piercing während der Heilungsphase sachgemäß zu
                      pflegen.
                    </p>
                    <p>
                      (3) Das Studio haftet nicht für Komplikationen während der Heilungsphase, die
                      auf unsachgemäße Pflege, Nichtbeachtung der Pflegeanweisungen oder
                      eigenverantwortliches Handeln des Kunden zurückzuführen sind.
                    </p>
                    <p>
                      (4) Bei Heilungsstörungen, die nachweislich auf Material- oder
                      Ausführungsmängel zurückzuführen sind, bietet das Studio eine kostenlose
                      Nachbesserung an. Der Kunde muss etwaige Mängel unverzüglich, spätestens
                      jedoch innerhalb von 6 Monaten nach der Behandlung, schriftlich anzeigen.
                    </p>
                    <p>
                      (5) Weitergehende Haftungsansprüche sind ausgeschlossen, soweit nicht
                      zwingende gesetzliche Vorschriften entgegenstehen. Dies gilt insbesondere für
                      Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie
                      für Schäden aus der Verletzung wesentlicher Vertragspflichten.
                    </p>
                    <p>
                      (6) Der Kunde wird darauf hingewiesen, dass die individuelle Hautheilung nicht
                      vorhersehbar ist und das Endergebnis von Person zu Person variieren kann.
                    </p>
                  </div>
                </section>

                {/* § 7 Urheberrecht */}
                <section id='section-7' className='scroll-mt-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold mb-8'>§ 7 Urheberrecht</h2>
                  <div className='space-y-8 text-brand-lightGray leading-relaxed'>
                    <p>
                      (1) Alle vom Studio oder seinen Künstlern erstellten Designs und Vorlagen sind
                      urheberrechtlich geschützt und bleiben geistiges Eigentum des jeweiligen
                      Künstlers.
                    </p>
                    <p>
                      (2) Das Studio ist berechtigt, Fotografien der ausgeführten Arbeiten
                      anzufertigen und diese für Werbezwecke, Portfolio-Präsentationen und auf
                      Social-Media-Kanälen zu verwenden.
                    </p>
                    <p>
                      (3) Der Kunde kann der Verwendung von Fotografien seiner Tätowierung für
                      Werbezwecke jederzeit schriftlich widersprechen. In diesem Fall werden
                      bestehende Veröffentlichungen nach Möglichkeit entfernt und keine weiteren
                      Aufnahmen veröffentlicht.
                    </p>
                    <p>
                      (4) Der kommerzielle Weiterverkauf oder die gewerbliche Nutzung von Designs
                      des Studios ist ohne ausdrückliche schriftliche Zustimmung untersagt.
                    </p>
                    <p>
                      (5) Bei der Verwendung von Vorlagen Dritter (z.B. aus Büchern, Internet) ist
                      der Kunde selbst für die Klärung der Urheberrechte verantwortlich. Das Studio
                      übernimmt keine Haftung für Urheberrechtsverletzungen durch vom Kunden
                      bereitgestellte Vorlagen.
                    </p>
                  </div>
                </section>

                {/* § 8 Datenschutz */}
                <section id='section-8' className='scroll-mt-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold mb-8'>§ 8 Datenschutz</h2>
                  <div className='space-y-8 text-brand-lightGray leading-relaxed'>
                    <p>
                      (1) Das Studio nimmt den Schutz personenbezogener Daten sehr ernst. Alle
                      Datenverarbeitungen erfolgen im Einklang mit der Datenschutz-Grundverordnung
                      (DSGVO) und dem Bundesdatenschutzgesetz (BDSG).
                    </p>
                    <p>
                      (2) Personenbezogene Daten werden ausschließlich zur Vertragsdurchführung,
                      Terminverwaltung und gesetzlich vorgeschriebenen Dokumentation erhoben und
                      verarbeitet.
                    </p>
                    <p>
                      (3) Eine Weitergabe an Dritte erfolgt nicht, es sei denn, dies ist gesetzlich
                      vorgeschrieben oder zur Vertragsdurchführung erforderlich.
                    </p>
                    <p>
                      (4) Detaillierte Informationen zum Datenschutz finden Sie in unserer separaten{' '}
                      <a
                        href='/datenschutz'
                        className='text-brand-gold hover:underline transition duration-200 ease-out'
                      >
                        Datenschutzerklärung
                      </a>
                      .
                    </p>
                  </div>
                </section>

                {/* § 9 Schlussbestimmungen */}
                <section id='section-9' className='scroll-mt-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold mb-8'>
                    § 9 Schlussbestimmungen
                  </h2>
                  <div className='space-y-8 text-brand-lightGray leading-relaxed'>
                    <p>
                      (1) Ausschließlicher Gerichtsstand für alle Streitigkeiten aus und im
                      Zusammenhang mit diesem Vertrag ist München, sofern der Kunde Kaufmann,
                      juristische Person des öffentlichen Rechts oder öffentlich-rechtliches
                      Sondervermögen ist.
                    </p>
                    <p>
                      (2) Es gilt ausschließlich das Recht der Bundesrepublik Deutschland unter
                      Ausschluss des UN-Kaufrechts.
                    </p>
                    <p>
                      (3) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden,
                      berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. Anstelle der
                      unwirksamen Bestimmung gilt eine wirksame Regelung als vereinbart, die dem
                      wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
                    </p>
                    <p>
                      (4) Änderungen und Ergänzungen dieser AGB bedürfen der Schriftform. Dies gilt
                      auch für die Änderung dieser Schriftformklausel.
                    </p>
                    <p>(5) Mündliche Nebenabreden bestehen nicht.</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 bg-[var(--brand-gold)] text-black p-4 rounded-xl shadow-lg hover:bg-[var(--brand-gold-hover)] transition-all duration-200 z-50'
          aria-label='Zurück nach oben'
        >
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
    </PageBackground>
  );
};

export default LegalPage;
