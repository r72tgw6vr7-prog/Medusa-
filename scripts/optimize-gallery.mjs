#!/usr/bin/env node
/**
 * GALLERY IMAGE OPTIMIZATION SCRIPT v2.0
 * =======================================
 * 
 * PURPOSE:
 * Build-time image optimization for gallery images using Sharp
 * Generates responsive variants + WebP versions + manifest.json
 * 
 * DIRECTORY STRUCTURE:
 * - Input:  public/gallery/originals/*.{jpg,jpeg,png}
 * - Output: public/gallery/optimized/*.webp
 * - Manifest: public/gallery/manifest.json
 * 
 * FEATURES:
 * - Multi-size generation: 400w, 800w, 1200w
 * - WebP conversion with quality optimization (80%)
 * - Automatic category detection from filename/folder
 * - Metadata extraction (dimensions, file size, EXIF)
 * - LCP optimization: Prioritizes first 6 images
 * 
 * NAMING CONVENTION:
 * - Original: tattoo-sleeve-1.jpg
 * - Output: tattoo-sleeve-1@400w.webp, tattoo-sleeve-1@800w.webp
 * 
 * USAGE:
 * npm run optimize:gallery
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import { join, basename, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const CONFIG = {
  inputDir: join(__dirname, '../public/gallery/originals'),
  outputDir: join(__dirname, '../public/gallery/optimized'),
  manifestPath: join(__dirname, '../public/gallery/manifest.json'),
  
  // Responsive image sizes (target widths in pixels)
  sizes: [400, 800, 1200],
  
  // Quality settings
  quality: {
    webp: 80,
  },
  
  // File patterns to process
  includePatterns: ['.jpg', '.jpeg', '.png'],
  excludePatterns: ['placeholder', 'icon', 'logo', 'thumb'],
};

/**
 * Check if file should be processed
 */
function shouldProcess(filename) {
  const ext = extname(filename).toLowerCase();
  const name = basename(filename, ext).toLowerCase();
  
  // Include if extension matches
  if (!CONFIG.includePatterns.includes(ext)) return false;
  
  // Exclude if name matches exclusion pattern
  for (const pattern of CONFIG.excludePatterns) {
    if (name.includes(pattern)) return false;
  }
  
  return true;
}

/**
 * Detect category from filename or path
 */
function detectCategory(filename) {
  const name = filename.toLowerCase();
  
  if (name.includes('portrait')) return 'portraits';
  if (name.includes('piercing')) return 'piercing';
  if (name.includes('tattoo') || name.includes('sleeve') || name.includes('ink')) return 'tattoo';
  
  // Default to tattoo if unclear
  return 'tattoo';
}

/**
 * Generate responsive image variants
 */
async function generateVariants(inputPath, filename) {
  const ext = extname(filename);
  const nameWithoutExt = basename(filename, ext);
  const variants = [];
  
  try {
    // Load original image
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`\n📸 Processing: ${filename}`);
    console.log(`   Original: ${metadata.width}x${metadata.height} (${metadata.format})`);
    
    // Generate each size variant
    for (const targetWidth of CONFIG.sizes) {
      // Skip if target width is larger than original
      if (targetWidth > metadata.width) {
        console.log(`   ⏭️  Skipping ${targetWidth}w (larger than original)`);
        continue;
      }
      
      // WebP version
      const webpFilename = `${nameWithoutExt}@${targetWidth}w.webp`;
      const webpPath = join(CONFIG.outputDir, webpFilename);
      
      await image
        .clone()
        .resize(targetWidth, null, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: CONFIG.quality.webp })
        .toFile(webpPath);
      
      const webpStats = await fs.stat(webpPath);
      console.log(`   ✅ Generated: ${webpFilename} (${(webpStats.size / 1024).toFixed(1)} KB)`);
      
      variants.push({
        width: targetWidth,
        format: 'webp',
        filename: webpFilename,
        url: `/gallery/optimized/${webpFilename}`,
        size: webpStats.size,
      });
    }
    
    return {
      original: filename,
      width: metadata.width,
      height: metadata.height,
      aspectRatio: (metadata.width / metadata.height).toFixed(2),
      format: metadata.format,
      category: detectCategory(filename),
      variants,
    };
    
  } catch (error) {
    console.error(`   ❌ Error processing ${filename}:`, error.message);
    return null;
  }
}

/**
 * Generate gallery manifest
 */
async function generateManifest(optimizedImages) {
  const manifest = {
    version: '2.0.0',
    generatedAt: new Date().toISOString(),
    stats: {
      totalImages: optimizedImages.length,
      totalVariants: optimizedImages.reduce((sum, img) => sum + img.variants.length, 0),
      totalSize: optimizedImages.reduce((sum, img) => 
        sum + img.variants.reduce((vSum, v) => vSum + v.size, 0), 0
      ),
      byCategory: optimizedImages.reduce((acc, img) => {
        acc[img.category] = (acc[img.category] || 0) + 1;
        return acc;
      }, {}),
    },
    images: optimizedImages.map((img, index) => {
      // Generate metadata
      const id = `gallery-${index + 1}`;
      const baseName = img.original.replace(/\.(jpg|jpeg|png)$/i, '');
      
      // Extract title from filename (e.g., "tattoo-sleeve-1" → "Tattoo Sleeve 1")
      const title = baseName
        .split(/[-_]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return {
        id,
        original: img.original,
        title,
        category: img.category,
        width: img.width,
        height: img.height,
        aspectRatio: img.aspectRatio,
        variants: img.variants,
        // Performance hints
        loading: index < 6 ? 'eager' : 'lazy', // First 6 images load eagerly
        priority: index < 3, // First 3 are priority (above fold)
        // Default metadata
        src: img.variants.find(v => v.width === 800)?.url || img.variants[0]?.url,
        alt: title,
        artist: 'Medusa Team', // Default, can be enhanced later
        style: img.category === 'portraits' ? 'Portrait' : 'Custom',
        date: new Date().toISOString().split('T')[0],
        featured: index < 3, // Mark first 3 as featured
      };
    }),
  };
  
  await fs.writeFile(
    CONFIG.manifestPath,
    JSON.stringify(manifest, null, 2),
    'utf-8'
  );
  
  console.log(`\n✅ Manifest generated: ${CONFIG.manifestPath}`);
  console.log(`   Total images: ${manifest.stats.totalImages}`);
  console.log(`   Total variants: ${manifest.stats.totalVariants}`);
  console.log(`   Total size: ${(manifest.stats.totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Categories:`, manifest.stats.byCategory);
  
  return manifest;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 MEDUSA Gallery Image Optimization v2.0\n');
  console.log(`📂 Input directory: ${CONFIG.inputDir}`);
  console.log(`📂 Output directory: ${CONFIG.outputDir}\n`);
  
  try {
    // Ensure directories exist
    await fs.mkdir(CONFIG.inputDir, { recursive: true });
    await fs.mkdir(CONFIG.outputDir, { recursive: true });
    
    // Check if input directory has files
    let files;
    try {
      files = await fs.readdir(CONFIG.inputDir);
    } catch (error) {
      console.log('⚠️  Input directory not found. Creating structure...');
      await fs.mkdir(CONFIG.inputDir, { recursive: true });
      console.log(`\n📁 Created: ${CONFIG.inputDir}`);
      console.log('\n📋 NEXT STEPS:');
      console.log('   1. Place your original gallery images in:');
      console.log(`      ${CONFIG.inputDir}`);
      console.log('   2. Run this script again: npm run optimize:gallery\n');
      return;
    }
    
    const imageFiles = files.filter(shouldProcess);
    
    if (imageFiles.length === 0) {
      console.log('⚠️  No images found to process.');
      console.log(`\n📋 INSTRUCTIONS:`);
      console.log(`   1. Place your gallery images in: ${CONFIG.inputDir}`);
      console.log(`   2. Supported formats: JPG, JPEG, PNG`);
      console.log(`   3. Naming examples:`);
      console.log(`      - tattoo-sleeve-1.jpg`);
      console.log(`      - piercing-nose-gold.jpg`);
      console.log(`      - portrait-custom-1.jpg`);
      console.log(`   4. Run script again: npm run optimize:gallery\n`);
      return;
    }
    
    console.log(`📋 Found ${imageFiles.length} images to process\n`);
    
    // Process all images
    const optimizedImages = [];
    for (const filename of imageFiles) {
      const inputPath = join(CONFIG.inputDir, filename);
      const result = await generateVariants(inputPath, filename);
      if (result) {
        optimizedImages.push(result);
      }
    }
    
    // Generate manifest
    await generateManifest(optimizedImages);
    
    console.log('\n✨ Optimization complete!\n');
    console.log('📋 Next steps:');
    console.log('  1. Check optimized images in: public/gallery/optimized/');
    console.log('  2. Review manifest: public/gallery/manifest.json');
    console.log('  3. Run `npm run dev` to test the gallery');
    console.log('  4. Check Lighthouse performance score\n');
    
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

export { main as optimizeGallery, generateManifest };
