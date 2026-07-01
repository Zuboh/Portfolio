"use client";

import { getAge } from "@/lib/date";
import { BlurFade } from "@/components/ui/blur-fade";

export function About() {
  const age = getAge();

  return (
    <BlurFade inView>
      <section id="s-about" className="mb-8">
        <div className="flex gap-7 items-start">
          <span className="hidden md:block text-[10px] text-tx3 font-mono tracking-[.08em] pt-[4px] shrink-0 w-[52px]">
            about
          </span>
          <div>
            <p className="text-[13px] text-tx2 leading-[1.85] font-normal max-w-[58ch]">
              {age}&thinsp;y/o frontend engineer from
              <strong className="text-tx font-medium"> Brescia, Italy</strong>.
              Building React interfaces with deep attention to architecture and design systems.
              Working at the intersection of
              <strong className="text-tx font-medium"> Frontend + AI engineering</strong>
              , integrating LLMs as the core of the product experience, not a bolted-on feature.
              Currently building tools that bridge
              <strong className="text-tx font-medium"> Figma, Claude Code, and real codebases</strong>.
            </p>
          </div>
        </div>
      </section>
    </BlurFade>
  );
}
