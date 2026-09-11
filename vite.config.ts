import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Day granularity keeps the client and prerender (SSR) builds identical.
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  ssr: {
    // Bundled into the prerender build so Node never has to resolve its CJS entry.
    noExternal: ['lucide-react'],
  },
});
