import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    lib: {
      entry: './src/build.es.js',
      formats: ['es'],
      fileName: 'vite-current-time-full',
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
    emptyOutDir: false,
  },
  esbuild: {
    minify: true,
    minifySyntax: true
  },
  plugins: [
    vue({ customElement: true }),
  ],
  base: '/vite-current-time-full',
  preview: {
    port: 8910,
  },
  resolve: {
    dedupe: [
      'vue'
    ]
  },

});
