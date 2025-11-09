'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { PageHeader } from '../components/ui/PageHeader';
import type { GalleryImage } from '../utils/galleryUtils';
type GalleryCategory = 'all' | 'tattoo' | 'piercing' | 'portraits';

type FilterCategory = 'all' | 'tattoo' | 'piercing' | 'portraits';

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Tattoo', value: 'tattoo' },
  { label: 'Piercing', value: 'piercing' },
  { label: 'Portraits', value: 'portraits' },
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetch('/gallery/manifest.json');
        const data = await response.json();
        setImages(
          data.images.map((img: any) => ({
            ...img,
            fileSize: img.variants.reduce((acc: number, v: any) => acc + v.size, 0),
            lastModified: img.date,
          })),
        );
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const filtered = filter === 'all' ? images : images.filter((img) => img.category === filter);

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col'>
        <MainNavigation />
        <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-[var(--brand-gold)]'>Loading gallery...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      <main className='flex-1'>
        {/* Page Header - Matches Services page exactly */}
        <section className='relative z-10 py-8 md:py-8 lg:py-16'>
          <div className='px-8 md:px-8 lg:px-16'>
            <div className='mx-auto w-full' style={{ maxWidth: 'var(--container-width-lg)' }}>
              <PageHeader
                eyebrow='Medusa München'
                title='Gallery'
                subtitle='Entdecken Sie unsere beeindruckendsten Kunstwerke'
                alignment='center'
              />
            </div>
          </div>
        </section>

        <section className='py-8 md:py-8 lg:py-16'>
          <div className='px-8 md:px-8 lg:px-16'>
            <div className='mx-auto w-full' style={{ maxWidth: 'var(--container-width-lg)' }}>
              {/* Filter Buttons */}
              <div
                className='flex flex-wrap justify-center'
                style={{ gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-8)' }}
              >
                {FILTERS.map((f) => (
                  <motion.button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`font-medium transition-all ${
                      filter === f.value
                        ? 'bg-[var(--brand-gold)] text-[#1a1a1a]'
                        : 'border border-[var(--brand-gold)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)]/10'
                    }`}
                    style={{
                      padding: 'var(--spacing-1-5) var(--spacing-3)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    {f.label}
                  </motion.button>
                ))}
              </div>

              {/* Gallery Grid - 3 columns to match Services page */}
              <div
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                style={{ gap: 'var(--spacing-4)' }}
              >
                {filtered.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='aspect-square bg-[#2a2a2a] overflow-hidden flex flex-col h-full'
                    style={{ borderRadius: 'var(--radius-lg)' }}
                  >
                    <img
                      src={image.src}
                      srcSet={Object.entries(image.srcset)
                        .map(([size, url]) => `${url} ${size}`)
                        .join(', ')}
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      alt={image.alt}
                      loading='lazy'
                      className='w-full h-full object-cover hover:scale-105 transition-transform transition duration-200 ease-out'
                    />
                  </motion.div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className='text-center text-[var(--brand-gold)]'>
                  No images in this category
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
