'use client'

import { BlurFade } from '@/components/ui/blur-fade'
import { SectionLabel } from '@/components/ui/SectionLabel'

interface ResumeSectionProps {
  label: string
  children: React.ReactNode
}

export function ResumeSection({ label, children }: ResumeSectionProps) {
  return (
    <BlurFade inView>
      <section className="mb-12">
        <SectionLabel>{label}</SectionLabel>
        {children}
      </section>
    </BlurFade>
  )
}
