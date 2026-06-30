import { FullWidthBorder } from "@/components/layout/full-width-border";

const steps = [
  {
    description:
      "We start by understanding your goals, audience, and constraints. In a focused sprint we define scope, timelines, and what success looks like — before a single line of code is written.",
    highlight: "// 2-day discovery sprint",
    number: "01",
    title: "Discovery & Strategy",
  },
  {
    description:
      "Wireframes to high-fidelity designs. React and Next.js production code. Weekly demos, async Loom updates, and rapid iterations on real feedback — not a waterfall.",
    highlight: "// weekly demos + async updates",
    number: "02",
    title: "Design & Build",
  },
  {
    description:
      "We deploy, monitor, and support post-launch. Performance audits, bug fixes, and new features — we're invested in your product's long-term success, not just the handoff.",
    highlight: "// ongoing support + performance reviews",
    number: "03",
    title: "Launch & Beyond",
  },
];

export function Process() {
  return (
    <section className="relative pt-12">
      <FullWidthBorder className="top-0" />
      <div className="flex flex-col gap-2 px-4 pb-10">
        <p className="font-medium font-mono text-cnippet-orange text-sm">
          [how we work]
        </p>
        <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
          From first call
          <br />
          to shipped product.
        </h2>
      </div>

      <div className="relative">
        <FullWidthBorder className="top-0" />
        {steps.map((step, index) => (
          <div key={step.number}>
            <div className="group grid grid-cols-1 gap-4 px-4 py-8 transition-colors hover:bg-accent/20 sm:px-6 md:grid-cols-12 md:gap-8 md:py-12">
              <div className="md:col-span-2">
                <span className="font-medium font-mono text-cnippet-orange text-sm">
                  {step.number}
                </span>
              </div>
              <div className="flex flex-col gap-3 md:col-span-4">
                <h3 className="font-f37-stout text-xl md:text-2xl">
                  {step.title}
                </h3>
                <div className="rounded-[2px] border border-dashed bg-muted/50 px-3 py-2.5 font-mono text-muted-foreground text-xs">
                  {step.highlight}
                </div>
              </div>
              <div className="md:col-span-6">
                <p className="max-w-md text-balance text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <FullWidthBorder className="relative" />
            )}
          </div>
        ))}
        <FullWidthBorder className="bottom-0" />
      </div>
    </section>
  );
}
