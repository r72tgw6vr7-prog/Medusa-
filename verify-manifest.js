import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base paths
const basePath = '/Users/yos/Work/CascadeProjects/Medusa-Web/public';
const manifestPath = path.join(basePath, 'gallery/manifest.json');

// Read the manifest
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Verify all paths
let totalImages = manifest.images.length;
let missingFiles = [];
let missingResizedFiles = [];

console.log(`Verifying ${totalImages} images in manifest...`);

for (const image of manifest.images) {
  // Check main image
  const mainImagePath = path.join(basePath, image.src);
  if (!fs.existsSync(mainImagePath)) {
    missingFiles.push(image.src);
  }
  
  // Check srcset images
  for (const [size, srcPath] of Object.entries(image.srcset)) {
    const resizedPath = path.join(basePath, srcPath);
    if (!fs.existsSync(resizedPath)) {
      missingResizedFiles.push(srcPath);
    }
  }
}

// Print results
console.log(`\nVerification complete:`);
console.log(`- Total images in manifest: ${totalImages}`);
console.log(`- Missing main images: ${missingFiles.length}`);
console.log(`- Missing resized images: ${missingResizedFiles.length}`);

if (missingFiles.length > 0) {
  console.log('\nMissing main images:');
  missingFiles.slice(0, 10).forEach(file => console.log(`- ${file}`));
  if (missingFiles.length > 10) {
    console.log(`... and ${missingFiles.length - 10} more`);
  }
}

if (missingResizedFiles.length > 0) {
  console.log('\nMissing resized images (first 10):');
  missingResizedFiles.slice(0, 10).forEach(file => console.log(`- ${file}`));
  if (missingResizedFiles.length > 10) {
    console.log(`... and ${missingResizedFiles.length - 10} more`);
  }
}

// Check capitalization
let incorrectCapitalization = [];
for (const image of manifest.images) {
  // Check for lowercase artist names in paths
  if (image.src.includes('/tattoos/loui/') || 
      image.src.includes('/tattoos/luz/') || 
      image.src.includes('/tattoos/debi/') || 
      image.src.includes('/tattoos/legacy/')) {
    incorrectCapitalization.push(image.src);
  }
  
  // Check srcset paths
  for (const [size, srcPath] of Object.entries(image.srcset)) {
    if (srcPath.includes('/tattoos/loui/') || 
        srcPath.includes('/tattoos/luz/') || 
        srcPath.includes('/tattoos/debi/') || 
        srcPath.includes('/tattoos/legacy/')) {
      incorrectCapitalization.push(srcPath);
    }
  }
}

if (incorrectCapitalization.length > 0) {
  console.log('\nPaths with incorrect capitalization:');
  incorrectCapitalization.slice(0, 10).forEach(file => console.log(`- ${file}`));
  if (incorrectCapitalization.length > 10) {
    console.log(`... and ${incorrectCapitalization.length - 10} more`);
  }
} else {
  console.log('\nAll paths have correct capitalization.');
}
