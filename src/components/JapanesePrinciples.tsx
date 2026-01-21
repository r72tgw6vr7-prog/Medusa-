import { motion } from 'motion/react';
import { Circle, Mountain, Waves, Layers } from 'lucide-react';

interface Principle {
  kanji: string;
  romaji: string;
  translation: string;
  description: string;
  implementation: string;
  icon: React.ComponentType<{ className?: string }>;
}

const principles: Principle[] = [
  {
    kanji: '間',
    romaji: 'Ma',
    translation: 'Negative space as active element',
    description: 'Western design treats whitespace as absence; Japanese philosophy treats it as presence.',
    implementation: 'Use 1.5rem for breathing room, 3rem for contemplative pauses, and 6rem+ for dramatic section separation. Resist filling empty areas.',
    icon: Circle
  },
  {
    kanji: '暈し',
    romaji: 'Bokashi',
    translation: 'Gradation that mimics natural light',
    description: "Hokusai's wave uses gradation from dark to light to create atmospheric depth without additional colors.",
    implementation: 'Apply linear gradients from var(--luxury-bg-dark) through var(--luxury-bg-dark-elevated) to transparent. Radial gradients simulate fog or atmosphere.',
    icon: Mountain
  },
  {
    kanji: '侘寂',
    romaji: 'Wabi-sabi',
    translation: 'Embracing imperfection',
    description: 'Pure mathematical grays feel cold and machine-made. Subtle warmth creates organic resonance.',
    implementation: 'Add fine noise texture at 5-15% opacity. Use irregular border-radius (2px 4px 3px 5px) to read as organic rather than robotic.',
    icon: Waves
  },
  {
    kanji: '襲の色目',
    romaji: 'Kasane-no-irome',
    translation: 'Layered transparency',
    description: 'Heian-period courtiers wore multiple silk robes where colors showed through each other.',
    implementation: 'Layer semi-transparent elements: rgba(255, 255, 255, 0.2) over rgba(200, 200, 200, 0.3) creates visual complexity without adding colors.',
    icon: Layers
  }
];

export function JapanesePrinciples() {
  return (
    <section 
      className="luxury-section-light luxury-texture relative"
      style={{ padding: 'var(--space-monumental) 0' }}
    >
      {/* Bokashi gradient overlay */}
      <div 
        className="absolute inset-0 luxury-bokashi-light opacity-40 pointer-events-none"
        style={{ top: '50%' }}
      />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Section header with Ma spacing */}
        <div 
          className="text-center"
          style={{ marginBottom: 'var(--space-dramatic)' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              color: 'var(--luxury-gray-600)',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
          >
            Design Philosophy
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--luxury-black)',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem'
            }}
          >
            Four Japanese Principles
            <br />
            Transform Technical to Emotional
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '1.125rem',
              color: 'var(--luxury-gray-700)',
              maxWidth: '48rem',
              margin: '0 auto',
              fontWeight: 300,
              lineHeight: 1.7
            }}
          >
            The difference between sterile monochrome and one that feels alive
            often lies in principles developed centuries before digital design existed.
          </motion.p>
        </div>

        {/* Principles grid - staggered layout */}
        <div className="space-y-8">
          {principles.map((principle, index) => (
            <PrincipleCard 
              key={principle.romaji} 
              principle={principle} 
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrincipleCard({ 
  principle, 
  index,
  isEven 
}: { 
  principle: Principle; 
  index: number;
  isEven: boolean;
}) {
  const Icon = principle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={`
        grid grid-cols-1 lg:grid-cols-12 gap-8 items-center
        ${isEven ? '' : 'lg:flex-row-reverse'}
      `}
    >
      {/* Kanji display - large and atmospheric */}
      <div 
        className={`
          lg:col-span-4 flex items-center justify-center
          ${isEven ? 'lg:justify-start' : 'lg:justify-end lg:col-start-9'}
        `}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background circle with chrome accent */}
          <div
            style={{
              width: '12rem',
              height: '12rem',
              borderRadius: '50%',
              background: 'var(--luxury-gray-100)',
              border: '1px solid var(--luxury-gray-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Subtle radial gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent 70%)',
                pointerEvents: 'none'
              }}
            />
            
            {/* Icon background */}
            <div
              className="absolute bottom-4 right-4"
              style={{
                opacity: 0.1
              }}
            >
              <Icon className="w-16 h-16" />
            </div>

            {/* Kanji character */}
            <span
              style={{
                fontSize: '4rem',
                fontWeight: 300,
                color: 'var(--luxury-black)',
                position: 'relative',
                lineHeight: 1
              }}
            >
              {principle.kanji}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div 
        className={`
          lg:col-span-8
          ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}
        `}
      >
        <div className="luxury-card-elevated" style={{ padding: '2.5rem' }}>
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: 'var(--luxury-gray-900)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon 
                  className="w-4 h-4"
                  style={{ color: 'var(--luxury-white)' }}
                />
              </div>
              <h3
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 300,
                  color: 'var(--luxury-black)',
                  letterSpacing: '-0.01em'
                }}
              >
                {principle.romaji}
              </h3>
            </div>
            
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--luxury-gray-600)',
                fontStyle: 'italic',
                fontWeight: 300
              }}
            >
              {principle.translation}
            </p>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--luxury-gray-800)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              fontWeight: 300
            }}
          >
            {principle.description}
          </p>

          {/* Implementation */}
          <div
            style={{
              borderLeft: '2px solid var(--luxury-chrome-dark)',
              paddingLeft: '1.5rem',
              background: 'var(--luxury-gray-50)',
              marginLeft: '-2.5rem',
              marginRight: '-2.5rem',
              marginBottom: '-2.5rem',
              padding: '1.5rem 1.5rem 1.5rem 2rem',
              borderBottomLeftRadius: '3px',
              borderBottomRightRadius: '5px'
            }}
          >
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--luxury-gray-600)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
                fontWeight: 500
              }}
            >
              Implementation
            </p>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--luxury-gray-700)',
                lineHeight: 1.6,
                fontWeight: 300
              }}
            >
              {principle.implementation}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
