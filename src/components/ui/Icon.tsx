import { cn } from '@/lib/utils'

const PATHS = {
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 7.5l8.5 6 8.5-6" />
    </>
  ),
  download: <path d="M12 4v11M7.5 11l4.5 4.5 4.5-4.5M5 20h14" />,
  arrow: <path d="M7 17L17 7M8 7h9v9" />,
  github: (
    <path d="M9 19c-4 1.2-4-2-6-2.5M15 21v-3.2c0-1 .1-1.5-.5-2.1 2.8-.3 5.5-1.4 5.5-6.2a4.8 4.8 0 0 0-1.3-3.3 4.4 4.4 0 0 0-.1-3.3s-1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.4 3.7 5.4 4 5.4 4a4.4 4.4 0 0 0-.1 3.3A4.8 4.8 0 0 0 4 10.6c0 4.8 2.7 5.9 5.5 6.2-.6.6-.6 1.2-.5 2.1V21" />
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.6v.1M12 16v-5.5M12 13c0-1.7 1-2.7 2.3-2.7S16.5 11.3 16.5 13v3" />
    </>
  ),
}

export type IconName = keyof typeof PATHS

export function Icon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('size-[1em] shrink-0', className)}
    >
      {PATHS[name]}
    </svg>
  )
}
