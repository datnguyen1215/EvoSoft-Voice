import { fileURLToPath } from 'url';
export default {
  resolve: {
    alias: {
      '@src': fileURLToPath(new URL('../src', import.meta.url))
    }
  }
};
