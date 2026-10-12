import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { createSeoHtml, resolveSiteConfig, writeSeoFiles } from './scripts/seo.mjs'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ mode }) => {
  const environment = { ...process.env, ...loadEnv(mode, root, '') }
  const site = resolveSiteConfig(environment)
  const seo: Plugin = {
    name: 'portfolio-static-seo',
    transformIndexHtml(html) {
      return html.replace('<!-- PORTFOLIO_SEO -->', createSeoHtml(site))
    },
    async closeBundle() {
      await writeSeoFiles(resolve(root, 'dist'), site)
    },
  }

  return {
    base: environment.VITE_BASE || './',
    plugins: [react(), seo],
    build: {
      target: 'es2022',
      sourcemap: false,
    },
  }
})
