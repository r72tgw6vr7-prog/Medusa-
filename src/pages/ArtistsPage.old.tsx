import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

// Artist type definition
interface Artist {
  id: string;
  name: string;
  role: string;
  category: string;
  photo: string;
  specialties: string[];
  bookable: boolean;
  featured: boolean;
  bio: string;
  experience: string;
  instagram: string;
}

// Mock portfolio data (replace with actual portfolio images per artist)
const getArtistPortfolio = (artistId: string) => {
  const portfolios: Record<string, Array<{ id: number; image: string; title: string }>> = {
    'eli-luquez': [
      { id: 1, image: '/images/gallery/realism-1.jpg', title: 'Portrait Study' },
      { id: 2, image: '/images/gallery/realism-2.jpg', title: 'Black & Grey Sleeve' },
      { id: 3, image: '/images/gallery/fineline-1.jpg', title: 'Fineline Details' },
      { id: 4, image: '/images/gallery/blackwork-1.jpg', title: 'Blackwork Design' },
      { id: 5, image: '/images/gallery/realism-3.jpg', title: 'Animal Portrait' },
      { id: 6, image: '/images/gallery/realism-4.jpg', title: 'Grey Wash Study' },
    ],
    debi: [
      { id: 1, image: '/images/gallery/oldschool-1.jpg', title: 'Traditional Rose' },
      { id: 2, image: '/images/gallery/geometric-1.jpg', title: 'Sacred Geometry' },
      { id: 3, image: '/images/gallery/maori-1.jpg', title: 'Maori Pattern' },
      { id: 4, image: '/images/gallery/blackwork-2.jpg', title: 'Blackwork Mandala' },
      { id: 5, image: '/images/gallery/oldschool-2.jpg', title: 'Classic Dagger' },
      { id: 6, image: '/images/gallery/geometric-2.jpg', title: 'Dotwork Design' },
    ],
    loui: [
      { id: 1, image: '/images/gallery/portrait-1.jpg', title: 'Realistic Portrait' },
      { id: 2, image: '/images/gallery/watercolor-1.jpg', title: 'Watercolor Art' },
      { id: 3, image: '/images/gallery/realism-5.jpg', title: 'Animal Portrait' },
      { id: 4, image: '/images/gallery/realism-6.jpg', title: 'Grey Wash Study' },
      { id: 5, image: '/images/gallery/portrait-2.jpg', title: 'Portrait Sleeve' },
      { id: 6, image: '/images/gallery/watercolor-2.jpg', title: 'Color Splash' },
    ],
  };
  return portfolios[artistId] || [];
};

export const ArtistsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Focus management refs
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  // Load artists from team.json
  useEffect(() => {
    fetch('/team.json')
      .then((res) => res.json())
      .then((data) => {
        // Filter only tattoo artists for the artists page
        const tattooArtists = data.team.filter(
          (member: Artist) => member.category === 'tattoo' && member.featured,
        );
        setArtists(tattooArtists);
      })
      .catch((err) => console.error('Failed to load artists:', err));
  }, []);

  // Handle URL parameters for shareable links
  useEffect(() => {
    const artistParam = searchParams.get('artist');
    if (artistParam && artists.length > 0) {
      const artist = artists.find((a) => a.id === artistParam);
      if (artist) {
        setSelectedArtist(artist);
      }
    }
  }, [searchParams, artists]);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (selectedArtist) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedArtist]);

  // Handle ESC key to close panel
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedArtist) {
        setSelectedArtist(null);
        setSearchParams({});
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedArtist, setSearchParams]);

  // Focus management: Set focus to close button when panel opens
  useEffect(() => {
    if (selectedArtist && closeButtonRef.current) {
      // Store the currently focused element to restore later
      triggerRef.current = document.activeElement as HTMLElement;

      // Set focus to close button after a brief delay to ensure render
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    } else if (!selectedArtist && triggerRef.current) {
      // Restore focus when panel closes
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [selectedArtist]);

  // Focus trap: Keep focus within the panel
  useEffect(() => {
    if (!selectedArtist || !panelRef.current) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusableElements = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: Move focus backwards
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab: Move focus forwards
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleFocusTrap);
    return () => document.removeEventListener('keydown', handleFocusTrap);
  }, [selectedArtist]);

  const openPanel = (artist: Artist) => {
    setSelectedArtist(artist);
    setSearchParams({ artist: artist.id });
  };

  const closePanel = () => {
    setSelectedArtist(null);
    setSearchParams({});
  };

  const handleBooking = (artist: Artist) => {
    navigate('/booking', { state: { artist: artist.name, artistId: artist.id } });
  };

  const handleGalleryView = (artistId: string) => {
    navigate(`/gallery?artist=${artistId}`);
  };

  return (
    <MotionConfig reducedMotion={prefersReducedMotion.current ? 'always' : 'never'}>
      <div className='min-h-screen bg-[#222222] py-16 px-8 sm:px-8 lg:px-8'>
        <div className='max-w-[1104px] mx-auto'>
          <div className='text-center mb-16'>
            <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] font-['Playfair_Display'] mb-8">
              Unsere Künstler
            </h1>
            <p className='text-lg text-white/70 max-w-2xl mx-auto'>
              Lernen Sie unser talentiertes Team von Tätowierkünstlern kennen
            </p>
          </div>

          {/* Artist Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {artists.map((artist) => (
              <button
                key={artist.id}
                onClick={() => openPanel(artist)}
                className='group block overflow-hidden rounded-lg bg-[#222222] border border-[#333333] hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/10 text-left w-full flex flex-col h-full'
              >
                <div className='aspect-4/5 overflow-hidden'>
                  <img
                    src={artist.photo}
                    alt={artist.name}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder-artist.jpg';
                    }}
                  />
                </div>
                <div className='p-8'>
                  <h3 className="text-xl font-bold text-white font-['Playfair_Display'] mb-0">
                    {artist.name}
                  </h3>
                  <p className='text-[#D4AF37] text-sm font-medium mb-0'>{artist.role}</p>
                  <div className='flex flex-wrap gap-0 mb-8'>
                    {artist.specialties.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className='inline-flex items-center px-0 py-0 rounded-full text-xs font-medium bg-[#2A2A2A] text-white/80 flex-col h-full'
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className='flex gap-0'>
                    <span className='flex-1 text-center py-0 text-sm font-medium text-[#D4AF37] border border-[#D4AF37] rounded hover:bg-[#D4AF37]/10 transition-colors flex-col h-full transition duration-200 ease-out'>
                      Details
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Drill-down Panel */}
        <AnimatePresence>
          {selectedArtist && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
                onClick={closePanel}
              />

              {/* Slide-in Panel */}
              <motion.div
                ref={panelRef}
                initial={
                  prefersReducedMotion.current
                    ? { opacity: 1 }
                    : {
                        x: typeof window !== 'undefined' && window.innerWidth >= 768 ? '100%' : 0,
                        y: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 0,
                        opacity: 0,
                      }
                }
                animate={prefersReducedMotion.current ? { opacity: 1 } : { x: 0, y: 0, opacity: 1 }}
                exit={
                  prefersReducedMotion.current
                    ? { opacity: 1 }
                    : {
                        x: typeof window !== 'undefined' && window.innerWidth >= 768 ? '100%' : 0,
                        y: typeof window !== 'undefined' && window.innerWidth < 768 ? '100%' : 0,
                        opacity: 0,
                      }
                }
                transition={
                  prefersReducedMotion.current
                    ? { duration: 0 }
                    : { type: 'spring', damping: 30, stiffness: 300 }
                }
                className='fixed top-0 md:right-0 left-0 md:left-auto bottom-0 md:bottom-auto h-full w-full md:w-[70%] lg:w-[60%] bg-[rgba(34,34,34,0.95)] backdrop-blur-xl border-l md:border-l border-[#D4AF37]/20 z-50 overflow-y-auto'
                role='dialog'
                aria-modal='true'
                aria-labelledby='artist-panel-title'
                aria-describedby='artist-panel-description'
              >
                {/* Close Button */}
                <button
                  ref={closeButtonRef}
                  onClick={closePanel}
                  className='absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition duration-200 ease-out'
                  aria-label='Close artist panel'
                >
                  <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>

                {/* Panel Content */}
                <div className='p-8 lg:p-16'>
                  {/* Artist Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className='mb-8'
                  >
                    <div className='aspect-video rounded-xl overflow-hidden mb-8 border border-[#D4AF37]/20'>
                      <img
                        src={selectedArtist.photo}
                        alt={selectedArtist.name}
                        className='w-full h-full object-cover'
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/placeholder-artist.jpg';
                        }}
                      />
                    </div>
                    <h2
                      id='artist-panel-title'
                      className="text-4xl font-['Playfair_Display'] font-bold text-white mb-0"
                    >
                      {selectedArtist.name}
                    </h2>
                    <p id='artist-panel-description' className='text-xl text-[#D4AF37] mb-8'>
                      {selectedArtist.role}
                    </p>
                    <div className='flex flex-wrap gap-0 mb-8'>
                      {selectedArtist.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className='inline-flex items-center px-8 py-0 rounded-full text-sm font-medium bg-[#2A2A2A] text-white/90 border border-[#D4AF37]/20'
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`https://instagram.com/${selectedArtist.instagram.replace('@', '')}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-0 text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors transition duration-200 ease-out'
                    >
                      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                      </svg>
                      {selectedArtist.instagram}
                    </a>
                  </motion.div>

                  {/* Biography Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className='mb-8'
                  >
                    <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#D4AF37] mb-8">
                      Über {selectedArtist.name}
                    </h3>
                    <p className='text-white/80 text-lg leading-relaxed mb-8'>
                      {selectedArtist.bio}
                    </p>
                    <div className='flex gap-8'>
                      <div className='px-8 py-0 rounded-lg bg-[#2A2A2A] border border-[#D4AF37]/20'>
                        <span className='text-sm text-white/60'>Erfahrung</span>
                        <p className='text-white font-medium'>{selectedArtist.experience}</p>
                      </div>
                      <div className='px-8 py-0 rounded-lg bg-[#2A2A2A] border border-[#D4AF37]/20'>
                        <span className='text-sm text-white/60'>Sprachen</span>
                        <p className='text-white font-medium'>Deutsch, English</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Portfolio Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className='mb-8'
                  >
                    <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#D4AF37] mb-8">
                      Portfolio
                    </h3>
                    <div className='grid grid-cols-2 gap-8 mb-8'>
                      {getArtistPortfolio(selectedArtist.id).map((item, index) => (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.25 + index * 0.05 }}
                          onClick={() => setLightboxImage(item.image)}
                          className='aspect-square rounded-lg overflow-hidden border border-[#333333] hover:border-[#D4AF37] transition-all group flex flex-col h-full transition duration-200 ease-out'
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/placeholder-tattoo.jpg';
                            }}
                          />
                        </motion.button>
                      ))}
                    </div>
                    <button
                      onClick={() => handleGalleryView(selectedArtist.id)}
                      className='w-full py-0 px-8 rounded-lg border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors font-medium transition duration-200 ease-out'
                    >
                      Alle Arbeiten anzeigen
                    </button>
                  </motion.div>

                  {/* CTA Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <button
                      onClick={() => handleBooking(selectedArtist)}
                      className='w-full py-8 px-8 rounded-lg bg-[#D4AF37] text-[#222222] hover:bg-[#D4AF37]/90 transition-colors font-bold text-lg shadow-lg shadow-[#D4AF37]/20 transition duration-200 ease-out'
                    >
                      Termin buchen mit {selectedArtist.name}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Lightbox for Portfolio Images */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/90 z-60 flex items-center justify-center p-8'
              onClick={() => setLightboxImage(null)}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className='absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors transition duration-200 ease-out'
                aria-label='Close lightbox'
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src={lightboxImage}
                alt='Portfolio'
                className='max-w-full max-h-full object-contain'
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};

export default ArtistsPage;
