'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { defaultLocale, hasLocale, type Locale } from '@/i18n/config'

// not-found receives no route params, so the language is read from the URL and
// this page keeps its own small copy instead of loading the full dictionary.
const COPY: Record<
  Locale,
  { title: string; body: string; home: string; resume: string }
> = {
  en: {
    title: 'Page not found',
    body: 'This page does not exist or has moved. The work and the résumé are one click away.',
    home: 'Back to home',
    resume: 'Résumé',
  },
  it: {
    title: 'Pagina non trovata',
    body: 'Questa pagina non esiste o è stata spostata. I lavori e il curriculum sono a un clic di distanza.',
    home: 'Torna alla home',
    resume: 'Curriculum',
  },
}

export default function NotFound() {
  const first = usePathname().split('/')[1]
  const lang = hasLocale(first) ? first : defaultLocale
  const t = COPY[lang]

  return (
    <main id="main" className="grid min-h-[60dvh] place-items-center">
      <title>{t.title}</title>
      <Container>
        <p className="font-mono text-[13px] text-tx3">404</p>
        <h1 className="mt-3 text-[clamp(32px,5vw,56px)] leading-none font-semibold tracking-[-0.055em]">
          {t.title}
        </h1>
        <p className="mt-5 max-w-[44ch] text-tx2">{t.body}</p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          <Link href={`/${lang}`} className="btn btn-primary">
            {t.home}
          </Link>
          <Link href={`/${lang}/resume`} className="btn">
            {t.resume}
          </Link>
        </div>
      </Container>
    </main>
  )
}
