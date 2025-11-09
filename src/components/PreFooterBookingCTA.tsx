// ============================================
// COMPONENT: PreFooterBookingCTA
// ============================================
// PURPOSE: Final booking call-to-action section above footer with animated breathing chrome glow effect

import React, { useState, ChangeEvent } from 'react';
import { User, Mail, Palette, Calendar, Clock, Lightbulb } from 'lucide-react';
import Button from './atoms/Button/Button';
import styles from './PreFooterBookingCTA.module.css';
import { MedusaInput } from './ui/input/MedusaInput';

interface BookingFormData {
  name: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  vision: string;
  privacyConsent: boolean;
  artist?: string;
}

interface PreFooterBookingCTAProps {
  readonly selectedArtist?: string;
  readonly selectedService?: string;
}

export function PreFooterBookingCTA({ selectedArtist, selectedService }: PreFooterBookingCTAProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    artist: selectedArtist || '',
    name: '',
    email: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    vision: '',
    privacyConsent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Buchungsanfrage erfolgreich gesendet!');
      setFormData({
        name: '',
        email: '',
        service: '',
        preferredDate: '',
        preferredTime: '',
        vision: '',
        privacyConsent: false,
        artist: '',
      });
    } catch (error) {
      console.error('Failed to send booking:', error);
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  };

  return (
    <section
      className='pre-footer-booking-cta relative w-full py-24 md:py-24 lg:py-32 overflow-hidden'
      style={{
        backgroundImage: 'url(/assets/images/photos/backgrounds/tattoo-card-bg.webp)', // Updated to new asset path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-[rgba(26,26,26,0.85)] z-auto' />

      {/* Animated background accent */}
      <div className='absolute inset-0 bg-linear-to-b from-transparent via-[rgba(212,175,55,0.05)] to-transparent z-auto opacity-50' />

      {/* Content */}
      <div className='relative z-10 max-w-[920px] mx-auto px-8 md:px-8'>
        {/* Heading */}
        <div className='text-center mb-16 md:mb-16'>
          <h2 className='font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--brand-gold)] mb-8 md:mb-8'>
            Bereit für Ihr Meisterwerk?
          </h2>
          <p className='font-inter text-lg md:text-xl lg:text-2xl text-[#FFFFFF] opacity-90 max-w-[700px] mx-auto'>
            Lassen Sie uns gemeinsam Ihre Vision in ein unvergessliches Kunstwerk verwandeln
          </p>
        </div>

        {/* Booking Form Card with BREATHING CHROME GLOW */}
        <div
          className={`${styles['breathing-glow']} relative bg-[rgba(15,15,15,0.75)] backdrop-blur-xl rounded-2xl p-8 md:p-8 lg:p-16 ring-1 ring-[rgba(192,192,192,0.25)]`}
        >
          <h3 className='font-playfair text-2xl md:text-3xl font-semibold text-[var(--brand-gold)] text-center mb-8'>
            Buchen Sie Ihren Termin
          </h3>

          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Row 1: Name + Email */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* Name Input */}
              <div className='flex flex-col gap-8 h-full'>
                <MedusaInput
                  id='name'
                  label='Ihr Name'
                  type='text'
                  placeholder='Wie sollen wir Sie nennen?'
                  required
                  leftIcon={<User className='w-4 h-4' />}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email Input */}
              <div className='flex flex-col gap-8 h-full'>
                <MedusaInput
                  id='email'
                  label='E-Mail Adresse'
                  type='email'
                  placeholder='ihre.email@beispiel.de'
                  required
                  leftIcon={<Mail className='w-4 h-4' />}
                  value={formData.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Row 2: Service Dropdown (full width) */}
            <div className='flex flex-col gap-8 h-full'>
              <div className='relative'>
                <label
                  htmlFor='service'
                  className='flex items-center gap-0 text-[15px] font-medium text-white/90 mb-0.5'
                >
                  <Palette className='w-4 h-4 text-[var(--brand-gold)]' />
                  Gewünschter Service
                </label>
                <select
                  id='service'
                  required
                  className='w-full min-h-[40px] px-8 py-0 bg-[rgba(34,34,34,0.8)] border border-[rgba(192,192,192,0.3)] rounded-md text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[var(--brand-gold)] focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] hover:border-[var(--brand-gold)]/50 transition duration-200 ease-out'
                  value={formData.service || selectedService || ''}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value='' disabled>
                    Service auswählen...
                  </option>
                  <option value='custom-tattoo'>Individuelles Tattoo</option>
                  <option value='cover-up'>Cover-Up</option>
                  <option value='piercing'>Piercing</option>
                  <option value='plasma-removal'>Tattoo-Entfernung</option>
                  <option value='consultation'>Kostenlose Beratung</option>
                </select>
              </div>
            </div>

            {/* Row 3: Preferred Date + Time */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* Preferred Date */}
              <div className='flex flex-col gap-8 h-full'>
                <MedusaInput
                  id='date'
                  label='Wunschtermin'
                  type='date'
                  required
                  leftIcon={<Calendar className='w-4 h-4' />}
                  value={formData.preferredDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, preferredDate: e.target.value })
                  }
                />
              </div>

              {/* Preferred Time */}
              <div className='flex flex-col gap-8 h-full'>
                <MedusaInput
                  id='time'
                  label='Uhrzeit'
                  type='time'
                  required
                  leftIcon={<Clock className='w-4 h-4' />}
                  value={formData.preferredTime}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, preferredTime: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Row 4: Vision/Idea Textarea (optional) */}
            <div className='flex flex-col gap-8 h-full'>
              <div className='relative'>
                <label
                  htmlFor='vision'
                  className='flex items-center gap-0 text-[15px] font-medium text-white/90 mb-0.5'
                >
                  <Lightbulb className='w-4 h-4 text-[var(--brand-gold)]' />
                  Ihre Vision (optional)
                </label>
                <textarea
                  id='vision'
                  placeholder='Beschreiben Sie Ihre Tattoo-Idee...'
                  rows={4}
                  className='w-full px-8 py-0.5 bg-[rgba(34,34,34,0.8)] border border-[rgba(192,192,192,0.3)] rounded-md text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[var(--brand-gold)] focus:shadow-[0_0_10px_rgba(212,175,55,0.2)] hover:border-[var(--brand-gold)]/50 resize-none transition duration-200 ease-out'
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                />
              </div>
            </div>
            {/* Privacy Consent */}
            <div className='flex items-start gap-8'>
              <input
                id='privacy'
                type='checkbox'
                required
                className='mt-0 w-5 h-5 rounded border-[rgba(192,192,192,0.3)] bg-[rgba(26,26,26,0.9)] text-[var(--brand-gold)] focus:ring-2 focus:ring-[var(--brand-gold)] focus:ring-offset-0'
                checked={formData.privacyConsent}
                onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
              />
              <label
                htmlFor='privacy'
                className='font-inter text-xs text-[#888888] leading-relaxed'
              >
                Mit dem Absenden stimmen Sie unserer{' '}
                <a
                  href='/datenschutz'
                  className='text-[var(--brand-gold)] underline hover:text-[#FFFFFF] transition-colors transition duration-200 ease-out'
                >
                  Datenschutzerklärung
                </a>{' '}
                zu.
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type='submit'
              variant='primary'
              className='w-full h-14 text-lg rounded-xl'
              style={{
                backgroundColor: 'var(--brand-gold)',
                color: '#1A1A1A',
                boxShadow: '0 0 24px rgba(212,175,55,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 32px rgba(212,175,55,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 24px rgba(212,175,55,0.4)';
              }}
            >
              Jetzt Termin sichern →
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PreFooterBookingCTA;
