import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { defineConfig } from 'vite'

// GitHub Pages: https://Harsh-Patel-05.github.io/shaanphotography/
const isPages = process.env.GITHUB_PAGES === 'true'

// Keep Vite cache off OneDrive — prevents errno -4094 UNKNOWN read crashes.
const localCacheDir =
  process.env.VITE_CACHE_DIR ||
  join(
    process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local'),
    'shaan-photography-runtime',
    'vite-cache',
  )

export default defineConfig({
  base: isPages ? '/shaanphotography/' : '/',
  plugins: [react(), tailwindcss()],
  cacheDir: localCacheDir,
  server: {
    allowedHosts: ['.ngrok-free.dev'],
    // OneDrive / cloud FS does not support reliable native watchers or reads.
    watch: {
      usePolling: true,
      interval: 1000,
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/_media_extract/**',
        '**/_samples/**',
        '**/.git/**',
      ],
    },
  },
  // Avoid aggressive FS crawling that trips OneDrive placeholders.
  optimizeDeps: {
    holdUntilCrawlEnd: false,
  },
})
