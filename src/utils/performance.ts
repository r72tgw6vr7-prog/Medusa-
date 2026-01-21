import rafQueue from '@/utils/rafQueue';

export async function initPerformanceMonitoring(): Promise<void> {
  if (!import.meta.env.DEV) return;

  const logger = globalThis['console'] as Console;

  try {
    const { onCLS, onFID, onLCP, onFCP, onTTFB } = await import('web-vitals');

    onCLS(logger.log);
    onFID(logger.log);
    onLCP(logger.log);
    onFCP(logger.log);
    onTTFB(logger.log);
  } catch (error) {
    logger.warn('[perf] web-vitals not available:', error);
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
