import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import { Stack } from '@/components/sections/Stack'
import { Activity } from '@/components/sections/Activity'
import { Contact } from '@/components/sections/Contact'
import { fetchRecentCommits } from '@/lib/github'
import { hasLocale } from '@/i18n/config'
import { jsonLd, profilePage } from '@/lib/jsonld'
import { getDictionary } from './dictionaries'

export const revalidate = 60

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    alternates: {
      canonical: `/${lang}`,
      languages: { en: '/en', it: '/it', 'x-default': '/en' },
    },
  }
}

export default async function Home({ params }: Props) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const [dict, entries] = await Promise.all([
    getDictionary(lang),
    fetchRecentCommits(6),
  ])

  return (
    <main id="main">
      <Hero dict={dict} />
      <Work lang={lang} dict={dict} />
      <Stack dict={dict} />
      <Activity entries={entries} lang={lang} dict={dict} />
      <Contact lang={lang} dict={dict} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd([profilePage(lang)]) }}
      />
    </main>
  )
}
