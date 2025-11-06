import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/foundation': path.resolve(__dirname, './src/foundation'),
      'scheduler': path.resolve(__dirname, './node_modules/scheduler/index.js')
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    dedupe: ['react', 'react-dom', 'scheduler']
  },
  plugins: [
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
    {
      name: 'image-optimization-handler',
      configureServer(server) {
        server.middlewares.use('/api/optimize-image', async (req, res) => {
          try {
            const handler = (await import('./src/api/optimize-image')).handler;
            const response = await handler(req as unknown as Request);
            
            // Forward the response headers
            for (const [key, value] of response.headers.entries()) {
              res.setHeader(key, value);
            }
            
            // Send the response
            res.statusCode = response.status;
            res.end(Buffer.from(await response.arrayBuffer()));
          } catch (error) {
            console.error('Image optimization error:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Image optimization failed' }));
          }
        });
      }
    }
  ],
  base: '/',
  server: {
    port: 5173,
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://apps.rokt.com; connect-src 'self' https://apps.rokt.com https://apps-demo.rokt.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://apps.rokt.com; img-src 'self' data: blob: https://*; frame-src 'self'; base-uri 'self'; form-action 'self'",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    },
  },
  preview: {
    port: 4173,
    headers: {
      // Relaxed CSP for debugging
      'Content-Security-Policy': "default-src 'self' https: http: data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: blob:; style-src 'self' 'unsafe-inline' https: http:; img-src 'self' data: https: http: blob:; font-src 'self' data: https: http:; frame-src 'self' https: http:; connect-src 'self' https: http: ws: wss:; worker-src 'self' blob:; child-src 'self' blob: https: http:;",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block'
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps in production for smaller bundles
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
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Make sure React, ReactDOM, and Scheduler are bundled together
            if (/node_modules[/\\](react|react-dom|scheduler)[/\\]/.test(id)) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return 'vendor';
          }
          if (id.includes('/components/ui/')) {
            return 'ui';
          }
          if (id.includes('/components/primitives/')) {
            return 'primitives';
          }
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
});