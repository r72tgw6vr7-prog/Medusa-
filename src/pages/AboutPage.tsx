import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { MainNavigation } from '@/components/molecules/MainNavigation';
import { Footer } from '@/components/pages';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import { ArtistCard, type Artist as ArtistCardType } from '@/components/cards/ArtistCard';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutPage() {
  const location = useLocation();
  const { language } = useLanguage();

  const isEnglishPath = location.pathname === '/en' || location.pathname.startsWith('/en/');
  const isEnglish = language === 'en' || isEnglishPath;

  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Multi-layer parallax transforms for depth effect
  const baseLayerY = useTransform(heroScrollProgress, [0, 1], ['0%', '15%']);
  const baseLayerScale = useTransform(heroScrollProgress, [0, 1], [1.1, 1]);
  const baseLayerOpacity = useTransform(heroScrollProgress, [0, 0.5, 1], [1, 0.6, 0.3]);

  const midLayerY = useTransform(heroScrollProgress, [0, 1], ['0%', '25%']);
  const midLayerScale = useTransform(heroScrollProgress, [0, 1], [1, 1.15]);
  const midLayerOpacity = useTransform(heroScrollProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  const frontLayerY = useTransform(heroScrollProgress, [0, 1], ['0%', '35%']);
  const frontLayerScale = useTransform(heroScrollProgress, [0, 1], [1, 1.2]);
  const frontLayerOpacity = useTransform(heroScrollProgress, [0, 0.4, 1], [0, 1, 0.8]);

  const contentY = useTransform(heroScrollProgress, [0, 1], ['0%', '-20%']);
  const contentOpacity = useTransform(heroScrollProgress, [0, 0.5, 1], [1, 1, 0]);
  const scrollIndicatorOpacity = useTransform(heroScrollProgress, [0, 0.3], [1, 0]);

  const [isOliverRevealed, setIsOliverRevealed] = useState(false);
  const [isSaschaRevealed, setIsSaschaRevealed] = useState(false);
  const oliverRef = useRef<HTMLDivElement | null>(null);
  const saschaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targets = [
      { ref: oliverRef, onReveal: () => setIsOliverRevealed(true) },
      { ref: saschaRef, onReveal: () => setIsSaschaRevealed(true) },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = targets.find((t) => t.ref.current === entry.target);
          if (!target) return;
          target.onReveal();
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 },
    );

    targets.forEach(({ ref, onReveal }) => {
      if (!ref.current) return;
      observer.observe(ref.current);
      requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          onReveal();
          observer.unobserve(ref.current);
        }
      });
    });

    return () => observer.disconnect();
  }, []);

  const oliverCard = useMemo<ArtistCardType>(
    () => ({
      id: 'oliver',
      name: 'Oliver',
      discipline: isEnglish ? 'Founder & Piercing Expert' : 'Founder & Piercing-Experte',
      description: isEnglish
        ? 'Oliver leads Medusa with a focus on precision piercing, safe placement, and a calm, consultation-first approach.'
        : 'Oliver führt Medusa mit Fokus auf präzises Piercing, sichere Platzierung und eine ruhige, beratungsorientierte Herangehensweise.',
      image_url: '/images/artists/oliver.webp',
      display_order: 0,
      category: 'piercing',
    }),
    [isEnglish],
  );

  const saschaCard = useMemo<ArtistCardType>(
    () => ({
      id: 'sascha',
      name: 'Sascha',
      discipline: isEnglish ? 'Front Desk & Studio Support' : 'Front Desk & Studio Support',
      description: isEnglish
        ? 'Your first point of contact at Medusa. Sascha helps with scheduling, questions, and making sure everything runs smoothly in the studio.'
        : 'Dein erster Kontakt bei Medusa. Sascha hilft bei Terminfragen, Anliegen und sorgt dafür, dass im Studio alles reibungslos läuft.',
      image_url: '/images/artists/sascha.webp',
      display_order: 1,
      category: 'tattoo',
    }),
    [isEnglish],
  );

  return (
    <div className='min-h-screen relative z-10 bg-luxury-bg-dark lg:pt-16 md:pt-24 max-md:pt-32'>
      <MainNavigation />

      <main className='w-full' id='main-content'>
        <section ref={heroRef} className='relative w-full overflow-hidden bg-luxury-bg-dark'>
          <div className='relative w-full' style={{ height: '150vh' }}>
            <div className='sticky top-0 h-screen overflow-hidden'>
              {!prefersReducedMotion ? (
                <>
                  {/* Base Layer - Slowest parallax (atmosphere) */}
                  <motion.div
                    aria-hidden='true'
                    className='absolute inset-0'
                    style={{
                      y: baseLayerY,
                      scale: baseLayerScale,
                      opacity: baseLayerOpacity,
                    }}
                  >
                    <div
                      className='absolute inset-0 bg-center bg-cover'
                      style={{
                        backgroundImage:
                          'url(/assets/images/photos/studio/optimized/img3947-1920w.webp)',
                        filter: 'brightness(0.4) contrast(1.1)',
                      }}
                    />
                  </motion.div>

                  {/* Mid Layer - Medium parallax (studio interior) */}
                  <motion.div
                    aria-hidden='true'
                    className='absolute inset-0'
                    style={{
                      y: midLayerY,
                      scale: midLayerScale,
                      opacity: midLayerOpacity,
                    }}
                  >
                    <div
                      className='absolute inset-0 bg-center bg-cover'
                      style={{
                        backgroundImage:
                          'url(/assets/images/photos/studio/optimized/img3969-1920w.webp)',
                        filter: 'brightness(0.5)',
                      }}
                    />
                  </motion.div>

                  {/* Front Layer - Fastest parallax (hero focal point) */}
                  <motion.div
                    aria-hidden='true'
                    className='absolute inset-0'
                    style={{
                      y: frontLayerY,
                      scale: frontLayerScale,
                      opacity: frontLayerOpacity,
                    }}
                  >
                    <div
                      className='absolute inset-0 bg-center bg-cover'
                      style={{
                        backgroundImage:
                          'url(/assets/images/photos/studio/optimized/img4031-1920w.webp)',
                        filter: 'brightness(0.6)',
                      }}
                    />
                    {/* Chrome glow accent edge */}
                    <div className='absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-(--accent-chrome)/40 to-transparent' />
                  </motion.div>

                  {/* Overlay gradient for text legibility */}
                  <div className='absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-(--deep-black)' />

                  {/* Radial spotlight effect */}
                  <div
                    className='absolute inset-0'
                    style={{
                      background:
                        'radial-gradient(ellipse at center, transparent 0%, rgba(26, 26, 26, 0.7) 70%)',
                    }}
                  />
                </>
              ) : (
                <div
                  aria-hidden='true'
                  className='absolute inset-0 bg-center bg-cover'
                  style={{
                    backgroundImage:
                      'url(/assets/images/photos/studio/optimized/img3947-1920w.webp)',
                    filter: 'brightness(0.5)',
                  }}
                />
              )}

              {/* Content Layer */}
              <div className='relative z-10 flex items-center justify-center h-screen px-ma-md'>
                <Container size='default'>
                  <motion.div
                    className='max-w-4xl mx-auto text-center'
                    style={{
                      y: contentY,
                      opacity: contentOpacity,
                    }}
                  >
                    <motion.p
                      className='text-(--accent-chrome)/80 text-sm uppercase font-light'
                      style={{ letterSpacing: '0.2em' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      Medusa München
                    </motion.p>

                    <motion.h1
                      className='mt-ma-sm font-headline tracking-tight text-(--accent-chrome)'
                      style={{ lineHeight: 1.1 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <span className='block text-6xl md:text-7xl lg:text-8xl font-bold'>
                        {isEnglish ? 'About Medusa' : 'Über Medusa'}
                      </span>
                    </motion.h1>

                    <motion.p
                      className='mt-ma-lg text-white/90 text-lg md:text-xl lg:text-2xl leading-relaxed font-light max-w-3xl mx-auto'
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      {isEnglish
                        ? 'Where precision piercing meets uncompromising hygiene and artistry. Our studio combines decades of expertise with a calm, consultation-first approach.'
                        : 'Wo präzises Piercing auf kompromisslose Hygiene und Kunstfertigkeit trifft. Unser Studio verbindet jahrzehntelange Expertise mit einem ruhigen, beratungsorientierten Ansatz.'}
                    </motion.p>

                    <motion.div
                      className='mt-ma-lg'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    >
                      <div className='h-px w-24 mx-auto bg-linear-to-r from-transparent via-(--accent-chrome) to-transparent' />
                    </motion.div>
                  </motion.div>
                </Container>
              </div>

              {/* Scroll indicator */}
              <motion.div
                className='absolute bottom-ma-lg left-1/2 -translate-x-1/2 z-20'
                style={{
                  opacity: scrollIndicatorOpacity,
                }}
              >
                <div className='flex flex-col items-center gap-8 text-(--accent-chrome)/60'>
                  <span className='text-xs uppercase tracking-widest'>Scroll</span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className='w-px h-ma-md bg-linear-to-b from-(--accent-chrome) to-transparent'
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Section variant='default' spacing='normal' bg='dark'>
          <Container size='default'>
            <div
              ref={oliverRef}
              className='[&_.max-w-xl]:max-w-none [&_.artist-card-content_.mt-8]:hidden'
            >
              <ArtistCard artist={oliverCard} isRevealed={isOliverRevealed} index={0} />
            </div>

            <div
              ref={saschaRef}
              className='mt-ma-xl [&_.max-w-xl]:max-w-none [&_.artist-card-content_.mt-8]:hidden'
            >
              <ArtistCard artist={saschaCard} isRevealed={isSaschaRevealed} index={1} />
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
