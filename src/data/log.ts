import type { ActivityEntry } from '@/types'

export const ENTRIES: ActivityEntry[] = [
  {
    date: '2026-04',
    repo: 'prism',
    type: 'release',
    message: 'Shipped Figma-to-Claude context extractor',
    tag: { label: 'shipped', variant: 'ship' },
  },
  {
    date: '2026-04',
    repo: 'chat-engine',
    type: 'refactor',
    message: 'Reduced rerenders & optimized websocket flow',
    tag: { label: 'refactor', variant: 'refactor' },
  },
  {
    date: '2026-03',
    repo: 'pr-review-assistant',
    type: 'pr',
    message: 'AI-powered PR diff reviewer merged',
    tag: { label: 'shipped', variant: 'ship' },
  },
  {
    date: '2026-02',
    repo: 'chat-engine',
    type: 'fix',
    message: 'Fixed race condition on reconnect logic',
    tag: { label: 'fix', variant: 'fix' },
  },
  {
    date: '2025-11',
    repo: 'second-brain',
    type: 'release',
    message: 'Semantic notes system with pgvector embeddings',
    tag: { label: 'shipped', variant: 'ship' },
  },
  {
    date: '2025-09',
    repo: 'design-system',
    type: 'refactor',
    message: 'Unified component primitives and tokens',
    tag: { label: 'refactor', variant: 'refactor' },
  },
  {
    date: '2025-06',
    repo: 'ai-research',
    type: 'wip',
    message: 'RAG experiments + prompt optimization layer',
    tag: { label: 'wip', variant: 'wip' },
  },
  {
    date: '2025-03',
    repo: 'portfolio',
    type: 'wip',
    message: 'Started new minimal dev portfolio v2',
    tag: { label: 'wip', variant: 'wip' },
  },
]
