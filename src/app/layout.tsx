import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections/Footer'
import { ScrollTop } from '@/components/ui/ScrollTop'
import { fetchLastCommitDate } from '@/lib/github'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  // Only small labels use mono; keep its download off the LCP critical path.
  preload: false,
})

const DESCRIPTION =
  'Lorenzo Zubani is a Frontend Engineer in Brescia, Italy, specializing in React and TypeScript with strong attention to architecture, UX, and implementation quality.'

export const metadata: Metadata = {
  applicationName: 'zubo.dev',
  metadataBase: new URL('https://zubo.dev'),
  title: { default: 'zubo.dev', template: '%s | zubo.dev' },
  description: DESCRIPTION,
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  openGraph: {
    title: 'Lorenzo Zubani, Frontend Engineer',
    description: DESCRIPTION,
    url: 'https://zubo.dev',
    siteName: 'zubo.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Lorenzo Zubani, Frontend Engineer',
    description: DESCRIPTION,
  },
}

const PERSON_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lorenzo Zubani',
  jobTitle: 'Frontend Engineer',
  url: 'https://zubo.dev',
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
}).replace(/</g, '\\u003c')

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#fafaf7' },
  ],
  colorScheme: 'dark light',
}

// Runs before paint so the saved or system theme is applied without a flash.
const THEME_INIT = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){}`

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const lastUpdated = await fetchLastCommitDate('Portfolio')

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer lastUpdated={lastUpdated} />
        <ScrollTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: PERSON_JSON_LD }}
        />
      </body>
    </html>
  )
}
