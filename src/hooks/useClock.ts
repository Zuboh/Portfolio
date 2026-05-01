import { useState, useEffect } from 'react';

export interface ClockState {
  handH: { x: number; y: number };
  handM: { x: number; y: number };
  handS: { tip: { x: number; y: number }; tail: { x: number; y: number } };
  digital: string;
  date: string;
}

export function useClock(): ClockState | null {
  const [clockState, setClockState] = useState<ClockState | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const updateClock = () => {
      const date = new Date();
      
      const h = date.getHours() % 12;
      const m = date.getMinutes();
      const s = date.getSeconds();
      const ms = date.getMilliseconds();

      // Continuous movement for hands
      const seconds = s + ms / 1000;
      const minutes = m + seconds / 60;
      const hours = h + minutes / 60;

      const angS = (seconds / 60) * 2 * Math.PI - Math.PI / 2;
      const angM = (minutes / 60) * 2 * Math.PI - Math.PI / 2;
      const angH = (hours / 12) * 2 * Math.PI - Math.PI / 2;

      const handS = {
        tip: { x: 50 + 33 * Math.cos(angS), y: 50 + 33 * Math.sin(angS) },
        tail: { x: 50 - 7 * Math.cos(angS), y: 50 - 7 * Math.sin(angS) }
      };
      const handM = {
        x: 50 + 32 * Math.cos(angM), y: 50 + 32 * Math.sin(angM)
      };
      const handH = {
        x: 50 + 22 * Math.cos(angH), y: 50 + 22 * Math.sin(angH)
      };

      const digital = [
        date.getHours().toString().padStart(2, "0"),
        date.getMinutes().toString().padStart(2, "0"),
        date.getSeconds().toString().padStart(2, "0")
      ].join(":");

      const dateStr = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
      });

      setClockState({
        handH,
        handM,
        handS,
        digital,
        date: dateStr,
      });

      animationFrameId = requestAnimationFrame(updateClock);
    };

    animationFrameId = requestAnimationFrame(updateClock);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return clockState;
}
