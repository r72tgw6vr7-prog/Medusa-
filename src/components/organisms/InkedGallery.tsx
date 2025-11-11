import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  artist: string;
  year: string;
  category: string;
}

interface InkedGalleryProps {
  images?: GalleryImage[];
  maxImages?: number;
}

const DEFAULT_IMAGES: GalleryImage[] = [
  {
    id: '1',
    imageUrl: '/images/gallery/tattoo-1.jpg',
    title: 'Realism Portrait',
    artist: 'Artist 1',
    year: '2024',
    category: 'tattoo'
  },
  {
    id: '2', 
    imageUrl: '/images/gallery/tattoo-2.jpg',
    title: 'Traditional Design',
    artist: 'Artist 2',
    year: '2024',
    category: 'tattoo'
  },
  {
    id: '3',
    imageUrl: '/images/gallery/tattoo-3.jpg',
    title: 'Blackwork Art',
    artist: 'Artist 3',
    year: '2024',
    category: 'tattoo'
  },
  {
    id: '4',
    imageUrl: '/images/gallery/piercing-1.jpg',
    title: 'Professional Piercing',
    artist: 'Artist 4',
    year: '2024',
    category: 'piercing'
  },
  {
    id: '5',
    imageUrl: '/images/gallery/tattoo-4.jpg',
    title: 'Fine Line Work',
    artist: 'Artist 1',
    year: '2024',
    category: 'tattoo'
  },
  {
    id: '6',
    imageUrl: '/images/gallery/tattoo-5.jpg',
    title: 'Color Piece',
    artist: 'Artist 2',
    year: '2024',
    category: 'tattoo'
  },
  {
    id: '7',
    imageUrl: '/images/gallery/tattoo-6.jpg',
    title: 'Sketch Design',
    artist: 'Artist 3',
    year: '2024',
    category: 'tattoo'
  },
  {
    id: '8',
    imageUrl: '/images/gallery/tattoo-7.jpg',
    title: 'Artist Working',
    artist: 'Artist 1',
    year: '2024',
    category: 'tattoo'
  },
  {
    id: '9',
    imageUrl: '/images/gallery/tattoo-8.jpg',
    title: 'Back Piece',
    artist: 'Artist 2',
    year: '2024',
    category: 'tattoo'
  },
  {
    id: '10',
    imageUrl: '/images/gallery/tattoo-9.jpg',
    title: 'Sleeve Design',
    artist: 'Artist 3',
    year: '2024',
    category: 'tattoo'
  },
  {
    id: '11',
    imageUrl: '/images/gallery/tattoo-10.jpg',
    title: 'Detail Work',
    artist: 'Artist 1',
    year: '2024',
    category: 'tattoo'
  },
  {
    id: '12',
    imageUrl: '/images/gallery/tattoo-11.jpg',
    title: 'Abstract Art',
    artist: 'Artist 2',
    year: '2024',
    category: 'tattoo'
  }
];

export const InkedGallery: React.FC<InkedGalleryProps> = ({
  images = DEFAULT_IMAGES,
  maxImages = 12
}) => {
  const displayImages = images.slice(0, maxImages);
  
  console.log('🎨 InkedGallery LOADED - Masonry layout with', displayImages.length, 'images');

  return (
    <section className="py-24 bg-black" data-section="inked-gallery" style={{ border: '2px solid red' }}>
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-sm text-white/60 uppercase tracking-wider font-medium mb-8">
            Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 uppercase tracking-wide">
            Inked Showcase
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Discover our latest creations and artistic masterpieces crafted with precision and passion
          </p>
        </motion.div>

        {/* Gallery Grid - Masonry Layout like Inked Template */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-8 mb-16 space-y-8">
          {displayImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 break-inside-avoid mb-8"
            >
              {/* Image */}
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/placeholder-gallery.jpg';
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-white font-bold text-lg mb-0">
                  {image.title}
                </h3>
                <p className="text-white/80 text-sm mb-0">
                  by {image.artist}
                </p>
                <p className="text-white/60 text-xs uppercase tracking-wider">
                  {image.category}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-lg transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/60 mb-8">
            Explore our complete portfolio of artistic creations
          </p>
          <a
            href="/gallery"
            className="inline-flex items-center gap-0 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-8 rounded-full font-medium transition-all duration-300 group"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InkedGallery;
