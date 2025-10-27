// ============================================
// COMPONENT: DeveloperDiagnostics
// ============================================
// PURPOSE: Diagnose "blank page" at localhost, verify mount chain, capture errors, probe assets, list missing pages/assets, and surface copyable fix steps.
//
// DESIGN SPECIFICATIONS:
// ----------------------
// Layout:
//   - Container: "min-h-screen bg-[#0F0F0F] text-white"
//   - Grid/Flex: "max-w-[1104px] mx-auto p-6 md:p-10 flex flex-col gap-6"
//   - Spacing: gaps 12/8/6 for sections, consistent paddings
//   - Dimensions: full-width panels with rounded corners
//
// Colors:
//   - Background: #0F0F0F
//   - Text: #EAEAEA (primary), #B3B3B3 (secondary)
//   - Borders: rgba(212,175,55,0.35) 1px
//   - Hover states: gold glow intensity +10%
//   - Brand colors: #D4AF37 (gold), #1A1A1A (dark)
//
// Typography:
//   - Headings: Inter, 22–28px, 600
//   - Body: Inter, 14–16px, 1.6
//   - Special text: Uppercase labels with tracking-wide
//
// Interactive States:
//   - Hover: scale-100 → scale-105 on action tiles
//   - Focus: focus:ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#0F0F0F]
//   - Active: translate-y-[1px]
//   - Transitions: duration-200 ease-out
//
// Responsive Behavior:
//   - Mobile (< 768px): single column
//   - Tablet (768px - 1023px): two columns for test results
//   - Desktop (>= 1024px): two columns with wider diagnostics panels

import React from 'react';
import {
  Bug,
  Server,
  Image as ImageIcon,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  RefreshCw,
  Link as LinkIcon,
} from 'lucide-react';
import { MainNavigation } from '../components/molecules/MainNavigation';
import Footer from '../components/Footer';

// Data structure (inline for Phase 1)
const data = {
  expectedTeamPhotos: [
    { id: 'aaron', paths: ['/images/team/aaron.webp', '/images/team/aaron.png'] },
    { id: 'angie', paths: ['/images/team/angie.webp', '/images/team/angie.png'] },
    { id: 'debi', paths: ['/images/team/debi.webp', '/images/team/debi.png'] },
    { id: 'eli', paths: ['/images/team/eli.webp', '/images/team/eli.png'] },
    { id: 'loui', paths: ['/images/team/loui.webp', '/images/team/loui.png'] },
    { id: 'oli', paths: ['/images/team/oli.webp', '/images/team/oli.png'] },
    { id: 'sasha', paths: ['/images/team/sasha.webp', '/images/team/sasha.png'] },
    { id: 'vive', paths: ['/images/team/vive.webp', '/images/team/vive.png'] },
  ],
  expectedGalleryExamples: [
    '/images/gallery/traditional-aaron-001.webp',
    '/images/gallery/realism-angie-001.webp',
    '/images/gallery/geometric-eli-001.webp',
  ],
  layer1Commands: ['npx tsc --noEmit', 'npm run lint', 'npm run build', 'npm run dev'],
  cacheFixes: ['rm -rf node_modules/.vite', 'rm -rf node_modules/.cache', 'npm ci', 'npm run dev'],
  finalGate: ['npm run build', 'npm run preview'],
  backendEndpoints: ['POST /api/booking', 'POST /api/contact'],
  suspectedRootCauses: [
    'Mount chain mismatch (index.html → main.tsx → HomePage not rendering)',
    'Vite cache corruption causing blank screen at runtime',
    'Asset path drift or 404s blocking render-critical components',
    'Silent runtime error (unhandled promise / module import mismatch)',
  ],
};

type ProbeResult = { name: string; ok: boolean; detail?: string };

export default function DeveloperDiagnostics() {
  const [running, setRunning] = React.useState(false);
  const [mountResults, setMountResults] = React.useState<ProbeResult[]>([]);
  const [errorEvents, setErrorEvents] = React.useState<string[]>([]);
  const [assetResults, setAssetResults] = React.useState<ProbeResult[]>([]);
  const [galleryResults, setGalleryResults] = React.useState<ProbeResult[]>([]);
  const [summary, setSummary] = React.useState<{ passes: number; fails: number }>({
    passes: 0,
    fails: 0,
  });

  React.useEffect(() => {
    const onError = (
      msg: string | Event,
      src?: string,
      line?: number,
      col?: number,
      err?: Error,
    ) => {
      setErrorEvents((prev) => [
        ...prev,
        `[error] ${msg} @ ${src}:${line}:${col} :: ${err?.stack || ''}`,
      ]);
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      setErrorEvents((prev) => [...prev, `[unhandledrejection] ${e.reason?.message || e.reason}`]);
    };
    window.addEventListener('error', onError as EventListener);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError as EventListener);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  async function runMountCheck() {
    const results: ProbeResult[] = [];
    const root = document.getElementById('root');
    results.push({
      name: 'Root element exists (#root)',
      ok: !!root,
      detail: !!root ? 'found' : 'missing',
    });
    if (root) {
      try {
        const marker = document.createElement('div');
        marker.setAttribute('data-diagnostic', 'mounted');
        root.appendChild(marker);
        const found = !!root.querySelector('[data-diagnostic="mounted"]');
        results.push({
          name: 'DOM writable (client render active)',
          ok: found,
          detail: found ? 'ok' : 'append failed',
        });
        if (marker.parentElement) marker.parentElement.removeChild(marker);
      } catch (e) {
        results.push({
          name: 'DOM writable (client render active)',
          ok: false,
          detail: e instanceof Error ? e.message : 'unknown error',
        });
      }
    }
    setMountResults(results);
    return results;
  }

  async function probeImages(paths: string[], labelPrefix: string) {
    const out: ProbeResult[] = [];
    for (const p of paths) {
      try {
        const res = await fetch(p, { method: 'GET', cache: 'no-store' });
        out.push({
          name: `${labelPrefix}: ${p}`,
          ok: res.ok,
          detail: res.ok ? '200 OK' : `${res.status} ${res.statusText}`,
        });
      } catch (e) {
        out.push({
          name: `${labelPrefix}: ${p}`,
          ok: false,
          detail: e instanceof Error ? e.message : 'network error',
        });
      }
    }
    return out;
  }

  async function runAssetChecks() {
    const teamPaths = data.expectedTeamPhotos.flatMap((t) => t.paths);
    const teamResults = await probeImages(teamPaths, 'Team');
    setAssetResults(teamResults);
    const galleryResultsNext = await probeImages(data.expectedGalleryExamples, 'Gallery');
    setGalleryResults(galleryResultsNext);
    return [...teamResults, ...galleryResultsNext];
  }

  function recomputeSummary(sections: ProbeResult[][]) {
    let passes = 0,
      fails = 0;
    sections.flat().forEach((r) => (r.ok ? passes++ : fails++));
    setSummary({ passes, fails });
  }

  async function runAll() {
    setRunning(true);
    const m = await runMountCheck();
    const a = await runAssetChecks();
    recomputeSummary([m, a]);
    setRunning(false);
  }

  function Badge({ ok }: { ok: boolean }) {
    return (
      <span
        className={`inline-flex items-center text-xs px-2 py-1 rounded ${ok ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'}`}
      >
        {ok ? (
          <CheckCircle2 className='w-3.5 h-3.5 mr-0' />
        ) : (
          <ShieldAlert className='w-3.5 h-3.5 mr-0' />
        )}
        {ok ? 'PASS' : 'FAIL'}
      </span>
    );
  }

  function Section({
    icon: Icon,
    title,
    children,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <section className='border border-[#D4AF37]/35 rounded-xl p-8 md:p-8 bg-[#1A1A1A] shadow-[0_0_20px_rgba(212,175,55,0.15)]'>
        <header className='flex items-center gap-0 mb-0'>
          <Icon className='w-5 h-5 text-[#D4AF37]' />
          <h2 className='text-lg font-semibold'>{title}</h2>
        </header>
        {children}
      </section>
    );
  }

  function Cmd({ cmd }: { cmd: string }) {
    return (
      <div className='flex items-center justify-between bg-black/50 rounded-lg px-0 py-0 text-sm font-mono'>
        <code>{cmd}</code>
        <button
          className='ml-0 text-[#D4AF37] hover:underline focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded px-0 py-0 transition duration-200 ease-out'
          onClick={() => navigator.clipboard.writeText(cmd)}
        >
          Copy
        </button>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#0F0F0F] text-white flex flex-col'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />

      <main className='flex-1'>
        <section className='section-padding'>
          <div className='responsive-container safe-area-padding'>
            <div
              className='mx-auto w-full max-w-[1104px] flex flex-col gap-8'
              aria-live='polite'
              aria-busy={running ? 'true' : 'false'}
            >
              <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-semibold tracking-wide'>Developer Diagnostics</h1>
                <button
                  className='inline-flex items-center gap-0 bg-[#D4AF37] text-black px-8 py-0 rounded-md hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition duration-200 ease-out'
                  onClick={runAll}
                  disabled={running}
                  aria-label='Run all diagnostics'
                >
                  <RefreshCw className={`w-4 h-4 ${running ? 'animate-spin' : ''}`} /> Run All
                  Checks
                </button>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <Section icon={LinkIcon} title='Mount Chain'>
                  <p className='text-sm text-[#B3B3B3] mb-0'>
                    Verifies #root exists and DOM is writable to detect failed index.html → main.tsx
                    → HomePage mounting.
                  </p>
                  <div className='flex gap-0 mb-0'>
                    <button
                      className='bg-white/10 hover:bg-white/15 px-0 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] flex flex-col h-full transition duration-200 ease-out'
                      onClick={runMountCheck}
                    >
                      Run Mount Check
                    </button>
                  </div>
                  <ul className='space-y-0'>
                    {mountResults.map((r, i) => (
                      <li
                        key={i}
                        className='flex items-center justify-between bg-black/40 rounded px-0 py-0 text-sm flex-col h-full'
                      >
                        <span>
                          {r.name} — {r.detail}
                        </span>
                        <Badge ok={r.ok} />
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section icon={Bug} title='Runtime Errors'>
                  <p className='text-sm text-[#B3B3B3] mb-0'>
                    Captures window.onerror and unhandledrejection messages that commonly cause
                    blank screens.
                  </p>
                  <div className='bg-black/40 rounded p-0 text-sm h-44 overflow-auto flex flex-col h-full'>
                    {errorEvents.length === 0 ? (
                      <div className='text-[#B3B3B3]'>No runtime errors captured.</div>
                    ) : (
                      <ul className='list-disc pl-8 space-y-0'>
                        {errorEvents.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Section>

                <Section icon={ImageIcon} title='Asset Probes — Team'>
                  <p className='text-sm text-[#B3B3B3] mb-0'>
                    Checks team portraits exist at documented paths (WebP primary, PNG fallback).
                  </p>
                  <div className='flex gap-0 mb-0'>
                    <button
                      className='bg-white/10 hover:bg-white/15 px-0 py-0 rounded focus:outline-none focus:ring-2 focus:ring-[#D4AF37] flex flex-col h-full transition duration-200 ease-out'
                      onClick={runAssetChecks}
                    >
                      Probe Team Images
                    </button>
                  </div>
                  <ul className='space-y-0 max-h-52 overflow-auto'>
                    {assetResults.map((r, i) => (
                      <li
                        key={i}
                        className='flex items-center justify-between bg-black/40 rounded px-0 py-0 text-sm flex-col h-full'
                      >
                        <span>
                          {r.name} — {r.detail}
                        </span>
                        <Badge ok={r.ok} />
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section icon={ImageIcon} title='Asset Probes — Gallery (samples)'>
                  <p className='text-sm text-[#B3B3B3] mb-0'>
                    Verifies example gallery assets exist where the gallery page expects them.
                  </p>
                  <ul className='space-y-0 max-h-52 overflow-auto'>
                    {galleryResults.map((r, i) => (
                      <li
                        key={i}
                        className='flex items-center justify-between bg-black/40 rounded px-0 py-0 text-sm flex-col h-full'
                      >
                        <span>
                          {r.name} — {r.detail}
                        </span>
                        <Badge ok={r.ok} />
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section icon={Server} title='Build & Type/Lint Gates'>
                  <p className='text-sm text-[#B3B3B3] mb-0'>
                    Run in terminal exactly in this order to isolate config issues causing blank
                    pages.
                  </p>
                  <div className='space-y-0'>
                    {data.layer1Commands.map((c, i) => (
                      <Cmd key={i} cmd={c} />
                    ))}
                  </div>
                </Section>

                <Section icon={Terminal} title='Cache & Preview Fixes'>
                  <p className='text-sm text-[#B3B3B3] mb-0'>
                    Clear Vite caches, reinstall deps, and preview production to bypass dev-only
                    corruption.
                  </p>
                  <div className='space-y-0 mb-0'>
                    {data.cacheFixes.map((c, i) => (
                      <Cmd key={i} cmd={c} />
                    ))}
                  </div>
                  <div className='space-y-0'>
                    {data.finalGate.map((c, i) => (
                      <Cmd key={i} cmd={c} />
                    ))}
                  </div>
                </Section>
              </div>

              <Section icon={AlertTriangle} title='Likely Root Causes'>
                <ul className='list-disc pl-8 space-y-0 text-sm'>
                  {data.suspectedRootCauses.map((rc, i) => (
                    <li key={i}>{rc}</li>
                  ))}
                </ul>
              </Section>

              <Section icon={CheckCircle2} title='Summary'>
                <div className='text-sm'>
                  Passes: <span className='text-emerald-300'>{summary.passes}</span> • Fails:{' '}
                  <span className='text-red-300'>{summary.fails}</span>
                </div>
              </Section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
