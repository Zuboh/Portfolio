'use client'

import { useIntersectionReveal } from '@/hooks/useIntersectionReveal'
import Link from 'next/link'
import { SOCIAL_LINKS } from '@/data/social'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import type { InfoRow } from '@/types'
import {
  AVAILABILITY_HEADLINE,
  AVAILABILITY_BODY,
} from '@/data/content'

const REACH: InfoRow[] = SOCIAL_LINKS
  .filter((s) => s.key !== 'resume')
  .map((s) => ({
    key: s.key,
    value: s.value,
    href: s.href,
  }))

const DETAILS: InfoRow[] = [
  { key: 'location', value: 'Brescia, Italy' },
  { key: 'timezone', value: 'CET / UTC+1' },
  { key: 'languages', value: 'Italian, English' },
  { key: 'response', value: 'within 24h' },
]

function InfoList({ rows }: { rows: InfoRow[] }) {
  return (
    <div className="flex flex-col">
      {rows.map((r, i) => {
        const isLink = !!r.href
        const content = (
          <div
            className={`flex justify-between items-center text-[11px] py-3 px-1${i < rows.length - 1 ? ' border-b-[0.5px] border-bd' : ''}`}
          >
            <span className="text-tx2">{r.key}</span>
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
          </div>
        )
        return <div key={r.key}>{content}</div>
      })}
    </div>
  )
}

export function Contact() {
  const ref = useIntersectionReveal<HTMLElement>()

  return (
    <section ref={ref} id="s-contact" className="reveal mb-14">
      <SectionLabel>contact</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
        <Card style={{ gridColumn: '1 / -1' }}>
          <div className="text-[9px] text-tx3 tracking-[.12em] uppercase mb-2.5">
            availability
          </div>
          <div className="text-sm text-tx font-medium mb-1.5">
            {AVAILABILITY_HEADLINE}
          </div>
          <p className="text-xs text-tx2 leading-[1.75] whitespace-pre-line">
            {AVAILABILITY_BODY}
          </p>
          <span className="inline-flex items-center gap-2 mt-4 bg-[oklch(from_var(--acc)_l_c_h_/_0.1)] border-[0.5px] border-[oklch(from_var(--acc)_l_c_h_/_0.35)] text-acc text-[11px] font-medium px-3.5 py-1.5 rounded-[20px] tracking-[.06em]">
            <span className="breathe w-1.5 h-1.5 rounded-full bg-acc shrink-0 inline-block" />
            available now
          </span>
        </Card>

        <Card>
          <div className="text-[9px] text-tx3 tracking-[.12em] uppercase mb-2.5">
            reach me
          </div>
          <InfoList rows={REACH} />
        </Card>

        <Card>
          <div className="text-[9px] text-tx3 tracking-[.12em] uppercase mb-2.5">
            details
          </div>
          <InfoList rows={DETAILS} />
        </Card>
      </div>
    </section>
  )
}
