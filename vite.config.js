import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // GitHub Pages repo sites are served from `/<repo>/` which breaks Vite's default
  // root-absolute asset URLs (e.g. `/assets/...`). Derive base automatically on
  // GitHub Actions, or override via `VITE_BASE`.
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1]
  const base =
    process.env.VITE_BASE ??
    (mode === 'production' && repoName ? `/${repoName}/` : '/')

  return {
    base,
    plugins: [react()],
  }
})
