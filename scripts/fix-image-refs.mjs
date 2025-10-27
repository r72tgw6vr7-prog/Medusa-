#!/usr/bin/env node
/**
 * QUICK FIX: Update all image references to match actual files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replacements = [
  // Fix case sensitivity issues in team photos
  { from: '/images/team/Vive.jpg', to: '/images/team/vive.jpg' },
  { from: '/images/team/ANGIE.jpg', to: '/images/team/angie.jpg' },
  { from: '/images/team/Debi.jpg', to: '/images/team/debi.jpg' },
  { from: '/images/team/Sasha.jpg', to: '/images/team/sasha.jpg' },
  
  // Fix common typos
  { from: '/images/tattoo-cad-bg.jpg', to: '/images/tattoo-card-bg.jpg' },
  { from: '/images/piecing-cad-bg.jpg', to: '/images/piercing-card-bg.jpg' },
];

const srcDir = path.join(__dirname, '../src');

function fixReferences(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.includes('node_modules')) {
      fixReferences(filePath);
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      replacements.forEach(({ from, to }) => {
        if (content.includes(from)) {
          content = content.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
          modified = true;
          console.log(`✓ Fixed ${from} → ${to} in ${filePath}`);
        }
      });

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
}

console.log('🔧 Fixing image references...\n');
fixReferences(srcDir);
console.log('\n✅ Done!');
