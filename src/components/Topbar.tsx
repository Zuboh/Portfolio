'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import type { Theme, HiddenTheme } from '@/types'

const THEMES = ['light', 'dark'] as const

function SunIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    >
      <circle cx="7" cy="7" r="2.5" />
      <line x1="7" y1="1" x2="7" y2="2.4" />
      <line x1="7" y1="11.6" x2="7" y2="13" />
      <line x1="1" y1="7" x2="2.4" y2="7" />
      <line x1="11.6" y1="7" x2="13" y2="7" />
      <line x1="2.93" y1="2.93" x2="3.96" y2="3.96" />
      <line x1="10.04" y1="10.04" x2="11.07" y2="11.07" />
      <line x1="11.07" y1="2.93" x2="10.04" y2="3.96" />
      <line x1="3.96" y1="10.04" x2="2.93" y2="11.07" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.5 9A5.5 5.5 0 0 1 5 2.5a5.5 5.5 0 1 0 6.5 6.5z" />
    </svg>
  )
}

function PandaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <circle cx="7" cy="7" r="5.5" fill="currentColor" />
      <path d="M7 1.5 A5.5 5.5 0 0 1 7 12.5 Z" fill="var(--bg)" />
      <circle cx="7" cy="4.25" r="1.5" fill="var(--bg)" />
      <circle cx="7" cy="9.75" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function Topbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])

  function cycleTheme() {
    const current = (theme as Theme | HiddenTheme) ?? 'light'
    const next = THEMES[(THEMES.indexOf(current as Theme) + 1) % THEMES.length]
    setTheme(next)

  }

  const current = mounted ? ((theme as Theme | HiddenTheme) ?? 'light') : 'light'

  return (
    <div className="col-span-full flex justify-end pt-6">
      <button
        onClick={cycleTheme}
        aria-label="toggle theme"
        className="bg-transparent border-[0.5px] border-bd rounded cursor-pointer font-mono text-[11px] tracking-[.1em] text-tx3 px-3 py-1.5 flex items-center gap-2 transition-colors duration-200 hover:border-acc hover:text-acc outline-none"
      >
        <span className="flex items-center justify-center shrink-0">
          {current === 'light' && <SunIcon />}
          {current === 'dark' && <MoonIcon />}
          {current === 'panda' && <PandaIcon />}
        </span>
        <span>{current}</span>
      </button>
    </div>
  )
}
