// ============================================
// PAGE: AftercarePage
// ============================================
// Comprehensive tattoo aftercare guide with healing timeline, tips, products, and warnings

import React, { useState } from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { PageHeading } from '../components/PageHeading';
import { SectionHeading } from '../components/SectionHeading';
import { Card } from '@/components/ui/Card';
import {
  CheckCircle,
  AlertTriangle,
  Phone,
  Calendar,
  Droplets,
  Sparkles,
  Shield,
  Check,
  Star,
  Heart,
  Clock,
} from 'lucide-react';
import {
  AFTERCARE_PHASES,
  AFTERCARE_TIPS,
  AFTERCARE_PRODUCTS,
  WARNING_SIGNS,
} from '../data/aftercare';
import { useLanguage } from '@/contexts/LanguageContext';

export const AftercarePage: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const { language } = useLanguage();

  // Phase icons mapping
  const phaseIcons = [
    <Droplets size={28} />,
    <Sparkles size={28} />,
    <Shield size={28} />,
    <Check size={28} />,
    <Star size={28} />,
    <Heart size={28} />,
  ];

  const togglePhase = (phaseId: string) => {
    setActivePhase(activePhase === phaseId ? null : phaseId);
  };

  return (
    <div className='min-h-screen bg-luxury-bg-dark'>
      <MainNavigation />

      {/* Page Header - Matches Services page exactly */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-276 flex flex-col gap-16'>
            <div className='text-center'>
              <PageHeading
                eyebrow='Medusa München'
                title='Tattoo Nachsorge'
                subtitle='Ihr Leitfaden für perfekte Heilung und langanhaltende Schönheit'
              />
              <div className='flex items-center justify-center gap-8 text-luxury-text-inverse/70 -mt-8'>
                <Clock size={20} />
                <span className='text-base'>
                  Heilungsdauer: 2-4 Wochen oberflächlich, 3-6 Monate vollständig
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healing Timeline Section - Container → Section → List */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-276'>
            <div className='mb-16'>
              <SectionHeading eyebrow="Prozess" title="Heilungsphasen" />
            </div>

            <div className='relative'>
              {/* Chrome connecting line */}
              <div
                className='absolute left-8 top-0 bottom-0 w-0.5 hidden md:block'
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, var(--brand-accent) 10%, var(--brand-accent) 90%, transparent)',
                }}
              />

              {AFTERCARE_PHASES.map((phase, index) => (
                <div key={phase.id} className='relative md:pl-24 pb-16 last:pb-0'>
                  {/* Phase icon */}
                  <div className='md:absolute md:left-0 w-14 h-14 bg-(--brand-accent) rounded-full flex items-center justify-center text-luxury-text-primary mb-8 md:mb-0 mx-auto md:mx-0'>
                    <span className='hidden md:block font-bold text-xl'>{index + 1}</span>
                    <span className='md:hidden'>{phaseIcons[index]}</span>
                  </div>

                  {/* Phase content */}
                  <Card variant="default" size="default" asChild>
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-0'>
                      <div>
                        <span className='inline-block bg-brand-accent/10 text-brand-accent px-0 py-0 rounded-full text-sm lg:text-xs font-bold mb-0'>
                          {phase.day}
                        </span>
                        <h3 className='font-headline text-2xl text-brand-accent'>
                          {phase.title[language]}
                        </h3>
                      </div>
                      <span className='text-(--chrome-silver) text-sm flex items-center gap-0'>
                        <Clock size={16} />
                        {phase.duration}
                      </span>
                    </div>

                    <p className='text-luxury-text-inverse/80 mb-8 leading-relaxed'>
                      {phase.description[language]}
                    </p>

                    <button
                      onClick={() => togglePhase(phase.id)}
                      className='text-brand-accent hover:text-brand-accent-hover font-medium flex items-center gap-0 transition-colors duration-200 ease-out'
                      aria-expanded={activePhase === phase.id}
                      aria-controls={`phase-details-${phase.id}`}
                    >
                      {activePhase === phase.id ? 'Weniger anzeigen' : 'Details anzeigen'}
                      <span className='text-lg'>{activePhase === phase.id ? '↑' : '→'}</span>
                    </button>

                    {activePhase === phase.id && (
                      <div
                        id={`phase-details-${phase.id}`}
                        className='mt-8 space-y-8 border-t border-[rgba(var(--color-accent-silver-rgb),0.2)] pt-8'
                      >
                        <div>
                          <h4 className='text-brand-accent font-bold mb-0 flex items-center gap-0'>
                            <CheckCircle size={20} />
                            Anweisungen:
                          </h4>
                          <ul className='space-y-0'>
                            {phase.instructions.map((instruction, i) => (
                              <li key={i} className='flex items-start gap-0 text-luxury-text-inverse/80'>
                                <span className='text-brand-accent shrink-0 mt-0'>•</span>
                                <span>{instruction}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Do's & Don'ts Section - Container → Section → Grid → Cards */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-276'>
            <div className='mb-16'>
              <SectionHeading eyebrow="Anleitung" title="Do's & Don'ts" />
            </div>

            <div className='grid md:grid-cols-2 gap-8'>
              {/* DO's */}
              <div>
                <h3 className='font-headline text-2xl text-green-400 mb-8 flex items-center gap-0'>
                  <div className='w-10 min-h-10 rounded-full bg-green-400/20 flex flex-col h-full items-center justify-center'>
                    <CheckCircle size={24} />
                  </div>
                  Was Sie TUN sollten
                </h3>
                <div className='space-y-8'>
                  {AFTERCARE_TIPS.filter((tip) => tip.category === 'do').map((tip) => (
                    <Card 
                      key={tip.id}
                      variant={tip.critical ? 'featured' : 'default'}
                      size="sm"
                      asChild
                    >
                      <div>
                      <div className='flex items-start gap-0'>
                        <span className='text-2xl shrink-0'>{tip.icon}</span>
                        <div className='flex-1'>
                          <p className='text-luxury-text-inverse/90'>{tip.text[language]}</p>
                          {tip.critical && (
                            <span className='inline-block mt-0 text-sm lg:text-xs text-(--brand-accent) font-bold'>
                              WICHTIG
                            </span>
                          )}
                        </div>
                      </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* DON'Ts */}
              <div>
                <h3 className='font-headline text-2xl text-red-400 mb-8 flex items-center gap-0'>
                  <div className='w-10 min-h-10 rounded-full bg-red-400/20 flex flex-col h-full items-center justify-center'>
                    <span className='text-3xl leading-none'>✕</span>
                  </div>
                  Was Sie NICHT tun sollten
                </h3>
                <div className='space-y-8'>
                  {AFTERCARE_TIPS.filter((tip) => tip.category === 'dont').map((tip) => (
                    <Card 
                      key={tip.id}
                      variant={tip.critical ? 'featured' : 'default'}
                      size="sm"
                      asChild
                    >
                      <div>
                      <div className='flex items-start gap-0'>
                        <span className='text-2xl shrink-0'>{tip.icon}</span>
                        <div className='flex-1'>
                          <p className='text-luxury-text-inverse/90'>{tip.text[language]}</p>
                          {tip.critical && (
                            <span className='inline-block mt-0 text-sm lg:text-xs text-(--brand-accent) font-bold'>
                              WICHTIG
                            </span>
                          )}
                        </div>
                      </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Container → Section → Grid → Cards */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-276'>
            <div className='mb-16'>
              <SectionHeading eyebrow="Produkte" title="Empfohlene Produkte" />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8'>
              {AFTERCARE_PRODUCTS.map((product) => (
                <Card
                  key={product.id}
                  variant={product.recommended ? 'featured' : 'default'}
                  size="default"
                  asChild
                >
                  <div className='flex flex-col'>
                    {product.recommended && (
                      <div className='flex flex-col h-full bg-[var(--brand-accent)] text-luxury-text-primary px-2 py-2 lg:py-(--space-0-5) rounded-full text-sm lg:text-xs font-bold mb-4 self-start'>
                        Empfohlen
                      </div>
                    )}

                    <h3 className='font-bold text-luxury-text-inverse mb-0'>{product.name}</h3>
                    <p className='text-[var(--chrome-silver)] text-sm mb-0 capitalize'>{product.category}</p>
                    <p className='text-luxury-text-inverse/70 text-sm mb-4 flex-1'>
                      {product.description[language]}
                    </p>

                    {product.price && (
                      <p className='text-[var(--brand-accent)] font-bold mb-4'>{product.price}</p>
                    )}

                    {product.link && (
                      <a
                        href={product.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-[var(--brand-accent)] hover:text-[var(--brand-accent-hover)] text-sm font-medium transition-colors duration-200 ease-out'
                      >
                        Mehr erfahren
                      </a>
                    )}
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs Section */}
      <section className='py-16 px-8 sm:px-8 lg:px-8 bg-red-500/10'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-red-500/20 border-2 border-red-500 rounded-xl p-8'>
            <h2 className='font-sans text-3xl text-red-400 mb-8 flex items-center gap-0'>
              <AlertTriangle size={36} />
              Warnzeichen
            </h2>

            <p className='text-luxury-text-inverse mb-8 text-lg'>{WARNING_SIGNS.description[language]}</p>

            <ul className='space-y-0 mb-8'>
              {WARNING_SIGNS.signs.map((sign, index) => (
                <li key={index} className='flex items-start gap-0 text-luxury-text-inverse'>
                  <span className='text-red-400 shrink-0 mt-0'>⚠️</span>
                  <span>{sign[language]}</span>
                </li>
              ))}
            </ul>

            <div className='bg-luxury-bg-dark/30 rounded-lg p-8 border border-red-400/30'>
              <p className='text-(--brand-accent) font-bold mb-0 flex items-center gap-0'>
                <Phone size={20} />
                Notfallkontakt:
              </p>
              <a
                href='tel:+4989269313'
                className='text-luxury-text-inverse text-2xl md:text-3xl font-bold hover:text-(--brand-accent-hover) transition-colors block transition duration-200 ease-out'
              >
                +49 (0) 89 269 313
              </a>
              <p className='text-luxury-text-inverse/60 text-sm mt-0'>Mo-Fr: 11:30-18:30, Sa: 11:00-18:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-276'>
            <div>
              <SectionHeading 
                eyebrow="Unterstützung" 
                title="Noch Fragen?" 
                subtitle="Noch Fragen? Unser Team steht Ihnen jederzeit zur Verfügung. Kontaktieren Sie uns bei Fragen zur Nachsorge."
              />
              <div className='flex flex-col sm:flex-row gap-8 justify-center'>
                <a
                  href='/contact'
                  className='inline-flex items-center justify-center px-8 py-8 bg-(--brand-accent) hover:bg-(--brand-accent-hover) text-luxury-text-primary font-semibold text-lg rounded-xl transition-all duration-200 min-w-50'
                >
                  Kontaktieren Sie uns
                </a>
                <a
                  href='/booking'
                  className='inline-flex items-center justify-center gap-8 px-8 py-8 border-2 border-(--brand-accent) text-(--brand-accent) hover:bg-(--brand-accent) hover:text-luxury-text-primary font-semibold text-lg rounded-xl transition-all duration-200 min-w-50'
                >
                  <Calendar size={20} />
                  Termin buchen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AftercarePage;
