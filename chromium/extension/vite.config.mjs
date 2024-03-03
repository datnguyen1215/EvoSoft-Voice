import { defineConfig } from 'vite';
import { viteStaticCopy as copy } from 'vite-plugin-static-copy';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        worker: './src/worker/index.js'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  plugins: [
    copy({
      targets: [
        {
          src: 'src/manifest.json',
          dest: '.'
        }
      ]
    })
  ]
});
