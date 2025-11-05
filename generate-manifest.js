import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base paths
const basePath = '/Users/yos/Work/CascadeProjects/Medusa-Web/public';
const galleryPath = path.join(basePath, 'images/gallery');
const manifestPath = path.join(basePath, 'gallery/manifest.json');

// Categories and artists mapping
const categoryMap = {
  'tattoos': 'tattoo',
  'piercings': 'piercing'
};

// Function to generate alt text based on filename
function generateAltText(filename, artist, category) {
  // Remove file extension and any @XXXw suffix
  let cleanName = filename.replace(/\.[^/.]+$/, '').replace(/@\d+w.*$/, '');
  
  // Replace underscores and hyphens with spaces
  cleanName = cleanName.replaceAll('_', ' ').replaceAll('-', ' ');
  
  // Handle special cases for filenames with detailed info
  if (cleanName.includes('Stunden') || cleanName.includes('std')) {
    return `${cleanName} by ${artist}`;
  }
  
  // For UUIDs and less descriptive filenames
  if (/^[0-9A-F]{8}/.test(cleanName)) {
    return `Professional ${category} artwork by ${artist}`;
  }
  
  // For PHOTO filenames
  if (cleanName.includes('PHOTO')) {
    return `${category === 'tattoo' ? 'Tattoo' : 'Piercing'} work by ${artist}`;
  }
  
  // For IMG filenames
  if (cleanName.includes('IMG')) {
    return `${artist} ${category} design`;
  }
  
  return `${cleanName} by ${artist}`;
}

// Function to find all resized versions of an image
function findResizedVersions(baseImagePath) {
  const dir = path.dirname(baseImagePath);
  const baseName = path.basename(baseImagePath, path.extname(baseImagePath));
  
  // Common resize suffixes
  const resizeSuffixes = ['@400w', '@800w', '@1200w', '@2400w'];
  const formats = ['.webp', '.jpg'];
  
  const srcset = {};
  
  for (const suffix of resizeSuffixes) {
    for (const format of formats) {
      const resizedPath = path.join(dir, `${baseName}${suffix}${format}`);
      const relativePath = resizedPath.replace(basePath, '');
      
      if (fs.existsSync(resizedPath)) {
        const key = suffix.substring(1); // Remove @ symbol
        if (format === '.jpg') {
          srcset[`${key}-jpg`] = relativePath;
        } else {
          srcset[key] = relativePath;
        }
      }
    }
  }
  
  return srcset;
}

// Main function to generate manifest
function generateManifest() {
  const manifest = { images: [] };
  let idCounter = {
    tattoo: 1,
    piercing: 1
  };
  
  // Process each category directory
  for (const category of Object.keys(categoryMap)) {
    const categoryDir = path.join(galleryPath, category);
    
    // Skip if directory doesn't exist
    if (!fs.existsSync(categoryDir)) continue;
    
    // Process each artist directory
    const artistDirs = fs.readdirSync(categoryDir);
    
    for (const artist of artistDirs) {
      const artistDir = path.join(categoryDir, artist);
      
      // Skip if not a directory
      if (!fs.statSync(artistDir).isDirectory()) continue;
      
      // Find all webp files that are not resized versions (don't contain @)
      let cmd = `find "${artistDir}" -type f -name "*.webp" | grep -v "@"`;
      let sourceImages;
      
      try {
        sourceImages = execSync(cmd).toString().trim().split('\n');
      } catch (error) {
        console.error(`Error finding images in ${artistDir}:`, error);
        continue;
      }
      
      // Process each source image
      for (const imagePath of sourceImages) {
        if (!imagePath) continue; // Skip empty lines
        
        const relativePath = imagePath.replace(basePath, '');
        const fileName = path.basename(imagePath);
        
        // Generate srcset
        const srcset = findResizedVersions(imagePath);
        
        // Use 800w version as src if available, otherwise use original
        let src = relativePath;
        if (srcset['800w']) {
          src = srcset['800w'];
        }
        
        // Generate alt text
        const alt = generateAltText(fileName, artist, categoryMap[category]);
        
        // Create manifest entry
        const entry = {
          id: `${categoryMap[category]}-${idCounter[categoryMap[category]]}`,
          category: categoryMap[category],
          artist: artist.toLowerCase(),
          src: src,
          srcset: srcset,
          alt: alt
        };
        
        manifest.images.push(entry);
        idCounter[categoryMap[category]]++;
      }
    }
  }
  
  // Write manifest to file
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Manifest generated with ${manifest.images.length} images`);
}

// Run the generator
generateManifest();
