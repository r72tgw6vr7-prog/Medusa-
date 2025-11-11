import React, { useState, useEffect } from 'react';
import { InkedNavigation } from '../components/organisms/InkedNavigation';
import { Footer } from '../components/pages';
import ErrorBoundary from '../components/layout/ErrorBoundary';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import type { GalleryImage } from '../utils/galleryUtils';
import '../styles/inked-gallery.css';

// Define the category types used by the UI (includes 'all')
type FilterCategory = 'all' | GalleryImage['category'];

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: 'All Work', value: 'all' },
  { label: 'Tattoo', value: 'tattoo' },
  { label: 'Piercing', value: 'piercing' },
  { label: 'Design', value: 'other' },
];

// Placeholder gallery data until real images are loaded
const PLACEHOLDER_IMAGES: GalleryImage[] = Array(12)
  .fill(null)
  .map((_, index) => ({
    id: `placeholder-${index}`,
    src: '/images/showcase/showcase-0' + ((index % 8) + 1) + '.jpg',
    srcset: {} as Record<string, string>,
    alt: `Tattoo Art ${index + 1}`,
    category: index % 3 === 0 ? 'tattoo' : index % 3 === 1 ? 'piercing' : 'other',
    artist: `Artist ${(index % 4) + 1}`,
    title: `Artwork Title ${index + 1}`,
    fileSize: 0,
  }));

export default function InkedGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(PLACEHOLDER_IMAGES);
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetch('/gallery/manifest.json');
        if (!response.ok) {
          console.warn('Could not load gallery manifest, using placeholder images');
          setLoading(false);
          return;
        }

        const data = await response.json();
        
        // Path validation regex
        const pathRe = /^\/(?:images|gallery)\/[\w/.-]+\.(?:jpe?g|png|webp)$/i;
        
        const isOk = (url: string) => {
          try {
            const origin = globalThis?.location?.origin;
            const base = origin ?? 'http://localhost';
            const u = new URL(url, base);
            const sameOrigin = origin ? u.origin === origin : true;
            return sameOrigin && pathRe.test(u.pathname);
          } catch {
            return false;
          }
        };

        type RawImage = {
          id?: string;
          src: string;
          srcset?: Record<string, string>;
          variants?: Array<{ size?: number }>;
          date?: string;
          category?: string;
          alt?: string;
          artist?: string;
          title?: string;
          style?: string;
        };

        const toCategory = (c?: string): GalleryImage['category'] => {
          const v = (c || '').toLowerCase();
          if (v === 'tattoo' || v === 'piercing' || v === 'portraits') return v as GalleryImage['category'];
          // Map any design-like categories to 'other'
          if (v === 'design' || v === 'artwork' || v === 'drawing') return 'other';
          return 'other';
        };

        const mapped: GalleryImage[] = (data.images as RawImage[]).reduce<GalleryImage[]>((acc, img) => {
          if (!isOk(img.src)) return acc;
          
          const srcsetObj = img.srcset ?? {};
          const cleanSet = Object.fromEntries(
            Object.entries(srcsetObj).filter(([, url]) => isOk(String(url))),
          );
          
          acc.push({
            id: img.id ?? img.src,
            src: img.src,
            srcset: cleanSet,
            alt: img.alt || 'Gallery image',
            category: toCategory(img.category),
            artist: img.artist || 'Inked Artist',
            title: img.title || 'Artwork',
            style: img.style,
            date: img.date,
            fileSize: 0,
          });
          return acc;
        }, []);

        // If we have real images, use those, otherwise keep placeholders
        if (mapped.length > 0) {
          setImages(mapped);
        }
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const filtered = filter === 'all' ? images : images.filter((img) => img.category === filter);

  return (
    <div className='min-h-screen flex flex-col bg-black text-white'>
      <ErrorBoundary>
        <InkedNavigation />
      </ErrorBoundary>
      
      <main className='flex-1 pt-24'>
        {/* Page Header */}
        <section className='inked-gallery-header pb-8'>
          <div className='container mx-auto px-8'>
            <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-8">
              Inked Showcase
            </h1>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    filter === f.value
                      ? 'bg-white text-black'
                      : 'border border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Gallery Grid */}
        <section className={loading ? 'opacity-50' : ''}>
          <div className="container mx-auto px-8 md:px-8">
            <div className='inked-gallery-grid'>
              {filtered.map((image) => (
                <div 
                  key={image.id} 
                  className="inked-gallery-item"
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    loading='lazy'
                    fallback='/images/placeholder-tattoo.jpg'
                    className='w-full h-full object-cover'
                  />
                  <div className="inked-gallery-overlay">
                    {image.title && <h3 className="text-white font-semibold text-lg mb-0">{image.title}</h3>}
                    {image.artist && <p className="text-white/80 text-sm mb-0">by {image.artist}</p>}
                    {image.category && <p className="text-white/60 text-xs uppercase tracking-wider">{image.category}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {filtered.length === 0 && !loading && (
          <div className="text-center text-white/60 py-16">
            No images in this category
          </div>
        )}
      </main>
      
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
