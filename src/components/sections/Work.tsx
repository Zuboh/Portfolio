import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { localizeProjects, statusLabel } from '@/lib/projects'
import type { Dictionary } from '@/app/[lang]/dictionaries'
import type { Locale } from '@/i18n/config'

export function Work({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const projects = localizeProjects(dict.projects)

  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <Container>
        <SectionHeader
          id="work-title"
          title={dict.work.title}
          aside={`${String(projects.length).padStart(2, '0')} ${dict.work.projectsCount}`}
        />

        <ol>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/${lang}/work/${p.slug}`}
                className="group -mx-3 grid gap-x-6 gap-y-3 border-t border-bd px-3 py-9 transition-colors hover:bg-bg2 md:grid-cols-[48px_1fr_200px] [li:last-child>&]:border-b"
              >
                <span
                  aria-hidden="true"
                  className="pt-2 font-mono text-[13px] text-tx3 max-md:hidden"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div>
                  <h3 className="mb-2 text-xl leading-tight font-semibold tracking-[-0.035em]">
                    {p.name}
                  </h3>
                  <p className="max-w-[54ch] text-tx2">{p.description}</p>
                  <ul
                    className="mt-[18px] flex flex-wrap gap-2"
                    aria-label={`${p.name} ${dict.work.stackSuffix}`}
                  >
                    {p.stack.map((s) => (
                      <li key={s}>
                        <Badge label={s} />
                      </li>
                    ))}
                  </ul>
                  <span className="mt-[18px] inline-flex items-center gap-1.5 text-sm font-medium">
                    {dict.work.readCaseStudy}
                    <Icon
                      name="arrow"
                      className="text-[15px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-acc"
                    />
                  </span>
                </div>

                <span className="font-mono text-[13px] text-tx3 md:pt-2">
                  {statusLabel(p, dict.work)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
