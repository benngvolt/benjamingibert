import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true },
  build: {
    // Même dossier de sortie qu'avec CRA : scripts/prerender.js et le Dockerfile lisent build/
    outDir: 'build',
    assetsDir: 'static',
  },
});
