import Link from 'next/link'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/sections/Footer'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProjectGrid } from '@/components/works/ProjectGrid'

const PAGE = 'grid grid-cols-1 md:grid-cols-[1fr_68px] max-w-[800px] mx-auto pl-6 pr-4 md:pl-14 md:pr-3 pb-[140px] overflow-x-hidden'

export default function WorksPage() {
  return (
    <div className={PAGE}>
      <Topbar />
      <main className="min-w-0">
        <section className="pt-16 pb-12 [animation:fadeUp_0.5s_ease_both]">
          <Link
            href="/"
            className="text-[11px] text-tx3 no-underline tracking-[.06em] inline-block mb-8 border-b-[0.5px] border-bd pb-0.5 transition-colors duration-200 hover:text-acc hover:border-acc"
          >
            ← back
          </Link>

          <SectionLabel>works</SectionLabel>

          <p className="text-xs text-tx2 leading-[1.85] max-w-[480px]">
            A selection of projects built with React, TypeScript, and AI.
            Most are tools I wanted but couldn&apos;t find, so I built them.
          </p>
        </section>

        <ProjectGrid />

        <Footer />
      </main>
    </div>
  )
}
