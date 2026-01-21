import { useMemo, useRef } from 'react';
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

const BACKGROUND_IMAGE = encodeURI('/path to art peacer.jpg');

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
      DE: 'Persönliches Gespräch über Vision, Stil und Erwartungen – wir hören zu und beraten ehrlich.',
      EN: 'A personal conversation about your vision, style, and expectations – we listen and advise with care.',
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
      DE: 'Individuelle Entwürfe, die auf Ihren Körper zugeschnitten sind – präzise vorbereitet in Handarbeit.',
      EN: 'Bespoke artwork tailored to your body – meticulously prepared and refined by hand.',
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
      DE: 'Sterile Umgebung, modernste Technik und erfahrene Artists sorgen für ein perfektes Ergebnis.',
      EN: 'A sterile environment, modern equipment, and masterful artists deliver an exceptional result.',
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
      DE: 'Individuelle Pflegepläne, Follow-ups und Support, damit Ihr Kunstwerk optimal verheilt.',
      EN: 'Tailored aftercare plans, follow-ups, and guidance to ensure flawless healing.',
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

  const markerPositions = useMemo(() => {
    if (STEPS.length <= 1) {
      return Array(STEPS.length).fill('0%');
    }
    const divisor = STEPS.length - 1;
    return STEPS.map((_, index) => `${(index / divisor) * 100}%`);
  }, []);

  const copy = COPY[language] ?? COPY.EN;

  return (
    <section
      className='process-timeline-section relative w-full py-16 text-luxury-text-inverse md:py-24'
      aria-label={copy.headline}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(var(--color-surface-darker-rgb), 0.7) 0%, rgba(var(--color-surface-darker-rgb), 0.82) 100%), url(${BACKGROUND_IMAGE})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div ref={ref} className='relative z-10 mx-auto max-w-container-main px-8'>
        <motion.div
          initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : (reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionHeading eyebrow={copy.eyebrow} title={copy.headline} subtitle={copy.subtitle} level="primary" />
        </motion.div>

        <div className='relative mt-16 mb-16'>
          <div className='timeline'>
            <motion.div
              initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : (reducedMotion ? { scaleX: 1 } : { scaleX: 0 })}
              transition={{ duration: 0.9, delay: reducedMotion ? 0 : 0.225, ease: "easeOut" }}
              style={{ originX: 0 }}
              className='timeline-fill'
              aria-hidden='true'
            />
          </div>
          {markerPositions.map((left, index) => (
            <div
              key={STEPS[index].id}
              className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2'
              style={{ left }}
              aria-hidden='true'
            >
              <motion.div
                initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : (reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 })}
                transition={{ duration: 0.4, delay: reducedMotion ? 0 : 1.1 + index * 0.1, ease: "easeOut" }}
                className='flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent bg-luxury-bg-dark text-sm font-semibold text-brand-accent shadow-chrome-glow'
              >
                {index + 1}
              </motion.div>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : (reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 })}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : 1.7 + index * 0.15, ease: "easeOut" }}
                className='flex flex-col h-full items-center p-8 text-center md:p-8'
              >
                <div className='mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent/60 bg-brand-accent/10 text-brand-accent shadow-chrome-glow md:mb-8 md:h-14 md:w-14'>
                  <Icon size={24} className='md:hidden' />
                  <Icon size={28} className='hidden md:block' />
                </div>
                <h3 className="font-heading text-xl font-semibold text-brand-accent md:text-3xl">
                  {step.title[language] ?? step.title.EN}
                </h3>
                <p className='mt-0 text-sm leading-5 text-white/80 md:mt-8 md:text-base md:leading-6'>
                  {step.description[language] ?? step.description.EN}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
