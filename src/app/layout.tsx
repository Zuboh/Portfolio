import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections/Footer'
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

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const lastUpdated = await fetchLastCommitDate('Portfolio')

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer lastUpdated={lastUpdated} />
      </body>
    </html>
  )
}
