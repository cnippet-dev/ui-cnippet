"use client";

import { TextGradient } from "@/registry/default/motion/text-gradient";

export default function TextGradientInline() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <h2 className="max-w-xl text-center font-bold text-3xl text-foreground tracking-tight sm:text-4xl">
        The fastest way to ship{" "}
        <TextGradient
          as="span"
          colors={["#f97316", "#eab308", "#22c55e", "#f97316"]}
          duration={3}
        >
          animated
        </TextGradient>{" "}
        interfaces
      </h2>
    </div>
  );
}
