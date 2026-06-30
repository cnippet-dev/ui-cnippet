import { FullWidthBorder } from "@/components/layout/full-width-border";

const stats = [
  {
    accent: "text-cnippet-orange",
    description:
      "Websites, apps, and design systems shipped for clients across startups, scaleups, and enterprises",
    label: "Projects delivered",
    line: "bg-cnippet-orange/50",
    value: "50+",
  },
  {
    accent: "text-cnippet-blue",
    description:
      "Production-ready, accessible, TypeScript-first components — open-source and free to use",
    label: "Open-source components",
    line: "bg-cnippet-blue/50",
    value: "100+",
  },
  {
    accent: "text-cnippet-green",
    description:
      "Developers shipping faster with Cnippet UI, Blocks, Next, and Dashboard every week",
    label: "Developers using cnippet",
    line: "bg-cnippet-green/50",
    value: "500+",
  },
  {
    accent: "text-cnippet-yellow",
    description:
      "Average rating across client projects and developer community reviews",
    label: "Average rating",
    line: "bg-cnippet-yellow/50",
    value: "4.9 / 5",
  },
];

export function Results() {
  return (
    <section className="relative pt-12">
      <FullWidthBorder className="top-0" />
      <div className="flex flex-col gap-2 px-4 pb-10">
        <p className="font-medium font-mono text-cnippet-orange text-sm">
          [the numbers]
        </p>
        <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
          A studio that ships —
          <br />
          for clients and developers alike.
        </h2>
      </div>

      <div className="relative grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
        <FullWidthBorder className="top-0" />
        {stats.map((stat, index) => (
          <div
            className={`group flex flex-col gap-6 border-b border-dashed p-6 transition-colors hover:bg-accent/20 sm:p-10 lg:border-b-0 ${
              index < stats.length - 1 ? "sm:border-r lg:border-r" : ""
            } ${index === 1 ? "sm:border-r-0 lg:border-r" : ""}`}
            key={stat.label}
          >
            <span
              className={`font-f37-stout text-6xl leading-none tracking-tight xl:text-7xl ${stat.accent}`}
            >
              {stat.value}
            </span>
            <div className="flex flex-col gap-3">
              <div className={`h-px w-8 ${stat.line}`} />
              <p className="font-medium text-sm">{stat.label}</p>
              <p className="max-w-xs text-balance text-muted-foreground text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
        <FullWidthBorder className="bottom-0" />
      </div>
    </section>
  );
}
