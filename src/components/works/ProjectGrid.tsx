import { projects } from '@/lib/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((p, i) => (
        <ProjectCard key={p.name} project={p} index={i} />
      ))}
    </div>
  )
}
