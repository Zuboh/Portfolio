import { NextResponse, type NextRequest } from 'next/server'
import {
  LOCALE_COOKIE,
  defaultLocale,
  hasLocale,
  locales,
  type Locale,
} from '@/i18n/config'

/** Pick the best supported locale from an Accept-Language header. */
function fromAcceptLanguage(header: string | null): Locale | undefined {
  if (!header) return undefined
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      return { tag: tag.toLowerCase(), q: q ? Number(q.trim().slice(2)) : 1 }
    })
    .filter((l) => l.tag && l.tag !== '*' && l.q > 0)
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    const base = tag.split('-')[0]
    if (hasLocale(base)) return base
  }
  return undefined
}

function getLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value
  if (hasLocale(saved)) return saved
  return (
    fromAcceptLanguage(request.headers.get('accept-language')) ?? defaultLocale
  )
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasPrefix = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )
  if (hasPrefix) return

  const url = request.nextUrl.clone()
  url.pathname = `/${getLocale(request)}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip internals and anything with a file extension (robots.txt, resume.pdf, images, ...).
  matcher: ['/((?!_next|.*\\..*).*)'],
}
