import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/projects'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/sections/Footer'
import { SectionLabel } from '@/components/ui/SectionLabel'

const PAGE = 'grid grid-cols-1 md:grid-cols-[1fr_68px] max-w-[800px] mx-auto pl-6 pr-4 md:pl-14 md:pr-3 pb-[140px] overflow-x-hidden'
const LINK = 'text-[11px] text-tx3 no-underline tracking-[.06em] inline-block mb-8 border-b-[0.5px] border-bd pb-0.5 transition-colors duration-200 hover:text-acc hover:border-acc'
const EXT_LINK = 'text-xs text-tx3 no-underline tracking-[.05em] border-b-[0.5px] border-bd pb-0.5 transition-colors duration-200 hover:text-acc hover:border-acc'

export function generateStaticParams() {
  return projects
    .filter((p) => p.status === 'in progress')
    .map((p) => ({ slug: p.slug }))
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-[3px] bg-bg3 rounded-full overflow-hidden mt-2">
      <div
        className="h-full bg-acc rounded-full transition-[width] duration-[600ms] ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

export default async function WipSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug && p.status === 'in progress')
  if (!project) notFound()

  return (
    <div className={PAGE}>
      <Topbar />
      <main className="min-w-0">
        {/* Hero */}
        <section className="pt-16 pb-12 [animation:fadeUp_0.5s_ease_both]">
          <Link href="/works" className={LINK}>← works</Link>

          <div className="flex items-center gap-2.5 mb-3">
            <h1 className="text-[clamp(28px,5vw,40px)] font-medium tracking-[-0.02em] leading-none text-tx">
              {project.name}
            </h1>
            <span className="text-[9px] font-medium tracking-[.1em] uppercase px-2.5 py-1 rounded-[20px] shrink-0 self-center bg-[rgba(192,91,0,.1)] text-[#C05B00]">
              wip
            </span>
          </div>

          <p className="text-[13px] text-tx2 leading-[1.75] max-w-[480px]">
            {project.description}
          </p>
        </section>

        {/* Overview */}
        <section className="mb-12 [animation:fadeUp_0.5s_0.08s_ease_both]">
          <SectionLabel>overview</SectionLabel>
          <p className="text-xs text-tx2 leading-[1.85] max-w-[560px]">
            {project.longDescription ?? project.description}
          </p>
        </section>

        {/* Tech stack */}
        <section className="mb-12 [animation:fadeUp_0.5s_0.14s_ease_both]">
          <SectionLabel>stack</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-tx2 bg-bg3 px-2.5 py-1 rounded tracking-[.03em]"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Progress */}
        {project.progress !== undefined && (
          <section className="mb-12 [animation:fadeUp_0.5s_0.18s_ease_both]">
            <SectionLabel>progress</SectionLabel>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="text-[11px] text-tx3 tracking-[.04em]">
                {project.progress}% complete
              </span>
              {project.estimatedCompletion && (
                <span className="text-[11px] text-tx3">
                  · est. {project.estimatedCompletion}
                </span>
              )}
            </div>
            <ProgressBar value={project.progress} />
          </section>
        )}

        {/* What's next */}
        {project.whatsnext && project.whatsnext.length > 0 && (
          <section className="mb-12 [animation:fadeUp_0.5s_0.22s_ease_both]">
            <SectionLabel>what&apos;s next</SectionLabel>
            <ul className="list-none flex flex-col gap-2">
              {project.whatsnext.map((item) => (
                <li key={item} className="text-xs text-tx2 leading-[1.6] flex items-start gap-2">
                  <span className="text-acc shrink-0 mt-px">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Links */}
        {(project.github || project.demo || project.docs) && (
          <section className="mb-12 [animation:fadeUp_0.5s_0.26s_ease_both]">
            <SectionLabel>links</SectionLabel>
            <div className="flex gap-5 flex-wrap">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className={EXT_LINK}>
                  ↗ github
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className={EXT_LINK}>
                  ↗ demo
                </a>
              )}
              {project.docs && (
                <a href={project.docs} target="_blank" rel="noopener noreferrer" className={EXT_LINK}>
                  ↗ docs
                </a>
              )}
            </div>
          </section>
        )}

        {/* Metadata */}
        {project.lastUpdated && (
          <div className="text-[10px] text-tx3 tracking-[.06em] mb-14">
            last updated {project.lastUpdated}
          </div>
        )}

        <Footer />
      </main>
    </div>
  )
}
