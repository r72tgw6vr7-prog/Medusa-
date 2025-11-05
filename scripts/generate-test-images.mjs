#!/usr/bin/env node
/**
 * TEST IMAGE GENERATOR FOR GALLERY
 * ==================================
 * 
 * Generates placeholder images for testing the gallery optimization pipeline
 * 
 * OUTPUT:
 * - 3 tattoo images (dark blue shades)
 * - 2 piercing images (purple shades)
 * - 1 portrait image (gold shade)
 * 
 * All images: 1200x1200px JPG
 * 
 * USAGE:
 * npm run generate:test-images
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  outputDir: join(__dirname, '../public/gallery/originals'),
  imageSize: 1200,
  quality: 90,
  
  images: [
    // Tattoo images - dark blue shades
    {
      filename: 'tattoo-sleeve-blackwork.jpg',
      category: 'tattoo',
      color: { r: 30, g: 50, b: 90 }, // Dark navy blue
      text: 'TATTOO\nSLEEVE\nBLACKWORK',
    },
    {
      filename: 'tattoo-geometric-mandala.jpg',
      category: 'tattoo',
      color: { r: 20, g: 60, b: 100 }, // Deep blue
      text: 'TATTOO\nGEOMETRIC\nMANDALA',
    },
    {
      filename: 'tattoo-traditional-rose.jpg',
      category: 'tattoo',
      color: { r: 40, g: 70, b: 110 }, // Royal blue
      text: 'TATTOO\nTRADITIONAL\nROSE',
    },
    
    // Piercing images - purple shades
    {
      filename: 'piercing-nose-gold-stud.jpg',
      category: 'piercing',
      color: { r: 80, g: 40, b: 100 }, // Deep purple
      text: 'PIERCING\nNOSE\nGOLD STUD',
    },
    {
      filename: 'piercing-ear-helix.jpg',
      category: 'piercing',
      color: { r: 100, g: 50, b: 120 }, // Royal purple
      text: 'PIERCING\nEAR\nHELIX',
    },
    
    // Portrait image - gold shade
    {
      filename: 'portrait-custom-realism.jpg',
      category: 'portrait',
      color: { r: 212, g: 175, b: 55 }, // Brand gold #D4AF37
      text: 'PORTRAIT\nCUSTOM\nREALISM',
    },
  ],
};

/**
 * Generate SVG text overlay
 */
function generateTextSVG(text, color, size) {
  const lines = text.split('\n');
  const lineHeight = size * 0.15;
  const startY = (size - (lines.length * lineHeight)) / 2 + lineHeight * 0.7;
  
  const textElements = lines.map((line, index) => {
    const y = startY + (index * lineHeight);
    return `<text x="50%" y="${y}" text-anchor="middle" font-size="${size * 0.08}" font-weight="bold" fill="white" opacity="0.9">${line}</text>`;
  }).join('');
  
  const categoryBadge = `
    <rect x="${size * 0.05}" y="${size * 0.05}" width="${size * 0.25}" height="${size * 0.08}" rx="8" fill="rgba(255,255,255,0.2)"/>
    <text x="${size * 0.175}" y="${size * 0.095}" text-anchor="middle" font-size="${size * 0.04}" font-weight="bold" fill="white" opacity="0.95">${text.split('\n')[0]}</text>
  `;
  
  return `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="rgb(${color.r}, ${color.g}, ${color.b})"/>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${color.r}, ${color.g}, ${color.b});stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(${Math.max(0, color.r - 30)}, ${Math.max(0, color.g - 30)}, ${Math.max(0, color.b - 30)});stop-opacity:1" />
        </linearGradient>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect width="100%" height="100%" fill="url(#grid)"/>
      ${categoryBadge}
      <g font-family="Arial, sans-serif">
        ${textElements}
      </g>
      <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.35}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
      <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.25}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
    </svg>
  `;
}

/**
 * Generate a single test image
 */
async function generateImage(config) {
  const { filename, category, color, text } = config;
  const outputPath = join(CONFIG.outputDir, filename);
  
  try {
    // Generate SVG
    const svg = generateTextSVG(text, color, CONFIG.imageSize);
    const svgBuffer = Buffer.from(svg);
    
    // Convert to JPG with Sharp
    await sharp(svgBuffer)
      .jpeg({
        quality: CONFIG.quality,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(outputPath);
    
    const stats = await fs.stat(outputPath);
    console.log(`✅ Generated: ${filename}`);
    console.log(`   Category: ${category}`);
    console.log(`   Color: rgb(${color.r}, ${color.g}, ${color.b})`);
    console.log(`   Size: ${(stats.size / 1024).toFixed(1)} KB\n`);
    
    return { filename, category, size: stats.size };
    
  } catch (error) {
    console.error(`❌ Error generating ${filename}:`, error.message);
    return null;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 MEDUSA Gallery Test Image Generator\n');
  console.log(`📂 Output directory: ${CONFIG.outputDir}\n`);
  
  try {
    // Ensure output directory exists
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    
    // Generate all images
    const results = [];
    for (const imageConfig of CONFIG.images) {
      const result = await generateImage(imageConfig);
      if (result) results.push(result);
    }
    
    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✨ Generation complete!\n');
    console.log(`📊 Summary:`);
    console.log(`   Total images: ${results.length}`);
    
    const byCategory = results.reduce((acc, img) => {
      acc[img.category] = (acc[img.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log(`   By category:`, byCategory);
    
    const totalSize = results.reduce((sum, img) => sum + img.size, 0);
    console.log(`   Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB\n`);
    
    console.log('📋 Next steps:');
    console.log('  1. Check images in: public/gallery/originals/');
    console.log('  2. Run: npm run optimize:gallery');
    console.log('  3. Run: npm run dev');
    console.log('  4. Navigate to: /gallery\n');
    console.log('🎯 Test the category filters:');
    console.log('   - All (shows all 6 images)');
    console.log('   - Tattoo (shows 3 images)');
    console.log('   - Piercing (shows 2 images)');
    console.log('   - Portraits (shows 1 image)\n');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

export { main as generateTestImages };
