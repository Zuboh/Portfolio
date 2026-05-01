import type { TagVariant } from '@/types'

interface TagPillProps {
  label: string
  variant: TagVariant
}

export function TagPill({ label, variant }: TagPillProps) {
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
