import type { TagVariant } from '@/types'

interface TagPillProps {
  label: string
  variant: TagVariant
}

export function TagPill({ label, variant }: TagPillProps) {
  const isShip = variant === 'ship'
  return (
    <span
      className={`inline-block text-[9px] tracking-[.08em] uppercase px-[6px] py-[1px] rounded-[2px] ml-[6px] align-middle ${
        isShip
          ? 'text-acc bg-[oklch(from_var(--acc)_l_c_h_/_0.1)]'
          : 'text-tx3 bg-bg3'
      }`}
    >
      {label}
    </span>
  )
}
