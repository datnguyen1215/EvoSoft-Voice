import { defineConfig } from 'vite';
import common from './common.config.mjs';

export default defineConfig({
  ...common,
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: './src/content/index.js',
      output: {
        entryFileNames: 'content.js'
      }
    }
  }
});
