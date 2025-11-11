import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface StoryImage {
  src: string;
  alt: string;
}

const STORY_IMAGES: StoryImage[] = [
  {
    src: '/images/story/story-thumb-01.jpg',
    alt: 'Tattoo studio interior'
  },
  {
    src: '/images/story/story-thumb-02.jpg', 
    alt: 'Artist at work'
  },
  {
    src: '/images/story/story-thumb-03.jpg',
    alt: 'Studio atmosphere'
  },
  {
    src: '/images/story/story-thumb-04.jpg',
    alt: 'Tattoo equipment'
  },
  {
    src: '/images/story/story-thumb-05.jpg',
    alt: 'Client consultation'
  },
  {
    src: '/images/story/story-thumb-06.jpg',
    alt: 'Finished artwork'
  }
];

const STATS = [
  {
    icon: '/icons/satisfy.svg',
    number: '1250+',
    label: 'Satisfy Customers'
  },
  {
    icon: '/icons/experience.svg', 
    number: '14',
    label: 'Years of Experience'
  },
  {
    icon: '/icons/collection.svg',
    number: '2,000',
    label: 'Tattoos & Artworks Collection'
  },
  {
    icon: '/icons/team.svg',
    number: '25+',
    label: 'The Awesome Team'
  }
];

export const InkedStorySection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Auto-scroll animation
    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled past all images
      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      carousel.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 uppercase tracking-wide">
            Our Story
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Dedicated professionals bringing your tattoo ideas to life with skill and care
          </p>
        </motion.div>

        {/* Moving Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16 overflow-hidden"
        >
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-hidden"
            style={{ width: 'calc(200% + 2rem)' }}
          >
            {/* Duplicate images for seamless loop */}
            {[...STORY_IMAGES, ...STORY_IMAGES].map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 h-64 rounded-lg overflow-hidden"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-studio.jpg';
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Operational Hours */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-wide">
                Operational Hour
              </h3>
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Monday - Friday</span>
                  <span className="text-white font-medium">07AM - 10PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Saturday</span>
                  <span className="text-white font-medium">09AM - 10PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Sunday</span>
                  <span className="text-white font-medium">Closed</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-8">
              <p className="text-white/70 leading-relaxed">
                Whether you're drawn to bold designs, intricate details, or meaningful symbols, we're here to collaborate closely with you.
              </p>
              <p className="text-white/70 leading-relaxed">
                With a team of talented tattoo artists who blend skill with passion, we specialize in crafting bespoke tattoos that reflect your individuality. Whether you're drawn to bold designs, intricate details, or meaningful symbols.
              </p>
              
              {/* About Us Button */}
              <a
                href="/about"
                className="inline-flex items-center gap-0 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-8 rounded-full font-medium transition-all duration-300 group flex-col h-full"
              >
                About us
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* Right Content - Large Story Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-lg overflow-hidden flex flex-col h-full">
              <img
                src="/images/story/story-main.jpg"
                alt="Our tattoo studio story"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder-story.jpg';
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-8 bg-white/10 rounded-full flex items-center justify-center flex-col h-full">
                <img
                  src={stat.icon}
                  alt={stat.label}
                  className="w-8 h-8"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/icons/placeholder.svg';
                  }}
                />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-0">
                {stat.number}
              </div>
              <div className="text-white/70 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InkedStorySection;
