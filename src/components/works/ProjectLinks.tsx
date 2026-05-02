'use client'

interface ProjectLinksProps {
  href: string
  github?: string
  demo?: string
  docs?: string
  detailHref?: string
}

function LinkItem({
  href,
  label,
  symbol,
}: {
  href: string
  label: string
  symbol: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="nav-link-acc"
      style={{ fontSize: 11, letterSpacing: '.05em' }}
    >
      {symbol} {label}
    </a>
  )
}

export function ProjectLinks({ github, demo, docs, detailHref }: ProjectLinksProps) {
  const links = [
    detailHref && { href: detailHref, label: 'details', symbol: '→' },
    github && { href: github, label: 'github', symbol: '↗' },
    demo && { href: demo, label: 'demo', symbol: '↗' },
    docs && { href: docs, label: 'docs', symbol: '↗' },
  ].filter(Boolean) as { href: string; label: string; symbol: string }[]

  if (links.length === 0) return null

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
      {links.map((l) => (
        <LinkItem key={l.label} {...l} />
      ))}
    </div>
  )
}
