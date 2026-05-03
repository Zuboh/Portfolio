"use client";

import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";
import { getAge } from "@/lib/date";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  const ref = useIntersectionReveal<HTMLElement>();
  const age = getAge();

  return (
    <section ref={ref} id="s-about" className="reveal mb-14">
      <SectionLabel>about</SectionLabel>

      <p className="text-[12px] text-tx2 leading-[1.95] font-light">
        {age}&thinsp;y/o frontend engineer from
        <strong className="text-tx font-medium"> Brescia, Italy</strong>.
        Building React interfaces with deep attention to architecture and design systems.
        Growing into
        <strong className="text-tx font-medium"> Frontend + AI engineering</strong>
        {" "}integrating LLMs not as features, but as the core of the product experience.
        Currently building tools that bridge
        <strong className="text-tx font-medium"> Figma, Claude Code, and real codebases</strong>.
      </p>
    </section>
  );
}
