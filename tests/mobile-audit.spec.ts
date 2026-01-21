import { test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

type Severity = 'critical' | 'high' | 'medium' | 'low';

type IssueType =
  | 'horizontal-scroll'
  | 'overflow'
  | 'tap-target'
  | 'illegible-text'
  | 'broken-spacing'
  | 'overlap'
  | 'nav'
  | 'form'
  | 'image-distortion'
  | 'modal';

type MobileAuditIssue = {
  route: string;
  viewport: { width: number; height: number };
  component: string;
  selector: string;
  issueType: IssueType;
  severity: Severity;
  evidence: {
    screenshotPath?: string;
    details: string;
  };
  suggestedFixCategory: 'layout' | 'spacing' | 'typography' | 'component' | 'states';
};

const VIEWPORTS = [
  { width: 360, height: 740 },
  { width: 375, height: 667 },
  { width: 390, height: 844 },
] as const;

const ROUTES = [
  '/',
  '/services',
  '/services/tattoos',
  '/services/piercings',
  '/artists',
  '/gallery',
  '/booking',
  '/aftercare',
  '/agb',
  '/legal',
  '/impressum',
  '/datenschutz',
  '/faq',
  '/contact',
  '/en',
  '/en/services',
  '/en/services/tattoos',
  '/en/services/piercings',
  '/en/artists',
  '/en/gallery',
  '/en/booking',
  '/en/faq',
  '/en/contact',
] as const;

const TAP_TARGET_MIN_PX = 44;
const MIN_BODY_FONT_SIZE_PX = 14;
const MIN_LABEL_FONT_SIZE_PX = 12;

const PER_ROUTE_TIMEOUT_MS = 45_000;

const sanitizeRouteToFilename = (route: string) => {
  if (route === '/') return 'root';
  return route.replace(/^\//, '').replaceAll('/', '__');
};

const ensureDir = async (dirPath: string) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const formatIssueMarkdownRow = (issue: MobileAuditIssue) => {
  const screenshot = issue.evidence.screenshotPath
    ? issue.evidence.screenshotPath.replace(process.cwd() + path.sep, '')
    : '';

  return [
    issue.severity,
    `\`${issue.route}\``,
    `${issue.viewport.width}×${issue.viewport.height}`,
    issue.issueType,
    issue.component,
    `\`${issue.selector}\``,
    screenshot ? `\`${screenshot}\`` : '',
    issue.evidence.details.replaceAll('\n', '<br/>'),
    issue.suggestedFixCategory,
  ]
    .map((v) => v ?? '')
    .join(' | ');
};

const severityRank: Record<Severity, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

test.describe.serial('mobile audit', () => {
  test('audit public routes at phone breakpoints', async ({ page }) => {
    test.setTimeout(15 * 60 * 1000);
    const issues: MobileAuditIssue[] = [];
    const notes: string[] = [];

    const artifactsRoot = path.join(process.cwd(), 'tests', 'p0', 'artifacts', 'mobile-audit');
    await ensureDir(artifactsRoot);

    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);

      for (const route of ROUTES) {
        const routeFile = sanitizeRouteToFilename(route);
        const viewportDir = path.join(artifactsRoot, `${viewport.width}x${viewport.height}`);
        await ensureDir(viewportDir);

        let screenshotPath = path.join(viewportDir, `${routeFile}.png`);
        try {
          await page.goto(route, { waitUntil: 'domcontentloaded', timeout: PER_ROUTE_TIMEOUT_MS });
          await page.waitForLoadState('load', { timeout: PER_ROUTE_TIMEOUT_MS });
          await page.waitForTimeout(500);

          await page.screenshot({ path: screenshotPath, fullPage: true, type: 'png' });
        } catch (e) {
          notes.push(`${route} @ ${viewport.width}x${viewport.height}: navigation or load failed (${String(e)})`);
          const failureShot = path.join(viewportDir, `${routeFile}__nav-failed.png`);
          try {
            await page.screenshot({ path: failureShot, fullPage: true, type: 'png' });
            screenshotPath = failureShot;
          } catch {
            // ignore
          }

          issues.push({
            route,
            viewport,
            component: 'document',
            selector: 'window.location',
            issueType: 'overflow',
            severity: 'critical',
            evidence: {
              screenshotPath,
              details: 'Page navigation/load failed at this viewport (see Notes).',
            },
            suggestedFixCategory: 'layout',
          });
          continue;
        }

        const pageFindings = await page.evaluate(
          ({ TAP_TARGET_MIN_PX, MIN_BODY_FONT_SIZE_PX, MIN_LABEL_FONT_SIZE_PX }) => {
            const findings: {
              horizontalScroll: { scrollWidth: number; clientWidth: number } | null;
              overflowElements: Array<{ selector: string; rect: { left: number; right: number; top: number; bottom: number; width: number; height: number } }>;
              tapTargets: Array<{ selector: string; width: number; height: number; tag: string; text: string }>; 
              smallText: Array<{ selector: string; fontSize: number; tag: string; text: string }>;
            } = {
              horizontalScroll: null,
              overflowElements: [],
              tapTargets: [],
              smallText: [],
            };

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

            for (const el of allElements) {
              if (!isVisible(el)) continue;
              const rect = (el as HTMLElement).getBoundingClientRect();

              if (rect.right > vw + 1 || rect.left < -1) {
                findings.overflowElements.push({
                  selector: getSelector(el),
                  rect: {
                    left: rect.left,
                    right: rect.right,
                    top: rect.top,
                    bottom: rect.bottom,
                    width: rect.width,
                    height: rect.height,
                  },
                });
              }

              const clickable =
                el instanceof HTMLButtonElement ||
                el instanceof HTMLAnchorElement ||
                el instanceof HTMLInputElement ||
                el instanceof HTMLSelectElement ||
                el instanceof HTMLTextAreaElement ||
                el.getAttribute('role') === 'button' ||
                el.getAttribute('role') === 'link' ||
                el.hasAttribute('onclick');

              if (clickable) {
                if (rect.width < TAP_TARGET_MIN_PX || rect.height < TAP_TARGET_MIN_PX) {
                  const text = (el as HTMLElement).innerText?.trim?.() || (el as HTMLElement).getAttribute('aria-label') || '';
                  findings.tapTargets.push({
                    selector: getSelector(el),
                    width: rect.width,
                    height: rect.height,
                    tag: el.tagName.toLowerCase(),
                    text: text.slice(0, 80),
                  });
                }
              }

              const textRelevant =
                el instanceof HTMLParagraphElement ||
                el instanceof HTMLLabelElement ||
                el instanceof HTMLSpanElement ||
                el instanceof HTMLAnchorElement ||
                el instanceof HTMLButtonElement ||
                el.tagName.toLowerCase() === 'li';

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
                        text: text.slice(0, 120),
                      });
                    }
                  }
                }
              }
            }

            findings.overflowElements = findings.overflowElements.slice(0, 20);
            findings.tapTargets = findings.tapTargets.slice(0, 30);
            findings.smallText = findings.smallText.slice(0, 30);

            return findings;
          },
          { TAP_TARGET_MIN_PX, MIN_BODY_FONT_SIZE_PX, MIN_LABEL_FONT_SIZE_PX },
        );

        if (pageFindings.horizontalScroll) {
          issues.push({
            route,
            viewport,
            component: 'document',
            selector: 'html, body',
            issueType: 'horizontal-scroll',
            severity: 'critical',
            evidence: {
              screenshotPath,
              details: `scrollWidth=${pageFindings.horizontalScroll.scrollWidth}, clientWidth=${pageFindings.horizontalScroll.clientWidth}`,
            },
            suggestedFixCategory: 'layout',
          });
        }

        for (const el of pageFindings.overflowElements) {
          issues.push({
            route,
            viewport,
            component: 'unknown',
            selector: el.selector,
            issueType: 'overflow',
            severity: 'high',
            evidence: {
              screenshotPath,
              details: `boundingRect left=${el.rect.left.toFixed(1)} right=${el.rect.right.toFixed(1)} width=${el.rect.width.toFixed(1)} (vw=${viewport.width})`,
            },
            suggestedFixCategory: 'layout',
          });
        }

        for (const t of pageFindings.tapTargets) {
          issues.push({
            route,
            viewport,
            component: 'interactive',
            selector: t.selector,
            issueType: 'tap-target',
            severity: 'high',
            evidence: {
              screenshotPath,
              details: `${t.tag} ${t.text ? `text=\"${t.text}\" ` : ''}size=${t.width.toFixed(1)}×${t.height.toFixed(1)} (min ${TAP_TARGET_MIN_PX}×${TAP_TARGET_MIN_PX})`,
            },
            suggestedFixCategory: 'component',
          });
        }

        for (const st of pageFindings.smallText) {
          issues.push({
            route,
            viewport,
            component: 'typography',
            selector: st.selector,
            issueType: 'illegible-text',
            severity: 'medium',
            evidence: {
              screenshotPath,
              details: `${st.tag} fontSize=${st.fontSize.toFixed(1)}px text=\"${st.text}\"`,
            },
            suggestedFixCategory: 'typography',
          });
        }
      }
    }

    issues.sort((a, b) => {
      const sev = severityRank[a.severity] - severityRank[b.severity];
      if (sev !== 0) return sev;
      const r = a.route.localeCompare(b.route);
      if (r !== 0) return r;
      return a.issueType.localeCompare(b.issueType);
    });

    const totals = issues.reduce(
      (acc, i) => {
        acc.total += 1;
        acc.bySeverity[i.severity] += 1;
        return acc;
      },
      {
        total: 0,
        bySeverity: { critical: 0, high: 0, medium: 0, low: 0 } as Record<Severity, number>,
      },
    );

    const reportPath = path.join(process.cwd(), 'docs', 'MOBILE_AUDIT_2026-01-20.md');

    const header = [
      '# Mobile Audit (2026-01-20)',
      '',
      '## Summary stats',
      '',
      `Total pages audited: ${ROUTES.length}`,
      `Total issues found: ${totals.total} (Critical: ${totals.bySeverity.critical}, High: ${totals.bySeverity.high}, Medium: ${totals.bySeverity.medium}, Low: ${totals.bySeverity.low})`,
      '',
      '## Notes',
      '',
      ...(notes.length ? notes.map((n) => `- ${n}`) : ['- (none)']),
      '',
      '## Issues (sorted by severity)',
      '',
      'Severity | Route | Viewport | Type | Component | Selector | Evidence (screenshot) | Evidence (details) | Fix category',
      '--- | --- | --- | --- | --- | --- | --- | --- | ---',
    ].join('\n');

    const rows = issues.map(formatIssueMarkdownRow).join('\n');

    const criticalTop5 = issues
      .filter((i) => i.severity === 'critical')
      .slice(0, 5)
      .map((i) => `- ${i.route} @ ${i.viewport.width}×${i.viewport.height}: ${i.issueType} (${i.selector})`)
      .join('\n');

    const fixBatches = [
      '1) Eliminate horizontal scroll + overflow sources (layout containment + responsive containers)',
      '2) Fix tap target sizing for primary nav + all CTAs and form controls (44×44 minimum)',
      '3) Fix typography minimums + line-height for small text (>=14px body, >=12px labels)',
      '4) Re-audit forms and modal/drawer interactions on /booking and /contact',
    ].join('\n');

    const footer = [
      '',
      '## Top 5 critical issues',
      '',
      criticalTop5 || '- (none found)',
      '',
      '## Recommended fix order',
      '',
      fixBatches,
      '',
    ].join('\n');

    await fs.writeFile(reportPath, `${header}\n${rows}${footer}`, 'utf8');

    const jsonPath = path.join(artifactsRoot, 'mobile-audit-results.json');
    await fs.writeFile(jsonPath, JSON.stringify({ routes: ROUTES, viewports: VIEWPORTS, totals, issues }, null, 2), 'utf8');
  });
});
