"use client";

import { TextGenerateEffect } from "@/registry/default/motion/text-generate-effect";

export default function TextGenerateEffectStacked() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-2 px-6">
      <TextGenerateEffect
        as="p"
        className="font-semibold text-primary text-xs uppercase tracking-widest"
        filter={false}
        staggerDuration={0.08}
        transition={{ duration: 0.3 }}
      >
        What we offer
      </TextGenerateEffect>
      <TextGenerateEffect
        as="h1"
        className="max-w-lg text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl"
        filter
        staggerDuration={0.09}
        transition={{ duration: 0.55 }}
      >
        Animate anything effortlessly
      </TextGenerateEffect>
      <TextGenerateEffect
        as="p"
        className="max-w-sm text-center text-muted-foreground text-sm"
        filter
        staggerDuration={0.05}
        transition={{ duration: 0.45 }}
      >
        Copy paste animated components built on Motion and Tailwind
      </TextGenerateEffect>
    </div>
  );
}
