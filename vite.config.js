/**
 * @file vite.config.js
 * @description Vite configuration file with TailwindCSS v4 integration.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 子路径部署（/eunice-site/）
  base: '/eunice-site/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
