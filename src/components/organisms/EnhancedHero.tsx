import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight, Calendar, Star, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroStats {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface EnhancedHeroProps {
  videoUrl?: string;
  videoPoster?: string;
  fallbackImage?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  stats?: HeroStats[];
  showVideoPlayButton?: boolean;
}

const defaultStats: HeroStats[] = [
  {
    icon: <Users className="w-5 h-5" />,
    value: "1,250+",
    label: "Zufriedene Kunden"
  },
  {
    icon: <Award className="w-5 h-5" />,
    value: "15+",
    label: "Jahre Erfahrung"
  },
  {
    icon: <Star className="w-5 h-5" />,
    value: "2,000+",
    label: "Kunstwerke"
  },
  {
    icon: <Users className="w-5 h-5" />,
    value: "25+",
    label: "Künstler Team"
  }
];

export const EnhancedHero: React.FC<EnhancedHeroProps> = ({
  videoUrl,
  videoPoster,
  fallbackImage = '',
  title = "PERSONALIZED TATTOOS, TAILORED FOR YOU",
  subtitle = "Artistic Ink",
  description = "Creating skilled unique artistry with clean and safe techniques, we specialize in creating bespoke tattoos that reflect your individuality with skill and care.",
  primaryCTA = {
    text: "Our Works",
    href: "/gallery"
  },
  secondaryCTA,
  stats = [],
  showVideoPlayButton = false
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0">
        {/* Video Background */}
        {videoUrl && !videoError ? (
          <motion.div 
            className="absolute inset-0 z-10"
            style={{ y: backgroundY }}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay={isVideoPlaying}
              loop
              muted
              playsInline
              poster={videoPoster}
              onError={handleVideoError}
              onLoadedData={() => setIsVideoPlaying(true)}
            >
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
            </video>
          </motion.div>
        ) : fallbackImage ? (
          /* Fallback Image Background */
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              backgroundImage: `url(${fallbackImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              y: backgroundY,
            }}
          />
        ) : (
          /* Dark Background Only */
          <motion.div
            className="absolute inset-0 z-10 bg-gray-900"
            style={{ y: backgroundY }}
          />
        )}

        {/* Overlay Gradients */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Magenta Accent Glow */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: 'radial-gradient(40% 50% at 20% 30%, rgba(var(--brand-magenta-rgb), 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content Layer - Centered like Inked template */}
      <motion.div 
        className="relative z-30 flex-1 flex flex-col justify-center items-center text-center px-8"
        style={{ y: contentY }}
      >
        <div className="max-w-4xl mx-auto w-full min-h-screen flex flex-col justify-center space-y-8">
          
          {/* Small Badge Above Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-white/70 uppercase tracking-wider font-medium"
          >
            {subtitle}
          </motion.div>

          {/* Main Heading - Large and Bold like Inked */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight uppercase tracking-wide"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto"
          >
            {description}
          </motion.p>

          {/* Single CTA Button like Inked */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-8"
          >
            <Button
              asChild
              size="lg"
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-8 text-base font-medium backdrop-blur-sm transition-all duration-300 rounded-full"
            >
              <a href={primaryCTA.href} className="inline-flex items-center gap-0">
                {primaryCTA.text}
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Elements like Inked template */}
      <div className="absolute bottom-8 left-8 right-8 z-30 flex justify-between items-end">
        {/* Left: Social Icons and Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-8 text-white/60"
        >
          <div className="flex gap-0">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">f</div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">ig</div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">tw</div>
          </div>
          <div className="text-sm">
            <div>Experienced Tattoo Dependence</div>
          </div>
        </motion.div>

        {/* Right: Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-white/60 text-sm flex flex-col items-center gap-0"
        >
          <div>Our workshop offers a welcoming environment</div>
          <div>where creativity thrives and every tattoo is a</div>
          <div>masterpiece in the making.</div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-0"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedHero;
