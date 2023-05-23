import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      'VITE_API_BASE_URL': 'https://api.wisey.app',
      'VITE_API_VERSION': 'api/v1'
    }
  },
  server: {
    port: 8080,
  },
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 'hls.js': 'hls.js/dist/hls.min.js',
    },
  },
});
