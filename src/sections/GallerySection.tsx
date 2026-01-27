import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import { SectionHeading } from '@/components/SectionHeading';
interface GalleryImage {
  id: string;
  imageUrl: string;
  fallbackUrl?: string;
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

  const isFileUrl = (src: string) => /\.(avif|webp|png|jpe?g)$/i.test(src);

  // Limit images for preview
  const displayImages = images.slice(0, maxImages);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return (
    <Section
      bg='none'
      spacing='none'
      variant='default'
      className={`py-16 lg:py-24 ${className} relative z-10`}
    >
      <Container size='default'>
        {/* Header - Primary Section (h2) */}
        <div className='mb-16'>
          <SectionHeading eyebrow='Galerie' title={title} subtitle={subtitle} level='primary' />
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
              {isFileUrl(image.imageUrl) ? (
                <img
                  src={encodeURI(image.imageUrl)}
                  alt={image.title}
                  width={640}
                  height={640}
                  loading='lazy'
                  className='w-full h-full object-fill grayscale hover:grayscale-0 transition-all duration-500'
                  onError={(e) => {
                    if (!image.fallbackUrl) return;
                    const target = e.target as HTMLImageElement;
                    const currentSrc = target.getAttribute('src');
                    const nextSrc = encodeURI(image.fallbackUrl);
                    if (currentSrc !== nextSrc) {
                      target.setAttribute('src', nextSrc);
                    }
                  }}
                />
              ) : (
                <picture>
                  <source
                    type='image/avif'
                    srcSet={[400, 640, 960]
                      .map((size) => `${encodeURI(`${image.imageUrl}-${size}w.avif`)} ${size}w`)
                      .join(', ')}
                    sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                  />
                  <source
                    type='image/webp'
                    srcSet={[400, 640, 960]
                      .map((size) => `${encodeURI(`${image.imageUrl}-${size}w.webp`)} ${size}w`)
                      .join(', ')}
                    sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                  />
                  <img
                    src={encodeURI(
                      image.fallbackUrl ? image.fallbackUrl : `${image.imageUrl}-640w.webp`,
                    )}
                    alt={image.title}
                    width={640}
                    height={640}
                    loading='lazy'
                    className='w-full h-full object-fill grayscale hover:grayscale-0 transition-all duration-500'
                    onError={(e) => {
                      if (!image.fallbackUrl) return;
                      const target = e.target as HTMLImageElement;
                      const currentSrc = target.getAttribute('src');
                      const nextSrc = encodeURI(image.fallbackUrl);
                      if (currentSrc !== nextSrc) {
                        target.setAttribute('src', nextSrc);
                      }
                    }}
                  />
                </picture>
              )}

              {/* Hover overlay */}
              <div className='absolute inset-0 bg-luxury-bg-dark/0 group-hover:bg-luxury-bg-dark/40 transition-all duration-300 flex flex-col h-full' />

              {/* Chrome border on hover */}
              <div className='absolute inset-0 border-2 border-transparent group-hover:border-(--brand-accent) rounded-2xl transition-all duration-300 pointer-events-none flex flex-col h-full' />

              {/* Optional: Image info overlay on hover */}
              <div className='absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/80 to-transparent flex flex-col h-full'>
                <p className='text-luxury-text-inverse font-semibold text-sm'>{image.title}</p>
                <p className='text-luxury-text-inverse/70 text-sm lg:text-xs'>{image.category}</p>
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
              className='inline-flex items-center justify-center gap-8 px-8 py-8 bg-(--brand-accent) text-(--deep-black) font-semibold text-lg hover:bg-(--brand-accent-hover) transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--brand-accent) focus:ring-offset-2 focus:ring-offset-(--deep-black)'
            >
              Zur Galerie
              <ArrowRight className='w-5 h-5' />
            </button>
          </motion.div>
        )}
      </Container>
    </Section>
  );
};

export default GallerySection;
