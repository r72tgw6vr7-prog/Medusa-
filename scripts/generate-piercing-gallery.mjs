#!/usr/bin/env node

import { readdir, writeFile, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

// Configuration - Only piercing images
const GALLERY_ROOT = 'public/images/gallery/piercings';
const OUTPUT_FILE = 'src/data/gallery-index.json';
const SUPPORTED_EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png'];

// Utility functions
function sanitizeFilename(filename) {
  return filename
    .replace(/[^\w\-_\.]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

function generateTitle(filename, artistName) {
  const name = basename(filename, extname(filename));
  
  // Piercing style patterns
  const piercingPatterns = {
    'helix': 'Helix Piercing',
    'tragus': 'Tragus Piercing',
    'conch': 'Conch Piercing',
    'daith': 'Daith Piercing',
    'rook': 'Rook Piercing',
    'lobe': 'Lobe Piercing',
    'industrial': 'Industrial Piercing',
    'septum': 'Septum Piercing',
    'nostril': 'Nostril Piercing',
    'bridge': 'Bridge Piercing',
    'eyebrow': 'Eyebrow Piercing',
    'lip': 'Lip Piercing',
    'tongue': 'Tongue Piercing',
    'navel': 'Navel Piercing',
    'nipple': 'Nipple Piercing'
  };
  
  // Extract piercing type from filename
  const nameLower = name.toLowerCase();
  let detectedType = 'Professional Piercing';
  
  for (const [pattern, type] of Object.entries(piercingPatterns)) {
    if (nameLower.includes(pattern)) {
      detectedType = type;
      break;
    }
  }
  
  // Clean up filename for title
  const cleanName = name
    .replace(/[@_\-]/g, ' ')
    .replace(/\d+w/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  return cleanName || `${detectedType} by ${artistName}`;
}

function extractArtistFromPath(path) {
  const pathParts = path.split('/');
  
  // Pattern: gallery/piercings/ArtistName/...
  if (pathParts.includes('piercings')) {
    const categoryIndex = pathParts.findIndex(p => p === 'piercings');
    if (categoryIndex >= 0 && pathParts[categoryIndex + 1]) {
      return pathParts[categoryIndex + 1];
    }
  }
  
  return 'Professional Piercer';
}

function isResponsiveVariant(filename) {
  return /@\d+w\.(webp|jpg|jpeg|png)$/i.test(filename);
}

function getImageDate(filename) {
  // Try to extract date from filename patterns
  const datePatterns = [
    /(\d{4})-(\d{2})-(\d{2})/,
    /(\d{4})(\d{2})(\d{2})/,
    /PHOTO-(\d{4})-(\d{2})-(\d{2})/
  ];
  
  for (const pattern of datePatterns) {
    const match = filename.match(pattern);
    if (match) {
      const [, year, month, day] = match;
      return `${year}-${month}`;
    }
  }
  
  return '2024-01';
}

async function scanDirectory(dirPath) {
  const images = [];
  
  try {
    const items = await readdir(dirPath, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = join(dirPath, item.name);
      
      if (item.isDirectory()) {
        const subImages = await scanDirectory(fullPath);
        images.push(...subImages);
      } else if (item.isFile()) {
        const ext = extname(item.name).toLowerCase();
        
        if (SUPPORTED_EXTENSIONS.includes(ext) && !isResponsiveVariant(item.name)) {
          const relativePath = fullPath.replace('public/', '/');
          const artist = extractArtistFromPath(fullPath);
          const title = generateTitle(item.name, artist);
          const date = getImageDate(item.name);
          
          const stats = await stat(fullPath);
          
          images.push({
            id: `${artist.toLowerCase()}_${sanitizeFilename(basename(item.name, ext))}`,
            src: relativePath,
            title,
            artist,
            category: 'piercing',
            style: generateTitle(item.name, artist).split(' by ')[0],
            date,
            featured: Math.random() < 0.25, // 25% chance for piercings to be featured
            fileSize: stats.size,
            lastModified: stats.mtime.toISOString(),
            alt: `${title} - Professional piercing by ${artist} at Medusa Tattoo München`
          });
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not scan directory ${dirPath}:`, error.message);
  }
  
  return images;
}

async function generatePiercingOnlyIndex() {
  console.log('🔍 Scanning piercing images only...');
  
  try {
    const images = await scanDirectory(GALLERY_ROOT);
    
    // Sort by date and artist
    images.sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return a.artist.localeCompare(b.artist);
    });
    
    const stats = {
      totalImages: images.length,
      byArtist: {},
      byCategory: { piercing: images.length },
      byDate: {},
      featured: images.filter(img => img.featured).length,
      totalSize: images.reduce((sum, img) => sum + img.fileSize, 0),
      lastGenerated: new Date().toISOString()
    };
    
    images.forEach(img => {
      stats.byArtist[img.artist] = (stats.byArtist[img.artist] || 0) + 1;
      stats.byDate[img.date] = (stats.byDate[img.date] || 0) + 1;
    });
    
    const galleryData = {
      version: '2.0.0',
      generatedAt: new Date().toISOString(),
      stats,
      images
    };
    
    await writeFile(OUTPUT_FILE, JSON.stringify(galleryData, null, 2));
    
    console.log('✅ Piercing-only gallery index generated!');
    console.log(`📊 Portfolio cleaned up:`);
    console.log(`   Piercing images: ${stats.totalImages}`);
    console.log(`   Featured: ${stats.featured}`);
    console.log(`   Total size: ${(stats.totalSize / 1024 / 1024).toFixed(1)}MB`);
    console.log(`   Artists: ${Object.keys(stats.byArtist).join(', ')}`);
    console.log(`   🗑️ Tattoo images removed from gallery display`);
    
    return galleryData;
    
  } catch (error) {
    console.error('❌ Failed to generate piercing gallery index:', error);
    process.exit(1);
  }
}

generatePiercingOnlyIndex();