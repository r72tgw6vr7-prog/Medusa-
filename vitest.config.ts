/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import type { UserConfig } from 'vite';

interface VitestUserConfig extends UserConfig {
  test: {
    globals: boolean;
    environment: string;
    setupFiles: string;
    css: boolean;
  };
}

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
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    css: true,
  },
} as VitestUserConfig);
