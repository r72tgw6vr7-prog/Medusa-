import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  artist: string;
  year: string;
  featured?: boolean;
  category: string;
}

interface GallerySectionProps {
  title: string;
  subtitle: string;
  images: GalleryImage[];
  instagramUsername?: string;
  onImageClick?: (image: GalleryImage) => void;
  className?: string;
  maxImages?: number; // Limit number of images shown (for homepage preview)
  showCTA?: boolean; // Show "View Gallery" button
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  title,
  subtitle,
  images,
  onImageClick,
  className = '',
  maxImages = 8,
  showCTA = true,
}) => {
  const navigate = useNavigate();

  // Limit images for preview
  const displayImages = images.slice(0, maxImages);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return (
    <Section 
      className={`py-16 lg:py-24 ${className} relative z-10`}
      containerSize="default"
    >
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='font-serif text-4xl md:text-5xl font-bold text-[var(--brand-gold)]'>{title}</h2>
          <p className='text-gray-300 text-lg mt-0'>{subtitle}</p>
        </div>

        {/* Gallery Grid - Sample Preview */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {displayImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: 'easeOut',
              }}
              className='group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full'
              onClick={() => onImageClick?.(image) || navigate('/gallery')}
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/images/photos/gallery/placeholder-tattoo.webp';
                }}
              />

              {/* Hover overlay */}
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col h-full' />

              {/* Gold border on hover */}
              <div className='absolute inset-0 border-2 border-transparent group-hover:border-[var(--brand-gold)] rounded-2xl transition-all duration-300 pointer-events-none flex flex-col h-full' />

              {/* Optional: Image info overlay on hover */}
              <div className='absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/80 to-transparent flex flex-col h-full'>
                <p className='text-white font-semibold text-sm'>{image.title}</p>
                <p className='text-gray-300 text-xs'>{image.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.3,
            }}
            className='flex justify-center mt-16'
          >
            <button
              onClick={() => navigate('/gallery')}
              className='bg-[var(--brand-gold)] text-black font-semibold text-lg px-8 py-8 rounded-xl hover:bg-[var(--brand-gold-hover)] hover:scale-105 transition-all duration-300 flex items-center gap-0 shadow-lg hover:shadow-gold-glow focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] focus:ring-offset-2 focus:ring-offset-[var(--deep-black)]'
            >
              Zur Galerie
              <ArrowRight className='w-5 h-5' />
            </button>
          </motion.div>
        )}
    </Section>
  );
};

export default GallerySection;
