import Link from 'next/link'
import { notFound } from 'next/navigation'
import { projects } from '@/lib/projects'
import { Topbar } from '@/components/Topbar'
import { Footer } from '@/components/sections/Footer'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function generateStaticParams() {
  return projects
    .filter((p) => p.status === 'in progress')
    .map((p) => ({ slug: p.slug }))
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div
      style={{
        height: 3,
        background: 'var(--bg3)',
        borderRadius: 99,
        overflow: 'hidden',
        marginTop: 8,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${value}%`,
          background: 'var(--acc)',
          borderRadius: 99,
          transition: 'width .6s ease',
        }}
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
    <div className="page">
      <Topbar />
      <main>
        {/* Hero */}
        <section style={{ padding: '64px 0 48px', animation: 'fadeUp .5s ease both' }}>
          <Link
            href="/works"
            className="nav-link-acc"
            style={{ fontSize: 11, display: 'inline-block', marginBottom: 32 }}
          >
            ← works
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 40px)',
                fontWeight: 500,
                letterSpacing: '-.02em',
                lineHeight: 1,
                color: 'var(--tx)',
              }}
            >
              {project.name}
            </h1>
            <span
              style={{
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: 20,
                background: 'rgba(192, 91, 0, .1)',
                color: '#C05B00',
                flexShrink: 0,
                alignSelf: 'center',
              }}
            >
              wip
            </span>
          </div>

          <p style={{ fontSize: 13, color: 'var(--tx2)', lineHeight: 1.75, maxWidth: 480 }}>
            {project.description}
          </p>
        </section>

        {/* Overview */}
        <section style={{ marginBottom: 48, animation: 'fadeUp .5s .08s ease both' }}>
          <SectionLabel>overview</SectionLabel>
          <p style={{ fontSize: 12, color: 'var(--tx2)', lineHeight: 1.85, maxWidth: 560 }}>
            {project.longDescription ?? project.description}
          </p>
        </section>

        {/* Tech stack */}
        <section style={{ marginBottom: 48, animation: 'fadeUp .5s .14s ease both' }}>
          <SectionLabel>stack</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  color: 'var(--tx2)',
                  background: 'var(--bg3)',
                  padding: '4px 10px',
                  borderRadius: 4,
                  letterSpacing: '.03em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Progress */}
        {project.progress !== undefined && (
          <section style={{ marginBottom: 48, animation: 'fadeUp .5s .18s ease both' }}>
            <SectionLabel>progress</SectionLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.04em' }}>
                {project.progress}% complete
              </span>
              {project.estimatedCompletion && (
                <span style={{ fontSize: 11, color: 'var(--tx3)' }}>
                  · est. {project.estimatedCompletion}
                </span>
              )}
            </div>
            <ProgressBar value={project.progress} />
          </section>
        )}

        {/* What's next */}
        {project.whatsnext && project.whatsnext.length > 0 && (
          <section style={{ marginBottom: 48, animation: 'fadeUp .5s .22s ease both' }}>
            <SectionLabel>what&apos;s next</SectionLabel>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {project.whatsnext.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: 12,
                    color: 'var(--tx2)',
                    lineHeight: 1.6,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                  }}
                >
                  <span style={{ color: 'var(--acc)', flexShrink: 0, marginTop: 1 }}>·</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Links */}
        {(project.github || project.demo || project.docs) && (
          <section style={{ marginBottom: 48, animation: 'fadeUp .5s .26s ease both' }}>
            <SectionLabel>links</SectionLabel>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="nav-link-acc" style={{ fontSize: 12 }}>
                  ↗ github
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="nav-link-acc" style={{ fontSize: 12 }}>
                  ↗ demo
                </a>
              )}
              {project.docs && (
                <a href={project.docs} target="_blank" rel="noopener noreferrer" className="nav-link-acc" style={{ fontSize: 12 }}>
                  ↗ docs
                </a>
              )}
            </div>
          </section>
        )}

        {/* Metadata */}
        {project.lastUpdated && (
          <div
            style={{
              fontSize: 10,
              color: 'var(--tx3)',
              letterSpacing: '.06em',
              marginBottom: 56,
            }}
          >
            last updated {project.lastUpdated}
          </div>
        )}

        <Footer />
      </main>
    </div>
  )
}
