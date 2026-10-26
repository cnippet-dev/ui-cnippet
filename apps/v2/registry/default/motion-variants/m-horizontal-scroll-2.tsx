"use client";

import { useRef } from "react";
import { HorizontalScroll } from "@/registry/default/motion/horizontal-scroll";

const milestones = [
  { text: "Two founders, one garage, zero customers.", year: "2018" },
  { text: "First 100 teams sign up in a weekend.", year: "2019" },
  { text: "Series A and our first office in Lisbon.", year: "2020" },
  { text: "Launched the API and hit 10k teams.", year: "2022" },
  { text: "Profitable, remote-first, 80 people.", year: "2024" },
];

export default function HorizontalScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-72 w-full overflow-y-auto" ref={containerRef}>
      <HorizontalScroll
        containerRef={containerRef}
        panelClassName="h-72"
        speed={0.8}
        trackClassName="gap-0"
      >
        {milestones.map((m) => (
          <div className="w-60 shrink-0" key={m.year}>
            <p className="font-bold text-4xl text-foreground tracking-tight">
              {m.year}
            </p>
            <div className="relative my-4 h-px bg-border">
              <span className="absolute -top-1 left-0 size-2 rounded-full bg-foreground" />
            </div>
            <p className="pr-8 text-muted-foreground text-sm">{m.text}</p>
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
}
