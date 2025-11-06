/**
 * MEDUSA TATTOO MÜNCHEN - IMAGE OPTIMIZATION SCRIPT
 * 
 * Converts images to WebP format and creates responsive image sets
 * Target: <200KB per image, multiple sizes for responsive loading
 * 
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  inputDir: './public/assets/images',
  outputDir: './public/assets/images',
  formats: ['webp', 'jpg'], // WebP primary, JPG fallback
  sizes: [400, 800, 1200, 2400], // Responsive sizes
  quality: {
    webp: 85,
    jpg: 90
  },
  maxFileSize: 200 * 1024 // 200KB target
};

// Image processing stats
const stats = {
  processed: 0,
  failed: 0,
  totalSaved: 0
};

/**
 * Get all image files recursively
 */
async function getImageFiles(dir) {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      // Recursively get files from subdirectories
      const subFiles = await getImageFiles(fullPath);
      files.push(...subFiles);
    } else if (/\.(jpg|jpeg|png)$/i.test(item.name) && !item.name.includes('@')) {
      // Only process original images (not already processed variants)
      files.push(fullPath);
    }
  }
  
  return files;
}

/**
 * Optimize single image
 */
async function optimizeImage(inputPath) {
  try {
    const { name, dir, ext } = path.parse(inputPath);
    const originalStats = await fs.stat(inputPath);
    let totalSaved = 0;
    
    console.log(`\n📸 Processing: ${name}${ext} (${formatBytes(originalStats.size)})`);
    
    // Load image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Create responsive sizes
    for (const width of CONFIG.sizes) {
      // Skip if image is smaller than target width
      if (metadata.width < width) continue;
      
      // WebP version
      const webpPath = path.join(dir, `${name}@${width}w.webp`);
      await sharp(inputPath)
        .resize(width, null, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: CONFIG.quality.webp })
        .toFile(webpPath);
      
      const webpStats = await fs.stat(webpPath);
      console.log(`  ✓ Created: ${name}@${width}w.webp (${formatBytes(webpStats.size)})`);
      
      // JPG fallback (only for critical images)
      if (width <= 800) {
        const jpgPath = path.join(dir, `${name}@${width}w.jpg`);
        await sharp(inputPath)
          .resize(width, null, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .jpeg({ quality: CONFIG.quality.jpg, progressive: true })
          .toFile(jpgPath);
        
        const jpgStats = await fs.stat(jpgPath);
        console.log(`  ✓ Created: ${name}@${width}w.jpg (${formatBytes(jpgStats.size)})`);
      }
      
      totalSaved += originalStats.size - webpStats.size;
    }
    
    // Create main WebP version (original size)
    const mainWebpPath = path.join(dir, `${name}.webp`);
    await sharp(inputPath)
      .webp({ quality: CONFIG.quality.webp })
      .toFile(mainWebpPath);
    
    const mainWebpStats = await fs.stat(mainWebpPath);
    console.log(`  ✓ Created: ${name}.webp (${formatBytes(mainWebpStats.size)})`);
    console.log(`  💾 Saved: ${formatBytes(totalSaved)} (${Math.round((totalSaved / originalStats.size) * 100)}%)`);
    
    stats.processed++;
    stats.totalSaved += totalSaved;
    
  } catch (error) {
    console.error(`  ❌ Error processing ${inputPath}:`, error.message);
    stats.failed++;
  }
}

/**
 * Format bytes to human-readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 MEDUSA TATTOO MÜNCHEN - IMAGE OPTIMIZATION');
  console.log('================================================\n');
  console.log(`📁 Input directory: ${CONFIG.inputDir}`);
  console.log(`📐 Responsive sizes: ${CONFIG.sizes.join(', ')}px`);
  console.log(`🎯 Quality: WebP ${CONFIG.quality.webp}%, JPG ${CONFIG.quality.jpg}%`);
  console.log(`💾 Target: <${formatBytes(CONFIG.maxFileSize)} per image\n`);
  
  // Check if sharp is installed
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('❌ ERROR: sharp package not installed');
    console.error('Run: npm install sharp');
    process.exit(1);
  }
  
  // Get all image files
  console.log('🔍 Scanning for images...');
  const imageFiles = await getImageFiles(CONFIG.inputDir);
  console.log(`📊 Found ${imageFiles.length} images to process\n`);
  
  if (imageFiles.length === 0) {
    console.log('⚠️  No images found to process');
    process.exit(0);
  }
  
  // Process each image
  for (const imagePath of imageFiles) {
    await optimizeImage(imagePath);
  }
  
  // Summary
  console.log('\n================================================');
  console.log('✅ OPTIMIZATION COMPLETE');
  console.log('================================================');
  console.log(`📸 Images processed: ${stats.processed}`);
  console.log(`❌ Failed: ${stats.failed}`);
  console.log(`💾 Total saved: ${formatBytes(stats.totalSaved)}`);
  console.log(`⚡ Average savings: ${stats.processed > 0 ? Math.round((stats.totalSaved / stats.processed) / 1024) : 0}KB per image`);
  console.log('\n🎉 All images optimized successfully!');
  console.log('\nNext steps:');
  console.log('1. Update image references to use WebP format');
  console.log('2. Add responsive srcset attributes');
  console.log('3. Implement lazy loading for below-fold images');
  console.log('4. Test on real mobile devices\n');
}

// Run script
main().catch(error => {
  console.error('\n❌ FATAL ERROR:', error);
  process.exit(1);
});
