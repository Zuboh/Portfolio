import { cn } from '@/lib/utils'

export function Availability({
  text,
  className,
  style,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <p
      className={cn(
        'inline-flex items-start gap-2.5 font-mono text-[13px] text-tx2',
        className
      )}
      style={style}
    >
      <span
        aria-hidden="true"
        className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-acc"
      />
      {text}
    </p>
  )
}
