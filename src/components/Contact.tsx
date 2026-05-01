'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import Link from 'next/link'
import { useState } from 'react'

interface InfoRow {
  key: string
  value: string
  href?: string
}

const REACH: InfoRow[] = [
  {
    key: 'email',
    value: 'lorenzozubani1999@gmail.com',
    href: 'mailto:[lorenzozubani1999@gmail.com]',
  },
  {
    key: 'github',
    value: 'github.com/zuboh',
    href: 'https://github.com/zuboh',
  },
  {
    key: 'linkedin',
    value: '/in/lorenzo-zubani',
    href: 'https://linkedin.com/in/lorenzo-zubani',
  },
  {
    key: 'twitter',
    value: '@zuboh_',
    href: 'https://twitter.com/zuboh_',
  },
]

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
              borderBottom:
                i < rows.length - 1 ? '.5px solid var(--bd)' : 'none',
            }}
          >
            <span style={{ color: 'var(--tx2)' }}>{r.key}</span>

            {isLink ? (
              <Link
                className="value-link"
                style={{
                  color: 'var(--tx3)',
                }}
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
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="s-contact"
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
        contact
      </div>

      <div
        className="contact-grid-inner"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }}
      >
        {/* availability — full width */}
        <div
          style={{
            gridColumn: '1 / -1',
            background: 'var(--card)',
            border: '.5px solid var(--bd)',
            borderRadius: 8,
            padding: 20,
          }}
        >
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
            Open to opportunities
          </div>
          <p style={{ fontSize: 12, color: 'var(--tx2)', lineHeight: 1.75 }}>
            Freelance, full-time, or interesting collaborations.
            <br />
            Especially interested in AI-powered products and design systems.
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
        </div>

        <div
          style={{
            background: 'var(--card)',
            border: '.5px solid var(--bd)',
            borderRadius: 8,
            padding: 20,
          }}
        >
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
        </div>

        <div
          style={{
            background: 'var(--card)',
            border: '.5px solid var(--bd)',
            borderRadius: 8,
            padding: 20,
          }}
        >
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
        </div>
      </div>
    </section>
  )
}
