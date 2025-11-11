// ============================================
// PAGE: AftercarePage
// ============================================
// Comprehensive tattoo aftercare guide with healing timeline, tips, products, and warnings

import React, { useState } from 'react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { PageHeader } from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import {
  CheckCircle,

export const AftercarePage: React.FC = () => {
  return (
    <div className='min-h-screen bg-deep-black text-white'>
      <MainNavigation />
      <Section bg='none' style={{ paddingTop: 'var(--first-section-offset)' }}>
        <div className='mx-auto w-full max-w-[1104px]'>
          <PageHeader
            eyebrow='Medusa München'
            title='Tattoo Nachsorge'
            subtitle='Ihr Leitfaden für perfekte Heilung und langanhaltende Schönheit'
            alignment='center'
          />
        </div>
      </Section>
            </div>
          </div>
        </div>
      </Section>

      {/* Warning Signs Section */}
      <Section bg='none' className='bg-red-500/10'>
        <div className='max-w-4xl mx-auto'>
          <div className='bg-red-500/20 border-2 border-red-500 rounded-xl p-8'>
            <h2 className='font-sans text-3xl text-red-400 mb-8 flex items-center gap-4'>
              <AlertTriangle size={36} />
              Warnzeichen
            </h2>

            <p className='text-white mb-8 text-lg'>{WARNING_SIGNS.description[language]}</p>

            <ul className='space-y-4 mb-8'>
              {WARNING_SIGNS.signs.map((sign, index) => (
                <li key={index} className='flex items-start gap-3 text-white'>
                  <span className='text-red-400 shrink-0 mt-1'>⚠️</span>
                  <span>{sign[language]}</span>
                </li>
              ))}
            </ul>

            <div className='bg-black/30 rounded-lg p-8 border border-red-400/30'>
              <p className='text-[var(--brand-gold)] font-bold mb-0 flex items-center gap-0'>
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
      </Section>

      {/* CTA Section */}
      <Section bg='none'>
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
                  className='inline-flex items-center justify-center px-8 py-8 bg-[var(--brand-gold)] hover:bg-[var(--brand-gold-hover)] text-black font-semibold text-lg rounded-xl transition-all duration-200 min-w-[200px]'
                >
                  Kontaktieren Sie uns
                </a>
                <a
                  href='/booking'
                  className='inline-flex items-center justify-center gap-8 px-8 py-8 border-2 border-[var(--brand-gold)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-black font-semibold text-lg rounded-xl transition-all duration-200 min-w-[200px]'
                >
                  <Calendar size={20} />
                  Termin buchen
                </a>
              </div>
            </div>
          </div>
        </Section>

      <Footer />
    </div>
  );
};

export default AftercarePage;
