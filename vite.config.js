/**
 * @file vite.config.js
 * @description Vite configuration file with TailwindCSS v4 integration.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// 自定义域名（如 eunicetao.space）走根路径 `/`；仅当仍用 github.io/eunice-site/ 时设 BUILD_BASE=/eunice-site/
export default defineConfig({
  base: process.env.BUILD_BASE || '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
