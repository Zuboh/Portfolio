'use client'

import { useSyncExternalStore } from 'react'

type Theme = 'dark' | 'light'

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'absolute size-5',
} as const

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb)
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  return () => mo.disconnect()
}

let transitionId = 0

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'

export function ThemeToggle({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark' as Theme)

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    const root = document.documentElement
    const apply = () => {
      root.dataset.theme = next
    }
    try {
      localStorage.setItem('theme', next)
    } catch {}

    if (
      !document.startViewTransition ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      apply()
      return
    }

    root.classList.add('theme-vt')
    root.dataset.vt = next === 'light' ? 'day' : 'night'
    const id = ++transitionId
    const vt = document.startViewTransition(apply)
    vt.finished.finally(() => {
      // A newer toggle owns the flags now; only the latest one cleans up.
      if (id !== transitionId) return
      root.classList.remove('theme-vt')
      delete root.dataset.vt
    })
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={theme === 'light'}
      className="grid size-11 cursor-pointer place-items-center rounded-lg text-tx2 transition-colors hover:text-tx"
    >
      <span
        aria-hidden="true"
        className="relative block size-6 overflow-hidden"
      >
        <span className="theme-orbit absolute inset-0">
          <svg {...svgProps} style={{ left: 2, top: 2 }}>
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
          </svg>
          <svg {...svgProps} style={{ left: -20, top: 24 }}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </span>
      </span>
    </button>
  )
}
