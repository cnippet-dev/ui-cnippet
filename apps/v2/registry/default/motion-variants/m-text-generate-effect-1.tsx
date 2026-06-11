"use client";

import { TextGenerateEffect } from "@/registry/default/motion/text-generate-effect";

export default function TextGenerateEffectHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <TextGenerateEffect
        as="h1"
        className="max-w-xl text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl"
        filter
        staggerDuration={0.1}
        transition={{ duration: 0.5 }}
      >
        Motion components for modern web apps
      </TextGenerateEffect>
    </div>
  );
}
