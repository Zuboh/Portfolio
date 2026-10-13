import Image from 'next/image'
import { TECH_ICONS } from '@/data/tech'
import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  size?: 'sm' | 'md'
}

export function Badge({ label, size = 'sm' }: BadgeProps) {
  const icon = TECH_ICONS[label]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-bd2 bg-bg font-mono text-tx2',
        size === 'sm'
          ? 'py-[3px] pr-[11px] pl-2 text-xs'
          : 'py-[5px] pr-[13px] pl-2.5 text-[13px]'
      )}
    >
      {icon && (
        <Image
          src={`/icons/${icon.file}.svg`}
          alt=""
          width={16}
          height={16}
          unoptimized
          className={cn(
            size === 'sm' ? 'size-[13px]' : 'size-4',
            icon.invert && 'invert'
          )}
        />
      )}
      {label}
    </span>
  )
}
