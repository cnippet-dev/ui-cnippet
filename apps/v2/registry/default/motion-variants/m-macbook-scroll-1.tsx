"use client";

import { useRef } from "react";
import { MacbookScroll } from "@/registry/default/motion/macbook-scroll";

export default function MacbookScrollLaunch() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-[28rem] w-full overflow-y-auto"
      ref={containerRef}
    >
      <div className="h-40" />
      <MacbookScroll
        alt="Desktop wallpaper of a mountain range at dusk"
        badge={
          <span className="rounded-full bg-foreground px-2 py-0.5 font-semibold text-[10px] text-background">
            NEW
          </span>
        }
        containerRef={containerRef}
        showGradient
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=800&fit=crop&dpr=2&q=80"
        title={
          <h3 className="font-bold text-3xl text-foreground tracking-tight">
            Meet Horizon OS
            <span className="block font-normal text-base text-muted-foreground">
              Scroll to open
            </span>
          </h3>
        }
      />
      <div className="h-40" />
    </div>
  );
}
