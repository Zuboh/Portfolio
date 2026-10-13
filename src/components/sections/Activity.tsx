import type { ActivityEntry } from '@/types'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { GITHUB_URL } from '@/data/social'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function Activity({ entries }: { entries: ActivityEntry[] }) {
  return (
    <section id="activity" aria-labelledby="activity-title" className="section">
      <Container>
        <SectionHeader
          id="activity-title"
          title="Latest commits"
          aside={
            entries.length > 0 ? (
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-[7px] rounded-full bg-acc shadow-[0_0_0_3px_var(--acc-dim)]"
                />
                Live from GitHub
              </span>
            ) : undefined
          }
        />

        {entries.length > 0 ? (
          <ul className="border-t border-bd">
            {entries.map((e) => (
              <li key={`${e.repo}-${e.sha}`} className="border-b border-bd">
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid items-baseline gap-1 py-[18px] transition-colors hover:bg-bg2 md:grid-cols-[110px_190px_1fr_auto] md:gap-4"
                >
                  <time dateTime={e.date} className="font-mono text-[13px] text-tx3">
                    {formatDate(e.date)}
                  </time>
                  <span className="font-mono text-sm font-medium transition-colors group-hover:text-acc">
                    {e.repo}
                  </span>
                  <span className="truncate text-tx2 max-md:whitespace-normal">{e.message}</span>
                  <span className="font-mono text-xs text-tx3">{e.sha}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="border-t border-bd py-6 text-tx2">
            Recent activity is unavailable right now. See{' '}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-acc underline-offset-4 hover:underline"
            >
              github.com/zuboh
            </a>
            .
          </p>
        )}
      </Container>
    </section>
  )
}
