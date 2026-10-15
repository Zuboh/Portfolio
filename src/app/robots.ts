import type { MetadataRoute } from 'next'
import { SITE_HOST, SITE_URL, isIndexable } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Preview deployments share content with production; keep them out of the index.
  if (!isIndexable) return { rules: { userAgent: '*', disallow: '/' } }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_HOST,
  }
}
