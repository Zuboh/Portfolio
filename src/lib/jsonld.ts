import type { Locale } from '@/i18n/config'
import { intlLocale } from '@/i18n/config'
import type { Project } from '@/types'
import { PERSON_ID, SITE_NAME, SITE_URL, WEBSITE_ID } from './site'

type Thing = Record<string, unknown>

/** Serialize schema.org nodes for a <script type="application/ld+json"> tag. */
export function jsonLd(nodes: Thing[]): string {
  const graph = { '@context': 'https://schema.org', '@graph': nodes }
  // Escape "<" so content can never close the script tag.
  return JSON.stringify(graph).replace(/</g, '\\u003c')
}

export function person(jobTitle: string): Thing {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    jobTitle,
    url: SITE_URL,
    image: `${SITE_URL}/profile-image.jpeg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Brescia',
      addressCountry: 'IT',
    },
    knowsAbout: ['React', 'TypeScript', 'Frontend architecture'],
    sameAs: [
      'https://github.com/zuboh',
      'https://www.linkedin.com/in/lorenzo-zubani/',
    ],
  }
}

export function website(lang: Locale, description: string): Thing {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description,
    inLanguage: intlLocale[lang],
    publisher: { '@id': PERSON_ID },
  }
}

export function profilePage(lang: Locale): Thing {
  return {
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/${lang}#profile`,
    url: `${SITE_URL}/${lang}`,
    inLanguage: intlLocale[lang],
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': PERSON_ID },
  }
}

export function caseStudy(
  lang: Locale,
  p: Project,
  homeLabel: string
): Thing[] {
  const url = `${SITE_URL}/${lang}/work/${p.slug}`
  return [
    {
      '@type': 'CreativeWork',
      '@id': `${url}#work`,
      url,
      name: p.name,
      description: p.description,
      inLanguage: intlLocale[lang],
      dateCreated: String(p.year),
      dateModified: p.updated,
      keywords: p.stack.join(', '),
      author: { '@id': PERSON_ID },
      isPartOf: { '@id': WEBSITE_ID },
      ...(p.github ? { codeRepository: p.github } : {}),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: homeLabel,
          item: `${SITE_URL}/${lang}`,
        },
        { '@type': 'ListItem', position: 2, name: p.name, item: url },
      ],
    },
  ]
}
