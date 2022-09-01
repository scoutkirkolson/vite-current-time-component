import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    lib: {
      entry: './main.js',
      formats: ['es', 'umd'],
      fileName: 'vite-current-time',
      name: 'ViteCurrentTime',
    },
    //rollupOptions: {
    //  // Externalize deps that shouldn't be bundled into the library.
    //  external: ['vue', '@vueuse/core'],
    //},
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    target: 'esnext',
    // Leave minification up to applications.
    minify: true,
  },
  esbuild: {
    minify: true,
    minifySyntax: true
  },
  plugins: [
    vue({ customElement: true }),
  ],
  base: '/vite-current-time-component',
});
