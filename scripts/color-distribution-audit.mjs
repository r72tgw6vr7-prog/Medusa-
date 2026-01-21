#!/usr/bin/env node
/**
 * Color Distribution Audit - 60-30-10 Rule Verification
 * =====================================================
 * Scans codebase for color usage and calculates distribution percentages.
 * 
 * Run: node scripts/color-distribution-audit.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../src');

// ===========================================
// COLOR TOKEN MAPPING (from design-system.css)
// ===========================================

const COLOR_CATEGORIES = {
  // 60% - DARK COLORS (backgrounds, surfaces, dark text)
  DARK: {
    tokens: [
      // CSS Variables
      '--deep-black', '--luxury-bg-dark', '--luxury-bg-dark-elevated', '--luxury-bg-dark-hover',
      '--color-surface-dark', '--color-surface-darker', '--color-surface-medium',
      '--luxury-text-primary', '--brand-background',
      // Tailwind classes
      'bg-deep-black', 'bg-luxury-bg-dark', 'bg-luxury-bg-dark-elevated', 'bg-luxury-bg-dark-hover',
      'bg-brand-background', 'bg-black', 'bg-surface-dark', 'bg-surface-darker',
      'text-luxury-text-primary', 'text-luxury-text-secondary', 'text-luxury-text-tertiary',
      // Raw hex values (for detection)
      '#0a0a0a', '#1a1a1c', '#252528', '#0A0A0A', '#1A1A1C',
      'rgb(10 10 10)', 'rgb(26 26 28)', 'rgba(10, 10, 10',
    ],
    weight: 60
  },
  
  // 30% - WHITE/LIGHT COLORS (text on dark, light backgrounds, cards)
  WHITE: {
    tokens: [
      // CSS Variables
      '--base-white', '--brand-white', '--brand-true-white', '--luxury-bg-base', '--luxury-bg-surface',
      '--luxury-bg-elevated', '--color-text-primary', '--luxury-text-inverse',
      // Tailwind classes
      'bg-white', 'bg-luxury-bg-base', 'bg-luxury-bg-surface', 'bg-luxury-bg-elevated',
      'bg-brand-white', 'text-white', 'text-luxury-text-inverse', 'text-luxury-text-inverse-muted',
      'text-brand-white', 'text-primary', 'text-color-text-primary',
      // Raw hex values
      '#FFFFFF', '#ffffff', '#F3F3F3', '#f3f3f3', '#FAFAFA', '#fafafa',
      'rgb(255 255 255)', 'rgb(255, 255, 255)', 'rgba(255, 255, 255',
    ],
    weight: 30
  },
  
  // 10% - GREY/ACCENT COLORS (chrome silver, borders, subtle elements)
  ACCENT: {
    tokens: [
      // CSS Variables
      '--brand-accent', '--chrome-silver', '--color-brand-accent', '--luxury-accent-chrome',
      '--luxury-accent-chrome-safe', '--color-accent-silver', '--color-accent-grey',
      '--luxury-border-subtle', '--luxury-border-light', '--luxury-border-on-dark',
      // Tailwind classes
      'bg-brand-accent', 'bg-brand-chrome', 'bg-luxury-accent-chrome', 'bg-chrome',
      'text-brand-accent', 'text-brand-chrome', 'text-luxury-accent-chrome',
      'border-brand-accent', 'border-brand-chrome', 'border-white/10', 'border-white/15',
      'border-white/20', 'border-white/25', 'border-luxury-border',
      'text-gray-', 'text-grey-', 'bg-gray-', 'bg-grey-',
      // Raw hex values
      '#C0C0C0', '#c0c0c0', '#767676', '#A8A8A8', '#666666', '#4A4A4A',
      'rgb(192 192 192)', 'rgb(192, 192, 192)', 'rgba(192, 192, 192',
    ],
    weight: 10
  }
};

// ===========================================
// AUDIT FUNCTIONS
// ===========================================

function walkDir(dir, files = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== '__tests__') {
        walkDir(fullPath, files);
      } else if (entry.isFile() && /\.(tsx?|jsx?|css)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  } catch (e) {
    // Skip unreadable directories
  }
  return files;
}

function countColorUsage(content, tokens) {
  let count = 0;
  for (const token of tokens) {
    // Escape special regex characters
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    const matches = content.match(regex);
    if (matches) {
      count += matches.length;
    }
  }
  return count;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const results = {
    dark: countColorUsage(content, COLOR_CATEGORIES.DARK.tokens),
    white: countColorUsage(content, COLOR_CATEGORIES.WHITE.tokens),
    accent: countColorUsage(content, COLOR_CATEGORIES.ACCENT.tokens),
    file: path.relative(rootDir, filePath)
  };
  return results;
}

function calculatePercentages(totals) {
  const total = totals.dark + totals.white + totals.accent;
  if (total === 0) return { dark: 0, white: 0, accent: 0 };
  
  return {
    dark: ((totals.dark / total) * 100).toFixed(1),
    white: ((totals.white / total) * 100).toFixed(1),
    accent: ((totals.accent / total) * 100).toFixed(1)
  };
}

function getStatus(actual, expected, tolerance = 10) {
  const diff = Math.abs(parseFloat(actual) - expected);
  if (diff <= tolerance) return '✅';
  if (diff <= tolerance * 2) return '⚠️';
  return '❌';
}

// ===========================================
// MAIN AUDIT
// ===========================================

console.log('\n📊 COLOR DISTRIBUTION AUDIT - 60-30-10 RULE');
console.log('='.repeat(50));

const files = walkDir(rootDir);
console.log(`\nScanning ${files.length} files in src/...\n`);

// Aggregate totals
const totals = { dark: 0, white: 0, accent: 0 };
const pageResults = {};

// Group files by page/component type
const pageFiles = files.filter(f => f.includes('/pages/'));
const componentFiles = files.filter(f => f.includes('/components/'));
const styleFiles = files.filter(f => f.endsWith('.css'));

// Analyze all files
for (const file of files) {
  const result = analyzeFile(file);
  totals.dark += result.dark;
  totals.white += result.white;
  totals.accent += result.accent;
  
  // Track by page for detailed breakdown
  if (file.includes('/pages/')) {
    const pageName = path.basename(file, path.extname(file));
    pageResults[pageName] = result;
  }
}

// Calculate overall percentages
const percentages = calculatePercentages(totals);

console.log('📈 OVERALL COLOR DISTRIBUTION');
console.log('-'.repeat(50));
console.log(`\n| Category     | Expected | Actual  | Status |`);
console.log(`|--------------|----------|---------|--------|`);
console.log(`| Dark         | 60%      | ${percentages.dark.padStart(5)}%  | ${getStatus(percentages.dark, 60)}     |`);
console.log(`| White/Light  | 30%      | ${percentages.white.padStart(5)}%  | ${getStatus(percentages.white, 30)}     |`);
console.log(`| Grey/Accent  | 10%      | ${percentages.accent.padStart(5)}%  | ${getStatus(percentages.accent, 10)}     |`);

console.log(`\n\n📄 PAGE-BY-PAGE BREAKDOWN`);
console.log('-'.repeat(50));

const pageNames = Object.keys(pageResults).sort();
console.log(`\n| Page               | Dark   | White  | Accent |`);
console.log(`|--------------------|--------|--------|--------|`);

for (const page of pageNames) {
  const result = pageResults[page];
  const pagePerc = calculatePercentages(result);
  console.log(`| ${page.padEnd(18)} | ${String(pagePerc.dark).padStart(5)}% | ${String(pagePerc.white).padStart(5)}% | ${String(pagePerc.accent).padStart(5)}% |`);
}

console.log(`\n\n📊 RAW TOKEN COUNTS`);
console.log('-'.repeat(50));
console.log(`Dark tokens:   ${totals.dark} occurrences`);
console.log(`White tokens:  ${totals.white} occurrences`);
console.log(`Accent tokens: ${totals.accent} occurrences`);
console.log(`Total:         ${totals.dark + totals.white + totals.accent} occurrences`);

// Summary verdict
console.log(`\n\n🎯 AUDIT SUMMARY`);
console.log('='.repeat(50));

const darkDiff = Math.abs(parseFloat(percentages.dark) - 60);
const whiteDiff = Math.abs(parseFloat(percentages.white) - 30);
const accentDiff = Math.abs(parseFloat(percentages.accent) - 10);

let issues = [];
if (darkDiff > 10) issues.push(`Dark: ${percentages.dark}% (expected ~60%)`);
if (whiteDiff > 10) issues.push(`White: ${percentages.white}% (expected ~30%)`);
if (accentDiff > 10) issues.push(`Accent: ${percentages.accent}% (expected ~10%)`);

if (issues.length === 0) {
  console.log('✅ Color distribution follows the 60-30-10 rule (within tolerance)');
} else {
  console.log('⚠️  Deviations detected:');
  issues.forEach(issue => console.log(`   - ${issue}`));
}

console.log('\n');

// Export results for visual proof
const reportData = {
  timestamp: new Date().toISOString(),
  methodology: 'Token occurrence counting across TSX/JSX/CSS files',
  expected: { dark: 60, white: 30, accent: 10 },
  actual: {
    dark: parseFloat(percentages.dark),
    white: parseFloat(percentages.white),
    accent: parseFloat(percentages.accent)
  },
  rawCounts: totals,
  pageBreakdown: pageResults,
  filesScanned: files.length
};

fs.writeFileSync(
  path.resolve(__dirname, '../color-distribution-report.json'),
  JSON.stringify(reportData, null, 2)
);

console.log('📁 Full report saved to: color-distribution-report.json\n');
