// Crawl every sitemap URL on a running server and assert the on-page SEO contract.
// Usage: `node scripts/seo-check.mjs [baseUrl]` (default http://localhost:3000).
// Sitemap <loc>s point at the production origin; they are rewritten to baseUrl.

const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')
const PROD = 'https://lorenzozubani.dev'
const LOCALES = ['en', 'it']

const errors = []
const fail = (url, msg) => errors.push(`${url}: ${msg}`)
const local = (u) => u.replace(PROD, BASE)

const attr = (tag, name) =>
  tag.match(new RegExp(`${name}="([^"]*)"`, 'i'))?.[1]
const tags = (html, re) => [...html.matchAll(re)].map((m) => m[0])

async function get(url) {
  const res = await fetch(url, { redirect: 'manual' })
  return { status: res.status, text: await res.text() }
}

// robots.txt + sitemap.xml
const robots = await get(`${BASE}/robots.txt`)
if (robots.status !== 200) fail('/robots.txt', `status ${robots.status}`)
if (!/User-Agent: \*/i.test(robots.text)) fail('/robots.txt', 'no User-Agent rule')

const sitemap = await get(`${BASE}/sitemap.xml`)
if (sitemap.status !== 200) fail('/sitemap.xml', `status ${sitemap.status}`)
const urls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (urls.length === 0) fail('/sitemap.xml', 'no <loc> entries')
for (const u of urls) if (!u.startsWith(PROD)) fail(u, `sitemap URL not on ${PROD}`)

for (const url of urls) {
  const { status, text: html } = await get(local(url))
  if (status !== 200) {
    fail(url, `status ${status}`)
    continue
  }
  const lang = new URL(url).pathname.split('/')[1]

  const htmlLang = html.match(/<html[^>]*\slang="([^"]+)"/)?.[1]
  if (htmlLang !== lang) fail(url, `<html lang="${htmlLang}"> expected "${lang}"`)

  const titles = tags(html, /<title>[^<]*<\/title>/g)
  if (titles.length !== 1) fail(url, `${titles.length} <title> tags`)

  const desc = tags(html, /<meta name="description"[^>]*>/g)[0]
  const descLen = desc ? attr(desc, 'content').length : 0
  if (descLen < 50 || descLen > 160) {
    fail(url, `meta description length ${descLen} (want 50-160)`)
  }

  const canonical = tags(html, /<link rel="canonical"[^>]*>/g)[0]
  if (!canonical || attr(canonical, 'href') !== url) {
    fail(url, `canonical ${canonical ? attr(canonical, 'href') : 'missing'}`)
  }

  const alts = Object.fromEntries(
    tags(html, /<link rel="alternate" hreflang="[^"]+"[^>]*>/gi).map((t) => [
      attr(t, 'hreflang'),
      attr(t, 'href'),
    ])
  )
  for (const l of [...LOCALES, 'x-default']) {
    if (!alts[l]) fail(url, `missing hreflang ${l}`)
  }
  if (alts[lang] && alts[lang] !== url) {
    fail(url, `hreflang ${lang} not self (${alts[lang]})`)
  }

  const og = tags(html, /<meta property="og:image"[^>]*>/g)[0]
  if (!og) fail(url, 'missing og:image')
  else {
    const img = await fetch(local(attr(og, 'content').replace(/&amp;/g, '&')))
    if (!img.ok) fail(url, `og:image status ${img.status}`)
  }

  const blocks = [
    ...html.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g),
  ]
  if (blocks.length === 0) fail(url, 'no JSON-LD')
  for (const [, body] of blocks) {
    try {
      JSON.parse(body)
    } catch (e) {
      fail(url, `invalid JSON-LD: ${e.message}`)
    }
  }
}

if (errors.length) {
  console.error(`SEO check failed (${errors.length}):\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log(`SEO check passed: ${urls.length} URLs`)
