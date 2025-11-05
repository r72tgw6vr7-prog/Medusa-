import { useState, useEffect, useRef } from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';
import { motion } from 'framer-motion';
import { MessageCircle, Palette, Zap, Heart, CheckCircle, Sparkles } from 'lucide-react';
const backgroundImage = '/assets/images/photos/backgrounds/process-timeline-bg.webp';
import { useMedusaDesignSystem } from '../../../src/foundation/SimpleMedusaProvider';
import { ProcessStepCard } from '../molecules/ProcessStepCard';

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
  duration: {
    DE: string;
    EN: string;
  };
}

interface ProcessTimelineProps {}

export function ProcessTimeline({}: ProcessTimelineProps) {
  const { language } = useMedusaDesignSystem();
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  const content = {
    DE: {
      headline: 'Ihr Weg zum Kunstwerk',
      subtitle: 'Unser bewährter 4-Schritte-Prozess für Ihr perfektes Tattoo-Erlebnis',
      processComplete: 'Ihr Kunstwerk ist bereit',
    },
    EN: {
      headline: 'From Concept to Art',
      subtitle: 'Our proven 4-step process for your perfect tattoo experience',
      processComplete: 'Your artwork is ready',
    },
  };

  const t = content[language];

  const timelineSteps: TimelineStep[] = [
    {
      id: 'consultation',
      icon: MessageCircle,
      title: {
        DE: 'Beratung',
        EN: 'Consultation',
      },
      description: {
        DE: 'Persönliches Gespräch über Ihre Vision, Stil und Wünsche in unserem luxuriösen Studio.',
        EN: 'Personal discussion about your vision, style and wishes in our luxurious studio.',
      },
      duration: {
        DE: '30-45 Min',
        EN: '30-45 Min',
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
        DE: 'Individuelle Gestaltung Ihres Tattoos mit professionellen Skizzen und Anpassungen.',
        EN: 'Individual design of your tattoo with professional sketches and adjustments.',
      },
      duration: {
        DE: '1-7 Tage',
        EN: '1-7 Days',
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
        DE: 'Professionelle Umsetzung in steriler Umgebung mit modernster Ausrüstung.',
        EN: 'Professional execution in a sterile environment with state-of-the-art equipment.',
      },
      duration: {
        DE: '2-8 Std',
        EN: '2-8 Hours',
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
        DE: 'Umfassende Betreuung und Support für die optimale Heilung Ihres Kunstwerks.',
        EN: 'Comprehensive care and support for optimal healing of your artwork.',
      },
      duration: {
        DE: '2-4 Wochen',
        EN: '2-4 Weeks',
      },
    },
  ];

  // Visibility detection
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

  return (
    <section
      ref={sectionRef}
      className='relative bg-brand-background py-32 overflow-hidden'
      aria-label={t.headline}
    >
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40'
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Background Enhancement */}
      <div className='absolute inset-0 bg-gradient-to-b from-brand-background via-brand-background/98 to-brand-background'></div>

      <div className='relative max-w-7xl mx-auto px-8 sm:px-8 lg:px-8'>
        {/* Section Header */}
        <motion.div
          className='text-center mb-24'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-headline-lg font-headline text-brand-gold mb-8'>{t.headline}</h2>
          <p className='text-body-large font-body text-brand-chrome max-w-3xl mx-auto'>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Desktop Timeline (Horizontal) - Using ProcessStepCard components */}
        <div className='hidden lg:block mb-16'>
          <motion.div
            className='relative'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Timeline Line */}
            <div className='absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent'>
              <motion.div
                className='h-full bg-brand-gold origin-left'
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isVisible ? 1 : 0 }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
              />
            </div>

            {/* Timeline Steps Container - Auto layout: Horizontal, 30px spacing, Top alignment */}
            <div
              className='flex items-start justify-center'
              style={{
                gap: '30px', // Spacing between cards as per spec
              }}
            >
              {timelineSteps.map((step, index) => (
                <ProcessStepCard
                  key={step.id}
                  number={index + 1}
                  icon={step.icon}
                  title={step.title[language]}
                  description={step.description[language]}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile/Tablet Timeline (Vertical) */}
        <div className='lg:hidden'>
          <motion.div
            className='relative max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Vertical Timeline Line */}
            <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-brand-gold to-transparent'>
              <motion.div
                className='w-full bg-brand-gold origin-top'
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isVisible ? 1 : 0 }}
                transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
              />
            </div>

            {/* Vertical Steps */}
            <div className='space-y-16'>
              {timelineSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    className='relative flex items-start group'
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -40 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    {/* Step Number */}
                    <motion.div
                      className='relative z-10 w-16 h-16 rounded-full bg-brand-background border-2 border-brand-gold flex items-center justify-center mr-8 group-hover:shadow-gold-glow-subtle transition-all duration-500'
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className='text-brand-gold font-body font-bold'>{index + 1}</span>
                    </motion.div>

                    {/* Step Content */}
                    <div className='flex-1 pb-8'>
                      <div className='bg-gradient-to-br from-brand-background via-brand-background/95 to-brand-background/90 rounded-2xl p-8 border border-brand-chrome/30 group-hover:border-brand-gold/40 transition-all duration-500 group-hover:shadow-gold-glow-subtle'>
                        {/* Icon and Title Row */}
                        <div className='flex items-center space-x-8 mb-8'>
                          <div className='w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center'>
                            <IconComponent size={24} className='text-brand-gold' />
                          </div>
                          <div className='flex-1'>
                            <h3 className='text-headline-md font-headline text-brand-gold mb-0'>
                              {step.title[language]}
                            </h3>
                            <div className='flex items-center space-x-0 text-brand-chrome'>
                              <Sparkles size={14} />
                              <span className='text-body-small font-body font-medium'>
                                {step.duration[language]}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className='text-body-small font-body text-brand-white leading-relaxed group-hover:text-brand-white transition-colors duration-500'>
                          {step.description[language]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Completion Badge */}
        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            className='inline-flex items-center space-x-0 bg-gradient-to-r from-brand-gold/20 via-brand-gold/10 to-brand-gold/20 border-2 border-brand-gold/40 px-8 py-8 rounded-2xl shadow-gold-glow-subtle'
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle size={24} className='text-brand-gold' />
            <span className='text-body font-body font-bold text-brand-gold'>
              {t.processComplete}
            </span>
            <Sparkles size={20} className='text-brand-gold' />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
