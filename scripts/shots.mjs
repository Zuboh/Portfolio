// Usage: node scripts/shots.mjs <label> [--reduced]
// Needs the dev server (or `next start`) running on BASE_URL (default http://localhost:3000).
import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const label = process.argv[2] ?? 'current'
const reduced = process.argv.includes('--reduced')
const base = process.env.BASE_URL ?? 'http://localhost:3000'

const routes = (process.env.ROUTES ?? '/,/resume').split(',')
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 1024, height: 768 },
  { name: 'mobile', width: 390, height: 844 },
]

const outDir = `screenshots/${label}${reduced ? '-reduced' : ''}`
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  })
  const page = await context.newPage()
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' })
    // scroll through the page so in-view animations fire before the full-page capture
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(600)
    const name = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-')
    await page.screenshot({ path: `${outDir}/${name}-${vp.name}.png`, fullPage: true })
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    if (overflow) console.warn(`horizontal overflow: ${route} @ ${vp.name}`)
  }
  await context.close()
}
await browser.close()
console.log(`saved to ${outDir}`)
