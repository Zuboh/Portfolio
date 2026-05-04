"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`fixed bottom-8 left-[max(16px,calc(50vw-424px))] text-[11px] font-mono text-tx3 tracking-[0.08em] bg-bg md:bg-transparent border-[0.5px] border-bd rounded px-2.5 py-[5px] cursor-pointer z-[200] transition-[opacity,color,border-color,background] duration-300 hover:text-acc hover:border-acc ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      ↑ top
    </button>
  );
}
