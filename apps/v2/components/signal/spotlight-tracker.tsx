"use client";

import { useEffect } from "react";

/**
 * One pointer listener for the whole document. It finds the nearest
 * `[data-spotlight]` ancestor under the cursor and writes the cursor position
 * into `--mx` / `--my`, which the `[data-spotlight]::after` light reads. Doing
 * it here keeps every Frame a server component.
 */
export function SpotlightTracker() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;

    const flush = () => {
      frame = 0;
      if (!last) return;
      const target = (last.target as Element | null)?.closest?.(
        "[data-spotlight]",
      ) as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${last.clientX - rect.left}px`);
      target.style.setProperty("--my", `${last.clientY - rect.top}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      last = event;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
