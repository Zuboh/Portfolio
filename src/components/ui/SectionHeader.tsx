export function SectionHeader({
  id,
  title,
  aside,
}: {
  id: string
  title: string
  aside?: React.ReactNode
}) {
  return (
    <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
      <h2 id={id} className="text-[clamp(30px,4vw,44px)] leading-[1.1] font-semibold tracking-[-0.04em]">
        {title}
      </h2>
      {aside && <div className="font-mono text-xs text-tx3">{aside}</div>}
    </div>
  )
}
