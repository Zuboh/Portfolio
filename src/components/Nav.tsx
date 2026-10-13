'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Container } from '@/components/ui/Container'

const LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#stack', label: 'Stack' },
  { href: '/#activity', label: 'Activity' },
  { href: '/resume', label: 'Résumé' },
  { href: '/#contact', label: 'Contact' },
]

const linkClass =
  'block rounded-lg px-3.5 py-2.5 text-sm text-tx2 transition-colors hover:bg-bg2 hover:text-tx aria-[current=page]:text-tx'

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-20 border-b border-bd bg-bg/80 backdrop-blur-md">
      <Container className="flex h-[68px] items-center justify-between">
        <Link
          href="/"
          aria-label="Lorenzo Zubani, home"
          className="inline-flex items-center gap-[0.35em] py-2 text-xl leading-none font-semibold tracking-[-0.04em]"
        >
          <span>L</span>
          <span>Z</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={linkClass}
                  aria-current={l.href === pathname ? 'page' : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-3 min-h-11 rounded-lg px-3 text-sm text-tx2 transition-colors hover:text-tx md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-bd md:hidden">
          <Container>
            <ul className="flex flex-col py-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`${linkClass} py-3`}
                    aria-current={l.href === pathname ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  )
}
