import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Résumé',
  description:
    'Résumé of Lorenzo Zubani, Frontend Engineer: experience, projects, skills and education.',
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children
}
