import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // Long-lived vendor chunk: repeat visitors only re-download the
        // (small) app code after a deploy, not React itself. Client build
        // only: the SSR prerender bundle keeps React external.
        manualChunks: isSsrBuild
          ? undefined
          : { vendor: ['react', 'react-dom', 'react-router-dom'] },
      },
    },
  },
}));
