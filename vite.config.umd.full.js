import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
  define: {
    'process.env': {}
  },
  build: {
    lib: {
      entry: './src/build.umd.ts',
      formats: ['umd'],
      fileName: 'vite-current-time-full',
      name: 'ViteCurrentTimeComponent',
    },
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
      'vue',
    ]
  },

});
