import { useEffect, useRef, useState } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';
import { Heart, MessageCircle, Palette, Zap } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../../components/SectionHeading';
import { useLanguage as useGlobalLanguage } from '@/contexts/LanguageContext';
import '../../styles/process-timeline.css';

interface TimelineStep {
  id: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  title: {
    DE: string;
    EN: string;
  };
  description: {
    DE: string;
    EN: string;
  };
}

const BACKGROUND_IMAGE = '';

interface ProcessTimelineProps {}

type LocalisedCopy = {
  eyebrow: string;
  headline: string;
  subtitle: string;
};

const COPY: Record<'DE' | 'EN', LocalisedCopy> = {
  DE: {
    eyebrow: 'Medusa Signature Experience',
    headline: 'Ihr Weg zum Kunstwerk',
    subtitle:
      'Vom ersten Gespräch bis zur Nachsorge begleiten wir Sie Schritt für Schritt – präzise, sicher und luxuriös.',
  },
  EN: {
    eyebrow: 'Medusa Signature Experience',
    headline: 'Your Path to a Masterpiece',
    subtitle:
      'From the first consultation to dedicated aftercare, we guide you through every step with precision and care.',
  },
};

type LocalisedText = {
  DE: string;
  EN: string;
};

interface TimelineStep {
  id: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  title: LocalisedText;
  description: LocalisedText;
}

const STEPS: TimelineStep[] = [
  {
    id: 'consultation',
    icon: MessageCircle,
    title: {
      DE: 'Beratung',
      EN: 'Consultation',
    },
    description: {
      DE: 'Persönliche Beratung zu Stil, Größe und Budget – klar und ehrlich.',
      EN: 'Personal consultation on style, size and budget – honest and clear.',
    },
  },
  {
    id: 'design',
    icon: Palette,
    title: {
      DE: 'Design',
      EN: 'Design',
    },
    description: {
      DE: 'Maßgeschneidertes Design, präzise von Hand illustriert und verfeinert.',
      EN: 'Bespoke design illustrated by hand with meticulous precision and care.',
    },
  },
  {
    id: 'session',
    icon: Zap,
    title: {
      DE: 'Session',
      EN: 'Session',
    },
    description: {
      DE: 'Sterile Umgebung und erfahrene Artists garantieren bestes Ergebnis jeder Session.',
      EN: 'Sterile setting and master artists ensure the best result every session.',
    },
  },
  {
    id: 'aftercare',
    icon: Heart,
    title: {
      DE: 'Nachsorge',
      EN: 'Aftercare',
    },
    description: {
      DE: 'Individuelle Pflegepläne und Follow-ups sichern optimale Heilung Ihres Tattoos.',
      EN: 'Tailored aftercare plans and follow-ups secure flawless healing for you.',
    },
  },
];

export function ProcessTimeline({}: ProcessTimelineProps) {
  const { language: globalLang } = useGlobalLanguage();
  // Convert lowercase 'de'/'en' to uppercase 'DE'/'EN' for local content lookup
  const language = globalLang.toUpperCase() as 'DE' | 'EN';
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reducedMotion = useReducedMotion();
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const handleChange = () => setIsPhone(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const copy = COPY[language] ?? COPY.EN;
  const phoneAnimated = isPhone && !reducedMotion;

  return (
    <section
      className='process-timeline-section relative w-full py-16 text-luxury-text-inverse md:py-24 max-lg:py-12'
      aria-label={copy.headline}
      style={{
        backgroundImage: BACKGROUND_IMAGE
          ? `linear-gradient(180deg, rgba(var(--color-surface-darker-rgb), 0.7) 0%, rgba(var(--color-surface-darker-rgb), 0.82) 100%), url(${BACKGROUND_IMAGE})`
          : 'linear-gradient(180deg, rgba(var(--color-surface-darker-rgb), 0.7) 0%, rgba(var(--color-surface-darker-rgb), 0.82) 100%)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className='absolute inset-0 pointer-events-none lg:hidden z-0 bg-cover bg-center bg-no-repeat opacity-40'
        aria-hidden='true'
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(42, 42, 44, 0.3) 0%, rgba(26, 26, 26, 0.6) 100%), url('/assets/images/photos/backgrounds/process-timeline-bg.webp')",
        }}
      />

      <div
        className='absolute inset-0 pointer-events-none max-lg:hidden z-0 bg-cover bg-center bg-no-repeat opacity-30'
        aria-hidden='true'
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(var(--color-surface-darker-rgb), 0.25) 0%, rgba(var(--color-surface-darker-rgb), 0.55) 100%), url('/assets/images/photos/backgrounds/process-timeline-bg.webp')",
        }}
      />

      <div ref={ref} className='relative z-10 mx-auto max-w-container-main px-8 max-lg:px-4'>
        <div className='lg:hidden'>
          <div className='max-lg:text-center'>
            <p className='max-lg:text-sm max-lg:uppercase max-lg:tracking-widest max-lg:font-medium max-lg:text-white max-lg:mb-4'>
              {copy.eyebrow.toUpperCase()}
            </p>
            <h2 className='max-lg:text-(length:--text-h2) max-lg:font-bold max-lg:tracking-tight max-lg:leading-tight max-lg:text-white max-lg:mb-6'>
              {copy.headline}
            </h2>
            <p className='max-lg:text-lg max-lg:text-white/80 max-lg:leading-relaxed max-lg:mx-auto max-lg:max-w-md max-lg:mb-12'>
              {copy.subtitle}
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 mx-auto max-w-md sm:grid-cols-2 sm:gap-6'>
            {STEPS.map((step, index) =>
              phoneAnimated ? (
                <motion.article
                  key={step.id}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ amount: 0.55, once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22, delay: index * 0.08 }}
                  className='flex flex-col h-full items-center justify-center text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition duration-200 ease-out hover:bg-white/10 hover:border-white/20 sm:h-32 md:h-36'
                >
                  <div className='mb-4 flex shrink-0 h-10 w-10 items-center justify-center process-timeline-step-badge'>
                    <span className='text-white text-sm font-medium'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className='text-lg font-semibold text-white'>
                    {step.title[language] ?? step.title.EN}
                  </h3>
                  <p className='mt-2 text-xs leading-4 text-white/70'>
                    {step.description[language] ?? step.description.EN}
                  </p>
                </motion.article>
              ) : (
                <article
                  key={step.id}
                  className='flex flex-col h-full items-center justify-center text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition duration-200 ease-out hover:bg-white/10 hover:border-white/20 sm:h-32 md:h-36'
                >
                  <div className='mb-4 flex shrink-0 h-10 w-10 items-center justify-center process-timeline-step-badge'>
                    <span className='text-white text-sm font-medium'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className='text-lg font-semibold text-white'>
                    {step.title[language] ?? step.title.EN}
                  </h3>
                  <p className='mt-2 text-xs leading-4 text-white/70'>
                    {step.description[language] ?? step.description.EN}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>

        <div className='max-lg:hidden'>
          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={
              inView
                ? { opacity: 1, y: 0 }
                : reducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <SectionHeading
              eyebrow={copy.eyebrow}
              title={copy.headline}
              subtitle={copy.subtitle}
              level='primary'
            />
          </motion.div>

          <div className='relative mt-16 mb-16'>
            <div className='timeline absolute left-0 right-0 top-1/2 -translate-y-1/2'>
              <motion.div
                initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.9, delay: reducedMotion ? 0 : 0.225, ease: 'easeOut' }}
                style={{ originX: 0 }}
                className='timeline-fill'
                aria-hidden='true'
              />
            </div>

            <div className='grid grid-cols-4 gap-8' aria-hidden='true'>
              {STEPS.map((step, index) => (
                <div key={step.id} className='flex items-center justify-center'>
                  <motion.div
                    initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    animate={
                      inView
                        ? { opacity: 1, scale: 1 }
                        : reducedMotion
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: reducedMotion ? 0 : 1.1 + index * 0.1,
                      ease: 'easeOut',
                    }}
                    className='process-timeline-marker flex h-10 w-10 items-center justify-center text-sm font-semibold text-brand-accent'
                  >
                    {index + 1}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.id}
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  animate={
                    inView
                      ? { opacity: 1, y: 0 }
                      : reducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: reducedMotion ? 0 : 1.7 + index * 0.15,
                    ease: 'easeOut',
                  }}
                  className='flex flex-col h-full items-center justify-start p-8 text-center md:p-8'
                >
                  <div className='mb-8 shrink-0 flex h-10 w-10 items-center justify-center text-brand-accent md:mb-8 md:h-14 md:w-14 process-timeline-step-icon'>
                    <Icon size={24} className='md:hidden' />
                    <Icon size={28} className='hidden md:block' />
                  </div>
                  <h3 className='font-heading text-xl font-semibold text-brand-accent md:text-3xl'>
                    {step.title[language] ?? step.title.EN}
                  </h3>
                  <p className='mt-8 text-sm leading-5 text-white/80 md:text-base md:leading-6'>
                    {step.description[language] ?? step.description.EN}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
