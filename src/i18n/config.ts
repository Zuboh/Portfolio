export const locales = ['en', 'it'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
export const LOCALE_COOKIE = 'NEXT_LOCALE'

export const hasLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value)

// BCP 47 tags for Intl formatting, one per supported locale.
export const intlLocale: Record<Locale, string> = { en: 'en-GB', it: 'it-IT' }

/** Strip a leading /en or /it from a pathname; "/it/resume" -> "/resume". */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/')
  return hasLocale(first) ? `/${rest.join('/')}` : pathname
}
