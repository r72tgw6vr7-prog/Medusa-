#!/usr/bin/env node
/**
 * Color Forensics - Complete Token Usage Map
 * ==========================================
 * Creates a comprehensive forensic map of every color token usage.
 * 
 * Run: node scripts/color-forensics.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../src');
const outputDir = path.resolve(__dirname, '..');

// ===========================================
// COLOR TOKEN DEFINITIONS (from design-system.css)
// ===========================================

const COLOR_TOKENS = {
  // CSS Variables from design-system.css
  CSS_VARS: {
    DARK: [
      '--deep-black',
      '--luxury-bg-dark',
      '--luxury-bg-dark-elevated',
      '--luxury-bg-dark-hover',
      '--color-surface-dark',
      '--color-surface-darker',
      '--color-surface-medium',
      '--color-surface-light',
      '--luxury-text-primary',
      '--luxury-text-secondary',
      '--luxury-text-tertiary',
      '--brand-background',
    ],
    WHITE: [
      '--base-white',
      '--brand-white',
      '--brand-true-white',
      '--luxury-bg-base',
      '--luxury-bg-surface',
      '--luxury-bg-elevated',
      '--color-text-primary',
      '--luxury-text-inverse',
      '--luxury-text-inverse-muted',
    ],
    ACCENT: [
      '--brand-accent',
      '--brand-accent-hover',
      '--color-brand-accent',
      '--color-brand-accent-hover',
      '--color-brand-accent-dark',
      '--color-brand-accent-light',
      '--chrome-silver',
      '--luxury-accent-chrome',
      '--luxury-accent-chrome-safe',
      '--color-accent-silver',
      '--color-accent-grey',
    ],
    BORDER: [
      '--luxury-border-subtle',
      '--luxury-border-light',
      '--luxury-border-on-dark',
      '--border-default',
      '--border-hover',
      '--border-focus',
      '--border-navigation',
      '--surface-card-border',
      '--surface-card-border-featured',
    ],
    SHADOW: [
      '--shadow-sm',
      '--shadow-md',
      '--shadow-lg',
      '--shadow-xl',
      '--shadow-chrome-sm',
      '--shadow-chrome-md',
      '--shadow-chrome-lg',
      '--shadow-chrome',
      '--shadow-chrome-hover',
      '--shadow-chrome-active',
      '--shadow-chrome-intense',
      '--shadow-chrome-glow',
      '--shadow-silver-sm',
      '--shadow-focus-ring',
      '--shadow-focus-ring-white',
      '--shadow-card-premium',
      '--surface-card-shadow',
      '--surface-card-shadow-featured',
    ],
    STATUS: [
      '--color-error-red',
      '--color-success-green',
    ],
  },

  // Tailwind utility classes
  TAILWIND: {
    // Background colors
    BG_DARK: [
      'bg-deep-black', 'bg-luxury-bg-dark', 'bg-luxury-bg-dark-elevated', 'bg-luxury-bg-dark-hover',
      'bg-brand-background', 'bg-black', 'bg-surface-dark', 'bg-surface-darker',
      'bg-\\[#0a0a0a\\]', 'bg-\\[#1a1a1c\\]', 'bg-\\[#252528\\]',
    ],
    BG_WHITE: [
      'bg-white', 'bg-luxury-bg-base', 'bg-luxury-bg-surface', 'bg-luxury-bg-elevated',
      'bg-brand-white', 'bg-base-white', 'bg-\\[#ffffff\\]', 'bg-\\[#FFFFFF\\]',
      'bg-\\[#f3f3f3\\]', 'bg-\\[#F3F3F3\\]', 'bg-\\[#fafafa\\]',
    ],
    BG_ACCENT: [
      'bg-brand-accent', 'bg-brand-chrome', 'bg-luxury-accent-chrome', 'bg-chrome',
      'bg-\\[#c0c0c0\\]', 'bg-\\[#C0C0C0\\]',
    ],
    BG_OVERLAY: [
      'bg-overlay-subtle', 'bg-overlay-medium', 'bg-overlay-heavy',
      'bg-black/\\d+', 'bg-white/\\d+',
    ],

    // Text colors
    TEXT_DARK: [
      'text-luxury-text-primary', 'text-luxury-text-secondary', 'text-luxury-text-tertiary',
      'text-black', 'text-\\[#0a0a0a\\]', 'text-\\[#1a1a1a\\]', 'text-\\[#525252\\]',
    ],
    TEXT_WHITE: [
      'text-white', 'text-luxury-text-inverse', 'text-luxury-text-inverse-muted',
      'text-brand-white', 'text-primary', 'text-color-text-primary',
      'text-\\[#ffffff\\]', 'text-\\[#FFFFFF\\]',
    ],
    TEXT_ACCENT: [
      'text-brand-accent', 'text-brand-chrome', 'text-luxury-accent-chrome',
      'text-\\[#c0c0c0\\]', 'text-\\[#C0C0C0\\]', 'text-\\[#767676\\]',
    ],
    TEXT_GREY: [
      'text-gray-\\d+', 'text-grey-\\d+', 'text-neutral-\\d+', 'text-slate-\\d+', 'text-zinc-\\d+',
    ],
    TEXT_OPACITY: [
      'text-white/\\d+', 'text-black/\\d+',
    ],

    // Border colors
    BORDER_WHITE: [
      'border-white', 'border-white/\\d+',
    ],
    BORDER_ACCENT: [
      'border-brand-accent', 'border-brand-chrome', 'border-luxury-border',
      'border-\\[#c0c0c0\\]', 'border-\\[#C0C0C0\\]',
    ],
    BORDER_DARK: [
      'border-black', 'border-black/\\d+', 'border-gray-\\d+', 'border-neutral-\\d+',
    ],

    // Shadow classes
    SHADOW: [
      'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl',
      'shadow-luxury', 'shadow-luxury-sm', 'shadow-luxury-lg', 'shadow-luxury-xl',
      'shadow-chrome-glow', 'shadow-chrome-lift', 'shadow-chrome-glow-subtle',
      'shadow-chrome-glow-strong', 'shadow-chrome-glow-medium',
      'shadow-focus-ring', 'shadow-none',
    ],

    // Ring/outline colors
    RING: [
      'ring-brand-accent', 'ring-brand-chrome', 'ring-white', 'ring-black',
      'ring-\\d+', 'ring-offset-\\d+',
      'outline-brand-accent', 'outline-white', 'outline-none',
    ],

    // Fill/stroke (SVG)
    FILL: [
      'fill-current', 'fill-white', 'fill-black', 'fill-brand-accent',
    ],
    STROKE: [
      'stroke-current', 'stroke-white', 'stroke-black', 'stroke-brand-accent',
    ],
  },
};

// State variant prefixes
const STATE_PREFIXES = [
  'hover:', 'focus:', 'focus-visible:', 'active:', 'disabled:',
  'group-hover:', 'group-focus:', 'peer-hover:', 'peer-focus:',
  'placeholder:', 'focus-within:',
];

// Responsive prefixes
const RESPONSIVE_PREFIXES = ['sm:', 'md:', 'lg:', 'xl:', '2xl:'];

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

function walkDir(dir, files = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && 
          entry.name !== 'node_modules' && entry.name !== '__tests__' && 
          entry.name !== 'test') {
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

function extractComponentName(filePath) {
  const basename = path.basename(filePath, path.extname(filePath));
  // Handle index files - use parent folder name
  if (basename === 'index') {
    return path.basename(path.dirname(filePath));
  }
  return basename;
}

function categorizeFile(filePath) {
  const relativePath = path.relative(rootDir, filePath);
  if (relativePath.includes('pages/')) return 'page';
  if (relativePath.includes('components/layout/')) return 'layout';
  if (relativePath.includes('components/ui/')) return 'ui';
  if (relativePath.includes('components/atoms/')) return 'atoms';
  if (relativePath.includes('components/molecules/')) return 'molecules';
  if (relativePath.includes('components/organisms/')) return 'organisms';
  if (relativePath.includes('components/cards/')) return 'cards';
  if (relativePath.includes('components/sections/')) return 'sections';
  if (relativePath.includes('components/booking/')) return 'booking';
  if (relativePath.includes('components/')) return 'component';
  if (relativePath.includes('styles/')) return 'styles';
  return 'other';
}

function findAllMatches(content, pattern, isRegex = false) {
  const matches = [];
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let regex;
    
    if (isRegex) {
      regex = new RegExp(pattern, 'gi');
    } else {
      // Escape special regex characters for literal search
      const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      regex = new RegExp(escaped, 'gi');
    }
    
    let match;
    while ((match = regex.exec(line)) !== null) {
      matches.push({
        token: match[0],
        line: i + 1,
        context: line.trim().substring(0, 200),
      });
    }
  }
  
  return matches;
}

function detectPropertyType(context) {
  const ctx = context.toLowerCase();
  if (/\bbg-|\bbackground/.test(ctx)) return 'surface';
  if (/\btext-[^xl]|\bcolor:/.test(ctx)) return 'text';
  if (/\bborder-|\bborder:/.test(ctx)) return 'border';
  if (/\bshadow-|\bbox-shadow/.test(ctx)) return 'shadow';
  if (/\bring-|\boutline/.test(ctx)) return 'outline';
  if (/\bfill-/.test(ctx)) return 'fill';
  if (/\bstroke-/.test(ctx)) return 'stroke';
  return 'other';
}

function detectState(context) {
  for (const prefix of STATE_PREFIXES) {
    if (context.includes(prefix)) {
      return prefix.replace(':', '');
    }
  }
  return 'default';
}

function categorizeToken(token) {
  const t = token.toLowerCase();
  
  // CSS Variables
  if (t.includes('--')) {
    if (t.includes('shadow')) return 'SHADOW';
    if (t.includes('border')) return 'BORDER';
    if (t.includes('dark') || t.includes('black') || t.includes('surface-dark')) return 'DARK';
    if (t.includes('white') || t.includes('inverse') || t.includes('base') || t.includes('surface')) return 'WHITE';
    if (t.includes('accent') || t.includes('chrome') || t.includes('silver')) return 'ACCENT';
    if (t.includes('error') || t.includes('success')) return 'STATUS';
  }
  
  // Tailwind classes
  if (t.includes('shadow')) return 'SHADOW';
  if (t.includes('ring') || t.includes('outline')) return 'OUTLINE';
  if (t.includes('border')) return 'BORDER';
  if (t.includes('fill') || t.includes('stroke')) return 'SVG';
  
  if (t.includes('bg-')) {
    if (t.includes('dark') || t.includes('black') || t.includes('#0a') || t.includes('#1a')) return 'DARK';
    if (t.includes('white') || t.includes('#fff') || t.includes('#f3') || t.includes('#fa')) return 'WHITE';
    if (t.includes('accent') || t.includes('chrome') || t.includes('#c0')) return 'ACCENT';
    if (t.includes('overlay')) return 'OVERLAY';
  }
  
  if (t.includes('text-')) {
    if (t.includes('primary') || t.includes('secondary') || t.includes('black') || t.includes('#0a')) return 'DARK_TEXT';
    if (t.includes('white') || t.includes('inverse') || t.includes('#fff')) return 'WHITE_TEXT';
    if (t.includes('accent') || t.includes('chrome') || t.includes('#c0') || t.includes('#76')) return 'ACCENT_TEXT';
    if (t.includes('gray') || t.includes('grey') || t.includes('neutral') || t.includes('slate') || t.includes('zinc')) return 'GREY_TEXT';
    if (t.includes('/')) return 'OPACITY_TEXT';
  }
  
  return 'OTHER';
}

// ===========================================
// MAIN ANALYSIS
// ===========================================

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const componentName = extractComponentName(filePath);
  const category = categorizeFile(filePath);
  const relativePath = path.relative(rootDir, filePath);
  
  const colorUsages = [];
  
  // Search for CSS variables
  for (const [group, vars] of Object.entries(COLOR_TOKENS.CSS_VARS)) {
    for (const varName of vars) {
      const matches = findAllMatches(content, varName);
      for (const match of matches) {
        colorUsages.push({
          token: match.token,
          category: categorizeToken(match.token),
          property: detectPropertyType(match.context),
          state: detectState(match.context),
          line: match.line,
          context: match.context,
        });
      }
    }
  }
  
  // Search for Tailwind classes
  for (const [group, patterns] of Object.entries(COLOR_TOKENS.TAILWIND)) {
    for (const pattern of patterns) {
      const isRegex = pattern.includes('\\d') || pattern.includes('[');
      const matches = findAllMatches(content, pattern, isRegex);
      for (const match of matches) {
        colorUsages.push({
          token: match.token,
          category: categorizeToken(match.token),
          property: detectPropertyType(match.context),
          state: detectState(match.context),
          line: match.line,
          context: match.context,
        });
      }
    }
  }
  
  // Search for inline style colors
  const inlineStylePatterns = [
    'style={{[^}]*color[^}]*}}',
    'style={{[^}]*background[^}]*}}',
    'style={{[^}]*border[^}]*}}',
    'style={{[^}]*shadow[^}]*}}',
  ];
  
  for (const pattern of inlineStylePatterns) {
    const matches = findAllMatches(content, pattern, true);
    for (const match of matches) {
      colorUsages.push({
        token: 'inline-style',
        category: 'INLINE',
        property: detectPropertyType(match.context),
        state: 'default',
        line: match.line,
        context: match.context,
      });
    }
  }
  
  // Search for raw hex colors
  const hexPatterns = [
    '#[0-9a-fA-F]{6}',
    '#[0-9a-fA-F]{3}(?![0-9a-fA-F])',
  ];
  
  for (const pattern of hexPatterns) {
    const matches = findAllMatches(content, pattern, true);
    for (const match of matches) {
      // Skip if it's within a CSS variable definition (we already captured those)
      if (!match.context.includes(':root') && !match.context.includes('--')) {
        colorUsages.push({
          token: match.token,
          category: categorizeToken(match.token),
          property: detectPropertyType(match.context),
          state: detectState(match.context),
          line: match.line,
          context: match.context,
        });
      }
    }
  }
  
  // Search for rgba/rgb colors
  const rgbPatterns = [
    'rgba?\\([^)]+\\)',
  ];
  
  for (const pattern of rgbPatterns) {
    const matches = findAllMatches(content, pattern, true);
    for (const match of matches) {
      if (!match.context.includes('--')) {
        colorUsages.push({
          token: match.token,
          category: 'RGB_VALUE',
          property: detectPropertyType(match.context),
          state: detectState(match.context),
          line: match.line,
          context: match.context,
        });
      }
    }
  }
  
  return {
    component: componentName,
    file: relativePath,
    category: category,
    usages: colorUsages,
    totals: {
      surface: colorUsages.filter(u => u.property === 'surface').length,
      text: colorUsages.filter(u => u.property === 'text').length,
      border: colorUsages.filter(u => u.property === 'border').length,
      shadow: colorUsages.filter(u => u.property === 'shadow').length,
      outline: colorUsages.filter(u => u.property === 'outline').length,
      other: colorUsages.filter(u => ['fill', 'stroke', 'other'].includes(u.property)).length,
      total: colorUsages.length,
    },
  };
}

function buildReverseMap(componentProfiles) {
  const reverseMap = {};
  
  for (const profile of componentProfiles) {
    for (const usage of profile.usages) {
      const token = usage.token;
      
      if (!reverseMap[token]) {
        reverseMap[token] = {
          token: token,
          category: usage.category,
          usages: [],
          totalOccurrences: 0,
        };
      }
      
      reverseMap[token].usages.push({
        component: profile.component,
        file: profile.file,
        property: usage.property,
        state: usage.state,
        line: usage.line,
      });
      reverseMap[token].totalOccurrences++;
    }
  }
  
  return reverseMap;
}

// ===========================================
// REPORT GENERATION
// ===========================================

function generateComponentMarkdown(componentProfiles) {
  let md = `# Component Color Map
  
Generated: ${new Date().toISOString()}

## Summary

| Category | Component Count |
|----------|-----------------|
`;
  
  const byCat = {};
  for (const p of componentProfiles) {
    byCat[p.category] = (byCat[p.category] || 0) + 1;
  }
  
  for (const [cat, count] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
    md += `| ${cat} | ${count} |\n`;
  }
  
  md += `\n## Component Color Profiles\n\n`;
  md += `| Component | Surface | Text | Border | Shadow | Outline | Other | Total |\n`;
  md += `|-----------|---------|------|--------|--------|---------|-------|-------|\n`;
  
  const sorted = [...componentProfiles].sort((a, b) => b.totals.total - a.totals.total);
  
  for (const p of sorted.slice(0, 100)) {  // Top 100
    md += `| ${p.component} | ${p.totals.surface} | ${p.totals.text} | ${p.totals.border} | ${p.totals.shadow} | ${p.totals.outline} | ${p.totals.other} | ${p.totals.total} |\n`;
  }
  
  md += `\n## Detailed Breakdowns\n\n`;
  
  for (const p of sorted.slice(0, 50)) {
    if (p.usages.length === 0) continue;
    
    md += `### ${p.component}\n`;
    md += `File: \`${p.file}\`\n\n`;
    
    // Group by property
    const byProp = {};
    for (const u of p.usages) {
      if (!byProp[u.property]) byProp[u.property] = [];
      byProp[u.property].push(u);
    }
    
    for (const [prop, usages] of Object.entries(byProp)) {
      md += `**${prop.toUpperCase()}:**\n`;
      const uniqueTokens = [...new Set(usages.map(u => u.token))];
      for (const token of uniqueTokens.slice(0, 10)) {
        const tokenUsages = usages.filter(u => u.token === token);
        const states = [...new Set(tokenUsages.map(u => u.state))];
        const lines = tokenUsages.map(u => u.line).slice(0, 5);
        md += `- \`${token}\` (${tokenUsages.length}x) - states: ${states.join(', ')} - lines: ${lines.join(', ')}\n`;
      }
      md += `\n`;
    }
    md += `---\n\n`;
  }
  
  return md;
}

function generateTokenMarkdown(reverseMap) {
  let md = `# Token Usage Map

Generated: ${new Date().toISOString()}

## Token Index

| Token | Category | Total Uses | Components |
|-------|----------|------------|------------|
`;
  
  const sorted = Object.values(reverseMap).sort((a, b) => b.totalOccurrences - a.totalOccurrences);
  
  for (const entry of sorted.slice(0, 100)) {
    const components = [...new Set(entry.usages.map(u => u.component))].slice(0, 5).join(', ');
    const more = entry.usages.length > 5 ? '...' : '';
    md += `| \`${entry.token}\` | ${entry.category} | ${entry.totalOccurrences} | ${components}${more} |\n`;
  }
  
  md += `\n## Top 50 Tokens - Detailed Usage\n\n`;
  
  for (const entry of sorted.slice(0, 50)) {
    md += `### \`${entry.token}\`\n`;
    md += `- **Category:** ${entry.category}\n`;
    md += `- **Total occurrences:** ${entry.totalOccurrences}\n`;
    md += `- **Used in ${entry.usages.length} locations:**\n\n`;
    
    // Group by component
    const byComponent = {};
    for (const u of entry.usages) {
      if (!byComponent[u.component]) byComponent[u.component] = [];
      byComponent[u.component].push(u);
    }
    
    for (const [comp, usages] of Object.entries(byComponent).slice(0, 10)) {
      const props = [...new Set(usages.map(u => u.property))].join(', ');
      const states = [...new Set(usages.map(u => u.state))].join(', ');
      const lines = usages.map(u => u.line).slice(0, 5).join(', ');
      md += `  - **${comp}** - property: ${props}, states: ${states}, lines: ${lines}\n`;
    }
    
    if (Object.keys(byComponent).length > 10) {
      md += `  - ... and ${Object.keys(byComponent).length - 10} more components\n`;
    }
    
    md += `\n---\n\n`;
  }
  
  return md;
}

// ===========================================
// MAIN EXECUTION
// ===========================================

console.log('\n🔬 COLOR FORENSICS - COMPREHENSIVE TOKEN ANALYSIS');
console.log('='.repeat(60));

const files = walkDir(rootDir);
console.log(`\nScanning ${files.length} files in src/...\n`);

// Analyze all files
const componentProfiles = [];
let totalUsages = 0;

for (const file of files) {
  const profile = analyzeFile(file);
  if (profile.usages.length > 0) {
    componentProfiles.push(profile);
    totalUsages += profile.usages.length;
  }
}

// Build reverse map
const reverseMap = buildReverseMap(componentProfiles);
const uniqueTokens = Object.keys(reverseMap).length;

console.log(`📊 ANALYSIS RESULTS`);
console.log('-'.repeat(60));
console.log(`Total tokens discovered: ${uniqueTokens}`);
console.log(`Total components scanned: ${componentProfiles.length}`);
console.log(`Total color usages found: ${totalUsages}`);

// Generate reports
const componentMd = generateComponentMarkdown(componentProfiles);
const tokenMd = generateTokenMarkdown(reverseMap);

// Write markdown reports
fs.writeFileSync(path.join(outputDir, 'docs/COMPONENT_COLOR_MAP.md'), componentMd);
fs.writeFileSync(path.join(outputDir, 'docs/TOKEN_USAGE_MAP.md'), tokenMd);

// Write JSON data
const jsonData = {
  timestamp: new Date().toISOString(),
  summary: {
    totalTokens: uniqueTokens,
    totalComponents: componentProfiles.length,
    totalUsages: totalUsages,
  },
  componentProfiles: componentProfiles,
  reverseMap: reverseMap,
};

fs.writeFileSync(
  path.join(outputDir, 'color-forensics.json'),
  JSON.stringify(jsonData, null, 2)
);

// Print summary tables
console.log(`\n📋 TOP 10 COMPONENTS BY COLOR USAGE`);
console.log('-'.repeat(60));
console.log(`| Component               | Surface | Text | Border | Shadow | Total |`);
console.log(`|-------------------------|---------|------|--------|--------|-------|`);

const topComponents = [...componentProfiles]
  .sort((a, b) => b.totals.total - a.totals.total)
  .slice(0, 10);

for (const p of topComponents) {
  console.log(`| ${p.component.padEnd(23)} | ${String(p.totals.surface).padStart(7)} | ${String(p.totals.text).padStart(4)} | ${String(p.totals.border).padStart(6)} | ${String(p.totals.shadow).padStart(6)} | ${String(p.totals.total).padStart(5)} |`);
}

console.log(`\n📋 TOP 10 MOST-USED TOKENS`);
console.log('-'.repeat(60));
console.log(`| Token                              | Category    | Uses |`);
console.log(`|------------------------------------|-------------|------|`);

const topTokens = Object.values(reverseMap)
  .sort((a, b) => b.totalOccurrences - a.totalOccurrences)
  .slice(0, 10);

for (const t of topTokens) {
  console.log(`| ${t.token.padEnd(34)} | ${t.category.padEnd(11)} | ${String(t.totalOccurrences).padStart(4)} |`);
}

// Find inconsistencies (same token used for multiple property types)
console.log(`\n⚠️  INCONSISTENCIES (tokens used for multiple property types)`);
console.log('-'.repeat(60));

const inconsistencies = [];
for (const [token, entry] of Object.entries(reverseMap)) {
  const props = [...new Set(entry.usages.map(u => u.property))];
  if (props.length > 1 && !props.includes('other')) {
    inconsistencies.push({ token, properties: props, count: entry.totalOccurrences });
  }
}

if (inconsistencies.length === 0) {
  console.log('✅ No inconsistencies found');
} else {
  for (const inc of inconsistencies.slice(0, 15)) {
    console.log(`- ${inc.token}: ${inc.properties.join(', ')} (${inc.count} uses)`);
  }
}

// Find potentially orphaned tokens (defined in CSS vars but not used in components)
console.log(`\n🔍 TOKEN COVERAGE`);
console.log('-'.repeat(60));

const allDefinedTokens = [
  ...COLOR_TOKENS.CSS_VARS.DARK,
  ...COLOR_TOKENS.CSS_VARS.WHITE,
  ...COLOR_TOKENS.CSS_VARS.ACCENT,
  ...COLOR_TOKENS.CSS_VARS.BORDER,
  ...COLOR_TOKENS.CSS_VARS.SHADOW,
  ...COLOR_TOKENS.CSS_VARS.STATUS,
];

const unusedTokens = allDefinedTokens.filter(t => !reverseMap[t]);
console.log(`Defined CSS variables: ${allDefinedTokens.length}`);
console.log(`Used CSS variables: ${allDefinedTokens.length - unusedTokens.length}`);

if (unusedTokens.length > 0) {
  console.log(`\nPotentially unused tokens:`);
  for (const t of unusedTokens.slice(0, 10)) {
    console.log(`  - ${t}`);
  }
  if (unusedTokens.length > 10) {
    console.log(`  ... and ${unusedTokens.length - 10} more`);
  }
}

console.log(`\n📁 REPORTS GENERATED`);
console.log('-'.repeat(60));
console.log(`✅ docs/COMPONENT_COLOR_MAP.md`);
console.log(`✅ docs/TOKEN_USAGE_MAP.md`);
console.log(`✅ color-forensics.json`);

console.log(`\n`);
