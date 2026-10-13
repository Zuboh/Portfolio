'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const LAUNCH_MS = 900

export function ScrollTop() {
  const [show, setShow] = useState(false)
  const [launching, setLaunching] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer.current)
    }
  }, [])

  const launch = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    if (reduce) return
    setLaunching(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setLaunching(false), LAUNCH_MS + 150)
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={launch}
      className={`group fixed right-[max(12px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-20 size-16 ${
        launching
          ? 'visible -translate-y-[130vh] opacity-0 transition-[translate,opacity] duration-[900ms] ease-[cubic-bezier(0.5,0,0.9,0.4)]'
          : show
            ? 'visible translate-y-0 opacity-100 transition-[translate,opacity,visibility] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]'
            : 'invisible translate-y-4 opacity-0 transition-[translate,opacity,visibility] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)]'
      }`}
    >
      <Image
        src="/rocket.png"
        alt=""
        aria-hidden="true"
        width={128}
        height={128}
        className="size-full drop-shadow-[0_6px_14px_rgb(0_0_0/0.55)] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-110"
      />
    </button>
  )
}
