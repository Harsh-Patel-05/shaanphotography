import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages: https://Harsh-Patel-05.github.io/shaanphotography/
const isPages = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  base: isPages ? '/shaanphotography/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['.ngrok-free.dev'],
  },
})
