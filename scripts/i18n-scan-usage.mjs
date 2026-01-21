#!/usr/bin/env node
/**
 * i18n Translation Key Usage Scanner
 * Scans source code for t() calls and validates keys exist in translation files
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const LOCALES_DIR = join(projectRoot, 'src/i18n/locales');
const SRC_DIR = join(projectRoot, 'src');

// Load all translation keys
function loadAllKeys(locale) {
  const localeDir = join(LOCALES_DIR, locale);
  const namespaces = readdirSync(localeDir).filter(f => f.endsWith('.json'));
  
  const allKeys = new Set();
  
  namespaces.forEach(nsFile => {
    const namespace = nsFile.replace('.json', '');
    const data = JSON.parse(readFileSync(join(localeDir, nsFile), 'utf-8'));
    
    function extractKeys(obj, prefix = '') {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          extractKeys(value, fullKey);
        } else {
          // Store both namespaced and non-namespaced versions
          allKeys.add(`${namespace}.${fullKey}`);
          allKeys.add(fullKey);
        }
      }
    }
    
    extractKeys(data);
  });
  
  return allKeys;
}

// Extract t() calls from source code
function scanSourceFiles(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      scanSourceFiles(fullPath, files);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function extractTranslationKeys(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const keys = [];
  
  // Match t('key') and t("key")
  const patterns = [
    /\bt\(['"]([^'"]+)['"]\)/g,
    /\bt\(['"]([^'"]+)['"],\s*\{/g,
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      keys.push({
        key: match[1],
        file: filePath.replace(projectRoot, ''),
        line: content.substring(0, match.index).split('\n').length
      });
    }
  });
  
  return keys;
}

function main() {
  console.log('🔍 Scanning translation key usage...\n');
  
  // Load all available keys
  const deKeys = loadAllKeys('de');
  const enKeys = loadAllKeys('en');
  
  console.log(`📚 Loaded ${deKeys.size} DE keys and ${enKeys.size} EN keys\n`);
  
  // Scan source files
  const sourceFiles = scanSourceFiles(SRC_DIR);
  console.log(`📂 Scanning ${sourceFiles.length} source files...\n`);
  
  const allUsedKeys = [];
  sourceFiles.forEach(file => {
    const keys = extractTranslationKeys(file);
    allUsedKeys.push(...keys);
  });
  
  console.log(`🔑 Found ${allUsedKeys.length} translation key usages\n`);
  
  // Check for missing keys
  const missingInDe = [];
  const missingInEn = [];
  
  allUsedKeys.forEach(({ key, file, line }) => {
    if (!deKeys.has(key)) {
      missingInDe.push({ key, file, line });
    }
    if (!enKeys.has(key)) {
      missingInEn.push({ key, file, line });
    }
  });
  
  let hasErrors = false;
  
  if (missingInDe.length > 0) {
    console.log('❌ Keys used in code but missing in DE translations:\n');
    missingInDe.forEach(({ key, file, line }) => {
      console.log(`   ${key}`);
      console.log(`      at ${file}:${line}\n`);
    });
    hasErrors = true;
  }
  
  if (missingInEn.length > 0) {
    console.log('❌ Keys used in code but missing in EN translations:\n');
    missingInEn.forEach(({ key, file, line }) => {
      console.log(`   ${key}`);
      console.log(`      at ${file}:${line}\n`);
    });
    hasErrors = true;
  }
  
  if (!hasErrors) {
    console.log('✅ All translation keys used in code exist in both DE and EN\n');
  }
  
  // Show summary
  console.log('━'.repeat(60));
  console.log('\n📊 Summary:');
  console.log(`   Total keys used: ${allUsedKeys.length}`);
  console.log(`   Missing in DE: ${missingInDe.length}`);
  console.log(`   Missing in EN: ${missingInEn.length}`);
  
  if (hasErrors) {
    console.log('\n💥 Validation FAILED\n');
    process.exit(1);
  } else {
    console.log('\n✅ Validation PASSED\n');
    process.exit(0);
  }
}

main();
