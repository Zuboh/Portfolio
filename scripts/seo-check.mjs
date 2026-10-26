// Crawl every sitemap URL on a running server and assert the on-page SEO contract.
// Usage: `node scripts/seo-check.mjs [baseUrl]` (default http://localhost:3000).
// Sitemap <loc>s point at the production origin; they are rewritten to baseUrl.

import { readFileSync } from 'node:fs'

const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')
const PROD = process.env.SITE_URL ?? 'https://zubodev.vercel.app'
const LOCALES = ['en', 'it']
// Mirrors AI_AGENTS in src/lib/site.ts.
const AI_AGENTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Applebot-Extended',
]
const dicts = Object.fromEntries(
  LOCALES.map((l) => [
    l,
    JSON.parse(
      readFileSync(new URL(`../src/dictionaries/${l}.json`, import.meta.url))
    ),
  ])
)

const errors = []
const fail = (url, msg) => errors.push(`${url}: ${msg}`)
const local = (u) => u.replace(PROD, BASE)

const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
const attr = (tag, name) => {
  const v = tag.match(new RegExp(`${name}="([^"]*)"`, 'i'))?.[1]
  return v === undefined ? v : decode(v)
}
const tags = (html, re) => [...html.matchAll(re)].map((m) => m[0])

async function get(url) {
  const res = await fetch(url, { redirect: 'manual' })
  return { status: res.status, text: await res.text() }
}

// robots.txt + sitemap.xml
const robots = await get(`${BASE}/robots.txt`)
if (robots.status !== 200) fail('/robots.txt', `status ${robots.status}`)
if (!/User-Agent: \*/i.test(robots.text))
  fail('/robots.txt', 'no User-Agent rule')
if (!robots.text.includes(`Sitemap: ${PROD}/sitemap.xml`)) {
  fail('/robots.txt', `sitemap not on ${PROD}`)
}
for (const a of AI_AGENTS) {
  if (!new RegExp(`User-Agent: ${a}\\s`, 'i').test(robots.text)) {
    fail('/robots.txt', `${a} not listed`)
  }
}

const sitemap = await get(`${BASE}/sitemap.xml`)
if (sitemap.status !== 200) fail('/sitemap.xml', `status ${sitemap.status}`)
const urls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (urls.length === 0) fail('/sitemap.xml', 'no <loc> entries')
for (const u of urls)
  if (!u.startsWith(PROD)) fail(u, `sitemap URL not on ${PROD}`)

const seenTitles = new Map()
for (const url of urls) {
  const { status, text: html } = await get(local(url))
  if (status !== 200) {
    fail(url, `status ${status}`)
    continue
  }
  const lang = new URL(url).pathname.split('/')[1]

  const htmlLang = html.match(/<html[^>]*\slang="([^"]+)"/)?.[1]
  if (htmlLang !== lang)
    fail(url, `<html lang="${htmlLang}"> expected "${lang}"`)

  const titles = tags(html, /<title>[^<]*<\/title>/g)
  if (titles.length !== 1) fail(url, `${titles.length} <title> tags`)
  const title = decode(titles[0]?.replace(/<\/?title>/g, '') ?? '')
  if (title.length < 30 || title.length > 65) {
    fail(url, `title length ${title.length} (want 30-65): "${title}"`)
  }
  if (seenTitles.has(title))
    fail(url, `title duplicates ${seenTitles.get(title)}`)
  seenTitles.set(title, url)

  // Share card: every page describes itself, never the home page.
  const ogUrl = tags(html, /<meta property="og:url"[^>]*>/g)[0]
  if (!ogUrl || attr(ogUrl, 'content') !== url) fail(url, 'og:url not self')
  const ogTitle = tags(html, /<meta property="og:title"[^>]*>/g)[0]
  if (!ogTitle || attr(ogTitle, 'content') !== title) {
    fail(url, 'og:title differs from <title>')
  }

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
  const nodes = []
  for (const [, body] of blocks) {
    try {
      const json = JSON.parse(body)
      nodes.push(...(json['@graph'] ?? [json]))
    } catch (e) {
      fail(url, `invalid JSON-LD: ${e.message}`)
    }
  }

  const path = new URL(url).pathname
  const dict = dicts[lang]

  // Home: recruiter-facing facts, visible and structured.
  if (path === `/${lang}`) {
    const person = nodes.find((n) => n['@type'] === 'Person')
    if (!person) fail(url, 'no Person node')
    else {
      if (!(person.knowsAbout?.length >= 10))
        fail(url, 'Person.knowsAbout < 10')
      for (const k of ['seeks', 'hasOccupation', 'email', 'description']) {
        if (!person[k]) fail(url, `Person.${k} missing`)
      }
      if (!(person.sameAs?.length >= 2)) fail(url, 'Person.sameAs < 2')
    }
    if (!html.includes(dict.hero.availability))
      fail(url, 'availability not visible')
    for (const k of ['React', 'TypeScript']) {
      if (!attr(desc ?? '', 'content')?.includes(k))
        fail(url, `description lacks ${k}`)
    }
    if (!html.includes(`href="/${lang}/hire"`))
      fail(url, 'no link to hire page')
  }

  // Hire page: its own title and description, and a FAQ that is both visible and structured.
  if (path === `/${lang}/hire`) {
    if (title !== dict.hire.metaTitle) fail(url, `title "${title}"`)
    if (attr(desc ?? '', 'content') !== dict.hire.metaDescription) {
      fail(url, 'description is not hire.metaDescription')
    }
    const faq = nodes.find((n) => n['@type'] === 'FAQPage')
    const questions = faq?.mainEntity?.map((q) => q.name) ?? []
    if (questions.length < 4)
      fail(url, `FAQPage has ${questions.length} questions`)
    for (const { q } of dict.hire.faq) {
      if (!questions.includes(q)) fail(url, `FAQPage lacks "${q}"`)
      if (!decode(html).includes(`>${q}</h3>`))
        fail(url, `question not visible: "${q}"`)
    }
  }
}

// llms.txt: plain-text summary for LLM tools, built from site data.
const llms = await get(`${BASE}/llms.txt`)
if (llms.status !== 200) fail('/llms.txt', `status ${llms.status}`)
else {
  if (!llms.text.startsWith('# Lorenzo Zubani')) fail('/llms.txt', 'missing H1')
  if (!llms.text.includes(`${PROD}/en/hire`)) fail('/llms.txt', 'no hire link')
  const items = llms.text.split('\n').filter((l) => l.startsWith('- ['))
  if (items.length < 5) fail('/llms.txt', `${items.length} link items`)
  for (const l of items.filter((l) => l.includes('/work/'))) {
    if (!/\]\([^)]+\): \S/.test(l)) fail('/llms.txt', `no description: ${l}`)
  }
  if (!llms.text.includes(`${PROD}/llms-full.txt`))
    fail('/llms.txt', 'no llms-full link')
}

// llms-full.txt: résumé, FAQ and case studies in one file.
const full = await get(`${BASE}/llms-full.txt`)
if (full.status !== 200) fail('/llms-full.txt', `status ${full.status}`)
else {
  if (!full.text.startsWith('# Lorenzo Zubani'))
    fail('/llms-full.txt', 'missing H1')
  for (const h of [
    '## Questions',
    '## Experience',
    '## Skills',
    '## Projects',
  ]) {
    if (!full.text.includes(`\n${h}\n`))
      fail('/llms-full.txt', `missing "${h}"`)
  }
  for (const { q } of dicts.en.hire.faq) {
    if (!full.text.includes(`### ${q}`))
      fail('/llms-full.txt', `missing question "${q}"`)
  }
  for (const s of Object.keys(dicts.en.caseStudies)) {
    if (!full.text.includes(`${PROD}/en/work/${s}`))
      fail('/llms-full.txt', `missing ${s}`)
  }
  if (full.text.includes('{email}'))
    fail('/llms-full.txt', 'unreplaced {email}')
}

if (errors.length) {
  console.error(
    `SEO check failed (${errors.length}):\n- ${errors.join('\n- ')}`
  )
  process.exit(1)
}
console.log(`SEO check passed: ${urls.length} URLs`)
