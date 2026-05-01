'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

type TagVariant = 'wip' | 'ship' | 'fix' | 'refactor'

type ActivityType = 'commit' | 'pr' | 'release' | 'fix' | 'refactor' | 'wip'

type ActivityEntry = {
  date: string
  repo: string
  type: ActivityType
  message: string
  tag?: {
    label: string
    variant: 'wip' | 'ship' | 'fix' | 'refactor'
  }
}

export const ENTRIES: ActivityEntry[] = [
  {
    date: '2026-04',
    repo: 'prism',
    type: 'release',
    message: 'Shipped Figma-to-Claude context extractor',
    tag: { label: 'shipped', variant: 'ship' },
  },
  {
    date: '2026-04',
    repo: 'chat-engine',
    type: 'refactor',
    message: 'Reduced rerenders & optimized websocket flow',
    tag: { label: 'refactor', variant: 'refactor' },
  },
  {
    date: '2026-03',
    repo: 'pr-review-assistant',
    type: 'pr',
    message: 'AI-powered PR diff reviewer merged',
    tag: { label: 'shipped', variant: 'ship' },
  },
  {
    date: '2026-02',
    repo: 'chat-engine',
    type: 'fix',
    message: 'Fixed race condition on reconnect logic',
    tag: { label: 'fix', variant: 'fix' },
  },
  {
    date: '2025-11',
    repo: 'second-brain',
    type: 'release',
    message: 'Semantic notes system with pgvector embeddings',
    tag: { label: 'shipped', variant: 'ship' },
  },
  {
    date: '2025-09',
    repo: 'design-system',
    type: 'refactor',
    message: 'Unified component primitives and tokens',
    tag: { label: 'refactor', variant: 'refactor' },
  },
  {
    date: '2025-06',
    repo: 'ai-research',
    type: 'wip',
    message: 'RAG experiments + prompt optimization layer',
    tag: { label: 'wip', variant: 'wip' },
  },
  {
    date: '2025-03',
    repo: 'portfolio',
    type: 'wip',
    message: 'Started new minimal dev portfolio v2',
    tag: { label: 'wip', variant: 'wip' },
  },
]

function TagPill({ label, variant }: { label: string; variant: TagVariant }) {
  const isShip = variant === 'ship'
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 9,
        letterSpacing: '.08em',
        textTransform: 'uppercase',
        color: isShip ? 'var(--acc)' : 'var(--tx3)',
        background: isShip ? 'oklch(from var(--acc) l c h / .1)' : 'var(--bg3)',
        padding: '1px 6px',
        borderRadius: 2,
        marginLeft: 6,
        verticalAlign: 'middle',
      }}
    >
      {label}
    </span>
  )
}

export function Log() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="s-log"
      className="reveal"
      style={{ marginBottom: 56 }}
    >
      <div
        className="section-label"
        style={{
          fontSize: 10,
          color: 'var(--tx3)',
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          marginBottom: 22,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        log
      </div>

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
            <span style={{ position: 'relative', overflow: 'visible', display: 'block' }} data-full={e.repo}>
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
