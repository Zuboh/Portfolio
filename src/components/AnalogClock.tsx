"use client";

import { useClock } from "@/hooks/useClock";

const DOTS = Array.from({ length: 12 }, (_, i) => {
  const ang = (i / 12) * Math.PI * 2 - Math.PI / 2;
  const r = 43;
  return { cx: 50 + r * Math.cos(ang), cy: 50 + r * Math.sin(ang), r: i === 0 ? 2 : 1 };
});

const NEUTRAL = {
  handH: { x: 50, y: 28 },
  handM: { x: 50, y: 18 },
  handS: { tip: { x: 50, y: 17 }, tail: { x: 50, y: 57 } },
};

export function AnalogClock() {
  const clock = useClock();

  const h = clock?.handH ?? NEUTRAL.handH;
  const m = clock?.handM ?? NEUTRAL.handM;
  const s = clock?.handS ?? NEUTRAL.handS;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        paddingTop: 8,
        userSelect: "none",
      }}
    >
      <svg width="96" height="96" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="47" fill="none" stroke="var(--bd)" strokeWidth=".5"/>
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="var(--tx3)"/>
        ))}
        <line
          x1="50" y1="50" x2={h.x} y2={h.y}
          stroke="var(--tx)" strokeWidth="2" strokeLinecap="round"
        />
        <line
          x1="50" y1="50" x2={m.x} y2={m.y}
          stroke="var(--tx)" strokeWidth="1" strokeLinecap="round"
        />
        <line
          x1={s.tail.x} y1={s.tail.y} x2={s.tip.x} y2={s.tip.y}
          stroke="var(--acc)" strokeWidth=".7" strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="1.8" fill="var(--tx)"/>
        <circle cx="50" cy="50" r=".7"  fill="var(--bg)"/>
      </svg>

      <div
        style={{
          fontSize: 10,
          color: "var(--tx3)",
          letterSpacing: ".06em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {clock?.digital ?? "--:--:--"}
      </div>
      <div
        style={{
          fontSize: 9,
          color: "var(--tx3)",
          letterSpacing: ".1em",
          textTransform: "uppercase",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {clock?.date ?? ""}
      </div>
    </div>
  );
}
