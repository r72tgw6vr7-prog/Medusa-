#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ROOT = join(__dirname, '..');
const GALLERY_INPUT = join(PROJECT_ROOT, 'public/assets/images/photos/gallery/tattoo');
const GALLERY_OUTPUT = join(PROJECT_ROOT, 'public/assets/images/photos/gallery/optimized');

// Responsive sizes for hero and gallery
const SIZES = {
  hero: [640, 960, 1280, 1920], // Hero needs larger sizes
  gallery: [400, 640, 960], // Gallery thumbnails
};

const QUALITY = {
  avif: 65,
  webp: 80,
  jpeg: 85,
};

let processedCount = 0;
let skippedCount = 0;
let totalSavedBytes = 0;

/**
 * Check if output files are newer than input file
 */
async function shouldSkip(inputPath, outputPaths) {
  try {
    const inputStat = await stat(inputPath);
    const inputTime = inputStat.mtimeMs;

    for (const outputPath of outputPaths) {
      try {
        const outputStat = await stat(outputPath);
        if (outputStat.mtimeMs < inputTime) {
          return false; // Output is older, need to regenerate
        }
      } catch {
        return false; // Output doesn't exist
      }
    }
    return true; // All outputs are newer
  } catch {
    return false;
  }
}

/**
 * Generate optimized images in multiple formats and sizes
 */
async function optimizeImage(inputPath, filename) {
  const nameWithoutExt = basename(filename, extname(filename));
  const inputStat = await stat(inputPath);
  const inputSize = inputStat.size;

  // Skip videos and HEIC files (need conversion first)
  const ext = extname(filename).toLowerCase();
  if (['.mov', '.heic', '.mp4', '.m4v'].includes(ext)) {
    console.log(`⏭️  Skipping ${filename} (video/HEIC format)`);
    skippedCount++;
    return;
  }

  // Generate output paths for all formats and sizes
  const outputPaths = [];
  for (const size of SIZES.gallery) {
    outputPaths.push(join(GALLERY_OUTPUT, `${nameWithoutExt}-${size}w.avif`));
    outputPaths.push(join(GALLERY_OUTPUT, `${nameWithoutExt}-${size}w.webp`));
  }

  // Check if we can skip this file
  if (await shouldSkip(inputPath, outputPaths)) {
    console.log(`✓ Skipping ${filename} (already optimized)`);
    skippedCount++;
    return;
  }

  console.log(`🔄 Processing ${filename}...`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    let savedBytes = 0;

    // Generate gallery sizes (400, 640, 960)
    for (const size of SIZES.gallery) {
      const resizedImage = image.clone().resize(size, null, {
        fit: 'inside',
        withoutEnlargement: true,
      });

      // AVIF
      const avifPath = join(GALLERY_OUTPUT, `${nameWithoutExt}-${size}w.avif`);
      await resizedImage
        .avif({ quality: QUALITY.avif, effort: 6 })
        .toFile(avifPath);
      const avifStat = await stat(avifPath);
      savedBytes += inputSize - avifStat.size;

      // WebP
      const webpPath = join(GALLERY_OUTPUT, `${nameWithoutExt}-${size}w.webp`);
      await resizedImage
        .webp({ quality: QUALITY.webp, effort: 4 })
        .toFile(webpPath);
      const webpStat = await stat(webpPath);
      savedBytes += inputSize - webpStat.size;
    }

    // Generate hero sizes (640, 960, 1280, 1920) for select images
    // Only for images that are large enough
    if (metadata.width >= 1280) {
      for (const size of SIZES.hero) {
        if (size > metadata.width) continue;

        const resizedImage = image.clone().resize(size, null, {
          fit: 'inside',
          withoutEnlargement: true,
        });

        // AVIF
        const avifPath = join(GALLERY_OUTPUT, `${nameWithoutExt}-hero-${size}w.avif`);
        await resizedImage
          .avif({ quality: QUALITY.avif, effort: 6 })
          .toFile(avifPath);

        // WebP
        const webpPath = join(GALLERY_OUTPUT, `${nameWithoutExt}-hero-${size}w.webp`);
        await resizedImage
          .webp({ quality: QUALITY.webp, effort: 4 })
          .toFile(webpPath);
      }
    }

    totalSavedBytes += savedBytes;
    processedCount++;
    console.log(`✅ ${filename} → ${(savedBytes / 1024 / 1024).toFixed(2)} MB saved`);
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
}

/**
 * Process all images in the gallery folder
 */
async function processGallery() {
  console.log('🎨 Medusa Tattoo Gallery Image Optimizer\n');
  console.log(`📂 Input:  ${GALLERY_INPUT}`);
  console.log(`📂 Output: ${GALLERY_OUTPUT}\n`);

  // Ensure output directory exists
  await mkdir(GALLERY_OUTPUT, { recursive: true });

  // Read all files in gallery
  const files = await readdir(GALLERY_INPUT);
  const imageFiles = files.filter((file) => {
    const ext = extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  });

  console.log(`📸 Found ${imageFiles.length} images to process\n`);

  // Process each image
  for (const file of imageFiles) {
    const inputPath = join(GALLERY_INPUT, file);
    await optimizeImage(inputPath, file);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Processed: ${processedCount} images`);
  console.log(`⏭️  Skipped:   ${skippedCount} images`);
  console.log(`💾 Saved:     ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log('='.repeat(60));
}

// Run the optimizer
processGallery().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
