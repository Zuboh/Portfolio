// Ping IndexNow (Bing, Yandex, Seznam, Naver, ...) with every URL in the live sitemap.
// Run after a production deploy: `node scripts/indexnow.mjs [siteUrl]`.
// The key file lives at public/<KEY>.txt and must be served from the site root.

const SITE_URL = process.argv[2] ?? process.env.SITE_URL ?? 'https://zubodev.vercel.app'
const KEY = 'd0a162b066971081e09f0070367c1e72'

const sitemap = await fetch(`${SITE_URL}/sitemap.xml`)
if (!sitemap.ok) throw new Error(`sitemap.xml returned ${sitemap.status}`)

const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1].trim()
)
if (urlList.length === 0) throw new Error('sitemap.xml has no <loc> entries')

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
})

// 200 = accepted, 202 = accepted, key validation pending.
if (res.status !== 200 && res.status !== 202) {
  throw new Error(`IndexNow ${res.status}: ${await res.text()}`)
}
console.log(`IndexNow ${res.status}: submitted ${urlList.length} URLs`)
