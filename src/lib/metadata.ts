import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { SITE_NAME, SITE_URL } from './site'

type PageFacts = {
  lang: Locale
  /** Path after the locale, '' for home, e.g. '/hire'. */
  path: string
  /** Full title as it should appear in search results and share cards. */
  title: string
  description: string
}

/**
 * Per-page title, canonical, hreflang and share metadata.
 * Metadata merges shallowly, so openGraph and twitter are restated in full here;
 * otherwise a page inherits the home page's share card.
 */
export function pageMetadata({
  lang,
  path,
  title,
  description,
}: PageFacts): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: {
        en: `/en${path}`,
        it: `/it${path}`,
        'x-default': `/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}${path}`,
      siteName: SITE_NAME,
      type: 'website',
      locale: lang === 'it' ? 'it_IT' : 'en_US',
      alternateLocale: lang === 'it' ? 'en_US' : 'it_IT',
      // The segment's opengraph-image.tsx is dropped once openGraph is overridden.
      images: [
        {
          url: `/${lang}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

/** "<page> · Lorenzo Zubani" */
export const withName = (page: string) => `${page} · ${SITE_NAME}`
