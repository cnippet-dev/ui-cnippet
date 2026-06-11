"use client";
import { useRef } from "react";
import { TextCursorProximity } from "@/registry/default/motion/text-cursor-proximity";

export default function TextCursorProximityColor() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex min-h-50 flex-col items-center justify-center gap-4 px-6 text-center"
      ref={containerRef}
    >
      <TextCursorProximity
        className="font-bold text-5xl tracking-tight"
        containerRef={containerRef}
        falloff="exponential"
        radius={70}
        styles={{
          color: {
            from: "hsl(var(--muted-foreground))",
            to: "hsl(var(--foreground))",
          },
          scale: { from: 1, to: 1.4 },
        }}
      >
        Scale and Color
      </TextCursorProximity>
      <p className="text-muted-foreground text-sm">
        exponential falloff — sharp proximity threshold
      </p>
    </div>
  );
}
