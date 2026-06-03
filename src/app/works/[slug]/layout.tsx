import type { Metadata } from 'next'
import { projects } from '@/lib/projects'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug && p.status === 'in progress')
  if (!project) notFound()

  return {
    description: project.description,
  }
}

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return children
}
