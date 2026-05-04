'use client'

import { useIntersectionReveal } from '@/hooks/useIntersectionReveal'
import { ENTRIES } from '@/data/log'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TagPill } from '@/components/ui/TagPill'
import type { ActivityEntry } from '@/types'

interface LogProps {
  entries?: ActivityEntry[]
}

export function Log({ entries = ENTRIES }: LogProps) {
  const ref = useIntersectionReveal<HTMLElement>()

  return (
    <section ref={ref} id="s-log" className="reveal mb-14">
      <SectionLabel>log</SectionLabel>

      <div className="flex flex-col border-t-[0.5px] border-bd">
        {entries.map((e, i) => (
          <div
            key={e.date + e.repo + e.message}
            className={`log-row grid grid-cols-[72px_1fr] gap-3 py-3.5 border-b-[0.5px] border-bd items-baseline${i === 0 ? '' : ' border-t-[0.5px] border-t-bd'}`}
          >
            <span className="text-[10px] text-tx3">{e.date}</span>
            <div className="min-w-0">
              <span className="text-[10px] text-tx3 uppercase tracking-[.08em] block mb-0.5 overflow-hidden text-ellipsis whitespace-nowrap">
                {e.repo}
              </span>
              <span className="text-xs text-tx2">
                {e.message}
                {e.tag && <TagPill label={e.tag.label} variant={e.tag.variant} />}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
