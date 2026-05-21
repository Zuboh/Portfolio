'use client'

import Link from 'next/link'
import { SOCIAL_LINKS } from '@/data/social'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { BlurFade } from '@/components/ui/blur-fade'
import type { InfoRow } from '@/types'
import { AVAILABILITY_BODY } from '@/data/content'

const REACH: InfoRow[] = SOCIAL_LINKS
  .filter((s) => s.key !== 'resume')
  .map((s) => ({ key: s.key, value: s.value, href: s.href }))

const DETAILS: InfoRow[] = [
  { key: 'location', value: 'Brescia, Italy' },
  { key: 'timezone', value: 'CET / UTC+1' },
  { key: 'languages', value: 'Italian, English' },
  { key: 'response', value: 'within 24h' },
]

function InfoList({ rows }: { rows: InfoRow[] }) {
  return (
    <dl className="flex flex-col">
      {rows.map((r, i) => {
        const isLink = !!r.href
        return (
          <div
            key={r.key}
            className={`flex justify-between items-center text-[11px] py-3 px-1${i < rows.length - 1 ? ' border-b-[0.5px] border-bd' : ''}`}
          >
            <dt className="text-tx2">{r.key}</dt>
            <dd className="m-0">
              {isLink ? (
                <Link
                  className="text-tx3 no-underline transition-[text-decoration,color] duration-150 hover:underline hover:underline-offset-[3px] hover:text-acc cursor-pointer"
                  href={r.href ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.value}
                </Link>
              ) : (
                <span className="text-tx3">{r.value}</span>
              )}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}

export function Contact() {
  return (
    <BlurFade inView>
      <section id="s-contact" className="mb-14">
        <SectionLabel>contact</SectionLabel>

        <a
          href="mailto:lorenzozubani1999@gmail.com"
          className="inline-block text-[clamp(14px,2.5vw,18px)] font-medium text-tx tracking-[-0.01em] mb-4 no-underline border-b-[0.5px] border-bd pb-0.5 transition-colors duration-200 hover:text-acc hover:border-acc"
        >
          lorenzozubani1999@gmail.com
        </a>

        <p className="text-xs text-tx3 mb-3">{AVAILABILITY_BODY}</p>

        <span className="inline-flex items-center gap-2 bg-[oklch(from_var(--acc)_l_c_h_/_0.1)] border-[0.5px] border-[oklch(from_var(--acc)_l_c_h_/_0.35)] text-acc text-[11px] font-medium px-3.5 py-1.5 rounded-[20px] tracking-[.06em] mb-8">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acc opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acc" />
          </span>
          available now
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-[10px] text-tx3 font-medium mb-3">reach me</div>
            <InfoList rows={REACH} />
          </div>
          <div>
            <div className="text-[10px] text-tx3 font-medium mb-3">details</div>
            <InfoList rows={DETAILS} />
          </div>
        </div>
      </section>
    </BlurFade>
  )
}
