// ============================================
// COMPONENT: PreFooterBookingCTA
// ============================================
// PURPOSE: Final booking call-to-action section above footer with animated breathing chrome glow effect

import React, { useState } from 'react';
import { User, Mail, Palette, Calendar, Clock, Lightbulb } from 'lucide-react';
import './PreFooterBookingCTA.css';

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
  selectedArtist?: string;
  selectedService?: string;
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
        backgroundImage: 'url(/images/tattoo-card-bg.jpg)', // FIXED: Use existing background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-[rgba(26,26,26,0.85)] z-0' />

      {/* Animated background accent */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(212,175,55,0.05)] to-transparent z-0 opacity-50' />

      {/* Content */}
      <div className='relative z-10 max-w-[920px] mx-auto px-8 md:px-8'>
        {/* Heading */}
        <div className='text-center mb-16 md:mb-16'>
          <h2 className='font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-8 md:mb-8'>
            Bereit für Ihr Meisterwerk?
          </h2>
          <p className='font-inter text-lg md:text-xl lg:text-2xl text-[#FFFFFF] opacity-90 max-w-[700px] mx-auto'>
            Lassen Sie uns gemeinsam Ihre Vision in ein unvergessliches Kunstwerk verwandeln
          </p>
        </div>

        {/* Booking Form Card with BREATHING CHROME GLOW */}
        <div className='breathing-glow relative bg-[rgba(15,15,15,0.75)] backdrop-blur-xl rounded-2xl p-8 md:p-8 lg:p-16 ring-1 ring-[rgba(192,192,192,0.25)]'>
          <h3 className='font-playfair text-2xl md:text-3xl font-semibold text-[#D4AF37] text-center mb-8'>
            Buchen Sie Ihren Termin
          </h3>

          <form onSubmit={handleSubmit} className='space-y-8'>
            {/* Row 1: Name + Email */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* Name Input */}
              <div className='flex flex-col gap-8 h-full'>
                <label
                  htmlFor='name'
                  className='flex items-center gap-8 font-inter text-sm font-medium text-[#D4AF37] mb-8'
                >
                  <User className='w-4 h-4' />
                  Ihr Name
                </label>
                <input
                  id='name'
                  type='text'
                  placeholder='Wie sollen wir Sie nennen?'
                  required
                  className='w-full h-12 px-8 bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] rounded-lg text-[#FFFFFF] placeholder:text-[#666666] font-inter text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] hover:border-[rgba(212,175,55,0.45)] transition-all duration-300 flex flex-col h-full'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Email Input */}
              <div className='flex flex-col gap-8 h-full'>
                <label
                  htmlFor='email'
                  className='flex items-center gap-8 font-inter text-sm font-medium text-[#D4AF37] mb-8'
                >
                  <Mail className='w-4 h-4' />
                  E-Mail Adresse
                </label>
                <input
                  id='email'
                  type='email'
                  placeholder='ihre.email@beispiel.de'
                  required
                  className='w-full h-12 px-8 bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] rounded-lg text-[#FFFFFF] placeholder:text-[#666666] font-inter text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] hover:border-[rgba(212,175,55,0.45)] transition-all duration-300 flex flex-col h-full'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Row 2: Service Dropdown (full width) */}
            <div className='flex flex-col gap-8 h-full'>
              <label
                htmlFor='service'
                className='flex items-center gap-8 font-inter text-sm font-medium text-[#D4AF37] mb-8'
              >
                <Palette className='w-4 h-4' />
                Gewünschter Service
              </label>
              <select
                id='service'
                required
                className='w-full h-12 px-8 bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] rounded-lg text-[#FFFFFF] font-inter text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] hover:border-[rgba(212,175,55,0.45)] transition-all duration-300'
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

            {/* Row 3: Preferred Date + Time */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* Preferred Date */}
              <div className='flex flex-col gap-8 h-full'>
                <label
                  htmlFor='date'
                  className='flex items-center gap-8 font-inter text-sm font-medium text-[#D4AF37] mb-8'
                >
                  <Calendar className='w-4 h-4' />
                  Wunschtermin
                </label>
                <input
                  id='date'
                  type='date'
                  required
                  className='w-full h-12 px-8 bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] rounded-lg text-[#FFFFFF] font-inter text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] hover:border-[rgba(212,175,55,0.45)] transition-all duration-300 flex flex-col h-full'
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                />
              </div>

              {/* Preferred Time */}
              <div className='flex flex-col gap-8 h-full'>
                <label
                  htmlFor='time'
                  className='flex items-center gap-8 font-inter text-sm font-medium text-[#D4AF37] mb-8'
                >
                  <Clock className='w-4 h-4' />
                  Uhrzeit
                </label>
                <input
                  id='time'
                  type='time'
                  required
                  className='w-full h-12 px-8 bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] rounded-lg text-[#FFFFFF] font-inter text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] hover:border-[rgba(212,175,55,0.45)] transition-all duration-300 flex flex-col h-full'
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                />
              </div>
            </div>

            {/* Row 4: Vision/Idea Textarea (optional) */}
            <div className='flex flex-col gap-8 h-full'>
              <label
                htmlFor='vision'
                className='flex items-center gap-8 font-inter text-sm font-medium text-[#D4AF37] mb-8'
              >
                <Lightbulb className='w-4 h-4' />
                Ihre Vision (optional)
              </label>
              <textarea
                id='vision'
                placeholder='Beschreiben Sie Ihre Tattoo-Idee...'
                rows={4}
                className='w-full px-8 py-8 bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] rounded-lg text-[#FFFFFF] placeholder:text-[#666666] font-inter text-base focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] hover:border-[rgba(212,175,55,0.45)] transition-all duration-300 resize-none'
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              />
            </div>

            {/* Privacy Consent */}
            <div className='flex items-start gap-8'>
              <input
                id='privacy'
                type='checkbox'
                required
                className='mt-0 w-5 h-5 rounded border-[rgba(192,192,192,0.3)] bg-[rgba(26,26,26,0.9)] text-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-0'
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
                  className='text-[#D4AF37] underline hover:text-[#FFFFFF] transition-colors transition duration-200 ease-out'
                >
                  Datenschutzerklärung
                </a>{' '}
                zu.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full h-14 bg-[#D4AF37] text-[#1A1A1A] font-inter font-semibold text-lg rounded-xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[rgba(212,175,55,0.25)] transition-all duration-300'
              style={{
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
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PreFooterBookingCTA;
