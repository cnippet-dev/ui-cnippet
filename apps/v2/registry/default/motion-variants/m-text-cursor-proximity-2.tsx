"use client";
import { useRef } from "react";
import { TextCursorProximity } from "@/registry/default/motion/text-cursor-proximity";

export default function TextCursorProximityOpacity() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex min-h-50 flex-col items-center justify-center gap-3 px-6 text-center"
      ref={containerRef}
    >
      <TextCursorProximity
        className="font-semibold text-3xl"
        containerRef={containerRef}
        falloff="gaussian"
        radius={80}
        styles={{ opacity: { from: 0.15, to: 1 } }}
      >
        Move cursor to reveal
      </TextCursorProximity>
      <TextCursorProximity
        className="font-semibold text-3xl text-muted-foreground"
        containerRef={containerRef}
        falloff="gaussian"
        radius={80}
        styles={{ opacity: { from: 0.15, to: 1 } }}
      >
        the hidden message
      </TextCursorProximity>
    </div>
  );
}
