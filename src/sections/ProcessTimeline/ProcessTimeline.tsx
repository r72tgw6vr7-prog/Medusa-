import { useEffect, useMemo, useRef, useState, createContext, useContext } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';
import { Heart, MessageCircle, Palette, Zap } from 'lucide-react';
import '../../styles/process-timeline.css';

// Simple language context
const LanguageContext = createContext<'DE' | 'EN'>('DE');
export const useLanguage = () => {
  const language = useContext(LanguageContext);
  return { language };
};

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
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      ref={sectionRef}
      className='relative w-full py-16 text-white md:py-24'
      aria-label={copy.headline}
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.96) 100%), url(${BACKGROUND_IMAGE})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='relative mx-auto max-w-[1104px] px-8'>
        <div className='text-center'>
          <span className='inline-flex items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 px-8 py-0 text-xs font-semibold uppercase tracking-[0.28em] text-[#d4af37]'>
            {copy.eyebrow}
          </span>
          <h2 className="mt-8 font-['Playfair_Display'] text-4xl font-semibold text-[#d4af37] md:text-[44px]">
            {copy.headline}
          </h2>
          <p className='mx-auto mt-8 max-w-2xl text-base leading-7 text-white/80 md:text-lg'>
            {copy.subtitle}
          </p>
        </div>

        <div className='relative mt-16 mb-16'>
          <div className='timeline'>
            <div className={`timeline-fill ${isVisible ? 'is-visible' : ''}`} aria-hidden='true' />
          </div>
          {markerPositions.map((left, index) => (
            <div
              key={STEPS[index].id}
              className='absolute top-1/2 -translate-x-1/2 -translate-y-1/2'
              style={{ left }}
              aria-hidden='true'
            >
              <div className='flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37] bg-[#111111] text-sm font-semibold text-[#d4af37] shadow-[0_0_18px_rgba(212,175,55,0.35)]'>
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.id} className='flex flex-col h-full p-8 md:p-8'>
                <div className='mb-8 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 text-[#d4af37] md:mb-8 md:h-14 md:w-14 flex-col h-full'>
                  <Icon size={20} className='md:hidden' />
                  <Icon size={24} className='hidden md:block' />
                </div>
                <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#d4af37] md:text-2xl">
                  {step.title[language] ?? step.title.EN}
                </h3>
                <p className='mt-0 text-xs leading-5 text-white/80 md:mt-8 md:text-sm md:leading-6'>
                  {step.description[language] ?? step.description.EN}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
