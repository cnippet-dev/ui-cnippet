"use client";

import { PlayIcon } from "lucide-react";
import { useRef } from "react";
import { MacbookScroll } from "@/registry/default/motion/macbook-scroll";

// Swap the poster for a <video> pointing at your own hosted file.
function VideoScreen() {
  return (
    <div className="relative size-full">
      <img
        alt="Product demo poster: a lake at sunrise"
        className="size-full object-cover"
        src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1280&h=800&fit=crop&dpr=2&q=80"
      />
      <button
        aria-label="Play demo"
        className="absolute inset-0 m-auto flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        type="button"
      >
        <PlayIcon className="ml-0.5 size-4" />
      </button>
      <div className="absolute inset-x-3 bottom-2 h-1 rounded-full bg-background/40">
        <div className="h-full w-1/3 rounded-full bg-background" />
      </div>
    </div>
  );
}

export default function MacbookScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-[28rem] w-full overflow-y-auto"
      ref={containerRef}
    >
      <div className="h-40" />
      <MacbookScroll
        containerRef={containerRef}
        title={
          <h3 className="font-bold text-3xl text-foreground tracking-tight">
            See it in 90 seconds
          </h3>
        }
      >
        <VideoScreen />
      </MacbookScroll>
      <div className="h-40" />
    </div>
  );
}
