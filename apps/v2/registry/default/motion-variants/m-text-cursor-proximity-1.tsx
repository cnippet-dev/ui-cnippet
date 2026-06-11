"use client";
import { useRef } from "react";
import { TextCursorProximity } from "@/registry/default/motion/text-cursor-proximity";

export default function TextCursorProximityScale() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex min-h-50 flex-col items-center justify-center gap-2 px-6 text-center"
      ref={containerRef}
    >
      <p className="text-muted-foreground text-sm">Hover to scale letters</p>
      <TextCursorProximity
        className="font-bold text-4xl tracking-tight"
        containerRef={containerRef}
        radius={60}
        styles={{ scale: { from: 1, to: 1.6 } }}
      >
        Move cursor here
      </TextCursorProximity>
    </div>
  );
}
