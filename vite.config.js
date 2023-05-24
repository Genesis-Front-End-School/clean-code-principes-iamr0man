import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
import { visualizer } from 'rollup-plugin-visualizer';

import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      VITE_API_BASE_URL: 'https://api.wisey.app',
      VITE_API_VERSION: 'api/v1',
    },
  },
  server: {
    port: 8080,
  },
  plugins: [vue(), svgLoader(), dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: resolve(__dirname, './index.lib.ts'),
      name: 'udewi-ui',
      fileName: (format) => `index.${format}.js`,
      formats: ['umd', 'es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
        },
      },
      plugins: [
        visualizer({
          gzipSize: true,
          open: true,
        }),
      ],
    },
    minify: 'esbuild',
    sourcemap: true,
    reportCompressedSize: true,
    emptyOutDir: true,
    copyPublicDir: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
