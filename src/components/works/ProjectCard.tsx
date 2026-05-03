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
      style={{ animation: `fadeUp .45s ease both`, animationDelay: `${index * 80}ms` }}
      className="border-[0.5px] border-bd rounded-lg bg-card overflow-hidden flex flex-col"
    >
      <div className="h-0.5 bg-acc shrink-0" />

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h2 className="text-sm font-medium text-tx tracking-[-0.01em] leading-[1.2]">
            {project.name}
          </h2>
          <div className="flex items-center gap-2 shrink-0">
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
            <span className="text-[10px] text-tx3 tracking-[.06em]">
              {project.year}
            </span>
          </div>
        </div>

        <p className="text-xs text-tx2 leading-[1.75] mb-3.5">
          {project.longDescription ?? project.description}
        </p>

        <div className="flex flex-wrap gap-[5px] mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-tx3 bg-bg3 px-[7px] py-0.5 rounded-[3px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="border-t-[0.5px] border-bd mt-4 pt-3.5">
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
