interface CardProps {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export function Card({ children, style, className }: CardProps) {
  return (
    <div
      className={`bg-card border-[0.5px] border-bd rounded-lg p-5${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}
