'use client'

import { useIntersectionReveal } from '@/hooks/useIntersectionReveal'
import { ENTRIES } from '@/data/log'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TagPill } from '@/components/ui/TagPill'

export function Log() {
  const ref = useIntersectionReveal<HTMLElement>()

  return (
    <section ref={ref} id="s-log" className="reveal" style={{ marginBottom: 56 }}>
      <SectionLabel>log</SectionLabel>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderTop: '.5px solid var(--bd)',
        }}
      >
        {ENTRIES.map((e, i) => (
          <div
            key={e.date + e.repo + e.message}
            style={{
              display: 'grid',
              gridTemplateColumns: '96px 120px 1fr',
              gap: 16,
              padding: '14px 0',
              borderBottom: '.5px solid var(--bd)',
              borderTop: i === 0 ? 'none' : '.5px solid var(--bd)',
              alignItems: 'baseline',
            }}
          >
            <span style={{ fontSize: 10, color: 'var(--tx3)' }}>{e.date}</span>
            <span
              style={{ position: 'relative', overflow: 'visible', display: 'block' }}
              data-full={e.repo}
            >
              <span
                style={{
                  fontSize: 10,
                  color: 'var(--tx3)',
                  textTransform: 'uppercase',
                  letterSpacing: '.08em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 150,
                  display: 'block',
                }}
              >
                {e.repo}
              </span>
            </span>
            <span style={{ fontSize: 12, color: 'var(--tx2)' }}>
              {e.message}
              {e.tag && <TagPill label={e.tag.label} variant={e.tag.variant} />}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
