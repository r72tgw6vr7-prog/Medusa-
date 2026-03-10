import rafQueue from '@/utils/rafQueue';

export async function initPerformanceMonitoring(): Promise<void> {
  try {
    const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals');

    const reportVital = (metric: { name: string; value: number; delta: number; id: string }) => {
      // Log in dev for debugging
      if (import.meta.env.DEV) {
        (globalThis['console'] as Console).log(metric);
      }
      // Send to GA4 in production
      if (typeof window.gtag === 'function') {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
          event_label: metric.id,
          non_interaction: true,
        });
      }
    };

    onCLS(reportVital);
    onINP(reportVital);
    onLCP(reportVital);
    onFCP(reportVital);
    onTTFB(reportVital);
  } catch (error) {
    if (import.meta.env.DEV) {
      (globalThis['console'] as Console).warn('[perf] web-vitals not available:', error);
    }
  }
}

export function initFpsMonitoring(): (() => void) | null {
  if (!import.meta.env.DEV) return null;

  const logger = globalThis['console'] as Console;

  const rafKey = `fpsMonitor-${Math.random().toString(36).slice(2)}`;

  let lastTime = performance.now();
  let frames = 0;

  const stop = rafQueue.startLoop(rafKey, () => {
    frames += 1;
    const currentTime = performance.now();

    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      logger.log(`FPS: ${fps}`);
      frames = 0;
      lastTime = currentTime;
    }
  });

  return () => {
    stop();
    rafQueue.stopLoop(rafKey);
  };
}
