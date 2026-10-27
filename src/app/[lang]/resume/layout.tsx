import type { Metadata } from 'next'
import { hasLocale } from '@/i18n/config'
import { pageMetadata, withName } from '@/lib/metadata'
import { getDictionary } from '../dictionaries'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)

  return pageMetadata({
    lang,
    path: '/resume',
    title: withName(dict.meta.resumeMetaTitle),
    description: dict.meta.resumeDescription,
  })
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
