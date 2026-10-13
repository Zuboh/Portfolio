import Image from 'next/image'
import { TECH_ICONS } from '@/data/tech'
import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  size?: 'sm' | 'md'
  interactive?: boolean
}

export function Badge({ label, size = 'sm', interactive = false }: BadgeProps) {
  const icon = TECH_ICONS[label]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-bd2 bg-bg font-mono text-tx2',
        size === 'sm'
          ? 'py-[3px] pr-[11px] pl-2 text-xs'
          : 'py-[5px] pr-[13px] pl-2.5 text-[13px]',
        interactive &&
          'transition-[transform,color,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-acc/60 hover:bg-acc-dim hover:text-tx motion-reduce:transition-none motion-reduce:hover:translate-y-0'
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
