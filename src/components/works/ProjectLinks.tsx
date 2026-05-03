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
      className="text-[11px] tracking-[.05em] text-tx3 border-b-[0.5px] border-bd pb-0.5 no-underline transition-colors duration-200 hover:text-acc hover:border-acc"
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
    <div className="flex gap-4 flex-wrap mt-4">
      {links.map((l) => (
        <LinkItem key={l.label} {...l} />
      ))}
    </div>
  )
}
