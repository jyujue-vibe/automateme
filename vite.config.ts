import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Inline every imported image as a data URI so dist/ is text-only
    // (keeps the GitHub Pages snapshot push possible; images are small).
    assetsInlineLimit: 100_000_000,
  },
  resolve: {
    alias: {
      // BoardUI components import through "@/..." — the BoardUI CLI resolves
      // that alias to the project root (styles/, utils/, components/).
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
})
