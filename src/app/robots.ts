import type { MetadataRoute } from 'next'
import { AI_AGENTS, SITE_HOST, SITE_URL, isIndexable } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Preview deployments share content with production; keep them out of the index.
  if (!isIndexable) return { rules: { userAgent: '*', disallow: '/' } }

  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_AGENTS, allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_HOST,
  }
}
