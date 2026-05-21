interface ExperienceCardProps {
  role: string
  company: string
  period: string
  bullets: string[]
  current?: boolean
}

export function ExperienceCard({ role, company, period, bullets, current }: ExperienceCardProps) {
  return (
    <div className="pb-6 mb-6 border-b-[0.5px] border-bd last:border-b-0 last:mb-0">
      <div className="flex justify-between items-start gap-3 mb-3 flex-wrap">
        <div>
          <div className="text-[13px] font-medium text-tx mb-0.5">
            {role}
          </div>
          <div className="text-[11px] text-tx2 tracking-[.03em]">
            {company}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {current && (
            <span className="text-[9px] tracking-[.1em] uppercase px-2 py-[3px] rounded-full bg-[oklch(from_var(--acc)_l_c_h_/_0.1)] text-acc">
              now
            </span>
          )}
          <span className="text-[10px] text-tx3 font-mono tracking-[.04em]">
            {period}
          </span>
        </div>
      </div>

      <ul className="list-none flex flex-col gap-[5px]">
        {bullets.map((b, i) => (
          <li
            key={i}
            className="text-[11px] text-tx2 leading-[1.65] flex items-start gap-2"
          >
            <span className="text-acc shrink-0 mt-[1px]">·</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}
