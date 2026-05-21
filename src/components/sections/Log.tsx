'use client'

import { ENTRIES } from '@/data/log'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TagPill } from '@/components/ui/TagPill'
import { BlurFade } from '@/components/ui/blur-fade'
import type { ActivityEntry } from '@/types'

interface LogProps {
  entries?: ActivityEntry[]
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-acc text-[9px] font-medium ml-1.5">
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acc opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acc" />
      </span>
      live
    </span>
  )
}

export function Log({ entries = ENTRIES }: LogProps) {
  return (
    <BlurFade inView>
      <section id="s-log" className="mb-12">
        <SectionLabel>
          log<LiveBadge />
        </SectionLabel>

        <div className="flex flex-col">
          {entries.map((e, i) => (
            <BlurFade key={e.date + e.repo + e.message} delay={i * 0.06} inView>
              <div
                className={`grid grid-cols-[60px_1fr_auto] md:grid-cols-[72px_110px_1fr_auto] gap-x-4 py-4 border-b-[0.5px] border-bd items-center${i > 0 ? ' border-t-[0.5px] border-t-bd' : ''}`}
              >
                <span className="font-mono text-[10px] text-tx3 tabular-nums">{e.date}</span>

                <span className="hidden md:block font-mono text-[10px] text-tx3 uppercase tracking-[.08em] overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
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
            </BlurFade>
          ))}
        </div>
      </section>
    </BlurFade>
  )
}
