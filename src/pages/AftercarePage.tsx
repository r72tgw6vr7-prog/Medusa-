// ============================================
// PAGE: AftercarePage
// ============================================
// Comprehensive tattoo aftercare guide with healing timeline, tips, products, and warnings

import React, { useState } from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { PageHeader } from '../components/ui/PageHeader';
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

export const AftercarePage: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [language] = useState<'de' | 'en'>('de');

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
    <div className='min-h-screen bg-deep-black'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      {/* Page Header - Matches Services page exactly */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-[1104px] flex flex-col gap-16'>
            <div className='text-center'>
              <PageHeader
                eyebrow="Medusa München"
                title="Tattoo Nachsorge"
                subtitle="Ihr Leitfaden für perfekte Heilung und langanhaltende Schönheit"
                alignment="center"
              />
              <div className='flex items-center justify-center gap-8 text-white/70 -mt-8'>
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
          <div className='mx-auto w-full max-w-[1104px]'>
            <div className='text-center space-y-8 mb-16'>
              <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
                Prozess
              </p>
              <h2 className='font-headline text-3xl md:text-4xl text-[var(--brand-gold)]'>
                Heilungsphasen
              </h2>
            </div>

            <div className='relative'>
              {/* Gold connecting line */}
              <div
                className='absolute left-8 top-0 bottom-0 w-0.5 hidden md:block'
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, var(--brand-gold) 10%, var(--brand-gold) 90%, transparent)',
                }}
              />

              {AFTERCARE_PHASES.map((phase, index) => (
                <div key={phase.id} className='relative md:pl-24 pb-16 last:pb-0'>
                  {/* Phase icon */}
                  <div className='md:absolute md:left-0 w-14 h-14 bg-[var(--brand-gold)] rounded-full flex items-center justify-center text-black mb-8 md:mb-0 mx-auto md:mx-0'>
                    <span className='hidden md:block font-bold text-xl'>{index + 1}</span>
                    <span className='md:hidden'>{phaseIcons[index]}</span>
                  </div>

                  {/* Phase content */}
                  <div className='rounded-3xl border-2 border-white/10 bg-[#222222] p-8 hover:border-[var(--brand-gold)]/50 transition-all duration-200'>
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-0'>
                    <div>
                      <span className='inline-block bg-brand-gold/10 text-brand-gold px-0 py-0 rounded-full text-xs font-bold mb-0'>
                        {phase.day}
                      </span>
                      <h3 className="font-headline text-2xl text-brand-gold">
                        {phase.title[language]}
                      </h3>
                    </div>
                    <span className='text-[#C0C0C0] text-sm flex items-center gap-0'>
                      <Clock size={16} />
                      {phase.duration}
                    </span>
                  </div>

                  <p className='text-white/80 mb-8 leading-relaxed'>
                    {phase.description[language]}
                  </p>

                  <button
                    onClick={() => togglePhase(phase.id)}
                    className='text-brand-gold hover:text-brand-gold-hover font-medium flex items-center gap-0 transition-colors duration-200 ease-out'
                    aria-expanded={activePhase === phase.id ? 'true' : 'false'}
                    aria-controls={`phase-details-${phase.id}`}
                  >
                    {activePhase === phase.id ? 'Weniger anzeigen' : 'Details anzeigen'}
                    <span className='text-lg'>{activePhase === phase.id ? '↑' : '→'}</span>
                  </button>

                  {activePhase === phase.id && (
                    <div
                      id={`phase-details-${phase.id}`}
                      className='mt-8 space-y-8 border-t border-[#C0C0C0]/20 pt-8'
                    >
                      <div>
                        <h4 className='text-brand-gold font-bold mb-0 flex items-center gap-0'>
                          <CheckCircle size={20} />
                          Anweisungen:
                        </h4>
                        <ul className='space-y-0'>
                          {phase.instructions.map((instruction, i) => (
                            <li key={i} className='flex items-start gap-0 text-white/80'>
                              <span className='text-brand-gold shrink-0 mt-0'>•</span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {phase.warnings.length > 0 && (
                        <div>
                          <h4 className='text-red-400 font-bold mb-0 flex items-center gap-0'>
                            <AlertTriangle size={20} />
                            Warnungen:
                          </h4>
                          <ul className='space-y-0'>
                            {phase.warnings.map((warning, i) => (
                              <li key={i} className='flex items-start gap-0 text-white/80'>
                                <span className='text-red-400 shrink-0'>⚠️</span>
                                <span>{warning}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Do's & Don'ts Section - Container → Section → Grid → Cards */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-[1104px]'>
            <div className='text-center space-y-8 mb-16'>
              <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
                Anleitung
              </p>
              <h2 className='font-headline text-3xl md:text-4xl text-[var(--brand-gold)]'>
                Do's & Don'ts
              </h2>
            </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* DO's */}
            <div>
              <h3 className="font-headline text-2xl text-green-400 mb-8 flex items-center gap-0">
                <div className='w-10 rounded-full bg-green-400/20 flex items-center justify-center h-10 flex-col h-full'>
                  <CheckCircle size={24} />
                </div>
                Was Sie TUN sollten
              </h3>
              <div className='space-y-8'>
                {AFTERCARE_TIPS.filter((tip) => tip.category === 'do').map((tip) => (
                  <div
                    key={tip.id}
                    className={`bg-white/5 border rounded-lg p-4 transition-all duration-300 ${
                      tip.critical
                        ? 'border-[var(--brand-gold)] shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                        : 'border-green-400/30 hover:border-green-400/50'
                    }`}
                  >
                    <div className='flex items-start gap-0'>
                      <span className='text-2xl shrink-0'>{tip.icon}</span>
                      <div className='flex-1'>
                        <p className='text-white/90'>{tip.text[language]}</p>
                        {tip.critical && (
                          <span className='inline-block mt-0 text-xs text-[var(--brand-gold)] font-bold'>
                            WICHTIG
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DON'Ts */}
            <div>
              <h3 className="font-headline text-2xl text-red-400 mb-8 flex items-center gap-0">
                <div className='w-10 rounded-full bg-red-400/20 flex items-center justify-center flex-col h-10 h-full'>
                  <span className='text-3xl leading-none'>✕</span>
                </div>
                Was Sie NICHT tun sollten
              </h3>
              <div className='space-y-8'>
                {AFTERCARE_TIPS.filter((tip) => tip.category === 'dont').map((tip) => (
                  <div
                    key={tip.id}
                    className={`bg-white/5 border rounded-lg p-4 transition-all duration-300 ${
                      tip.critical
                        ? 'border-[var(--brand-gold)] shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                        : 'border-red-400/30 hover:border-red-400/50'
                    }`}
                  >
                    <div className='flex items-start gap-0'>
                      <span className='text-2xl shrink-0'>{tip.icon}</span>
                      <div className='flex-1'>
                        <p className='text-white/90'>{tip.text[language]}</p>
                        {tip.critical && (
                          <span className='inline-block mt-0 text-xs text-[var(--brand-gold)] font-bold'>
                            WICHTIG
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
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
          <div className='mx-auto w-full max-w-[1104px]'>
            <div className='text-center space-y-8 mb-16'>
              <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
                Produkte
              </p>
              <h2 className='font-headline text-3xl md:text-4xl text-[var(--brand-gold)]'>
                Empfohlene Produkte
              </h2>
            </div>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8'>
            {AFTERCARE_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className={`bg-white/5 border rounded-xl p-6 hover:border-[var(--brand-gold-hover)]/40 transition-all duration-300 flex flex-col ${
                  product.recommended ? 'border-[var(--brand-gold)]/30' : 'border-white/10'
                }`}
              >
                {product.recommended && (
                  <div className='bg-(--brand-gold) text-black px-0 py-0 rounded-full text-xs font-bold mb-8 self-start flex flex-col h-full'>
                    Empfohlen
                  </div>
                )}

                <h3 className='font-bold text-white mb-0'>{product.name}</h3>
                <p className='text-[#C0C0C0] text-sm mb-0 capitalize'>{product.category}</p>
                <p className='text-white/70 text-sm mb-8 flex-1'>{product.description[language]}</p>

                {product.price && <p className='text-(--brand-gold) font-bold mb-8'>{product.price}</p>}

                {product.link && (
                  <a
                    href={product.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-(--brand-gold) hover:text-(--brand-gold-hover) text-sm font-medium transition-colors duration-200 ease-out'
                  >
                    Mehr erfahren →
                  </a>
                )}
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Warning Signs Section */}
      <section className='py-16 px-8 sm:px-8 lg:px-8 bg-red-500/10'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-red-500/20 border-2 border-red-500 rounded-xl p-8'>
            <h2 className="font-sans text-3xl text-red-400 mb-8 flex items-center gap-0">
              <AlertTriangle size={36} />
              Warnzeichen
            </h2>

            <p className='text-white mb-8 text-lg'>{WARNING_SIGNS.description[language]}</p>

            <ul className='space-y-0 mb-8'>
              {WARNING_SIGNS.signs.map((sign, index) => (
                <li key={index} className='flex items-start gap-0 text-white'>
                  <span className='text-red-400 shrink-0 mt-0'>⚠️</span>
                  <span>{sign[language]}</span>
                </li>
              ))}
            </ul>

            <div className='bg-black/30 rounded-lg p-8 border border-red-400/30'>
              <p className='text-(--brand-gold) font-bold mb-0 flex items-center gap-0'>
                <Phone size={20} />
                Notfallkontakt:
              </p>
              <a
                href='tel:+4989269313'
                className='text-white text-2xl md:text-3xl font-bold hover:text-[var(--brand-gold-hover)] transition-colors block transition duration-200 ease-out'
              >
                +49 (0) 89 269 313
              </a>
              <p className='text-white/60 text-sm mt-0'>Mo-Fr: 11:30-18:30, Sa: 11:00-18:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='section-padding relative z-10'>
        <div className='responsive-container safe-area-padding'>
          <div className='mx-auto w-full max-w-[1104px]'>
            <div className='text-center space-y-8'>
              <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
                Unterstützung
              </p>
              <h2 className='font-headline text-3xl md:text-4xl text-[var(--brand-gold)]'>
                Noch Fragen?
              </h2>
              <p className='text-base text-white/70 max-w-2xl mx-auto font-body leading-relaxed mb-16'>
                Unser Team steht Ihnen jederzeit zur Verfügung. Kontaktieren Sie uns bei Fragen zur
                Nachsorge.
              </p>
              <div className='flex flex-col sm:flex-row gap-8 justify-center'>
                <a
                  href='/contact'
                  className='inline-flex items-center justify-center px-8 py-4 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-black font-semibold text-lg rounded-xl transition-all duration-200 min-w-[200px]'
                >
                  Kontaktieren Sie uns
                </a>
                <a
                  href='/booking'
                  className='inline-flex items-center justify-center gap-8 px-8 py-4 border-2 border-[var(--brand-gold)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-black font-semibold text-lg rounded-xl transition-all duration-200 min-w-[200px]'
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
