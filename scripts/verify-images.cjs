/**
 * MEDUSA TATTOO MÜNCHEN - IMAGE VERIFICATION SCRIPT
 * 
 * Verifies all image references in TSX files exist in public folder
 * Catches broken paths before deployment
 * 
 * Usage: node scripts/verify-images.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

function verifyImages() {
  console.log('🔍 MEDUSA IMAGE VERIFICATION');
  console.log('================================================\n');

  // Find all TSX/TS files (ignore backups, tests, specs)
  const files = glob.sync('src/**/*.{ts,tsx}', { 
    ignore: ['**/*.test.*', '**/*.spec.*', '**/components-backup*/**', '**/*-backup*/**'] 
  });
  const missingImages = [];
  const foundImages = [];
  
  // Pattern to match image src attributes and imports
  const imagePattern = /(?:src|fallback|imageUrl|imageSrc)=["'{`]([^"'`]+\.(?:jpg|jpeg|png|webp|svg|gif))["'`}]/gi;
  
  console.log(`📂 Scanning ${files.length} files for image references...\n`);

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    const imagePattern = /(?:src|fallback|imageUrl|imageSrc)=["'{`]([^"'`]+\.(?:jpg|jpeg|png|webp|svg|gif))["'`}]/gi;

    while ((match = imagePattern.exec(content)) !== null) {
      const imagePath = match[1];
      
      // Skip external URLs
      if (imagePath.startsWith('http')) continue;
      
      // Skip dynamic paths (variables)
      if (imagePath.includes('${') || imagePath.includes('{')) continue;
      
      // Convert to public path
      const publicPath = imagePath.startsWith('/')
        ? path.join('public', imagePath)
        : path.join('public', imagePath);

      if (!fs.existsSync(publicPath)) {
        missingImages.push({
          file: file.replace('src/', ''),
          image: imagePath,
          expected: publicPath,
        });
      } else {
        foundImages.push(imagePath);
      }
    }
  }

  // Remove duplicates
  const uniqueMissing = Array.from(new Map(
    missingImages.map(item => [item.image, item])
  ).values());

  // Results
  console.log('================================================');
  console.log('VERIFICATION RESULTS');
  console.log('================================================\n');
  console.log(`✅ Valid images found: ${new Set(foundImages).size}`);
  console.log(`❌ Missing images: ${uniqueMissing.length}\n`);

  if (uniqueMissing.length === 0) {
    console.log('🎉 All images exist! No broken references found.\n');
    return true;
  } else {
    console.error('❌ BROKEN IMAGE REFERENCES FOUND:\n');
    uniqueMissing.forEach(({ file, image, expected }) => {
      console.error(`   File: ${file}`);
      console.error(`   Missing: ${image}`);
      console.error(`   Expected path: ${expected}\n`);
    });
    console.error('\n⚠️  Fix these issues before building for production!');
    console.error('\nSuggested actions:');
    console.error('1. Add missing images to public folder');
    console.error('2. Update image paths in components');
    console.error('3. Add fallback images for error states\n');
    return false;
  }
}

// Run verification
const success = verifyImages();
process.exit(success ? 0 : 1);
