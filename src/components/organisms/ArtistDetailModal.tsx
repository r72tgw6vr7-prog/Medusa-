// ============================================
// COMPONENT: ArtistDetailModal - World-Class Design
// ============================================
// PURPOSE: Full-screen artist detail view with parallax, biography, and portfolio
// FEATURES: Smooth animations, responsive, brand-compliant

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X, Instagram, Mail, Calendar } from 'lucide-react';

interface ArtistDetailModalProps {
  artist: {
    id: string;
    name: string;
    role: string;
    specialties: string[];
    experience: string;
    imageSrc: string;
    instagramHandle: string;
    imagePosition?: string;
  };
  onClose: () => void;
}

export const ArtistDetailModal: React.FC<ArtistDetailModalProps> = ({ artist, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Lock body scroll and manage focus
  useEffect(() => {
    // store opener focus
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    // initial focus to close button
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = '';
      // restore opener focus
      previousFocusRef.current?.focus?.();
    };
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;
      const focusables = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };
    document.addEventListener('keydown', handleEsc);
    document.addEventListener('keydown', handleTabTrap);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('keydown', handleTabTrap);
    };
  }, [onClose]);

  // Sample portfolio images (would come from data)
  const portfolioImages = [
    `/images/gallery/tattoo-${Math.floor(Math.random() * 24) + 1}.jpg`,
    `/images/gallery/tattoo-${Math.floor(Math.random() * 24) + 1}.jpg`,
    `/images/gallery/tattoo-${Math.floor(Math.random() * 24) + 1}.jpg`,
    `/images/gallery/tattoo-${Math.floor(Math.random() * 24) + 1}.jpg`,
    `/images/gallery/tattoo-${Math.floor(Math.random() * 24) + 1}.jpg`,
    `/images/gallery/tattoo-${Math.floor(Math.random() * 24) + 1}.jpg`,
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className='fixed inset-0 z-50 bg-[var(--deep-black)] overflow-y-auto'
      ref={containerRef}
      role='dialog'
      aria-modal='true'
      aria-labelledby='artist-modal-title'
    >
      {/* Close Button - Fixed */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className='fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-[rgba(26,26,26,0.9)] backdrop-blur-sm flex items-center justify-center hover:bg-brand-gold-hover transition-all duration-300 group'
        style={{ boxShadow: '0 0 20px rgba(192,192,192,0.3)' }}
        aria-label='Close'
        ref={closeBtnRef}
      >
        <X className='w-6 h-6 text-white group-hover:text-[var(--deep-black)] transition-colors transition duration-200 ease-out' />
      </motion.button>

      {/* Hero Section with Parallax */}
      <div className='relative h-screen overflow-hidden' ref={modalRef}>
        {/* Artist Photo - Parallax Background - ULTRA HIGH QUALITY */}
        <motion.div className='absolute inset-0 bg-[#1A1A1A]' style={{ y: imageY }}>
          <div className='w-full h-full relative'>
            <img
              src={artist.imageSrc}
              alt={artist.name}
              className='w-full h-full object-cover object-top'
              loading='lazy'
              decoding='async'
              sizes='100vw'
              style={
                {
                  imageRendering: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  width: '100%',
                  height: '100%',
                } as React.CSSProperties
              }
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
              }}
            />
          </div>
          {/* Gradient Overlays */}
          <div className='absolute inset-0 bg-gradient-to-b from-[var(--deep-black)]/60 via-transparent to-[var(--deep-black)]' />
          <div className='absolute inset-0 bg-gradient-to-r from-[var(--deep-black)]/80 via-transparent to-transparent' />
        </motion.div>

        {/* Hero Content - Parallax Foreground */}
        <motion.div
          className='relative z-10 h-full flex items-end pb-24 md:pb-32'
          style={{ y: contentY, opacity }}
        >
          <div className='max-w-[1104px] mx-auto px-8 md:px-8 w-full'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Role Badge */}
              <div className='inline-flex items-center gap-0 px-8 py-0 bg-[rgba(26,26,26,0.8)] backdrop-blur-sm border border-[var(--brand-gold)]/30 rounded-full mb-8'>
                <span className='w-2 h-2 rounded-full bg-[var(--brand-gold)]' />
                <span className='font-inter text-sm font-medium text-[var(--brand-gold)] uppercase tracking-wider'>
                  {artist.role}
                </span>
              </div>

              {/* Artist Name */}
              <h1
                id='artist-modal-title'
                className='font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-none'
              >
                {artist.name}
              </h1>

              {/* Experience */}
              <div className='flex items-center gap-0 mb-8'>
                <Calendar className='w-5 h-5 text-[var(--brand-gold)]' />
                <span className='font-inter text-lg text-[#C0C0C0]'>
                  {artist.experience} Erfahrung
                </span>
              </div>

              {/* Specialties */}
              <div className='flex flex-wrap gap-0 mb-8'>
                {artist.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className='px-8 py-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-inter text-sm text-white/90'
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className='flex gap-8'>
                <a
                  href={`https://instagram.com/${artist.instagramHandle.replace('@', '')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-0 px-8 py-0 bg-[var(--brand-gold)] text-[var(--deep-black)] rounded-lg font-inter font-semibold hover:bg-[var(--brand-gold-hover)] transition-all duration-300 hover:scale-105'
                >
                  <Instagram className='w-5 h-5' />
                  <span>{artist.instagramHandle}</span>
                </a>
                <a
                  href='/booking'
                  className='flex items-center gap-0 px-8 py-0 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-inter font-semibold hover:bg-white/20 transition-all duration-300'
                >
                  <Mail className='w-5 h-5' />
                  <span>Termin buchen</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className='absolute bottom-8 left-1/2 -translate-x-1/2 z-20'
        >
          <div className='flex flex-col items-center gap-0'>
            <span className='font-inter text-xs text-white/60 uppercase tracking-wider'>
              Scroll für mehr
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className='w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-0'
            >
              <motion.div className='w-1.5 h-1.5 bg-[var(--brand-gold)] rounded-full' />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Biography & Portfolio Section */}
      <div className='relative bg-[var(--deep-black)] py-24 md:py-32'>
        <div className='max-w-[1104px] mx-auto px-8 md:px-8'>
          {/* Biography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className='mb-24'
          >
            <h2 className='font-playfair text-4xl md:text-5xl font-semibold text-[var(--brand-gold)] mb-8'>
              Über {artist.name.split(' ')[0]}
            </h2>
            <div className='prose prose-lg prose-invert max-w-none'>
              <p className='font-inter text-lg text-[#C0C0C0] leading-relaxed mb-8'>
                {artist.name} ist ein meisterhafter Tattoo-Künstler mit über {artist.experience}{' '}
                Erfahrung in der Branche. Spezialisiert auf{' '}
                {artist.specialties.slice(0, 2).join(' und ')}, bringt {artist.name.split(' ')[0]}{' '}
                eine einzigartige künstlerische Vision in jedes Projekt ein.
              </p>
              <p className='font-inter text-lg text-[#C0C0C0] leading-relaxed mb-8'>
                Mit einem tiefen Verständnis für Technik und Ästhetik schafft{' '}
                {artist.name.split(' ')[0]} Kunstwerke, die nicht nur visuell beeindruckend sind,
                sondern auch eine persönliche Geschichte erzählen. Jedes Tattoo wird mit Präzision,
                Leidenschaft und höchster Professionalität ausgeführt.
              </p>
              <p className='font-inter text-lg text-[#C0C0C0] leading-relaxed'>
                Bei Medusa Tattoo München arbeitet {artist.name.split(' ')[0]} in einem
                EU-zertifizierten Studio mit modernster Ausrüstung und höchsten Hygienestandards.
                Die Zufriedenheit und Sicherheit unserer Kunden steht immer an erster Stelle.
              </p>
            </div>
          </motion.div>

          {/* Portfolio Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className='font-playfair text-4xl md:text-5xl font-semibold text-[var(--brand-gold)] mb-16'>
              Portfolio
            </h2>

            {/* Masonry Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {portfolioImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className='group relative aspect-[3/4] overflow-hidden rounded-xl bg-black/20 cursor-pointer flex flex-col h-full'
                >
                  <img
                    src={image}
                    alt={`${artist.name} Portfolio ${index + 1}`}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                    loading='lazy'
                    decoding='async'
                    sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 360px) 50vw, 100vw'
                    style={
                      {
                        imageRendering: 'auto',
                        filter: 'none',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                      } as React.CSSProperties
                    }
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-tattoo.jpg';
                    }}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col h-full' />
                  <div className='absolute inset-0 ring-2 ring-transparent group-hover:ring-[var(--brand-gold-hover)] transition-all duration-300 rounded-xl flex flex-col h-full' />
                </motion.div>
              ))}
            </div>

            {/* View All Portfolio Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className='flex justify-center mt-16'
            >
              <a
                href={`/gallery?artist=${artist.name}`}
                className='inline-flex items-center gap-0 px-8 py-8 bg-transparent border-2 border-[var(--brand-gold)] text-[var(--brand-gold)] rounded-lg font-inter font-semibold hover:bg-brand-gold-hover hover:text-[var(--deep-black)] transition-all duration-300'
              >
                <span>Alle Arbeiten ansehen</span>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className='relative bg-[#0F0F0F] py-16 border-t border-[var(--brand-gold)]/20'>
        <div className='max-w-[1104px] mx-auto px-8 md:px-8 text-center'>
          <h3 className='font-playfair text-3xl md:text-4xl font-semibold text-white mb-8'>
            Bereit für Ihr Kunstwerk?
          </h3>
          <p className='font-inter text-lg text-[#C0C0C0] mb-8 max-w-2xl mx-auto'>
            Buchen Sie jetzt einen Termin mit {artist.name.split(' ')[0]} und verwandeln Sie Ihre
            Vision in Realität.
          </p>
          <a
            href='/booking'
            className='inline-flex items-center gap-0 px-16 py-8 bg-[var(--brand-gold)] text-[var(--deep-black)] rounded-lg font-inter font-bold text-lg hover:bg-[var(--brand-gold-hover)] transition-all duration-300 hover:scale-105'
            style={{ boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
          >
            <Calendar className='w-6 h-6' />
            <span>Jetzt Termin buchen</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistDetailModal;
