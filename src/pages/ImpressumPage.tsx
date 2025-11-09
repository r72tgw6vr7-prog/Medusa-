import React from 'react';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import { PageHeader } from '@/components/ui/PageHeader';

interface ImpressumPageProps {
  language?: 'DE' | 'EN';
}

export const ImpressumPage: React.FC<ImpressumPageProps> = ({ language = 'DE' }) => {
  const content = {
    DE: {
      title: 'Impressum',
      subtitle: 'Medusa Tattoo & Piercing Studio - Rechtliche Angaben',
      sections: {
        tmg: {
          title: 'Angaben gemäß § 5 TMG',
          content: [
            'Stargate GmbH',
            'Handelsname: Medusa Tattoo & Piercing Studio',
            'Studio-Adresse: Altheimer Eck 11',
            '80331 München',
            'Deutschland',
            '',
            'Eingetragener Firmensitz:',
            'Proviantstraße 5a',
            '85049 Ingolstadt',
            'Deutschland',
          ],
        },
        contact: {
          title: 'Kontakt',
          content: [
            'Telefon München: 089 910994',
            'Telefon Ingolstadt: 0841 910994',
            'E-Mail: Medusa@in-tattoo.de',
            'Website: www.medusa-tattoo.de',
            '',
            'Ansprechpartner: Oliver Loichinger',
            'E-Mail: oliver@in-tattoo.de',
          ],
        },
        registration: {
          title: 'Handelsregister und Umsatzsteuer-ID',
          content: [
            'Handelsregisternummer: 12052245',
            'Umsatzsteuer-Identifikationsnummer: DE 206 350 700',
            'Verantwortliche Person: Oliver Loichinger',
            'Amtsgericht Ingolstadt',
          ],
        },
        responsible: {
          title: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
          content: ['Oliver Loichinger', 'Stargate GmbH', 'Altheimer Eck 11', '80331 München'],
        },
        copyright: {
          title: 'Urheberrecht',
          content: [
            '© 2025 Stargate GmbH - Medusa Tattoo & Piercing Studio. Alle Rechte vorbehalten.',
          ],
        },
      },
    },
    EN: {
      title: 'Legal Notice',
      subtitle: 'Medusa Tattoo & Piercing Studio - Legal Information',
      sections: {
        tmg: {
          title: 'Information according to § 5 TMG',
          content: [
            'Stargate GmbH',
            'Trading name: Medusa Tattoo & Piercing Studio',
            'Studio address: Altheimer Eck 11',
            '80331 Munich',
            'Germany',
            '',
            'Registered office:',
            'Proviantstraße 5a',
            '85049 Ingolstadt',
            'Germany',
          ],
        },
        contact: {
          title: 'Contact',
          content: [
            'Phone Munich: +49 89 910994',
            'Phone Ingolstadt: +49 841 910994',
            'Email: Medusa@in-tattoo.de',
            'Website: www.medusa-tattoo.de',
            '',
            'Contact person: Oliver Loichinger',
            'Email: oliver@in-tattoo.de',
          ],
        },
        registration: {
          title: 'Commercial Register and VAT ID',
          content: [
            'Commercial register number: 12052245',
            'VAT identification number: DE 206 350 700',
            'Responsible person: Oliver Loichinger',
            'Local court Ingolstadt',
          ],
        },
        responsible: {
          title: 'Responsible for content according to § 55 para. 2 RStV',
          content: ['Oliver Loichinger', 'Stargate GmbH', 'Altheimer Eck 11', '80331 Munich'],
        },
        copyright: {
          title: 'Copyright',
          content: [
            '© 2025 Stargate GmbH - Medusa Tattoo & Piercing Studio. All rights reserved.',
          ],
        },
      },
    },
  };

  const t = content[language];
  return (
    <div className='min-h-screen bg-brand-background text-brand-white flex flex-col'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      <main className='flex-1'>
        <section className='section-padding relative z-10'>
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-[1104px]'>
              {/* Page Header - Matches Services page exactly */}
              <PageHeader
                eyebrow='Medusa München'
                title={t.title}
                subtitle={t.subtitle}
                alignment='center'
              />

              <div className='space-y-16'>
                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>{t.sections.tmg.title}</h2>
                  <div className='space-y-0 text-brand-white/85'>
                    {t.sections.tmg.content.map((line, index) => (
                      <p
                        key={index}
                        className={
                          line === ''
                            ? 'pb-2'
                            : line.includes('Stargate GmbH')
                              ? 'font-semibold'
                              : ''
                        }
                      >
                        {line || '\u00A0'}
                      </p>
                    ))}
                  </div>
                </section>

                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>
                    {t.sections.contact.title}
                  </h2>
                  <div className='space-y-0 text-brand-white/85'>
                    {t.sections.contact.content.map((line, index) => (
                      <p key={index} className={line === '' ? 'pb-2' : ''}>
                        {line || '\u00A0'}
                      </p>
                    ))}
                  </div>
                </section>

                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>
                    {t.sections.registration.title}
                  </h2>
                  <div className='space-y-0 text-brand-white/85'>
                    {t.sections.registration.content.map((line, index) => (
                      <p
                        key={index}
                        className={
                          line.includes('Amtsgericht') || line.includes('Local court')
                            ? 'text-sm text-white/60'
                            : ''
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </section>

                <section className='space-y-8'>
                  <h2 className='text-2xl font-semibold text-brand-gold'>
                    {t.sections.responsible.title}
                  </h2>
                  <div className='space-y-0 text-brand-white/85'>
                    {t.sections.responsible.content.map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
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
                  <h2 className='text-2xl font-semibold text-brand-gold'>
                    {t.sections.copyright.title}
                  </h2>
                  <p className='font-semibold text-brand-white/90'>
                    {t.sections.copyright.content[0]}
                  </p>
                  <p className='text-sm text-white/80 leading-relaxed'>
                    {language === 'DE'
                      ? 'Alle auf dieser Website verwendeten Bilder, Texte und grafischen Gestaltungen sind urheberrechtlich geschützt. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.'
                      : 'All images, texts and graphic designs used on this website are protected by copyright. Reproduction, editing, distribution and any kind of use outside the limits of copyright law require the written consent of the respective author or creator.'}
                  </p>
                  <p className='text-sm text-white/80 leading-relaxed'>
                    {language === 'DE'
                      ? 'Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis.'
                      : 'Insofar as the content on this page was not created by the operator, the copyrights of third parties are respected. Should you nevertheless become aware of a copyright infringement, we ask for a corresponding notice.'}
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
