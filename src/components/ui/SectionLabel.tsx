interface SectionLabelProps {
  children: React.ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div
      className="section-label flex items-center gap-[10px] text-[10px] text-tx3 tracking-[.14em] uppercase mb-[22px] after:content-[''] after:flex-1 after:h-[0.5px] after:bg-bd"
    >
      {children}
    </div>
  )
}
