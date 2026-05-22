"use client";

import { ScrollProgress } from "@/registry/default/motion/scroll-progress";
import { useRef } from "react";

export default function ScrollProgressContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="relative border-b border-border bg-card/80 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Changelog</p>
          <ScrollProgress
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-pink-500"
            containerRef={containerRef}
          />
        </div>
        <div
          className="h-48 overflow-y-auto p-4 text-sm text-muted-foreground"
          ref={containerRef}
        >
          {["v1.3", "v1.2", "v1.1", "v1.0"].map((v) => (
            <div className="mb-4" key={v}>
              <p className="mb-1 font-semibold text-foreground">{v}</p>
              <p className="leading-relaxed">
                Added new animated components, improved accessibility, fixed
                scroll-jank in Safari, and bumped peer deps to Motion 12.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
