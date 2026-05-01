"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 52;
const DELETE_MS = 28;
const PAUSE_AFTER = 2200;
const PAUSE_BEFORE = 320;

export function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");

  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function step() {
      const phrase = phrases[phraseIdx];

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
          phraseIdx = (phraseIdx + 1) % phrases.length;
          timer = setTimeout(step, PAUSE_BEFORE);
          return;
        }
        timer = setTimeout(step, DELETE_MS);
      }
    }

    timer = setTimeout(step, 900);
    return () => clearTimeout(timer);
  // phrases array identity is stable (defined at module level in data/content.ts)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}
