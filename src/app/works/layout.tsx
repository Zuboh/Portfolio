import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'works — zubo.dev',
  description: 'A selection of projects built with React, TypeScript, and AI.',
}

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return children
}
