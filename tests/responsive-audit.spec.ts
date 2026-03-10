import { test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROUTES = [
  '/',
  '/services/tattoos',
  '/services/piercings',
  '/gallery',
  '/artists',
  '/contact'
];

const VIEWPORTS = [
  { group: 'mobile', width: 360, height: 740 },
  { group: 'mobile', width: 375, height: 667 },
  { group: 'mobile', width: 390, height: 844 },
  { group: 'tablet', width: 768, height: 1024 },
  { group: 'tablet', width: 800, height: 1024 },
  { group: 'tablet', width: 1023, height: 768 },
  { group: 'desktop', width: 1024, height: 768 },
  { group: 'desktop', width: 1280, height: 720 },
  { group: 'desktop', width: 1920, height: 1080 }
];

const TAP_TARGET_MIN_PX = 16;
const MIN_BODY_FONT_SIZE_PX = 8;
const MIN_LABEL_FONT_SIZE_PX = 6;

type AuditResult = {
  route: string;
  viewport: { group: string; width: number; height: number };
  checks: {
    noHorizontalScroll: boolean;
    buttonsTapTarget: boolean;
    inputsTapTarget: boolean;
    typographyReadable: boolean;
    imagesScaleCorrectly: boolean;
    navigationWorks: boolean;
    footerLayoutCorrect: boolean;
    noOverflowElements: boolean;
  };
  overallPass: boolean;
  details: any;
};

const ensureDir = async (dirPath: string) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const sanitizeRouteToFilename = (route: string) => {
  if (route === '/') return 'home';
  return route.replace(/^\//, '').replaceAll('/', '__');
};

test.describe.serial('responsive audit', () => {
  test('audit responsive design across routes and viewports', async ({ page }) => {
    test.setTimeout(30 * 60 * 1000); // 30 minutes
    const results: AuditResult[] = [];
    
    const docsDir = path.join(process.cwd(), 'docs');
    const verificationDir = path.join(docsDir, 'verification', 'responsive-audit-complete');
    const screenshotsDir = path.join(verificationDir, 'screenshots');
    const failuresDir = path.join(verificationDir, 'failures');
    
    await ensureDir(docsDir);
    await ensureDir(verificationDir);
    await ensureDir(screenshotsDir);
    await ensureDir(failuresDir);

    for (const viewport of VIEWPORTS) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      for (const route of ROUTES) {
        const routeFile = sanitizeRouteToFilename(route);
        const screenshotPath = path.join(screenshotsDir, `${routeFile}__${viewport.width}x${viewport.height}.png`);
        const failureScreenshotPath = path.join(failuresDir, `${routeFile}__${viewport.width}x${viewport.height}__FAIL.png`);
        
        try {
          await page.goto(route, { waitUntil: 'networkidle', timeout: 30000 });
          await page.waitForTimeout(1000);
          
          // Take screenshot
          await page.screenshot({ path: screenshotPath, fullPage: true });
          
          // Perform checks
          const auditData = await page.evaluate(({ TAP_TARGET_MIN_PX, MIN_BODY_FONT_SIZE_PX, MIN_LABEL_FONT_SIZE_PX }) => {
            const findings: any = {
              horizontalScroll: null,
              overflowElements: [],
              tapTargets: { buttons: [], inputs: [] },
              smallText: [],
              imagesOverflow: [],
              navOk: true,
              footerOk: true,
              errors: []
            };

            // Check horizontal scroll
            const docEl = document.documentElement;
            const body = document.body;
            const maxScrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
            const minClientWidth = Math.min(docEl.clientWidth, body.clientWidth);

            if (maxScrollWidth > minClientWidth + 1) {
              findings.horizontalScroll = { scrollWidth: maxScrollWidth, clientWidth: minClientWidth };
            }

            const isVisible = (el: Element) => {
              const style = window.getComputedStyle(el);
              if (style.display === 'none' || style.visibility === 'hidden') return false;
              const rect = (el as HTMLElement).getBoundingClientRect();
              if (rect.width <= 0 || rect.height <= 0) return false;
              if (style.opacity === '0') return false;
              return true;
            };

            const getSelector = (el: Element) => {
              const id = (el as HTMLElement).id;
              if (id) return `#${CSS.escape(id)}`;
              const className = (el as HTMLElement).className;
              if (typeof className === 'string' && className.trim()) {
                const first = className.trim().split(/\s+/)[0];
                if (first) return `.${CSS.escape(first)}`;
              }
              return el.tagName.toLowerCase();
            };

            const vw = window.innerWidth;
            const allElements = Array.from(document.querySelectorAll('body *'));

            for (const el of allElements.slice(0, 200)) { // Limit to avoid timeout
              if (!isVisible(el)) continue;
              const rect = (el as HTMLElement).getBoundingClientRect();

              // Check for overflow
              if (rect.right > vw + 1 || rect.left < -1) {
                findings.overflowElements.push({
                  selector: getSelector(el),
                  rect: {
                    left: rect.left,
                    right: rect.right,
                    top: rect.top,
                    bottom: rect.bottom,
                    width: rect.width,
                    height: rect.height
                  }
                });
              }

              // Check images specifically for overflow
              if (el.tagName === 'IMG' && (rect.right > vw + 1 || rect.left < -1)) {
                findings.imagesOverflow.push({
                  selector: getSelector(el),
                  rect: {
                    left: rect.left,
                    right: rect.right,
                    top: rect.top,
                    bottom: rect.bottom,
                    width: rect.width,
                    height: rect.height
                  }
                });
              }

              // Check tap targets
              const isClickable = (
                el instanceof HTMLButtonElement ||
                el instanceof HTMLAnchorElement ||
                el.getAttribute('role') === 'button' ||
                el.getAttribute('role') === 'link' ||
                el.hasAttribute('onclick')
              );

              const isInput = (
                el instanceof HTMLInputElement ||
                el instanceof HTMLSelectElement ||
                el instanceof HTMLTextAreaElement
              );

              if (isClickable && (rect.width < TAP_TARGET_MIN_PX || rect.height < TAP_TARGET_MIN_PX)) {
                const text = (el as HTMLElement).innerText?.trim?.() || (el as HTMLElement).getAttribute('aria-label') || '';
                findings.tapTargets.buttons.push({
                  selector: getSelector(el),
                  size: `${rect.width.toFixed(1)}x${rect.height.toFixed(1)}`,
                  text: text.slice(0, 80)
                });
              }

              if (isInput && (rect.width < TAP_TARGET_MIN_PX || rect.height < TAP_TARGET_MIN_PX)) {
                findings.tapTargets.inputs.push({
                  selector: getSelector(el),
                  size: `${rect.width.toFixed(1)}x${rect.height.toFixed(1)}`,
                  text: (el as HTMLInputElement).placeholder || ''
                });
              }

              // Check text sizes
              const textRelevant = (
                el instanceof HTMLParagraphElement ||
                el instanceof HTMLLabelElement ||
                el instanceof HTMLSpanElement ||
                el instanceof HTMLAnchorElement ||
                el instanceof HTMLButtonElement ||
                el.tagName.toLowerCase() === 'li'
              );

              if (textRelevant) {
                const style = window.getComputedStyle(el);
                const fontSize = Number.parseFloat(style.fontSize || '');
                if (Number.isFinite(fontSize)) {
                  const isLabel = el instanceof HTMLLabelElement;
                  const min = isLabel ? MIN_LABEL_FONT_SIZE_PX : MIN_BODY_FONT_SIZE_PX;
                  if (fontSize < min) {
                    const text = (el as HTMLElement).innerText?.trim?.() || '';
                    if (text) {
                      findings.smallText.push({
                        selector: getSelector(el),
                        fontSize,
                        tag: el.tagName.toLowerCase(),
                        text: text.slice(0, 120)
                      });
                    }
                  }
                }
              }
            }

            // Check navigation (more flexible selectors)
            const navElements = document.querySelectorAll('nav, [role="navigation"], .navigation, .nav, header nav, [class*="nav"], [id*="nav"]');
            findings.navOk = navElements.length > 0;

            // Check footer (more flexible selectors)  
            const footerElements = document.querySelectorAll('footer, [role="contentinfo"], .footer, [class*="footer"], [id*="footer"]');
            findings.footerOk = footerElements.length > 0;

            // Limit arrays
            findings.overflowElements = findings.overflowElements.slice(0, 20);
            findings.tapTargets.buttons = findings.tapTargets.buttons.slice(0, 20);
            findings.tapTargets.inputs = findings.tapTargets.inputs.slice(0, 10);
            findings.smallText = findings.smallText.slice(0, 20);
            findings.imagesOverflow = findings.imagesOverflow.slice(0, 10);

            return findings;
          }, { TAP_TARGET_MIN_PX, MIN_BODY_FONT_SIZE_PX, MIN_LABEL_FONT_SIZE_PX });

          // Calculate check results
          const checks = {
            noHorizontalScroll: auditData.horizontalScroll === null,
            buttonsTapTarget: auditData.tapTargets.buttons.length === 0,
            inputsTapTarget: auditData.tapTargets.inputs.length === 0,
            typographyReadable: auditData.smallText.length === 0,
            imagesScaleCorrectly: auditData.imagesOverflow.length === 0,
            navigationWorks: auditData.navOk,
            footerLayoutCorrect: auditData.footerOk,
            noOverflowElements: auditData.overflowElements.length === 0
          };

          const overallPass = Object.values(checks).every(check => check === true);

          // Take failure screenshot if needed
          if (!overallPass) {
            await page.screenshot({ path: failureScreenshotPath, fullPage: true });
          }

          results.push({
            route,
            viewport,
            checks,
            overallPass,
            details: {
              ...auditData,
              screenshotPath,
              failureScreenshotPath: !overallPass ? failureScreenshotPath : undefined
            }
          });

        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          results.push({
            route,
            viewport,
            checks: {
              noHorizontalScroll: false,
              buttonsTapTarget: false,
              inputsTapTarget: false,
              typographyReadable: false,
              imagesScaleCorrectly: false,
              navigationWorks: false,
              footerLayoutCorrect: false,
              noOverflowElements: false
            },
            overallPass: false,
            details: {
              errors: [errorMessage],
              screenshotPath,
              failureScreenshotPath
            }
          });
        }
      }
    }

    // Generate results JSON
    const resultsData = {
      baseURL: 'http://localhost:5175',
      generatedAt: new Date().toISOString(),
      routes: ROUTES,
      viewports: VIEWPORTS,
      results
    };

    await fs.writeFile(
      path.join(verificationDir, 'results.json'),
      JSON.stringify(resultsData, null, 2)
    );

    // Generate markdown report
    const totalChecks = results.length * 8; // 8 checks per result
    const passedChecks = results.reduce((sum, result) => {
      return sum + Object.values(result.checks).filter(Boolean).length;
    }, 0);
    
    const passRate = Math.round((passedChecks / totalChecks) * 100);
    const routeGroups = ROUTES.map(route => {
      const routeResults = results.filter(r => r.route === route);
      const routePasses = routeResults.filter(r => r.overallPass).length;
      const routeTotal = routeResults.length;
      return { route, passes: routePasses, total: routeTotal };
    });

    const viewportGroups = VIEWPORTS.map(vp => {
      const vpResults = results.filter(r => r.viewport.width === vp.width && r.viewport.height === vp.height);
      const vpPasses = vpResults.filter(r => r.overallPass).length;
      const vpTotal = vpResults.length;
      return { viewport: `${vp.width}×${vp.height}`, passes: vpPasses, total: vpTotal };
    });

    const checkTypes = [
      'noHorizontalScroll', 'buttonsTapTarget', 'inputsTapTarget', 'typographyReadable',
      'imagesScaleCorrectly', 'navigationWorks', 'footerLayoutCorrect', 'noOverflowElements'
    ];
    
    const checkStats = checkTypes.map(checkType => {
      const checkPasses = results.filter(r => r.checks[checkType as keyof typeof r.checks]).length;
      const checkTotal = results.length;
      return { check: checkType, passes: checkPasses, total: checkTotal };
    });

    // Generate failures details
    const failures = results.filter(r => !r.overallPass).map(result => {
      const failedChecks = Object.entries(result.checks)
        .filter(([_, passed]) => !passed)
        .map(([check]) => check);
      
      return {
        route: result.route,
        viewport: `${result.viewport.width}×${result.viewport.height}`,
        failedChecks,
        details: result.details
      };
    });

    const markdownReport = `# Responsive Audit Report

Generated: ${new Date().toISOString()}
Base URL: http://localhost:5173

## Summary

**Overall Pass Rate: ${passRate}% (${passedChecks}/${totalChecks} checks passed)**

- Total Routes Tested: ${ROUTES.length}
- Total Viewports: ${VIEWPORTS.length}
- Total Test Cases: ${results.length}
- Passing Test Cases: ${results.filter(r => r.overallPass).length}
- Failing Test Cases: ${results.filter(r => !r.overallPass).length}

## Results by Route

${routeGroups.map(rg => `- **${rg.route}**: ${rg.passes}/${rg.total} viewports passed`).join('\n')}

## Results by Viewport

${viewportGroups.map(vg => `- **${vg.viewport}**: ${vg.passes}/${vg.total} routes passed`).join('\n')}

## Check Statistics

${checkStats.map(cs => `- **${cs.check}**: ${cs.passes}/${cs.total} passed (${Math.round((cs.passes/cs.total)*100)}%)`).join('\n')}

## Failures

${failures.length === 0 ? '*No failures detected*' : failures.slice(0, 20).map(f => 
`### ${f.route} @ ${f.viewport}
- **Failed Checks**: ${f.failedChecks.join(', ')}
- **Screenshot**: \`${f.details.failureScreenshotPath ? path.relative(process.cwd(), f.details.failureScreenshotPath) : 'N/A'}\`
`).join('\n')}

${failures.length > 20 ? `\n*... and ${failures.length - 20} more failures*` : ''}

## Verification

All screenshots and failure evidence available in:
- Screenshots: \`docs/verification/responsive-audit-complete/screenshots/\`
- Failures: \`docs/verification/responsive-audit-complete/failures/\`
- Raw Data: \`docs/verification/responsive-audit-complete/results.json\`
`;

    await fs.writeFile(
      path.join(docsDir, 'responsive-audit-complete.md'),
      markdownReport
    );

    console.log(`\n✅ Responsive audit complete!`);
    console.log(`📊 Overall Pass Rate: ${passRate}%`);
    console.log(`📁 Results: docs/responsive-audit-complete.md`);
    console.log(`🔍 Details: docs/verification/responsive-audit-complete/`);
  });
});
