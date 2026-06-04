"use client";

import { useEffect, useState } from "react";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/registry/default/ui/progress";

export function Pattern() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const el = document.getElementById("scroll-article");
    function onScroll() {
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const total = scrollHeight - clientHeight;
      setScroll(total > 0 ? (scrollTop / total) * 100 : 0);
    }
    el?.addEventListener("scroll", onScroll);
    return () => el?.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full max-w-xs overflow-hidden rounded-lg border">
      <Progress value={scroll}>
        <ProgressTrack className="h-1 rounded-none">
          <ProgressIndicator className="transition-none" />
        </ProgressTrack>
      </Progress>
      <div
        className="h-44 overflow-y-auto p-4 text-muted-foreground text-sm"
        id="scroll-article"
      >
        <p className="mb-2 font-semibold text-foreground">Reading Progress</p>
        {Array.from({ length: 8 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static lorem paragraphs
          <p className="mb-3 leading-relaxed" key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        ))}
      </div>
    </div>
  );
}
