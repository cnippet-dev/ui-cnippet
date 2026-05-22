"use client";
import { useRef } from "react";
import { TextCursorProximity } from "@/registry/default/motion/text-cursor-proximity";

export default function TextCursorProximityScale() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex min-h-50 flex-col items-center justify-center gap-2 px-6 text-center"
    >
      <p className="text-sm text-muted-foreground">Hover to scale letters</p>
      <TextCursorProximity
        containerRef={containerRef}
        styles={{ scale: { from: 1, to: 1.6 } }}
        radius={60}
        className="text-4xl font-bold tracking-tight"
      >
        Move cursor here
      </TextCursorProximity>
    </div>
  );
}
