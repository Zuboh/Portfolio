"use client";

import { projects } from "@/lib/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BlurFade } from "@/components/ui/blur-fade";
import { ButtonAllProjects } from "../ButtonAllProjects";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TagPill } from "@/components/ui/TagPill";
import type { Project } from "@/types";

function statusVariant(status: Project["status"]): "ship" | "wip" | undefined {
  if (status === "shipped") return "ship";
  if (status === "in progress") return "wip";
  return undefined;
}

export function Work() {
  return (
    <section id="s-work" className="mb-[88px]">
      <SectionLabel>work</SectionLabel>

      <Accordion type="single" collapsible className="w-full">
        {projects.map((p, i) => (
          <BlurFade key={p.slug} delay={i * 0.06} inView>
            <AccordionItem
              value={p.slug}
              className="border-b-[0.5px] border-bd border-t-0 [&:first-child]:border-t-0"
            >
              <AccordionTrigger className="group grid grid-cols-[32px_1fr_auto] md:grid-cols-[32px_1fr_64px_auto] gap-x-4 items-start py-[18px] hover:no-underline [&>svg]:hidden cursor-pointer hover:bg-bg2 transition-colors duration-[180ms] -mx-1 px-1 rounded-sm">
                <span className="text-[11px] text-tx3 tabular-nums font-medium font-mono pt-px">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0 text-left">
                  <div className="text-[13px] font-semibold text-tx leading-snug mb-1 group-data-[state=open]:text-acc transition-colors duration-[180ms]">
                    {p.name}
                  </div>
                  <p className="text-[11px] text-tx2 leading-[1.6] truncate group-data-[state=open]:hidden">
                    {p.description}
                  </p>
                </div>

                <span className="hidden md:block text-[11px] text-tx3 tabular-nums font-mono pt-px">
                  {p.year ?? "—"}
                </span>

                <span
                  aria-hidden="true"
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-tx3 text-base -mr-2 -my-2 transition-colors duration-[180ms] group-data-[state=open]:text-acc"
                >
                  <span className="group-data-[state=open]:hidden">+</span>
                  <span className="hidden group-data-[state=open]:block">×</span>
                </span>
              </AccordionTrigger>

              <AccordionContent className="pl-[calc(32px+1rem)] pb-5 pt-0">
                <p className="text-[11px] text-tx2 leading-[1.75] mb-3">
                  {p.longDescription ?? p.description}
                </p>

                <div className="flex gap-[5px] flex-wrap mb-4">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-tx3 bg-bg3 px-[7px] py-0.5 rounded-[3px]"
                    >
                      {tag}
                    </span>
                  ))}
                  {p.status && statusVariant(p.status) && (
                    <TagPill label={p.status} variant={statusVariant(p.status)!} />
                  )}
                </div>

                <div className="flex gap-4">
                  {p.github && p.github !== "#" && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-tx3 no-underline tracking-[.04em] border-b-[0.5px] border-bd pb-0.5 transition-colors duration-150 hover:text-acc hover:border-acc"
                    >
                      github ↗
                    </a>
                  )}
                  {p.demo && p.demo !== "#" && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-tx3 no-underline tracking-[.04em] border-b-[0.5px] border-bd pb-0.5 transition-colors duration-150 hover:text-acc hover:border-acc"
                    >
                      live demo ↗
                    </a>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </BlurFade>
        ))}
      </Accordion>

      <ButtonAllProjects />
    </section>
  );
}
