"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getAge } from "@/utils/date";

export function About() {
  const ref = useScrollReveal<HTMLElement>();
  const age = getAge();

  return (
    <section
      ref={ref}
      id="s-about"
      className="reveal"
      style={{ marginBottom: 56 }}
    >
      <div
        className="section-label"
        style={{
          fontSize: 10,
          color: "var(--tx3)",
          letterSpacing: ".14em",
          textTransform: "uppercase",
          marginBottom: 22,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        about
      </div>

      <p
        style={{
          fontSize: 12,
          color: "var(--tx2)",
          lineHeight: 1.95,
          fontWeight: 300,
        }}
      >
        {age}&thinsp;y/o frontend engineer from
        <strong style={{ color: "var(--tx)", fontWeight: 500 }}> Brescia, Italy</strong>.
        Building React interfaces with deep attention to architecture and design systems.
        Growing into
        <strong style={{ color: "var(--tx)", fontWeight: 500 }}> Frontend + AI engineering</strong>
        integrating LLMs not as features, but as the core of the product experience.
        Currently building tools that bridge
        <strong style={{ color: "var(--tx)", fontWeight: 500 }}> Figma, Claude Code, and real codebases</strong>.
      </p>
    </section>
  );
}
