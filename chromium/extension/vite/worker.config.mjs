import { defineConfig } from 'vite';
import { viteStaticCopy as copy } from 'vite-plugin-static-copy';
import common from './common.config.mjs';

export default defineConfig({
  ...common,
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: './src/worker/index.js',
      output: {
        entryFileNames: 'worker.js'
      }
    }
  },
  plugins: [
    copy({
      targets: [
        {
          src: './src/manifest.json',
          dest: '.'
        }
      ]
    })
  ]
});
