"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Frontend & AI Engineer",
  "React · TypeScript · Claude API",
  "Building interfaces with intent",
  "Design-conscious developer",
  "Based in Brescia, Italy",
];

const TYPE_MS   = 52;
const DELETE_MS = 28;
const PAUSE_AFTER = 2200;
const PAUSE_BEFORE = 320;

export function useTypewriter() {
  const [text, setText] = useState("");

  useEffect(() => {
    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;
    let timer: ReturnType<typeof setTimeout>;

    function step() {
      const phrase = PHRASES[phraseIdx];

      if (!deleting) {
        charIdx++;
        setText(phrase.slice(0, charIdx));
        if (charIdx === phrase.length) {
          deleting = true;
          timer = setTimeout(step, PAUSE_AFTER);
          return;
        }
        timer = setTimeout(step, TYPE_MS);
      } else {
        charIdx--;
        setText(phrase.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % PHRASES.length;
          timer = setTimeout(step, PAUSE_BEFORE);
          return;
        }
        timer = setTimeout(step, DELETE_MS);
      }
    }

    timer = setTimeout(step, 900);
    return () => clearTimeout(timer);
  }, []);

  return text;
}
