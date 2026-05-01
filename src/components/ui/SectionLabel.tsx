interface SectionLabelProps {
  children: React.ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div
      className="section-label"
      style={{
        fontSize: 10,
        color: 'var(--tx3)',
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        marginBottom: 22,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {children}
    </div>
  )
}
