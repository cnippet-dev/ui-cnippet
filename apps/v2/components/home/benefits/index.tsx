import { FullWidthBorder } from "@/components/layout/full-width-border";
import { cn } from "@/lib/utils";
import { PromptToneGraphic } from "./prompt-tone";
import { SelfLearningGraphic } from "./self-learning";
import { CustomToolsGraphic } from "./tools";

export const HEADLINE = (
  <>
    Your next component is
    <br />
    one copy-paste away.
  </>
);

const benefits = [
  {
    children: SelfLearningGraphic,
    className: "lg:col-span-2",
    description:
      "Browse 57 core components and 40 motion animations — copy the code, drop it straight into your project. No extra dependencies, no package to fight, just clean accessible code you own.",
    title: <>Copy-paste components</>,
  },
  {
    children: CustomToolsGraphic,
    className: "lg:col-span-2",
    description:
      "Built for React, Next.js, Vite, Remix, and Astro. Tailwind CSS v4 compatible, TypeScript-first, and tree-shakeable so you only ship what you use.",
    title: <>Works with your stack</>,
  },
  {
    children: PromptToneGraphic,
    className: "lg:col-span-2",
    description:
      "Every component ships with TypeScript types, dark mode support, and full Tailwind CSS customization. Make it yours — adjust colors, spacing, and behavior.",
    title: <>Fully typed & customizable</>,
  },
] as const;

export const Benefits = () => (
  <section className="relative mb-0 grid gap-6 pt-12 md:gap-12">
    <FullWidthBorder className="top-0" />
    <div className="flex flex-col gap-2 px-4">
      <p className="font-medium font-mono text-cnippet-orange text-sm">
        [for developers]
      </p>
      <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
        {HEADLINE}
      </h2>
    </div>
    <div className="relative isolate grid gap-0 border-dashed lg:grid-cols-6">
      <FullWidthBorder className="top-0" />
      {benefits.map((benefit, index) => (
        <div
          className={cn(
            "relative flex flex-col gap-2 overflow-hidden border-b border-dashed p-4 pt-20 last:border-b-0 sm:p-8 sm:pt-16 lg:border-b-0",
            benefit.className,
            index < benefits.length - 1 && "lg:border-r",
          )}
          key={benefit.description}
        >
          <div className="relative z-10 h-64 w-full">
            {benefit.children && <benefit.children />}
          </div>
          <h3 className="z-10 mt-4 font-semibold text-md">{benefit.title}</h3>
          <p className="w-full max-w-lg text-balance text-muted-foreground">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);
