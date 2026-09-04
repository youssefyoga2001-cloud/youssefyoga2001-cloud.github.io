import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// BASE_PATH is supplied by the GitHub Pages workflow so the build works both at a
// domain root and under a project sub-path. Locally it is unset and defaults to '/'.
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base: base.endsWith('/') ? base : `${base}/`,
  plugins: [react(), tailwindcss()],
})
