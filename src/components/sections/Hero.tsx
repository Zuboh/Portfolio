"use client";

import { useEffect } from "react";
import { AnalogClock } from "@/components/AnalogClock";
import { SOCIAL_LINKS } from "@/data/social";
import { AWAY_TITLES, HERO_SUBTITLE } from "@/data/content";
import { BlurFade } from "@/components/ui/blur-fade";
import { KineticText } from "@/components/ui/kinetic-text";

const NAV_LINKS = SOCIAL_LINKS.filter((s) => s.showInNav);

export function Hero() {
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
    <section id="s-hero" className="pt-10 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-x-8">
        <div>
          <BlurFade delay={0}>
            <h1 className="text-[clamp(40px,6.5vw,58px)] tracking-[-0.04em] leading-none mb-4">
              <span className="inline-flex items-baseline gap-[0.28em]">
                <KineticText text="Lorenzo" as="span" />
                <KineticText text="Zubani" as="span" className="text-acc" />
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.1}>
            <p className="text-sm text-tx2 mb-4">{HERO_SUBTITLE}</p>
          </BlurFade>

          <BlurFade delay={0.15}>
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
          </BlurFade>
        </div>

        <BlurFade delay={0.05} className="hidden md:flex items-center justify-center">
          <AnalogClock />
        </BlurFade>
      </div>
    </section>
  );
}
