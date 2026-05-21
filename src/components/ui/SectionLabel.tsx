interface SectionLabelProps {
  children: React.ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <h2 className="flex items-center gap-[10px] text-[10px] text-tx3 font-medium mb-[22px] after:content-[''] after:flex-1 after:h-[0.5px] after:bg-bd">
      {children}
    </h2>
  )
}
