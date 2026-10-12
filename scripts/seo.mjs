import { writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import configuration from '../site.config.mjs'

const htmlEscape = (value) =>
  String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character])

export function resolveSiteConfig(environment = process.env) {
  const input = (environment.SITE_URL || configuration.siteUrl).trim()
  let siteUrl = ''
  if (input) {
    const parsed = new URL(input)
    if (
      parsed.protocol !== 'https:' || parsed.username || parsed.password ||
      parsed.search || parsed.hash || parsed.hostname === 'localhost' ||
      parsed.hostname.endsWith('.invalid') || parsed.hostname === 'example.com'
    ) {
      throw new Error('SITE_URL/siteUrl must be the final public HTTPS URL without credentials, query, or hash.')
    }
    parsed.pathname = `${parsed.pathname.replace(/\/+$/, '')}/`
    siteUrl = parsed.href
  }
  return { ...configuration, siteUrl }
}

export function createSeoHtml(config) {
  const pageTitle = config.pageTitle || `${config.name} — ${config.title}`
  const person = {
    '@type': 'Person',
    name: config.name,
    jobTitle: config.title,
    email: config.email,
    sameAs: [config.linkedIn],
    ...(config.siteUrl ? { '@id': `${config.siteUrl}#person`, url: config.siteUrl } : {}),
  }
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: pageTitle,
    description: config.description,
    mainEntity: person,
    ...(config.siteUrl ? { '@id': `${config.siteUrl}#profile`, url: config.siteUrl } : {}),
  }
  const meta = [
    `<title>${htmlEscape(pageTitle)}</title>`,
    `<meta name="description" content="${htmlEscape(config.description)}" />`,
    '<meta name="robots" content="index, follow" />',
    '<meta property="og:type" content="profile" />',
    `<meta property="og:title" content="${htmlEscape(pageTitle)}" />`,
    `<meta property="og:description" content="${htmlEscape(config.description)}" />`,
    `<meta property="og:site_name" content="${htmlEscape(config.name)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${htmlEscape(pageTitle)}" />`,
    `<meta name="twitter:description" content="${htmlEscape(config.description)}" />`,
  ]
  if (config.siteUrl) {
    const imageUrl = new URL(config.socialImage, config.siteUrl).href
    meta.push(
      `<link rel="canonical" href="${htmlEscape(config.siteUrl)}" />`,
      `<meta property="og:url" content="${htmlEscape(config.siteUrl)}" />`,
      `<meta property="og:image" content="${htmlEscape(imageUrl)}" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      `<meta property="og:image:alt" content="${htmlEscape(config.name)} — Java Backend &amp; Enterprise Integrations" />`,
      `<meta name="twitter:image" content="${htmlEscape(imageUrl)}" />`,
      `<meta name="twitter:image:alt" content="${htmlEscape(config.name)} — Java Backend &amp; Enterprise Integrations" />`,
    )
  }
  meta.push(`<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`)
  return meta.join('\n    ')
}

export async function writeSeoFiles(directory, config) {
  await mkdir(directory, { recursive: true })
  const robots = `User-agent: *\nAllow: /\n${config.siteUrl ? `\nSitemap: ${new URL('sitemap.xml', config.siteUrl).href}\n` : ''}`
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${config.siteUrl ? `\n  <url><loc>${htmlEscape(config.siteUrl)}</loc></url>\n` : '\n'}</urlset>\n`
  await Promise.all([
    writeFile(resolve(directory, 'robots.txt'), robots),
    writeFile(resolve(directory, 'sitemap.xml'), sitemap),
  ])
}
