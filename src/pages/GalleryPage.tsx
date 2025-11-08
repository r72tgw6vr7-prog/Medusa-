'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
        setImages(data.images.map((img: any) => ({
          ...img,
          fileSize: img.variants.reduce((acc: number, v: any) => acc + v.size, 0),
          lastModified: img.date
        })));
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const filtered = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-(--brand-gold)">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative z-10 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl text-(--brand-gold) mb-8">Gallery</h1>

        {/* Filter Buttons */}
        <div className="flex gap-0 mb-16 flex-wrap">
          {FILTERS.map(f => (
            <motion.button
              key={f.value}
              onClick={() => setFilter(f.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === f.value
                  ? 'bg-(--brand-gold) text-[#1a1a1a]'
                  : 'border border-(--brand-gold) text-(--brand-gold) hover:bg-(--brand-gold)/10'
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map(image => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-[#2a2a2a] rounded-lg overflow-hidden flex flex-col h-full"
            >
              <img
                src={image.src}
                srcSet={Object.entries(image.srcset)
                  .map(([size, url]) => `${url} ${size}`)
                  .join(', ')}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform transition duration-200 ease-out"
              />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-(--brand-gold)">
            No images in this category
          </div>
        )}
      </div>
    </div>
  );
}
