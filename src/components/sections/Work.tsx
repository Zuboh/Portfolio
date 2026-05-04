"use client";

import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";
import { projects } from "@/lib/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Link from "next/link";
import { ButtonAllProjects } from "../ButtonAllProjects";

export function Work() {
  const ref = useIntersectionReveal<HTMLElement>();

  return (
    <section ref={ref} id="s-work" className="reveal mb-14">
      <SectionLabel>work</SectionLabel>

      <div className="project-list relative border-[0.5px] border-bd rounded-lg overflow-hidden">
        {projects.map((p, i) => (
          <a
            key={p.name}
            href={p.href}
            className={`project-row grid grid-cols-[1fr_auto] gap-3 items-start p-[18px_20px] bg-card text-inherit no-underline relative overflow-hidden cursor-pointer transition-colors duration-[180ms] hover:bg-bg2 ${i < projects.length - 1 ? 'border-b-[0.5px] border-bd' : ''}`}
          >
            <div>
              <div className="text-[13px] font-medium text-tx mb-[5px] flex items-center gap-[7px]">
                <span className="w-1 h-1 rounded-full bg-acc shrink-0 inline-block" />
                {p.name}
              </div>
              <p className="text-[11px] text-tx2 leading-[1.65] mb-2.5">
                {p.description}
              </p>
              <div className="flex gap-[5px] flex-wrap">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-tx3 bg-bg3 px-[7px] py-0.5 rounded-[3px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm text-tx3 transition-colors duration-[180ms] mt-0.5">
              ↗
            </div>
          </a>
        ))}
      </div>
      <ButtonAllProjects />
    </section>
  );
}
