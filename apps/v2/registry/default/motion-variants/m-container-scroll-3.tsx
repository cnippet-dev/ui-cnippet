"use client";

import { PlayIcon } from "lucide-react";
import { useRef } from "react";
import { ContainerScroll } from "@/registry/default/motion/container-scroll";

export default function ContainerScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-96 w-full overflow-y-auto px-4"
      ref={containerRef}
    >
      <div className="h-48" />
      <ContainerScroll
        containerRef={containerRef}
        header={
          <>
            <p className="text-muted-foreground text-sm">Keynote · 12 min</p>
            <h3 className="font-bold text-3xl text-foreground tracking-tight">
              Watch the launch
            </h3>
          </>
        }
        rotate={[25, 0]}
      >
        <div className="relative aspect-video">
          <img
            alt="Stage with mountains projected on the screen"
            className="size-full object-cover"
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=960&h=540&fit=crop&dpr=2&q=80"
          />
          <button
            aria-label="Play keynote"
            className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
            type="button"
          >
            <PlayIcon className="ml-1 size-6" />
          </button>
        </div>
      </ContainerScroll>
      <div className="h-48" />
    </div>
  );
}
