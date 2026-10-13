import type { ActivityEntry } from '@/types'
import { GITHUB_USER } from '@/data/social'

const API = 'https://api.github.com'

// Meta repos that would crowd out the featured projects
const EXCLUDE = new Set(['Portfolio', 'Zuboh', 'fullstackopen'])

interface RepoSummary {
  name: string
  fork: boolean
}

interface CommitSummary {
  sha: string
  html_url: string
  commit: {
    message: string
    author?: { date?: string } | null
    committer?: { date?: string } | null
  }
}

function makeHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  const token = process.env.GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: makeHeaders(),
      next: { revalidate: 60 },
    })
    return res.ok ? ((await res.json()) as T) : null
  } catch {
    return null
  }
}

/**
 * Latest commits across the most recently pushed repos.
 * The public events API no longer returns commit messages, so read each repo's commits directly.
 */
export async function fetchRecentCommits(limit = 6): Promise<ActivityEntry[]> {
  const repos = await getJson<RepoSummary[]>(
    `/users/${GITHUB_USER}/repos?sort=pushed&per_page=10&type=owner`,
  )
  if (!repos) return []

  const targets = repos.filter((r) => !r.fork && !EXCLUDE.has(r.name)).slice(0, 5)

  const perRepo = await Promise.all(
    targets.map(async (repo): Promise<ActivityEntry[]> => {
      const commits = await getJson<CommitSummary[]>(
        `/repos/${GITHUB_USER}/${repo.name}/commits?author=${GITHUB_USER}&per_page=3`,
      )
      return (commits ?? []).map((c) => ({
        date: c.commit.author?.date ?? c.commit.committer?.date ?? '',
        repo: repo.name,
        message: c.commit.message.split('\n')[0].slice(0, 96),
        sha: c.sha.slice(0, 7),
        url: c.html_url,
      }))
    }),
  )

  return perRepo
    .flat()
    .filter((e) => e.date)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
}

export async function fetchLastCommitDate(repo: string): Promise<string | null> {
  const commits = await getJson<CommitSummary[]>(
    `/repos/${GITHUB_USER}/${repo}/commits?per_page=1`,
  )
  const iso = commits?.[0]?.commit.committer?.date ?? commits?.[0]?.commit.author?.date
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
