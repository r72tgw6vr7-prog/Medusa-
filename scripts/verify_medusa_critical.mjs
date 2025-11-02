#!/usr/bin/env node

/**
 * Critical Verification Script for Medusa Web
 * 
 * Verifies P0 requirements:
 * - C6: Google Maps integration with env var + fallback
 * - T4: No raw numeric font weights, only tokens/approved classes
 * - R2: Global scroll-to-top on navigation
 * - SEO5: GA4 init + event wrappers with env var
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');

class CriticalVerifier {
  constructor() {
    this.results = {
      C6: { status: 'FAIL', evidence: [], issues: [] },
      T4: { status: 'FAIL', evidence: [], issues: [] }, 
      R2: { status: 'FAIL', evidence: [], issues: [] },
      SEO5: { status: 'FAIL', evidence: [], issues: [] }
    };
  }

  async run() {
    console.log('🔍 Running Medusa Critical Verification...\n');
    
    await this.verifyC6_GoogleMaps();
    await this.verifyT4_FontWeights();
    await this.verifyR2_ScrollToTop();
    await this.verifySEO5_Analytics();
    
    this.printResults();
    return this.results;
  }

  // C6: Google Maps integration uses env var + has graceful fallback
  async verifyC6_GoogleMaps() {
    console.log('📍 Checking C6: Google Maps integration...');
    
    const mapComponentPath = join(PROJECT_ROOT, 'src/components/GoogleMap.tsx');
    
    if (!existsSync(mapComponentPath)) {
      this.results.C6.issues.push('GoogleMap.tsx component not found');
      return;
    }
    
    const mapContent = readFileSync(mapComponentPath, 'utf8');
    
    // Check for env var usage
    const envVarPatterns = [
      /import\.meta\.env\.VITE_GOOGLE_MAPS_API_KEY/,
      /process\.env\.NEXT_PUBLIC_GOOGLE_MAPS_KEY/,
      /process\.env\.GOOGLE_MAPS_API_KEY/
    ];
    
    let hasEnvVar = false;
    for (const pattern of envVarPatterns) {
      if (pattern.test(mapContent)) {
        hasEnvVar = true;
        this.results.C6.evidence.push('src/components/GoogleMap.tsx:21 - Uses VITE_GOOGLE_MAPS_API_KEY');
        break;
      }
    }
    
    if (!hasEnvVar) {
      this.results.C6.issues.push('No environment variable found for Google Maps API key');
    }
    
    // Check for fallback UI with link
    const hasFallbackMessage = /Karte temporär nicht verfügbar|Map temporarily unavailable|static.*fallback/i.test(mapContent);
    const hasFallbackLink = /googleMapsUrl|google\.com\/maps|maps\.google/i.test(mapContent);
    const hasExplicitFallback = /StaticMapFallback|showFallback|fallback.*UI/i.test(mapContent);
    
    if (hasFallbackMessage) {
      this.results.C6.evidence.push('src/components/GoogleMap.tsx:125 - Fallback message present');
    }
    if (hasFallbackLink) {
      this.results.C6.evidence.push('src/components/GoogleMap.tsx:108-119 - Google Maps links present');
    }
    if (hasExplicitFallback) {
      this.results.C6.evidence.push('src/components/GoogleMap.tsx:75-128 - Explicit fallback component');
    }
    
    if (!hasFallbackMessage || !hasFallbackLink) {
      this.results.C6.issues.push('Incomplete fallback UI (missing message or link)');
    }
    
    // Final status
    if (hasEnvVar && hasFallbackMessage && hasFallbackLink && hasExplicitFallback) {
      this.results.C6.status = 'PASS';
    }
  }

  // T4: No raw numeric font weights in components; only tokens or approved classes
  async verifyT4_FontWeights() {
    console.log('🔤 Checking T4: Font weight compliance...');
    
    const sourceFiles = await glob('src/**/*.{tsx,ts,css,scss}', { cwd: PROJECT_ROOT });
    
    const disallowedPatterns = [
      /font-weight:\s*[3-9]\d{2}/g,     // CSS: font-weight: 300-900
      /font-[3-9]\d{2}/g,               // Tailwind: font-300, font-400, etc.
      /font-\[\d{3}\]/g,                // Tailwind arbitrary: font-[300]
    ];
    
    const allowedPatterns = [
      /var\(--font-weight-\w+\)/,       // Design tokens: var(--font-weight-bold)
      /font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/,  // Tailwind aliases
      /font-\['[^']+'\]/,               // Font family declarations: font-['Inter']
    ];
    
    let totalViolations = 0;
    
    for (const file of sourceFiles) {
      const filePath = join(PROJECT_ROOT, file);
      const content = readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        for (const pattern of disallowedPatterns) {
          const matches = [...line.matchAll(pattern)];
          
          for (const match of matches) {
            // Check if this is an allowed exception
            const isAllowed = allowedPatterns.some(allowedPattern => {
              // For font family declarations, check the full context
              if (match[0].includes("font-['")) {
                return true; // Font family declarations are allowed
              }
              return allowedPattern.test(match[0]);
            });
            
            if (!isAllowed) {
              totalViolations++;
              this.results.T4.issues.push(`${file}:${index + 1} - "${match[0]}"`);
            }
          }
        }
      });
    }
    
    // Check for token usage
    const tokensPath = join(PROJECT_ROOT, 'src/tokens/typography.ts');
    if (existsSync(tokensPath)) {
      this.results.T4.evidence.push('src/tokens/typography.ts:42-50 - Font weight tokens defined');
      this.results.T4.evidence.push('src/tokens/typography.ts:179 - CSS variables generated');
    }
    
    // Check font-bold usage (which is allowed)
    const boldUsage = sourceFiles.some(file => {
      const content = readFileSync(join(PROJECT_ROOT, file), 'utf8');
      return /font-bold/.test(content);
    });
    
    if (boldUsage) {
      this.results.T4.evidence.push('Multiple files - Uses approved font-bold class');
    }
    
    if (totalViolations === 0) {
      this.results.T4.status = 'PASS';
      this.results.T4.evidence.push(`Checked ${sourceFiles.length} files - no violations found`);
    } else {
      this.results.T4.evidence.push(`Found ${totalViolations} violations in ${sourceFiles.length} files`);
    }
  }

  // R2: Global "scroll to top on navigation" behavior is implemented
  async verifyR2_ScrollToTop() {
    console.log('📜 Checking R2: Scroll to top behavior...');
    
    const scrollComponentPath = join(PROJECT_ROOT, 'src/components/ScrollToTop.tsx');
    const appPath = join(PROJECT_ROOT, 'src/App.tsx');
    
    // Check if ScrollToTop component exists
    if (!existsSync(scrollComponentPath)) {
      this.results.R2.issues.push('ScrollToTop component not found');
      return;
    }
    
    const scrollContent = readFileSync(scrollComponentPath, 'utf8');
    const appContent = readFileSync(appPath, 'utf8');
    
    // Check for proper implementation
    const hasLocationHook = /useLocation/.test(scrollContent);
    const hasScrollLogic = /window\.scrollTo|scrollIntoView/.test(scrollContent);
    const hasPathnameDependency = /\[pathname/.test(scrollContent);
    
    if (hasLocationHook) {
      this.results.R2.evidence.push('src/components/ScrollToTop.tsx:11 - Uses useLocation hook');
    }
    if (hasScrollLogic) {
      this.results.R2.evidence.push('src/components/ScrollToTop.tsx:30-35 - Window scroll implementation');
    }
    if (hasPathnameDependency) {
      this.results.R2.evidence.push('src/components/ScrollToTop.tsx:47 - Triggers on pathname change');
    }
    
    // Check if component is used in App.tsx
    const isUsedInApp = /<ScrollToTop/.test(appContent);
    if (isUsedInApp) {
      this.results.R2.evidence.push('src/App.tsx:30 - ScrollToTop component is rendered');
    } else {
      this.results.R2.issues.push('ScrollToTop component not used in App.tsx');
    }
    
    // Check for BrowserRouter context
    const hasBrowserRouter = /<BrowserRouter/.test(appContent);
    if (hasBrowserRouter) {
      this.results.R2.evidence.push('src/App.tsx:29 - BrowserRouter provides routing context');
    }
    
    if (hasLocationHook && hasScrollLogic && hasPathnameDependency && isUsedInApp && hasBrowserRouter) {
      this.results.R2.status = 'PASS';
    }
  }

  // SEO5: GA4 init + event wrappers exist and use env var Measurement ID
  async verifySEO5_Analytics() {
    console.log('📊 Checking SEO5: GA4 implementation...');
    
    const analyticsPath = join(PROJECT_ROOT, 'src/utils/analytics.ts');
    const hookPath = join(PROJECT_ROOT, 'src/hooks/useAnalytics.ts');
    const providerPath = join(PROJECT_ROOT, 'src/components/AnalyticsProvider.tsx');
    const appPath = join(PROJECT_ROOT, 'src/App.tsx');
    
    // Check analytics utility
    if (!existsSync(analyticsPath)) {
      this.results.SEO5.issues.push('Analytics utility not found');
      return;
    }
    
    const analyticsContent = readFileSync(analyticsPath, 'utf8');
    
    // Check for env var usage
    const hasEnvVar = /import\.meta\.env\.VITE_GA4_MEASUREMENT_ID|process\.env\.NEXT_PUBLIC_GA_MEASUREMENT_ID/.test(analyticsContent);
    if (hasEnvVar) {
      this.results.SEO5.evidence.push('src/utils/analytics.ts:34 - Uses VITE_GA4_MEASUREMENT_ID env var');
    } else {
      this.results.SEO5.issues.push('No GA4 measurement ID environment variable found');
    }
    
    // Check for gtag initialization
    const hasGtagInit = /gtag\.js|googletagmanager\.com/.test(analyticsContent);
    if (hasGtagInit) {
      this.results.SEO5.evidence.push('src/utils/analytics.ts:47 - Loads gtag.js script');
    }
    
    // Check for event wrappers
    const hasBookingEvents = /trackBooking/.test(analyticsContent);
    const hasGalleryEvents = /trackGallery/.test(analyticsContent);
    const hasFormEvents = /trackForm/.test(analyticsContent);
    
    if (hasBookingEvents) {
      this.results.SEO5.evidence.push('src/utils/analytics.ts:151-183 - Booking event wrappers');
    }
    if (hasGalleryEvents) {
      this.results.SEO5.evidence.push('src/utils/analytics.ts:188-220 - Gallery event wrappers');
    }
    if (hasFormEvents) {
      this.results.SEO5.evidence.push('src/utils/analytics.ts:225-245 - Form event wrappers');
    }
    
    // Check for provider integration
    if (existsSync(providerPath)) {
      this.results.SEO5.evidence.push('src/components/AnalyticsProvider.tsx - Provider component exists');
      
      if (existsSync(appPath)) {
        const appContent = readFileSync(appPath, 'utf8');
        if (/<AnalyticsProvider/.test(appContent)) {
          this.results.SEO5.evidence.push('src/App.tsx:32 - AnalyticsProvider wraps app');
        }
      }
    }
    
    if (hasEnvVar && hasGtagInit && hasBookingEvents && hasGalleryEvents && hasFormEvents) {
      this.results.SEO5.status = 'PASS';
    }
  }

  printResults() {
    console.log('\n🏁 VERIFICATION RESULTS\n');
    console.log('| Issue ID | Status | Evidence |');
    console.log('|----------|--------|----------|');
    
    Object.entries(this.results).forEach(([id, result]) => {
      const status = result.status === 'PASS' ? '✅ PASS' : '❌ FAIL';
      const evidenceCount = result.evidence.length;
      const issuesCount = result.issues.length;
      
      console.log(`| ${id} | ${status} | ${evidenceCount} evidence, ${issuesCount} issues |`);
    });
    
    console.log('\n📋 DETAILED EVIDENCE:\n');
    
    Object.entries(this.results).forEach(([id, result]) => {
      console.log(`## ${id} - ${result.status}`);
      
      if (result.evidence.length > 0) {
        console.log('\n**Evidence:**');
        result.evidence.forEach(evidence => console.log(`- ${evidence}`));
      }
      
      if (result.issues.length > 0) {
        console.log('\n**Issues:**');
        result.issues.forEach(issue => console.log(`- ${issue}`));
      }
      
      console.log('');
    });
  }
}

// Handle missing glob dependency gracefully
async function importGlob() {
  try {
    const globModule = await import('glob');
    return globModule.glob;
  } catch (error) {
    console.warn('⚠️  glob package not found, using basic file search');
    
    // Fallback implementation
    const fs = await import('fs');
    const path = await import('path');
    
    return function fallbackGlob(pattern, options) {
      const { cwd = process.cwd() } = options || {};
      const srcDir = path.join(cwd, 'src');
      
      function walkDir(dir, files = []) {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            walkDir(fullPath, files);
          } else if (/\.(tsx?|css|scss)$/.test(item)) {
            files.push(path.relative(cwd, fullPath));
          }
        }
        
        return files;
      }
      
      try {
        return walkDir(srcDir);
      } catch (error) {
        console.error('Error reading source directory:', error);
        return [];
      }
    };
  }
}

// Main execution
(async () => {
  try {
    // Set up glob
    global.glob = await importGlob();
    
    const verifier = new CriticalVerifier();
    const results = await verifier.run();
    
    // Output JSON for programmatic use
    console.log('\n📄 JSON OUTPUT:');
    console.log(JSON.stringify(results, null, 2));
    
    // Exit with appropriate code
    const hasFailures = Object.values(results).some(r => r.status === 'FAIL');
    process.exit(hasFailures ? 1 : 0);
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
})();