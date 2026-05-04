import type { ActivityEntry, TagVariant } from '@/types'

function toYearMonth(iso: string): string {
  return iso.slice(0, 7) // "2026-05-04T..." → "2026-05"
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) // "May 2026"
}

export async function fetchLastCommitDate(username: string, repo: string): Promise<string | null> {
  try {
    const headers = makeHeaders()
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits?per_page=1`,
      { headers, next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const commits = await res.json()
    const date = commits[0]?.commit?.committer?.date ?? commits[0]?.commit?.author?.date
    return date ? formatDate(date) : null
  } catch {
    return null
  }
}

// Strip "type(scope): " prefix from conventional commits for readable display
function cleanMessage(raw: string): string {
  const firstLine = raw.split('\n')[0]
  // Match "type(scope): message" or "type: message"
  const match = firstLine.match(/^(?:feat|fix|refactor|chore|docs|style|test|perf|ci|build|revert)(?:\([^)]+\))?:\s*(.+)$/i)
  return (match ? match[1] : firstLine).slice(0, 72)
}

function tagFromMessage(msg: string): ActivityEntry['tag'] | undefined {
  const lower = msg.toLowerCase()
  if (lower.startsWith('fix')) return { label: 'fix', variant: 'fix' as TagVariant }
  if (lower.startsWith('refactor')) return { label: 'refactor', variant: 'refactor' as TagVariant }
  if (lower.startsWith('feat') || lower.startsWith('release')) return { label: 'shipped', variant: 'ship' as TagVariant }
  if (lower.startsWith('wip') || lower.startsWith('chore') || lower.startsWith('docs')) return { label: 'wip', variant: 'wip' as TagVariant }
  return undefined
}

function makeHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  const token = process.env.GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

export async function fetchGitHubActivity(username: string, limit = 10): Promise<ActivityEntry[]> {
  try {
    const headers = makeHeaders()
    const entries: ActivityEntry[] = []

    // 1. Get recently pushed repos (skip forks)
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=10&type=owner`,
      { headers, next: { revalidate: 3600 } }
    )
    if (!reposRes.ok) return []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const repos: any[] = await reposRes.json()

    // Exclude meta repos — portfolio, profile README, forks
    const EXCLUDE = new Set(['Portfolio', 'Zuboh', 'fullstackopen'])
    const projectRepos = repos.filter((r) => !EXCLUDE.has(r.name) && !r.fork)

    // 2. Fetch recent commits from each repo (parallel, limit 5 per repo)
    const commitResults = await Promise.all(
      projectRepos.slice(0, 8).map(async (repo) => {
        const res = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=5`,
          { headers, next: { revalidate: 3600 } }
        )
        if (!res.ok) return []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const commits: any[] = await res.json()
        return commits.map((c) => ({
          date: toYearMonth(c.commit.author?.date ?? c.commit.committer?.date ?? ''),
          repo: repo.name,
          type: 'commit' as const,
          message: cleanMessage(c.commit.message),
          tag: tagFromMessage(c.commit.message),
        } satisfies ActivityEntry))
      })
    )

    // 3. Also pull PR + Release events from Events API
    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=50`,
      { headers, next: { revalidate: 3600 } }
    )
    if (eventsRes.ok) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const events: any[] = await eventsRes.json()
      for (const event of events) {
        if (event.type === 'PullRequestEvent') {
          const pr = event.payload?.pull_request
          if (event.payload?.action === 'closed' && pr?.merged) {
            entries.push({
              date: toYearMonth(event.created_at),
              repo: event.repo?.name?.split('/')[1] ?? event.repo?.name,
              type: 'pr',
              message: (pr.title ?? 'Pull request merged').slice(0, 80),
              tag: { label: 'shipped', variant: 'ship' },
            })
          }
        } else if (event.type === 'ReleaseEvent') {
          const name = event.payload?.release?.name || event.payload?.release?.tag_name || 'New release'
          entries.push({
            date: toYearMonth(event.created_at),
            repo: event.repo?.name?.split('/')[1] ?? event.repo?.name,
            type: 'release',
            message: String(name).slice(0, 80),
            tag: { label: 'shipped', variant: 'ship' },
          })
        }
      }
    }

    // 4. Merge commits + events, sort by date desc, deduplicate, take limit
    const allCommits = commitResults.flat()
    const allEntries = [...allCommits, ...entries]

    // Sort by date descending (YYYY-MM string sort works correctly)
    allEntries.sort((a, b) => b.date.localeCompare(a.date))

    // Deduplicate by message
    const seen = new Set<string>()
    const deduped = allEntries.filter((e) => {
      const key = `${e.repo}:${e.message}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    return deduped.slice(0, limit)
  } catch {
    return []
  }
}
