"use client";

import { RotatingText } from "@/registry/default/motion/rotating-text";

const adjectives = ["beautiful", "accessible", "composable", "performant", "animated"];

export default function RotatingTextHero() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <h1 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Build{" "}
        <RotatingText
          className="text-primary"
          direction="up"
          interval={2000}
          transition={{ damping: 20, stiffness: 160, type: "spring" }}
          words={adjectives}
        />{" "}
        interfaces
      </h1>
    </div>
  );
}
