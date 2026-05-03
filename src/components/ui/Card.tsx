interface CardProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export function Card({ children, style }: CardProps) {
  return (
    <div
      className="bg-card border-[0.5px] border-bd rounded-lg p-5"
      style={style}
    >
      {children}
    </div>
  )
}
