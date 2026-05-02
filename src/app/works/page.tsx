import Link from 'next/link'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/sections/Footer'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectGrid } from '@/components/works/ProjectGrid'

export default function WorksPage() {
  return (
    <div className="page">
      <Topbar />
      <main>
        <section
          style={{
            padding: '64px 0 48px',
            animation: 'fadeUp .5s ease both',
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: 11,
              color: 'var(--tx3)',
              textDecoration: 'none',
              letterSpacing: '.06em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 32,
              borderBottom: '.5px solid transparent',
              transition: 'color .2s, border-color .2s',
            }}
            className="nav-link-acc"
          >
            ← back
          </Link>

          <SectionLabel>works</SectionLabel>

          <p
            style={{
              fontSize: 12,
              color: 'var(--tx2)',
              lineHeight: 1.85,
              maxWidth: 480,
            }}
          >
            A selection of projects built with React, TypeScript, and AI.
            Most are tools I wanted but couldn&apos;t find — so I built them.
          </p>
        </section>

        <ProjectGrid />

        <Footer />
      </main>
    </div>
  )
}
