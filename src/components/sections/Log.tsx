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

      <div className="flex flex-col">
        {entries.map((e, i) => (
          <div
            key={e.date + e.repo + e.message}
            className={`grid grid-cols-[60px_1fr_auto] md:grid-cols-[72px_110px_1fr_auto] gap-x-4 py-4 border-b-[0.5px] border-bd items-center${i > 0 ? ' border-t-[0.5px] border-t-bd' : ''}`}
          >
            <span className="text-[10px] text-tx3 tabular-nums">{e.date}</span>

            <span className="hidden md:block text-[10px] text-tx3 uppercase tracking-[.08em] overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
              {e.repo}
            </span>

            <span className="text-xs text-tx2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
              {e.message}
            </span>

            <span className="flex justify-end">
              {e.tag
                ? <TagPill label={e.tag.label} variant={e.tag.variant} />
                : <span className="text-[9px] text-tx3">—</span>
              }
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
