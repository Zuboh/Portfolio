'use client'

import { useIntersectionReveal } from '@/hooks/useIntersectionReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

interface ResumeSectionProps {
  label: string
  children: React.ReactNode
  delay?: number
}

export function ResumeSection({ label, children, delay = 0 }: ResumeSectionProps) {
  const ref = useIntersectionReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className="reveal"
      style={{ marginBottom: 48, animationDelay: `${delay}ms` }}
    >
      <SectionLabel>{label}</SectionLabel>
      {children}
    </section>
  )
}
