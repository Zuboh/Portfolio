import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Flow } from '@/components/ui/Flow'
import { CASE_STUDIES } from '@/data/case-studies'
import { getProject, projects, statusLabel } from '@/lib/projects'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return { title: project.name, description: project.description }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const study = CASE_STUDIES[slug]
  const index = projects.findIndex((p) => p.slug === slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <main id="main" className="pb-4">
      <article aria-labelledby="case-title" className="pt-[clamp(48px,7vw,88px)]">
        <Container>
          <Link
            href="/#work"
            className="mb-12 inline-flex items-center gap-2 text-sm text-tx3 transition-colors hover:text-tx"
          >
            <span aria-hidden="true">←</span> All work
          </Link>

          <p className="font-mono text-[13px] text-tx3">{statusLabel(project)}</p>
          <h1
            id="case-title"
            className="mt-3 text-[clamp(48px,8vw,96px)] leading-[0.98] font-semibold tracking-[-0.055em]"
          >
            {project.name}
          </h1>
          <p className="mt-6 max-w-[56ch] text-[clamp(17px,1.7vw,20px)] text-tx2 [text-wrap:pretty]">
            {project.description}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((s) => (
              <li key={s}>
                <Badge label={s} size="md" />
              </li>
            ))}
          </ul>

          {(project.github || project.demo) && (
            <div className="mt-8 flex flex-wrap gap-2.5">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn">
                  <Icon name="github" className="text-base" />
                  Source on GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn">
                  <Icon name="arrow" className="text-base" />
                  Live demo
                </a>
              )}
            </div>
          )}

          <div className="mt-20 border-t border-bd">
            {(study?.sections ?? []).map((section) => (
              <section
                key={section.title}
                aria-labelledby={`s-${section.title.replace(/\W+/g, '-').toLowerCase()}`}
                className="grid gap-4 border-b border-bd py-12 md:grid-cols-[200px_1fr] md:gap-6"
              >
                <h2
                  id={`s-${section.title.replace(/\W+/g, '-').toLowerCase()}`}
                  className="pt-1 font-mono text-[13px] font-normal text-tx3"
                >
                  {section.title}
                </h2>
                <div className="max-w-[64ch]">
                  {section.paragraphs?.map((para) => (
                    <p key={para} className="mb-4 text-[17px] text-tx2 [text-wrap:pretty] last:mb-0">
                      {para}
                    </p>
                  ))}
                  {section.flow && <Flow steps={section.flow} />}
                  {section.bullets && (
                    <ul className="flex flex-col gap-3 text-tx2">
                      {section.bullets.map((b) => (
                        <li key={b.text} className="flex gap-3">
                          <span aria-hidden="true" className="text-acc">
                            ·
                          </span>
                          <span>
                            {b.label && <strong className="font-medium text-tx">{b.label}. </strong>}
                            {b.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <Link
            href={`/work/${next.slug}`}
            className="group mt-16 flex items-baseline justify-between gap-4 border-b border-bd pb-6 transition-colors hover:border-acc"
          >
            <span className="font-mono text-[13px] text-tx3">Next project</span>
            <span className="inline-flex items-center gap-2 text-2xl font-semibold tracking-[-0.035em]">
              {next.name}
              <Icon
                name="arrow"
                className="text-xl transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-acc"
              />
            </span>
          </Link>
        </Container>
      </article>
    </main>
  )
}
