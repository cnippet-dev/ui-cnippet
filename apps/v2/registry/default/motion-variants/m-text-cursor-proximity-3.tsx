"use client";
import { useRef } from "react";
import { TextCursorProximity } from "@/registry/default/motion/text-cursor-proximity";

export default function TextCursorProximityColor() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex min-h-50 flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <TextCursorProximity
        containerRef={containerRef}
        styles={{
          scale: { from: 1, to: 1.4 },
          color: {
            from: "hsl(var(--muted-foreground))",
            to: "hsl(var(--foreground))",
          },
        }}
        radius={70}
        falloff="exponential"
        className="text-5xl font-bold tracking-tight"
      >
        Scale and Color
      </TextCursorProximity>
      <p className="text-sm text-muted-foreground">
        exponential falloff — sharp proximity threshold
      </p>
    </div>
  );
}
