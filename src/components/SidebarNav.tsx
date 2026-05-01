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
    <nav className="sidebar-nav" aria-label="Page sections">
      <div style={{ display: "flex", flexDirection: "column" }}>
        {SECTIONS.map(({ id, label }, i) => (
          <button
            key={id}
            className={`nav-label${active === i ? " active" : ""}`}
            onClick={() => scrollTo(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
