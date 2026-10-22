// Submit the sitemap to Google Search Console via the Search Console API.
// Needs GSC_SERVICE_ACCOUNT (service-account JSON key) whose email is an Owner
// of the `sc-domain:<host>` property. Skips cleanly when the secret is absent.

import { GoogleAuth } from 'google-auth-library'

const SITE_URL = process.argv[2] ?? process.env.SITE_URL ?? 'https://zubodev.vercel.app'
const raw = process.env.GSC_SERVICE_ACCOUNT

if (!raw) {
  console.log('GSC_SERVICE_ACCOUNT not set; skipping Search Console submit.')
  process.exit(0)
}

const auth = new GoogleAuth({
  credentials: JSON.parse(raw),
  scopes: ['https://www.googleapis.com/auth/webmasters'],
})
const client = await auth.getClient()

const property = encodeURIComponent(`sc-domain:${new URL(SITE_URL).host}`)
const feed = encodeURIComponent(`${SITE_URL}/sitemap.xml`)

await client.request({
  url: `https://www.googleapis.com/webmasters/v3/sites/${property}/sitemaps/${feed}`,
  method: 'PUT',
})
console.log(`Search Console: submitted ${SITE_URL}/sitemap.xml`)
