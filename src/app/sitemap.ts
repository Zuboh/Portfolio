import type { MetadataRoute } from 'next'
import { defaultLocale, locales } from '@/i18n/config'
import { projects } from '@/lib/projects'
import { SITE_URL as BASE } from '@/lib/site'

type Entry = MetadataRoute.Sitemap[number]

// One entry per locale for each page, each pointing at its translations.
function localized(
  path: string,
  changeFrequency: Entry['changeFrequency'],
  priority: number,
  lastModified: Date
): Entry[] {
  const languages = Object.fromEntries([
    ...locales.map((l) => [l, `${BASE}/${l}${path}`]),
    ['x-default', `${BASE}/${defaultLocale}${path}`],
  ])
  return locales.map((l) => ({
    url: `${BASE}/${l}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    ...localized('', 'weekly', 1, now),
    ...localized('/resume', 'monthly', 0.7, now),
    ...localized('/hire', 'monthly', 0.8, now),
    ...projects.flatMap((p) =>
      localized(`/work/${p.slug}`, 'monthly', 0.8, new Date(p.updated))
    ),
  ]
}
