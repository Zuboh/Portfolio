"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "s-hero",    label: "top" },
  { id: "s-work",   label: "work" },
  { id: "s-stack",  label: "stack" },
  { id: "s-about",  label: "about" },
  { id: "s-log",    label: "log" },
  { id: "s-contact", label: "contact" },
];

const SCROLL_OFFSET = 40;

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export function SidebarNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    function onScroll() {
      // At page bottom → always activate last section (contact)
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        setActive(SECTIONS.length - 1);
        return;
      }

      // Pick section whose top is closest to (but not past) 30% from viewport top
      const target = window.innerHeight * 0.3;
      let best = 0;
      let bestDist = Infinity;
      SECTIONS.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= target) {
          const dist = target - top;
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        }
      });
      setActive(best);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="hidden md:flex fixed top-1/2 -translate-y-1/2 z-[100] flex-col items-start"
      style={{ right: 'max(16px, calc(50vw - 400px - 64px))' }}
      aria-label="Page sections"
    >
      <div className="flex flex-col">
        {SECTIONS.map(({ id, label }, i) => (
          <button
            key={id}
            className={`text-[9px] font-mono tracking-[0.1em] uppercase cursor-pointer py-1 leading-none whitespace-nowrap select-none bg-transparent border-none outline-none will-change-[color] transition-[color,letter-spacing] duration-[220ms] hover:text-tx2 ${active === i ? 'text-acc tracking-[0.14em]' : 'text-tx3'}`}
            onClick={() => scrollTo(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
