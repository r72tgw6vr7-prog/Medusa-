#!/usr/bin/env node
/**
 * i18n Translation Key Validator
 * Compares DE and EN translation files for key mismatches and placeholder inconsistencies
 * Exits with non-zero code if validation fails
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const LOCALES_DIR = join(projectRoot, 'src/i18n/locales');
const NAMESPACES = ['common', 'home', 'booking', 'contact', 'services', 'artists', 'gallery', 'errors', 'validation'];

let hasErrors = false;
const errors = [];
const warnings = [];

/**
 * Recursively extract all keys from a nested object
 */
function extractKeys(obj, prefix = '') {
  const keys = new Set();
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const nestedKeys = extractKeys(value, fullKey);
      nestedKeys.forEach(k => keys.add(k));
    } else {
      keys.add(fullKey);
    }
  }
  
  return keys;
}

/**
 * Extract placeholder variables from a translation string
 * Matches {{variable}} and {variable} patterns
 */
function extractPlaceholders(str) {
  if (typeof str !== 'string') return new Set();
  
  const placeholders = new Set();
  const patterns = [
    /\{\{(\w+)\}\}/g,  // {{count}}
    /\{(\w+)\}/g,      // {count}
  ];
  
  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(str)) !== null) {
      placeholders.add(match[1]);
    }
  });
  
  return placeholders;
}

/**
 * Get value at nested key path
 */
function getValueAtPath(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Validate a single namespace across locales
 */
function validateNamespace(namespace) {
  console.log(`\n📋 Validating namespace: ${namespace}`);
  
  const deFile = join(LOCALES_DIR, 'de', `${namespace}.json`);
  const enFile = join(LOCALES_DIR, 'en', `${namespace}.json`);
  
  let deData, enData;
  
  try {
    deData = JSON.parse(readFileSync(deFile, 'utf-8'));
  } catch (err) {
    errors.push(`❌ Failed to read DE file: ${deFile} - ${err.message}`);
    hasErrors = true;
    return;
  }
  
  try {
    enData = JSON.parse(readFileSync(enFile, 'utf-8'));
  } catch (err) {
    errors.push(`❌ Failed to read EN file: ${enFile} - ${err.message}`);
    hasErrors = true;
    return;
  }
  
  // Check if files are empty
  const deKeys = extractKeys(deData);
  const enKeys = extractKeys(enData);
  
  if (deKeys.size === 0 && enKeys.size === 0) {
    warnings.push(`⚠️  ${namespace}: Both DE and EN files are empty`);
    return;
  }
  
  if (deKeys.size === 0) {
    errors.push(`❌ ${namespace}: DE file is empty but EN has ${enKeys.size} keys`);
    hasErrors = true;
    return;
  }
  
  if (enKeys.size === 0) {
    errors.push(`❌ ${namespace}: EN file is empty but DE has ${deKeys.size} keys`);
    hasErrors = true;
    return;
  }
  
  // Find missing keys
  const missingInEn = [...deKeys].filter(k => !enKeys.has(k));
  const missingInDe = [...enKeys].filter(k => !deKeys.has(k));
  
  if (missingInEn.length > 0) {
    errors.push(`❌ ${namespace}: Missing in EN (${missingInEn.length} keys):`);
    missingInEn.forEach(key => errors.push(`   - ${key}`));
    hasErrors = true;
  }
  
  if (missingInDe.length > 0) {
    errors.push(`❌ ${namespace}: Missing in DE (${missingInDe.length} keys):`);
    missingInDe.forEach(key => errors.push(`   - ${key}`));
    hasErrors = true;
  }
  
  // Validate placeholder consistency
  const commonKeys = [...deKeys].filter(k => enKeys.has(k));
  const placeholderMismatches = [];
  
  commonKeys.forEach(key => {
    const deValue = getValueAtPath(deData, key);
    const enValue = getValueAtPath(enData, key);
    
    const dePlaceholders = extractPlaceholders(deValue);
    const enPlaceholders = extractPlaceholders(enValue);
    
    if (dePlaceholders.size !== enPlaceholders.size || 
        ![...dePlaceholders].every(p => enPlaceholders.has(p))) {
      placeholderMismatches.push({
        key,
        de: [...dePlaceholders],
        en: [...enPlaceholders]
      });
    }
  });
  
  if (placeholderMismatches.length > 0) {
    errors.push(`❌ ${namespace}: Placeholder mismatches (${placeholderMismatches.length}):`);
    placeholderMismatches.forEach(({ key, de, en }) => {
      errors.push(`   - ${key}:`);
      errors.push(`     DE: [${de.join(', ')}]`);
      errors.push(`     EN: [${en.join(', ')}]`);
    });
    hasErrors = true;
  }
  
  // Success message
  if (missingInEn.length === 0 && missingInDe.length === 0 && placeholderMismatches.length === 0) {
    console.log(`   ✅ ${deKeys.size} keys validated successfully`);
  }
}

/**
 * Main validation
 */
function main() {
  console.log('🔍 i18n Translation Validator');
  console.log('━'.repeat(60));
  
  NAMESPACES.forEach(validateNamespace);
  
  console.log('\n' + '━'.repeat(60));
  console.log('\n📊 Validation Summary:');
  
  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(w => console.log(w));
  }
  
  if (errors.length > 0) {
    console.log('\n❌ Errors:');
    errors.forEach(e => console.log(e));
    console.log(`\n💥 Validation FAILED with ${errors.length} error(s)`);
    process.exit(1);
  }
  
  console.log('\n✅ All translation keys are consistent across DE and EN');
  process.exit(0);
}

main();
