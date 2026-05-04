"use client";

import { useEffect } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { AnalogClock } from "@/components/AnalogClock";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/data/social";
import { PHRASES, TICKER_TEXT, AWAY_TITLES, HERO_BIO } from "@/data/content";

const NAV_LINKS = SOCIAL_LINKS.filter((s) => s.showInNav);

export function Hero() {
  const typed = useTypewriter(PHRASES);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, (v) => `${v * 4}px`);
  const ty = useTransform(my, (v) => `${v * 2}px`);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mx.set((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2));
      my.set((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2));
    }
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    let idx = 0;

    function onVisibility() {
      if (document.hidden) {
        idx = 0;
        timer = setInterval(() => {
          document.title = AWAY_TITLES[idx % AWAY_TITLES.length];
          idx++;
        }, 900);
      } else {
        if (timer) clearInterval(timer);
        document.title = "welcome back!";
        setTimeout(() => {
          document.title = "zubo.dev";
        }, 2000);
      }
    }

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <section
      id="s-hero"
      className="flex flex-col gap-6 md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-8 pt-16 pb-14 [animation:fadeUp_0.5s_ease_both]"
    >
      <div>
        <motion.h1
          className="text-[clamp(40px,6vw,52px)] font-medium leading-none mb-2.5 tracking-[-0.03em] will-change-transform transition-transform duration-[120ms] ease-out"
          style={{ translateX: tx, translateY: ty }}
        >
          zubo<span className="text-acc">.dev</span>
        </motion.h1>
        <p className="text-sm text-tx2 mb-1.5">
          <span>{typed}</span>
          <span className="cursor" />
        </p>
        <p className="text-xs text-tx3 leading-[1.85] max-w-[420px] mb-[30px]">
          {HERO_BIO}
        </p>
        <nav className="flex gap-5 flex-wrap">
          {NAV_LINKS.map(({ key, label, href }) => (
            <a
              key={key}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-xs text-tx3 no-underline tracking-[.05em] border-b-[0.5px] border-bd pb-0.5 transition-colors duration-200 hover:text-acc hover:border-acc"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-7 overflow-hidden w-full max-w-[420px] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="ticker-track">
            <span className="text-[10px] text-tx3 tracking-[.06em] shrink-0">
              {TICKER_TEXT}
            </span>
            <span
              aria-hidden="true"
              className="text-[10px] text-tx3 tracking-[.06em] shrink-0"
            >
              {TICKER_TEXT}
            </span>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <AnalogClock />
      </div>
    </section>
  );
}
