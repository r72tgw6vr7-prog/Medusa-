'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MainNavigation } from '../components/molecules/MainNavigation';
import { Footer } from '../components/pages';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { PageHeader } from '@/components/atoms';
import type { GalleryImage } from '../utils/galleryUtils';

type FilterCategory = 'all' | 'tattoo' | 'piercing' | 'portraits';

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Tattoo', value: 'tattoo' },
  { label: 'Piercing', value: 'piercing' },
  { label: 'Portraits', value: 'portraits' },
];

export default function GalleryPage() {
  const [safeImages, setSafeImages] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetch('/gallery/manifest.json');
        const data = await response.json();
        // Local allowlist for manifest URLs (same as render-level guard)
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
          return v === 'tattoo' || v === 'piercing' || v === 'portraits' ? (v as GalleryImage['category']) : 'other';
        };

        const mapped: GalleryImage[] = (data.images as RawImage[]).reduce<GalleryImage[]>((acc, img) => {
          if (!isOk(img.src)) return acc;
          const srcsetObj = img.srcset ?? {};
          const cleanSet = Object.fromEntries(
            Object.entries(srcsetObj).filter(([, url]) => isOk(String(url))),
          );
          const fileSize = (img.variants ?? []).reduce(
            (sum: number, v: { size?: number }) => sum + (typeof v?.size === 'number' ? v.size : 0),
            0,
          );
          acc.push({
            id: img.id ?? img.src,
            src: img.src,
            srcset: cleanSet,
            alt: img.alt || 'Gallery image',
            category: toCategory(img.category),
            artist: img.artist,
            title: img.title,
            style: img.style,
            date: img.date,
            featured: undefined,
            fileSize,
            lastModified: img.date,
          });
          return acc;
        }, []);

        setSafeImages(mapped);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const allowedPathRe = /^\/(?:images|gallery)\/[\w/.-]+\.(?:jpe?g|png|webp)$/i;
  const isAllowedUrl = (url: string) => {
    try {
      const origin = globalThis?.location?.origin;
      const base = origin ?? 'http://localhost';
      const u = new URL(url, base);
      const sameOrigin = origin ? u.origin === origin : true;
      return sameOrigin && allowedPathRe.test(u.pathname);
    } catch {
      return false;
    }
  };

  const sanitizeSrcset = (srcset: Record<string, string>) =>
    Object.entries(srcset)
      .filter(([, url]) => isAllowedUrl(url))
      .map(([size, url]) => `${url} ${size}`)
      .join(', ');

  const filtered = filter === 'all' ? safeImages : safeImages.filter((img) => img.category === filter);

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col'>
        <MainNavigation />
        <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-[var(--brand-primary)]'>Loading gallery...</div>
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
                eyebrow='Your Business'
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
                        ? 'bg-[var(--brand-primary)] text-[#1a1a1a]'
                        : 'border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/10'
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
                {filtered.map((image) => {
                  const safeSet = sanitizeSrcset(image.srcset);
                  return (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='aspect-square bg-[var(--color-surface-medium)] overflow-hidden flex flex-col h-full'
                    style={{ borderRadius: 'var(--radius-lg)' }}
                  >
                    <ImageWithFallback
                      src={image.src}
                      srcSet={safeSet}
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      alt={image.alt}
                      loading='lazy'
                      fallback='/images/placeholder-tattoo.jpg'
                      className='w-full h-full object-cover hover:scale-105 transition-transform transition duration-200 ease-out'
                    />
                  </motion.div>
                );})}
              </div>

              {filtered.length === 0 && (
                <div className='text-center text-[var(--brand-primary)]'>
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
