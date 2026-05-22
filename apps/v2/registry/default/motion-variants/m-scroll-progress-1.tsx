"use client";

import { ScrollProgress } from "@/registry/default/motion/scroll-progress";

export default function ScrollProgressFixed() {
  return (
    <div className="relative flex min-h-50 flex-col items-center justify-start overflow-y-auto px-6">
      <div className="sticky top-0 z-10 w-full">
        <ScrollProgress className="fixed left-0 right-0 top-0 h-1 bg-primary" />
      </div>
      <div className="w-full max-w-lg space-y-4 py-6">
        <h2 className="text-xl font-bold text-foreground">
          Scroll to see progress
        </h2>
        {Array.from({ length: 6 }).map((_, i) => (
          <p className="text-sm leading-relaxed text-muted-foreground" key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        ))}
      </div>
    </div>
  );
}
