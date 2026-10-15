'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { stripLocale, type Locale } from '@/i18n/config'

const LINKS = [
  { href: '/#work', key: 'work' },
  { href: '/#stack', key: 'stack' },
  { href: '/#activity', key: 'activity' },
  { href: '/resume', key: 'resume' },
  { href: '/#contact', key: 'contact' },
] as const

type NavLabels = {
  work: string
  stack: string
  activity: string
  resume: string
  contact: string
  primary: string
  openMenu: string
  closeMenu: string
  home: string
}

const linkClass =
  'block rounded-lg px-3.5 py-2.5 text-sm text-tx2 transition-colors hover:bg-bg2 hover:text-tx aria-[current=page]:text-tx'

const CONTENT_SELECTOR =
  'main :is(h1, h2, h3, h4, p, a, li, img, button, time, pre)'

const barClass =
  'absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-[translate,rotate,scale,opacity] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]'

export function Nav({
  lang,
  labels,
  themeLabel,
}: {
  lang: Locale
  labels: NavLabels
  themeLabel: string
}) {
  const pathname = stripLocale(usePathname())
  const [open, setOpen] = useState(false)
  const [underHeader, setUnderHeader] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Show the bottom border only while real content scrolls beneath the header.
  // An observer watches that band, so scrolling itself does no work.
  useEffect(() => {
    const bar = headerRef.current?.firstElementChild
    if (!bar) return
    const targets = [...document.querySelectorAll(CONTENT_SELECTOR)].filter(
      (el) => !el.closest('.pointer-events-none')
    )
    const inBand = new Set<Element>()
    let io: IntersectionObserver | undefined

    const observe = () => {
      io?.disconnect()
      inBand.clear()
      const limit = bar.getBoundingClientRect().height
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && e.boundingClientRect.height > 0)
              inBand.add(e.target)
            else inBand.delete(e.target)
          }
          setUnderHeader(inBand.size > 0)
        },
        {
          rootMargin: `-1px 0px ${-(window.innerHeight - limit + 1)}px 0px`,
        }
      )
      for (const el of targets) io.observe(el)
    }

    observe()
    window.addEventListener('resize', observe)
    return () => {
      io?.disconnect()
      window.removeEventListener('resize', observe)
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-20 border-b bg-bg/80 backdrop-blur-md transition-colors duration-300 ${
        underHeader || open
          ? 'border-bd'
          : 'border-transparent light:bg-transparent light:backdrop-blur-none'
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between">
        <Link
          href={`/${lang}`}
          aria-label={labels.home}
          className="inline-flex items-center gap-[0.35em] py-2 text-lg leading-none font-semibold tracking-[-0.04em]"
        >
          <span>L</span>
          <span>Z</span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label={labels.primary} className="hidden md:block">
            <ul className="flex gap-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={`/${lang}${l.href}`}
                    className={linkClass}
                    aria-current={l.href === pathname ? 'page' : undefined}
                  >
                    {labels[l.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle label={themeLabel} />

          <button
            type="button"
            className="group -mr-3 grid size-11 place-items-center rounded-lg text-tx2 transition-colors hover:text-tx md:hidden"
            aria-label={open ? labels.closeMenu : labels.openMenu}
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
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label={labels.primary}
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
                    className={`transition-[opacity,translate] duration-300 ease-out ${
                      open
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-1 opacity-0'
                    }`}
                    style={{
                      transitionDelay: open ? `${80 + i * 45}ms` : '0ms',
                    }}
                  >
                    <Link
                      href={`/${lang}${l.href}`}
                      className={`${linkClass} py-3`}
                      aria-current={l.href === pathname ? 'page' : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {labels[l.key]}
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
