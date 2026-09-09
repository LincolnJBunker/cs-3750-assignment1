import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'frontend',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    // Anything the app fetches from /api goes to the Express server,
    // so there's no CORS setup and no hardcoded localhost:3001 in the UI.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
