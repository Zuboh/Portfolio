import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Availability } from '@/components/ui/Availability'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { EMAIL, LINKEDIN_URL, RESUME_PDF } from '@/data/social'
import { hasLocale } from '@/i18n/config'
import { jsonLd } from '@/lib/jsonld'
import { pageMetadata } from '@/lib/metadata'
import { PERSON_ID, SITE_URL, WEBSITE_ID } from '@/lib/site'
import { getDictionary } from '../dictionaries'

const rowClass =
  'grid gap-3 border-b border-bd py-7 md:grid-cols-[200px_1fr] md:gap-6'
const labelClass = 'pt-1.5 font-mono text-[13px] font-normal text-tx3'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const t = (await getDictionary(lang)).hire
  return pageMetadata({
    lang,
    path: '/hire',
    title: t.metaTitle,
    description: t.metaDescription,
  })
}

export default async function HirePage({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const t = dict.hire
  const skills = dict.resume.skillGroups.flatMap((g) => g.items)
  const url = `${SITE_URL}/${lang}/hire`
  const faq = t.faq.map(({ q, a }) => ({ q, a: a.replace('{email}', EMAIL) }))

  // The FAQPage mirrors the visible questions below, word for word.
  const pageJsonLd = jsonLd([
    {
      '@type': 'AboutPage',
      '@id': `${url}#page`,
      url,
      name: t.metaTitle,
      description: t.metaDescription,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': PERSON_ID },
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      url,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': PERSON_ID },
      mainEntity: faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ])

  const lists = [
    { title: t.lookingTitle, items: t.looking },
    { title: t.resultsTitle, items: t.results },
  ]

  return (
    <main id="main" className="pb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: pageJsonLd }}
      />
      <section
        className="pt-[clamp(48px,7vw,88px)]"
        aria-labelledby="hire-title"
      >
        <Container>
          <Link
            href={`/${lang}`}
            className="tap mb-8 inline-flex items-center gap-2 text-sm text-tx3 md:mb-10 transition-colors hover:text-tx"
          >
            <span aria-hidden="true">←</span> {dict.common.backHome}
          </Link>

          <p className="font-mono text-[13px] text-tx3">{dict.hero.role}</p>
          <h1
            id="hire-title"
            className="mt-2 text-[clamp(32px,5vw,52px)] leading-none font-semibold tracking-[-0.055em]"
          >
            {t.title}
          </h1>
          <p className="mt-5 max-w-[60ch] text-tx2 [text-wrap:pretty]">
            {t.lead}
          </p>
          <Availability text={t.availability} className="mt-5" />
          <div className="btn-row mt-7">
            <a href={`mailto:${EMAIL}`} className="btn btn-primary">
              <Icon name="mail" className="text-base" />
              {dict.common.getInTouch}
            </a>
            <a
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <Icon name="download" className="text-base" />
              {dict.resume.downloadPdf}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <Icon name="linkedin" className="text-base" />
              {dict.common.linkedin}
            </a>
          </div>
        </Container>
      </section>

      <section className="pt-16 md:pt-24" aria-label={t.title}>
        <Container>
          <div className="border-t border-bd">
            {lists.map((l) => (
              <div key={l.title} className={rowClass}>
                <h2 className={labelClass}>{l.title}</h2>
                <ul className="flex flex-col gap-2 text-tx2">
                  {l.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="text-acc">
                        ·
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={rowClass}>
              <h2 className={labelClass}>{t.stackTitle}</h2>
              <ul className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li key={s}>
                    <Badge label={s} />
                  </li>
                ))}
              </ul>
            </div>

            <div className={rowClass}>
              <h2 className={labelClass}>{t.faqTitle}</h2>
              <div className="flex flex-col gap-6">
                {faq.map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="font-semibold tracking-[-0.01em]">{q}</h3>
                    <p className="mt-1.5 max-w-[60ch] text-tx2 [text-wrap:pretty]">
                      {a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className={rowClass}>
              <h2 className={labelClass}>{t.contactTitle}</h2>
              <div>
                <p className="text-tx2">{t.contactLead}</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="tap mt-3 inline-block text-lg font-semibold tracking-[-0.02em] [overflow-wrap:anywhere] transition-colors hover:text-acc"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
