import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Mail } from 'lucide-react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { PageHeader } from '../components/ui/PageHeader';

interface DatenschutzPageProps {
  language?: 'DE' | 'EN';
}

export function DatenschutzPage({ language = 'DE' }: DatenschutzPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const content = {
    DE: {
      title: 'Datenschutzerklärung',
      subtitle: 'Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO',
      lastUpdated: 'Stand: Dezember 2024',
      introduction:
        'Der Schutz Ihrer personenbezogenen Daten hat für uns höchste Priorität. Alle Daten werden ausschließlich in Übereinstimmung mit der Datenschutz-Grundverordnung (DSGVO) und den geltenden deutschen Datenschutzgesetzen verarbeitet. Diese Datenschutzerklärung erklärt, welche Daten wir sammeln, wie wir sie verwenden und welche Rechte Sie haben.',
      definitions: {
        title: 'Begriffserklärungen',
        items: [
          'Personenbezogene Daten: Alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.',
          'Betroffene Person: Die natürliche Person, auf die sich die personenbezogenen Daten beziehen.',
          'Verarbeitung: Jeden Vorgang im Zusammenhang mit personenbezogenen Daten wie Erhebung, Erfassung, Organisation, Ordnung, Speicherung, Anpassung oder Veränderung, Abfrage, Abfragung, Verwendung, Offenlegung durch Übermittlung, Verbreitung oder andere Formen der Bereitstellung, Abgleich oder Verknüpfung, Einschränkung, Löschung oder Vernichtung.',
          'Einwilligung: Jede freiwillig für den bestimmten Fall, in informierter Weise und unmissverständlich abgegebene Willensbekundung in Form einer Erklärung oder einer sonstigen eindeutigen bestätigenden Handlung.',
          'Profiling: Jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte, die sich auf eine natürliche Person beziehen, zu bewerten.',
        ],
      },
      sections: [
        {
          id: 'responsible',
          icon: Shield,
          title: '1. Verantwortlicher für die Datenverarbeitung',
          content: [
            'Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:',
            '',
            'Stargate GmbH',
            'Handelsname: Medusa Tattoo & Piercing Studio',
            'Studio-Adresse: Altheimer Eck 11, 80331 München',
            'Eingetragener Firmensitz: Proviantstraße 5a, 85049 Ingolstadt',
            '',
            'Kontaktdaten:',
            'Telefon München: 089 910994',
            'Telefon Ingolstadt: 0841 910994',
            'E-Mail (Allgemein): Medusa@in-tattoo.de',
            'E-Mail (Datenschutz): oliver@in-tattoo.de',
            '',
            'Handelsregisternummer: 12052245',
            'Umsatzsteuer-ID: DE 206 350 700',
            'Verantwortliche Person: Oliver Loichinger',
            '',
            'Datenschutzbeauftragte/r:',
            'E-Mail: stargate@in-tattoo.de',
          ],
        },
        {
          id: 'contact',
          icon: Mail,
          title: '2. Kontakt für Datenschutzanfragen',
          content: [
            'Für alle Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte stehen wir Ihnen gerne zur Verfügung:',
            '',
            'Datenschutz-Kontakt:',
            'Stargate GmbH',
            'Ansprechpartner: Oliver Loichinger',
            'Adresse: Altheimer Eck 11, 80331 München',
            'Telefon: 089 910994',
            'E-Mail (Datenschutz): stargate@in-tattoo.de',
            'E-Mail (Allgemein): oliver@in-tattoo.de',
          ],
        },
      ],
    },
    EN: {
      title: 'Privacy Policy',
      subtitle: 'Information on the processing of your personal data under GDPR',
      lastUpdated: 'Last updated: December 2024',
      introduction:
        'The protection of your personal data is our highest priority. All data is processed exclusively in accordance with the General Data Protection Regulation (GDPR) and applicable German data protection laws. This privacy policy explains what data we collect, how we use it, and what rights you have.',
      definitions: {
        title: 'Definitions',
        items: [
          'Personal Data: Any information relating to an identified or identifiable natural person.',
          'Data Subject: The natural person to whom the personal data relates.',
          'Processing: Any operation performed on personal data, such as collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.',
          "Consent: Any freely given, specific, informed and unambiguous indication of the data subject's wishes by which he or she, by a statement or by a clear affirmative action, signifies agreement to the processing of personal data.",
          'Profiling: Any form of automated processing of personal data consisting of the use of personal data to evaluate certain personal aspects relating to a natural person.',
        ],
      },
      sections: [
        {
          id: 'responsible',
          icon: Shield,
          title: '1. Controller for Data Processing',
          content: [
            'The controller within the meaning of the General Data Protection Regulation (GDPR) is:',
            '',
            'Stargate GmbH',
            'Trading name: Medusa Tattoo & Piercing Studio',
            'Studio address: Altheimer Eck 11, 80331 Munich',
            'Registered office: Proviantstraße 5a, 85049 Ingolstadt',
            '',
            'Contact details:',
            'Phone Munich: 089 910994',
            'Phone Ingolstadt: 0841 910994',
            'Email (General): Medusa@in-tattoo.de',
            'Email (Privacy): oliver@in-tattoo.de',
            '',
            'Company registration number: 12052245',
            'VAT ID: DE 206 350 700',
            'Responsible person: Oliver Loichinger',
            '',
            'Data Protection Officer:',
            'Email: stargate@in-tattoo.de',
          ],
        },
        {
          id: 'contact',
          icon: Mail,
          title: '2. Contact for Data Protection Inquiries',
          content: [
            'For all questions regarding data protection or to exercise your rights, we are at your disposal:',
            '',
            'Data Protection Contact:',
            'Stargate GmbH',
            'Contact person: Oliver Loichinger',
            'Address: Altheimer Eck 11, 80331 Munich',
            'Phone: 089 910994',
            'Email (Privacy): stargate@in-tattoo.de',
            'Email (General): oliver@in-tattoo.de',
          ],
        },
      ],
    },
  };

  const t = content[language];

  return (
    <div className='min-h-screen bg-brand-background text-brand-white flex flex-col'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      <main className='flex-1'>
        <section
          ref={sectionRef}
          className='section-padding relative z-10'
        >
          <div className='responsive-container safe-area-padding'>
            <div className='mx-auto w-full max-w-[1104px]'>
              {/* Page Header - Standardized */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
                transition={{ duration: 0.8 }}
              >
                <PageHeader
                  eyebrow="Medusa München"
                  title={t.title}
                  subtitle={t.subtitle}
                  alignment="center"
                />
                <p className='text-sm text-white/60 text-center'>{t.lastUpdated}</p>
              </motion.div>

              {/* Introduction */}
              <motion.div
                className='rounded-3xl border-2 border-white/10 bg-[#222222] p-8 mb-8'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <p className='text-base text-white/70 leading-relaxed'>{t.introduction}</p>
              </motion.div>

              {/* Definitions */}
              <motion.div
                className='rounded-3xl border-2 border-white/10 bg-[#222222] p-8 mb-8'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <div className='flex items-center mb-8'>
                  <FileText size={24} className='text-brand-gold mr-0' />
                  <h2 className='text-headline-md font-headline text-brand-gold'>
                    {t.definitions.title}
                  </h2>
                </div>
                <div className='space-y-0'>
                  {t.definitions.items.map((definition, index) => (
                    <p key={index} className='text-body-small font-body text-brand-white'>
                      <strong className='text-brand-gold'>{definition.split(':')[0]}:</strong>
                      {definition.split(':').slice(1).join(':')}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Content Sections */}
              {t.sections.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    className='bg-brand-background/60 backdrop-blur-sm border border-brand-chrome/20 rounded-2xl p-8 mb-8 last:mb-0'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  >
                    <div className='flex items-center mb-8'>
                      <IconComponent size={24} className='text-brand-gold mr-0' />
                      <h2 className='text-headline-md font-headline text-brand-gold'>
                        {section.title}
                      </h2>
                    </div>
                    <div className='space-y-0'>
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className='text-body-small font-body text-brand-white'>
                          {paragraph || <br />}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}

              {/* Contact Actions */}
              <motion.div
                className='mt-16 text-center'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 className='text-headline-md font-headline text-brand-gold mb-8'>
                  {language === 'DE' ? 'Kontakt aufnehmen' : 'Contact Us'}
                </h3>
                <div className='flex flex-wrap justify-center gap-8'>
                  <a
                    href='mailto:stargate@in-tattoo.de'
                    className='bg-brand-gold text-brand-background px-8 py-0 rounded-xl font-body font-bold transition-all duration-300 hover:bg-brand-gold-hover hover:shadow-gold-glow hover:scale-105 active:scale-95'
                  >
                    {language === 'DE' ? 'E-Mail senden' : 'Send Email'}
                  </a>
                  <a
                    href='tel:089910994'
                    className='bg-brand-background border-2 border-brand-chrome/50 hover:border-brand-chrome text-brand-chrome hover:bg-brand-chrome/10 px-8 py-0 rounded-xl font-body font-bold transition-all duration-300 hover:scale-105 active:scale-95'
                  >
                    {language === 'DE' ? 'Anrufen' : 'Call Us'}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DatenschutzPage;
