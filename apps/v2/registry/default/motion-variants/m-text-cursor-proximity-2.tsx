"use client";
import { useRef } from "react";
import { TextCursorProximity } from "@/registry/default/motion/text-cursor-proximity";

export default function TextCursorProximityOpacity() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex min-h-50 flex-col items-center justify-center gap-3 px-6 text-center"
    >
      <TextCursorProximity
        containerRef={containerRef}
        styles={{ opacity: { from: 0.15, to: 1 } }}
        radius={80}
        falloff="gaussian"
        className="text-3xl font-semibold"
      >
        Move cursor to reveal
      </TextCursorProximity>
      <TextCursorProximity
        containerRef={containerRef}
        styles={{ opacity: { from: 0.15, to: 1 } }}
        radius={80}
        falloff="gaussian"
        className="text-3xl font-semibold text-muted-foreground"
      >
        the hidden message
      </TextCursorProximity>
    </div>
  );
}
