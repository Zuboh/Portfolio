"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects } from "@/lib/projects";

export function Work() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="s-work"
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
        work
      </div>

      <div className="project-list" style={{ display: "flex", flexDirection: "column", border: ".5px solid var(--bd)", borderRadius: 8, overflow: "hidden" }}>
        {projects.map((p, i) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 12,
              alignItems: "start",
              padding: "18px 20px",
              background: "var(--card)",
              borderBottom: i < projects.length - 1 ? ".5px solid var(--bd)" : "none",
              textDecoration: "none",
              color: "inherit",
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              transition: "background .18s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--card)"; }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--tx)",
                  marginBottom: 5,
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--acc)",
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                {p.name}
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--tx2)",
                  lineHeight: 1.65,
                  marginBottom: 10,
                }}
              >
                {p.description}
              </p>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {p.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 10,
                      color: "var(--tx3)",
                      background: "var(--bg3)",
                      padding: "2px 7px",
                      borderRadius: 3,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              style={{
                fontSize: 14,
                color: "var(--tx3)",
                transition: "color .18s ease",
                marginTop: 2,
              }}
            >
              ↗
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
