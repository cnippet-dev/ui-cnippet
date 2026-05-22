"use client";

import { TextRotate } from "@/registry/default/motion/text-rotate";

const roles = ["engineers", "designers", "founders", "makers"];

export default function TextRotateHero() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <h1 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Built for{" "}
        <TextRotate
          mainClassName="text-primary inline-flex"
          rotationInterval={2200}
          staggerDuration={0.03}
          staggerFrom="first"
          texts={roles}
          transition={{ damping: 22, stiffness: 280, type: "spring" }}
        />
      </h1>
    </div>
  );
}
