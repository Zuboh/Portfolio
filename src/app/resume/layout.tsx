import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'resume — zubo.dev',
  description: 'Lorenzo Zubani — Frontend & AI Engineer. Resume and CV.',
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children
}
