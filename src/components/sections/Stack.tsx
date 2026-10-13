import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { STACK_GROUPS } from '@/data/stack'

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="section">
      <Container>
        <SectionHeader
          id="stack-title"
          title="Stack"
          aside="What I build with"
        />

        <div className="border-t border-bd">
          {STACK_GROUPS.map((g) => (
            <div
              key={g.title}
              className="grid gap-3 border-b border-bd py-7 md:grid-cols-[200px_1fr] md:gap-6"
            >
              <h3 className="pt-1.5 font-mono text-[13px] font-normal text-tx3">
                {g.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item}>
                    <Badge label={item} size="md" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
