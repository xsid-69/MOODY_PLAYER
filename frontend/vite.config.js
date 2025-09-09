import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react() , tailwindcss()],
  optimizeDeps: {
    exclude: ['tslib', 'face-api.js'], // Exclude face-api.js as well
  },
})
