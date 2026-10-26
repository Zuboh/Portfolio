import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections/Footer'
import { ScrollTop } from '@/components/ui/ScrollTop'
import { fetchLastCommitDate } from '@/lib/github'
import { hasLocale, locales } from '@/i18n/config'
import { jsonLd, person, website } from '@/lib/jsonld'
import { SITE_NAME, SITE_URL, isIndexable } from '@/lib/site'
import { getDictionary } from './dictionaries'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)

  return {
    applicationName: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    // Fallback for routes without their own title (e.g. not-found); pages set theirs via pageMetadata.
    title: dict.meta.title,
    description: dict.meta.description,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
    robots: isIndexable
      ? {
          index: true,
          follow: true,
          googleBot: { 'max-image-preview': 'large' },
        }
      : { index: false, follow: false },
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.description,
      url: `${SITE_URL}/${lang}`,
      siteName: SITE_NAME,
      type: 'website',
      locale: lang === 'it' ? 'it_IT' : 'en_US',
      alternateLocale: lang === 'it' ? 'en_US' : 'it_IT',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.ogTitle,
      description: dict.meta.description,
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#fafaf7' },
  ],
  colorScheme: 'dark light',
}

// Runs before paint so the saved theme is applied without a flash. Dark is the default.
const THEME_INIT = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.dataset.theme=t}catch(e){}`

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const [dict, lastUpdated] = await Promise.all([
    getDictionary(lang),
    fetchLastCommitDate('Portfolio', lang),
  ])

  const siteJsonLd = jsonLd([
    person({
      jobTitle: dict.meta.jobTitle,
      description: dict.meta.description,
      skills: dict.resume.skillGroups.flatMap((g) => g.items),
      seeks: dict.meta.seeks,
      schools: dict.resume.educationItems.map((e) => e.institution),
    }),
    website(lang, dict.meta.description),
  ])

  return (
    <html lang={lang} className={geistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.common.skipToContent}
        </a>
        <Nav lang={lang} labels={dict.nav} themeLabel={dict.common.lightMode} />
        {children}
        <Footer lastUpdated={lastUpdated} labels={dict.footer} />
        <ScrollTop label={dict.common.backToTop} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteJsonLd }}
        />
      </body>
    </html>
  )
}
