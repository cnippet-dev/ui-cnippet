import { FullWidthBorder } from "@/components/layout/full-width-border";

const accentCycle = [
  {
    accent: "text-cnippet-orange",
    bg: "bg-cnippet-orange/5 dark:bg-cnippet-orange/10",
    border: "border-cnippet-orange/20",
  },
  {
    accent: "text-cnippet-blue",
    bg: "bg-cnippet-blue/5 dark:bg-cnippet-blue/10",
    border: "border-cnippet-blue/20",
  },
  {
    accent: "text-cnippet-green",
    bg: "bg-cnippet-green/5 dark:bg-cnippet-green/10",
    border: "border-cnippet-green/20",
  },
  {
    accent: "text-cnippet-yellow",
    bg: "bg-cnippet-yellow/5 dark:bg-cnippet-yellow/10",
    border: "border-cnippet-yellow/20",
  },
];

const reasons = [
  {
    description:
      "Small team of senior engineers and designers. You work directly with the people building your product — not account managers passing messages back and forth.",
    number: "01",
    title: "Senior team, directly",
  },
  {
    description:
      "Every prop is typed, every variant is predictable. Whether it's client code or open-source components, TypeScript goes all the way down — no `any` cheating.",
    number: "02",
    title: "TypeScript, end to end",
  },
  {
    description:
      "Every component and every interface we build targets WCAG 2.1 AA. ARIA roles, keyboard navigation, focus management — from day one, not as an afterthought.",
    number: "03",
    title: "Accessible by default",
  },
  {
    description:
      "We build with our own tools and share them publicly. Cnippet UI is MIT licensed and free forever. Blocks, Next, and Dashboard are freemium — free tier plus a one-time lifetime unlock. No recurring fees, no gatekeeping.",
    number: "04",
    title: "Open-source foundation",
  },
  {
    description:
      "Weekly demos, async Loom updates, shared Figma and GitHub. You always know where things stand — no surprises, no black boxes, no waiting on status updates.",
    number: "05",
    title: "Transparent process",
  },
  {
    description:
      "We don't disappear after launch. Post-launch support, feature iterations, and performance work — we're invested in your product's long-term success.",
    number: "06",
    title: "Long-term partners",
  },
];

export function WhyUs() {
  return (
    <section className="relative pt-12">
      <FullWidthBorder className="top-0" />
      <div className="flex flex-col gap-2 px-4 pb-10">
        <p className="font-medium font-mono text-cnippet-orange text-sm">
          [why cnippet]
        </p>
        <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
          What makes us
          <br />
          different.
        </h2>
      </div>

      <div className="relative grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        <FullWidthBorder className="top-0" />
        {reasons.map((reason, index) => {
          const { accent, bg, border } =
            // biome-ignore lint/style/noNonNullAssertion: modulo index is always in range
            accentCycle[index % accentCycle.length]!;
          return (
            <div
              className={`group flex flex-col gap-3 border-b border-dashed p-6 transition-colors hover:bg-accent/30 sm:p-8 ${
                index % 3 !== 2 ? "lg:border-r" : ""
              } ${index % 2 === 0 ? "sm:border-r lg:border-r-0" : ""} ${
                index % 2 === 0 && index % 3 !== 2 ? "lg:border-r" : ""
              } ${index >= reasons.length - 3 ? "lg:border-b-0" : ""} ${
                index >= reasons.length - 2 ? "sm:border-b-0" : ""
              }`}
              key={reason.number}
            >
              <span
                className={`inline-flex w-fit rounded-[2px] border px-2 py-0.5 font-mono text-xs ${bg} ${border} ${accent}`}
              >
                {reason.number}
              </span>
              <h3 className="font-f37-stout text-xl">{reason.title}</h3>
              <p className="max-w-xs text-balance text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
