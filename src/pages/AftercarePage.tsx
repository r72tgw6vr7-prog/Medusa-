// ============================================
// PAGE: AftercarePage
// ============================================
// Comprehensive tattoo aftercare guide with healing timeline, tips, products, and warnings

import React, { useState } from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import Footer from '../components/Footer';
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
    <div className='min-h-screen bg-[#222222]'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      {/* Hero Section - Container → Section → Content */}
      <section className='relative section-padding-lg bg-linear-to-b from-[#222222] to-black/50'>
        <div className='responsive-container safe-area-padding'>
          {/* Unified heading section applied: matches ServicesPageInteractive styling */}
          <div className='text-center'>
            <h1 className='typo-h1 text-[#D4AF37]'>Tattoo Nachsorge</h1>
            <p className='typo-subtitle text-[#C0C0C0]'>
              Ihr Leitfaden für perfekte Heilung und langanhaltende Schönheit
            </p>
          </div>
          <div className='mt-8 flex items-center justify-center gap-0 text-[#C0C0C0]'>
            <Clock size={20} />
            <span className='text-sm'>
              Heilungsdauer: 2-4 Wochen oberflächlich, 3-6 Monate vollständig
            </span>
          </div>
        </div>
      </section>

      {/* Healing Timeline Section - Container → Section → List */}
      <section className='section-padding'>
        <div className='responsive-container safe-area-padding'>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#D4AF37] text-center mb-16">
            Heilungsphasen
          </h2>

          <div className='relative'>
            {/* Gold connecting line */}
            <div
              className='absolute left-8 top-0 bottom-0 w-0.5 hidden md:block'
              style={{
                background:
                  'linear-gradient(to bottom, transparent, #D4AF37 10%, #D4AF37 90%, transparent)',
              }}
            />

            {AFTERCARE_PHASES.map((phase, index) => (
              <div key={phase.id} className='relative md:pl-24 pb-16 last:pb-0'>
                {/* Phase icon */}
                <div className='md:absolute md:left-0 w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black mb-8 md:mb-0 mx-auto md:mx-0'>
                  <span className='hidden md:block font-bold text-xl'>{index + 1}</span>
                  <span className='md:hidden'>{phaseIcons[index]}</span>
                </div>

                {/* Phase content */}
                <div className='bg-white/5 border border-[#C0C0C0]/20 rounded-xl p-8 hover:border-[#C19B26]/40 transition-all duration-300'>
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-0'>
                    <div>
                      <span className='inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-0 py-0 rounded-full text-xs font-bold mb-0'>
                        {phase.day}
                      </span>
                      <h3 className="font-['Playfair_Display'] text-2xl text-[#D4AF37]">
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
                    className='text-[#D4AF37] hover:text-[#C19B26] font-medium flex items-center gap-0 transition-colors duration-200 ease-out'
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
                        <h4 className='text-[#D4AF37] font-bold mb-0 flex items-center gap-0'>
                          <CheckCircle size={20} />
                          Anweisungen:
                        </h4>
                        <ul className='space-y-0'>
                          {phase.instructions.map((instruction, i) => (
                            <li key={i} className='flex items-start gap-0 text-white/80'>
                              <span className='text-[#D4AF37] shrink-0 mt-0'>•</span>
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
      </section>

      {/* Do's & Don'ts Section - Container → Section → Grid → Cards */}
      <section className='section-padding bg-black/30'>
        <div className='responsive-container safe-area-padding'>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#D4AF37] text-center mb-16">
            Do's & Don'ts
          </h2>

          <div className='grid md:grid-cols-2 gap-8'>
            {/* DO's */}
            <div>
              <h3 className="font-['Playfair_Display'] text-2xl text-green-400 mb-8 flex items-center gap-0">
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
                        ? 'border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                        : 'border-green-400/30 hover:border-green-400/50'
                    }`}
                  >
                    <div className='flex items-start gap-0'>
                      <span className='text-2xl shrink-0'>{tip.icon}</span>
                      <div className='flex-1'>
                        <p className='text-white/90'>{tip.text[language]}</p>
                        {tip.critical && (
                          <span className='inline-block mt-0 text-xs text-[#D4AF37] font-bold'>
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
              <h3 className="font-['Playfair_Display'] text-2xl text-red-400 mb-8 flex items-center gap-0">
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
                        ? 'border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                        : 'border-red-400/30 hover:border-red-400/50'
                    }`}
                  >
                    <div className='flex items-start gap-0'>
                      <span className='text-2xl shrink-0'>{tip.icon}</span>
                      <div className='flex-1'>
                        <p className='text-white/90'>{tip.text[language]}</p>
                        {tip.critical && (
                          <span className='inline-block mt-0 text-xs text-[#D4AF37] font-bold'>
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
      </section>

      {/* Products Section - Container → Section → Grid → Cards */}
      <section className='section-padding'>
        <div className='responsive-container safe-area-padding'>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#D4AF37] text-center mb-16">
            Empfohlene Produkte
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8'>
            {AFTERCARE_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className={`bg-white/5 border rounded-xl p-6 hover:border-[#C19B26]/40 transition-all duration-300 flex flex-col ${
                  product.recommended ? 'border-[#D4AF37]/30' : 'border-white/10'
                }`}
              >
                {product.recommended && (
                  <div className='bg-[#D4AF37] text-black px-0 py-0 rounded-full text-xs font-bold mb-8 self-start flex flex-col h-full'>
                    Empfohlen
                  </div>
                )}

                <h3 className='font-bold text-white mb-0'>{product.name}</h3>
                <p className='text-[#C0C0C0] text-sm mb-0 capitalize'>{product.category}</p>
                <p className='text-white/70 text-sm mb-8 flex-1'>{product.description[language]}</p>

                {product.price && <p className='text-[#D4AF37] font-bold mb-8'>{product.price}</p>}

                {product.link && (
                  <a
                    href={product.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[#D4AF37] hover:text-[#C19B26] text-sm font-medium transition-colors duration-200 ease-out'
                  >
                    Mehr erfahren →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Signs Section */}
      <section className='py-16 px-8 sm:px-8 lg:px-8 bg-red-500/10'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-red-500/20 border-2 border-red-500 rounded-xl p-8'>
            <h2 className="font-['Playfair_Display'] text-3xl text-red-400 mb-8 flex items-center gap-0">
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
              <p className='text-[#D4AF37] font-bold mb-0 flex items-center gap-0'>
                <Phone size={20} />
                Notfallkontakt:
              </p>
              <a
                href='tel:+4989269313'
                className='text-white text-2xl md:text-3xl font-bold hover:text-[#C19B26] transition-colors block transition duration-200 ease-out'
              >
                +49 (0) 89 269 313
              </a>
              <p className='text-white/60 text-sm mt-0'>Mo-Fr: 11:30-18:30, Sa: 11:00-18:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 px-8 sm:px-8 lg:px-8'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#D4AF37] mb-8">
            Noch Fragen?
          </h2>
          <p className='text-white/80 mb-8 max-w-2xl mx-auto'>
            Unser Team steht Ihnen jederzeit zur Verfügung. Kontaktieren Sie uns bei Fragen zur
            Nachsorge.
          </p>
          <div className='flex flex-col sm:flex-row gap-8 justify-center'>
            <a
              href='/contact'
              className='bg-[#D4AF37] hover:bg-[#C19B26] text-black px-8 py-8 rounded-lg font-bold transition-all duration-300 min-h-11 inline-flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]'
            >
              Kontaktieren Sie uns
            </a>
            <a
              href='/booking'
              className='border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-brand-gold-hover hover:text-black px-8 py-8 rounded-lg font-medium transition-all duration-300 min-h-11 inline-flex items-center justify-center'
            >
              <Calendar size={20} className='mr-0' />
              Termin buchen
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AftercarePage;
