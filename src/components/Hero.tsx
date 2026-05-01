"use client";

import { useEffect } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { AnalogClock } from "./AnalogClock";

const TICKER_TEXT =
  "currently working on Prism · integrating Claude API into real products · open to freelance & full-time · writing about AI engineering · Brescia → remote · ";

export function Hero() {
  const typed = useTypewriter();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, v => `${v * 4}px`);
  const ty = useTransform(my, v => `${v * 2}px`);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mx.set((e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2));
      my.set((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2));
    }
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  useEffect(() => {
    const AWAY  = ["← zubo.dev", "· · ·", "← zubo.dev", "· · ·"];
    let timer: ReturnType<typeof setInterval> | null = null;
    let idx = 0;

    function onVisibility() {
      if (document.hidden) {
        idx = 0;
        timer = setInterval(() => {
          document.title = AWAY[idx % AWAY.length];
          idx++;
        }, 900);
      } else {
        if (timer) clearInterval(timer);
        document.title = "welcome back!";
        setTimeout(() => { document.title = "zubo.dev"; }, 2000);
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
      style={{
        padding: "64px 0 56px",
        animation: "fadeUp .5s ease both",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 32,
        alignItems: "start",
      }}
    >
      <div>
        <motion.h1
          style={{
            translateX: tx,
            translateY: ty,
            fontSize: "clamp(40px, 6vw, 52px)",
            fontWeight: 500,
            lineHeight: 1,
            marginBottom: 10,
            letterSpacing: "-.03em",
            willChange: "transform",
            transition: "transform .12s ease-out",
          }}
        >
          zubo<span style={{ color: "var(--acc)" }}>.dev</span>
        </motion.h1>
        <p style={{ fontSize: 14, color: "var(--tx2)", marginBottom: 6 }}>
          <span>{typed}</span>
          <span className="cursor" />
        </p>
        <p
          style={{
            fontSize: 12,
            color: "var(--tx3)",
            lineHeight: 1.85,
            maxWidth: 420,
            marginBottom: 30,
          }}
        >
          Building interfaces and AI-powered tools with React, TypeScript, and the Claude API.
          Based in Brescia, Italy.
        </p>
        <nav style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            { label: "github",   href: "https://github.com/zuboh" },
            { label: "linkedin", href: "https://www.linkedin.com/in/lorenzo-zubani/" },
            { label: "email",    href: "mailto:lorenzozubani1999@gmail.com" },
            { label: "résumé",   href: "/resume.pdf" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                fontSize: 12,
                color: "var(--tx3)",
                textDecoration: "none",
                letterSpacing: ".05em",
                borderBottom: ".5px solid var(--bd)",
                paddingBottom: 2,
                transition: "color .2s ease, border-color .2s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--acc)";
                el.style.borderColor = "var(--acc)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "var(--tx3)";
                el.style.borderColor = "var(--bd)";
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <div
          style={{
            marginTop: 28,
            overflow: "hidden",
            maxWidth: 420,
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="ticker-track">
            <span
              style={{
                fontSize: 10,
                color: "var(--tx3)",
                letterSpacing: ".06em",
                flexShrink: 0,
              }}
            >
              {TICKER_TEXT}
            </span>
            <span
              aria-hidden="true"
              style={{
                fontSize: 10,
                color: "var(--tx3)",
                letterSpacing: ".06em",
                flexShrink: 0,
              }}
            >
              {TICKER_TEXT}
            </span>
          </div>
        </div>
      </div>
      <AnalogClock />
    </section>
  );
}
