import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

const BASE = 'https://zubo.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/resume`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...projects.map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
