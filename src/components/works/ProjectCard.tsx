'use client'

import { ProjectLinks } from './ProjectLinks'
import type { Project } from '@/types'

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  'in progress': {
    bg: 'rgba(192, 91, 0, .1)',
    color: '#C05B00',
    label: 'in progress',
  },
  shipped: {
    bg: 'rgba(45, 122, 79, .1)',
    color: '#2D7A4F',
    label: 'shipped',
  },
  planning: {
    bg: 'rgba(168, 164, 154, .12)',
    color: '#A8A49A',
    label: 'planning',
  },
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const status = STATUS_STYLES[project.status] ?? STATUS_STYLES['in progress']

  return (
    <div
      style={{
        animation: `fadeUp .45s ease both`,
        animationDelay: `${index * 80}ms`,
        border: '.5px solid var(--bd)',
        borderRadius: 8,
        background: 'var(--card)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ height: 2, background: 'var(--acc)', flexShrink: 0 }} />

      <div style={{ padding: '20px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 10,
          }}
        >
          <h2
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--tx)',
              letterSpacing: '-.01em',
              lineHeight: 1.2,
            }}
          >
            {project.name}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span
              style={{
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: 20,
                background: status.bg,
                color: status.color,
                whiteSpace: 'nowrap',
              }}
            >
              {status.label}
            </span>
            <span style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.06em' }}>
              {project.year}
            </span>
          </div>
        </div>

        <p
          style={{
            fontSize: 12,
            color: 'var(--tx2)',
            lineHeight: 1.75,
            marginBottom: 14,
          }}
        >
          {project.longDescription ?? project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 'auto' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                color: 'var(--tx3)',
                background: 'var(--bg3)',
                padding: '2px 7px',
                borderRadius: 3,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            borderTop: '.5px solid var(--bd)',
            marginTop: 16,
            paddingTop: 14,
          }}
        >
          <ProjectLinks
            href={project.href}
            github={project.github}
            demo={project.demo}
            docs={project.docs}
            detailHref={project.status === 'in progress' ? `/works/${project.slug}` : undefined}
          />
        </div>
      </div>
    </div>
  )
}
