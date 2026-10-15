import type { Metadata } from 'next'
import { hasLocale } from '@/i18n/config'
import { getDictionary } from '../dictionaries'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)

  return {
    description: dict.meta.resumeDescription,
    alternates: {
      canonical: `/${lang}/resume`,
      languages: {
        en: '/en/resume',
        it: '/it/resume',
        'x-default': '/en/resume',
      },
    },
  }
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
