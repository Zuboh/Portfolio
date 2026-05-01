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

const REACH: InfoRow[] = SOCIAL_LINKS.map((s) => ({
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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {rows.map((r, i) => {
        const isLink = !!r.href
        const content = (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 11,
              padding: '8px 0',
              borderBottom: i < rows.length - 1 ? '.5px solid var(--bd)' : 'none',
            }}
          >
            <span style={{ color: 'var(--tx2)' }}>{r.key}</span>
            {isLink ? (
              <Link
                className="value-link"
                style={{ color: 'var(--tx3)' }}
                href={r.href ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                {r.value}
              </Link>
            ) : (
              <span style={{ color: 'var(--tx3)' }}>{r.value}</span>
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
    <section ref={ref} id="s-contact" className="reveal" style={{ marginBottom: 56 }}>
      <SectionLabel>contact</SectionLabel>

      <div
        className="contact-grid-inner"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
      >
        <Card style={{ gridColumn: '1 / -1' }}>
          <div
            style={{
              fontSize: 9,
              color: 'var(--tx3)',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            availability
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'var(--tx)',
              fontWeight: 500,
              marginBottom: 6,
            }}
          >
            {AVAILABILITY_HEADLINE}
          </div>
          <p style={{ fontSize: 12, color: 'var(--tx2)', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
            {AVAILABILITY_BODY}
          </p>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 16,
              background: 'oklch(from var(--acc) l c h / .1)',
              border: '.5px solid oklch(from var(--acc) l c h / .35)',
              color: 'var(--acc)',
              fontSize: 11,
              fontWeight: 500,
              padding: '6px 14px',
              borderRadius: 20,
              letterSpacing: '.06em',
            }}
          >
            <span
              className="breathe"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--acc)',
                flexShrink: 0,
                display: 'inline-block',
              }}
            />
            available now
          </span>
        </Card>

        <Card>
          <div
            style={{
              fontSize: 9,
              color: 'var(--tx3)',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            reach me
          </div>
          <InfoList rows={REACH} />
        </Card>

        <Card>
          <div
            style={{
              fontSize: 9,
              color: 'var(--tx3)',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            details
          </div>
          <InfoList rows={DETAILS} />
        </Card>
      </div>
    </section>
  )
}
