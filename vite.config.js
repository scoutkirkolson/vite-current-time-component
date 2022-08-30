import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue({ customElement: true })],
  base: '/vite-current-time-component',
});
