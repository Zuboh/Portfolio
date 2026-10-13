import { cn } from '@/lib/utils'

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[1080px] px-[clamp(20px,4vw,40px)]', className)}>
      {children}
    </div>
  )
}
