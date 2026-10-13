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

const barClass =
  'absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]'

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
          className="inline-flex items-center gap-[0.35em] py-2 text-lg leading-none font-semibold tracking-[-0.04em]"
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
          className="group -mr-3 grid size-11 place-items-center rounded-lg text-tx2 transition-colors hover:text-tx md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" className="relative block size-5">
            <span
              className={`${barClass} top-[5px] ${open ? 'translate-y-[4.25px] rotate-45' : ''}`}
            />
            <span
              className={`${barClass} top-[9.25px] ${open ? 'scale-x-0 opacity-0' : ''}`}
            />
            <span
              className={`${barClass} top-[13.5px] ${open ? '-translate-y-[4.25px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] md:hidden ${
          open
            ? 'visible grid-rows-[1fr] opacity-100'
            : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-bd">
            <Container>
              <ul className="flex flex-col py-2">
                {LINKS.map((l, i) => (
                  <li
                    key={l.href}
                    className={`transition-[opacity,transform] duration-300 ease-out ${
                      open
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-1 opacity-0'
                    }`}
                    style={{
                      transitionDelay: open ? `${80 + i * 45}ms` : '0ms',
                    }}
                  >
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
          </div>
        </div>
      </nav>
    </header>
  )
}
