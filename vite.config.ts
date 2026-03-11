import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const isAnalyze = mode === 'analyze';

  const plugins = [
    react(),
    // Gzip compression for production
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files larger than 10KB
      deleteOriginFile: false,
    }),
    // Brotli compression for production
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ];

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/lib': path.resolve(__dirname, './src/lib'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
        '@/types': path.resolve(__dirname, './src/types'),
        '@/foundation': path.resolve(__dirname, './src/foundation'),
        '@/core': path.resolve(__dirname, './src/core'),
        scheduler: path.resolve(__dirname, './node_modules/scheduler/index.js'),
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
      dedupe: ['react', 'react-dom', 'scheduler'],
    },
    plugins,
    base: '/',
    server: {
      host: true,
      port: 5173,
      headers: {
        'Content-Security-Policy':
          "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apps.rokt.com; connect-src 'self' https://apps.rokt.com https://apps-demo.rokt.com https://script.google.com https://script.googleusercontent.com https://api.web3forms.com ws: wss:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://apps.rokt.com; img-src 'self' data: blob: https://*; frame-src 'self' https://*.google.com https://www.google.com/maps/ https://maps.google.com; worker-src 'self' blob:; child-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'",
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
      },
    },
    preview: {
      host: true,
      port: 4173,
      headers: {
        // Relaxed CSP for debugging
        'Content-Security-Policy':
          "default-src 'self'; script-src 'self' 'sha256-Jr9Fl37029VhYvVWPeghsu5JL7bmhAHkrK/DZdoqmiE=' 'sha256-8ExvGeARWXqsyCqWf4dS9Uu4WFTUfye9ipfY3P9ZeTs=' 'sha256-Tpu1/HwrJ18CWBP43IPqNrlZZTSZOzwGdiKHFTtEIGw='; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://*.google.com https://www.google.com/maps/ https://maps.google.com; connect-src 'self' https: http: ws: wss:; worker-src 'self' blob:; child-src 'self' blob: https:; object-src 'none'; base-uri 'self'; form-action 'self'",
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block',
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: isAnalyze,
      cssCodeSplit: true,
      minify: 'terser', // Use terser for better compression
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.log in production
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
      },
      rollupOptions: {
        plugins: isAnalyze
          ? [
              visualizer({
                filename: 'dist/stats.html',
                gzipSize: true,
                brotliSize: true,
                open: false,
              }),
            ]
          : [],
        output: {
          manualChunks: (id) => {
            if (!id.includes('node_modules')) {
              if (id.includes('/components/ui/')) return 'ui';
              if (id.includes('/components/primitives/')) return 'primitives';
              return undefined;
            }
            // Keep i18n isolated because it loads lazily and doesn't need to
            // participate in the main vendor graph.
            if (
              id.includes('i18next') ||
              id.includes('react-i18next') ||
              id.includes('i18next-browser-languagedetector')
            ) {
              return 'vendor-i18n';
            }
            // Animation stays separate because it is mostly lazy-loaded.
            if (id.includes('framer-motion')) return 'vendor-framer';
            // Collapse the remaining node_modules graph into one shared vendor
            // chunk. The previous vendor-react split created a circular
            // dependency with react-router's non-React dependencies and caused
            // production-only white screens.
            return 'vendor';
          },
        },
      },
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
    },
  };
});
