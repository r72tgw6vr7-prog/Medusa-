#!/usr/bin/env node

import { readdir, writeFile, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';

// Configuration
const GALLERY_ROOT = 'public/images/gallery';
const OUTPUT_FILE = 'src/data/gallery-index.json';
const SUPPORTED_EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png'];

// Utility functions
function sanitizeFilename(filename) {
  return filename
    .replace(/[^\w\-_\.]/g, '_') // Replace special chars with underscore
    .replace(/_+/g, '_') // Multiple underscores to single
    .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
}

function generateTitle(filename, artistName) {
  const name = basename(filename, extname(filename));
  
  // Common tattoo style patterns
  const stylePatterns = {
    'oldschool': 'Old School',
    'traditional': 'Traditional',
    'realistic': 'Realistic',
    'blackwork': 'Blackwork',
    'linework': 'Linework',
    'fineline': 'Fine Line',
    'lettering': 'Lettering',
    'tribal': 'Tribal',
    'biomechanic': 'Biomechanic',
    'mandala': 'Mandala',
    'flash': 'Flash Art',
    'anime': 'Anime Style',
    'symetric': 'Symmetric Design',
    'butterfly': 'Butterfly',
    'qualle': 'Jellyfish',
    'floral': 'Floral Design'
  };
  
  // Extract style from filename
  const nameLower = name.toLowerCase();
  let detectedStyle = 'Custom Design';
  
  for (const [pattern, style] of Object.entries(stylePatterns)) {
    if (nameLower.includes(pattern)) {
      detectedStyle = style;
      break;
    }
  }
  
  // Clean up filename for title
  const cleanName = name
    .replace(/[@_\-]/g, ' ')
    .replace(/\d+w/g, '') // Remove responsive sizes
    .replace(/\s+/g, ' ')
    .trim();
  
  return cleanName || `${detectedStyle} by ${artistName}`;
}

function detectCategory(path) {
  if (path.includes('/tattoos/')) return 'tattoo';
  if (path.includes('/piercings/')) return 'piercing';
  return 'other';
}

function extractArtistFromPath(path) {
  const pathParts = path.split('/');
  
  // Pattern: gallery/tattoos/ArtistName/...
  if (pathParts.includes('tattoos') || pathParts.includes('piercings')) {
    const categoryIndex = pathParts.findIndex(p => p === 'tattoos' || p === 'piercings');
    if (categoryIndex >= 0 && pathParts[categoryIndex + 1]) {
      return pathParts[categoryIndex + 1];
    }
  }
  
  return 'Unknown Artist';
}

function isResponsiveVariant(filename) {
  return /@\d+w\.(webp|jpg|jpeg|png)$/i.test(filename);
}

function getImageDate(filename) {
  // Try to extract date from filename patterns
  const datePatterns = [
    /(\d{4})-(\d{2})-(\d{2})/,  // YYYY-MM-DD
    /(\d{4})(\d{2})(\d{2})/,    // YYYYMMDD
    /PHOTO-(\d{4})-(\d{2})-(\d{2})/  // PHOTO-YYYY-MM-DD
  ];
  
  for (const pattern of datePatterns) {
    const match = filename.match(pattern);
    if (match) {
      const [, year, month, day] = match;
      return `${year}-${month}`;
    }
  }
  
  // Default to current year if no date found
  return '2024-01';
}

async function scanDirectory(dirPath) {
  const images = [];
  
  try {
    const items = await readdir(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = join(dirPath, item.name);
      
      if (item.isDirectory()) {
        // Recursively scan subdirectories
        const subImages = await scanDirectory(fullPath);
        images.push(...subImages);
      } else if (item.isFile()) {
        const ext = extname(item.name).toLowerCase();
        
        if (SUPPORTED_EXTENSIONS.includes(ext) && !isResponsiveVariant(item.name)) {
          const relativePath = fullPath.replace('public/', '/');
          const artist = extractArtistFromPath(fullPath);
          const category = detectCategory(fullPath);
          const title = generateTitle(item.name, artist);
          const date = getImageDate(item.name);
          
          // Get file stats for additional metadata
          const stats = await stat(fullPath);
          
          images.push({
            id: `${artist.toLowerCase()}_${sanitizeFilename(basename(item.name, ext))}`,
            src: relativePath,
            title,
            artist,
            category,
            style: generateTitle(item.name, artist).split(' by ')[0],
            date,
            featured: Math.random() < 0.15, // 15% chance to be featured
            fileSize: stats.size,
            lastModified: stats.mtime.toISOString(),
            alt: `${title} - Professional ${category} by ${artist} at Medusa Tattoo München`
          });
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not scan directory ${dirPath}:`, error.message);
  }
  
  return images;
}

async function generateGalleryIndex() {
  console.log('🔍 Scanning gallery images...');
  
  try {
    const images = await scanDirectory(GALLERY_ROOT);
    
    // Sort images by date (newest first) and then by artist
    images.sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return a.artist.localeCompare(b.artist);
    });
    
    // Generate statistics
    const stats = {
      totalImages: images.length,
      byArtist: {},
      byCategory: {},
      byDate: {},
      featured: images.filter(img => img.featured).length,
      totalSize: images.reduce((sum, img) => sum + img.fileSize, 0),
      lastGenerated: new Date().toISOString()
    };
    
    // Calculate statistics
    images.forEach(img => {
      stats.byArtist[img.artist] = (stats.byArtist[img.artist] || 0) + 1;
      stats.byCategory[img.category] = (stats.byCategory[img.category] || 0) + 1;
      stats.byDate[img.date] = (stats.byDate[img.date] || 0) + 1;
    });
    
    const galleryData = {
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
      stats,
      images
    };
    
    // Write to file
    await writeFile(OUTPUT_FILE, JSON.stringify(galleryData, null, 2));
    
    console.log('✅ Gallery index generated successfully!');
    console.log(`📊 Statistics:`);
    console.log(`   Total images: ${stats.totalImages}`);
    console.log(`   Featured: ${stats.featured}`);
    console.log(`   Total size: ${(stats.totalSize / 1024 / 1024).toFixed(1)}MB`);
    console.log(`   Artists: ${Object.keys(stats.byArtist).join(', ')}`);
    console.log(`   Categories: ${Object.keys(stats.byCategory).join(', ')}`);
    
    return galleryData;
    
  } catch (error) {
    console.error('❌ Failed to generate gallery index:', error);
    process.exit(1);
  }
}

// Run the generator
generateGalleryIndex();