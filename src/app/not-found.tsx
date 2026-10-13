import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export const metadata: Metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-[60dvh] place-items-center">
      <Container>
        <p className="font-mono text-[13px] text-tx3">404</p>
        <h1 className="mt-3 text-[clamp(32px,5vw,56px)] leading-none font-semibold tracking-[-0.055em]">
          Page not found
        </h1>
        <p className="mt-5 max-w-[44ch] text-tx2">
          This page does not exist or has moved. The work and the résumé are one
          click away.
        </p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/resume" className="btn">
            Résumé
          </Link>
        </div>
      </Container>
    </main>
  )
}
