import { FullWidthBorder } from "@/components/layout/full-width-border";

const features = [
  {
    accent: "text-cnippet-orange",
    bg: "bg-cnippet-orange/5 dark:bg-cnippet-orange/10",
    border: "border-cnippet-orange/20",
    description:
      "Landing pages, brand sites, and marketing experiences — built with Next.js, designed to convert, and optimized to perform from day one.",
    number: "01",
    tags: ["Next.js", "Performance", "Design-first"],
    title: "Custom Websites",
  },
  {
    accent: "text-cnippet-blue",
    bg: "bg-cnippet-blue/5 dark:bg-cnippet-blue/10",
    border: "border-cnippet-blue/20",
    description:
      "SaaS platforms, internal tools, client portals — full-stack React and TypeScript, production-ready architecture, shipped on your timeline.",
    number: "02",
    tags: ["React", "TypeScript", "Full-stack"],
    title: "Web Applications",
  },
  {
    accent: "text-cnippet-green",
    bg: "bg-cnippet-green/5 dark:bg-cnippet-green/10",
    border: "border-cnippet-green/20",
    description:
      "Branded component libraries, token systems, and style guides — consistent UI across every surface your product touches, built to scale with your team.",
    number: "03",
    tags: ["Components", "Brand tokens", "Scalable"],
    title: "Design Systems",
  },
  {
    accent: "text-cnippet-yellow",
    bg: "bg-cnippet-yellow/5 dark:bg-cnippet-yellow/10",
    border: "border-cnippet-yellow/20",
    description:
      "Auth, CMS, payments, email, and analytics — we implement the complex integrations so your team can focus on what actually matters to your users.",
    number: "04",
    tags: ["Auth", "CMS", "Payments"],
    title: "Next.js Integration",
  },
];

export function Services() {
  return (
    <section className="relative pt-12">
      <FullWidthBorder className="top-0" />
      <div className="flex flex-col gap-2 px-4 pb-10">
        <p className="font-medium font-mono text-cnippet-orange text-sm">
          [for clients]
        </p>
        <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
          We design and build
          <br />
          what ambitious teams need.
        </h2>
      </div>

      <div className="relative grid gap-0 lg:grid-cols-2">
        <FullWidthBorder className="top-0" />
        {features.map((feature, index) => (
          <div
            className={`group relative flex flex-col gap-3 border-b border-dashed p-6 transition-colors hover:bg-accent/30 sm:p-8 ${
              index % 2 === 0 ? "lg:border-r" : ""
            } ${index >= features.length - 2 ? "lg:border-b-0" : ""}`}
            key={feature.number}
          >
            <span
              className={`inline-flex w-fit rounded-[2px] border px-2 py-0.5 font-mono text-xs ${feature.bg} ${feature.border} ${feature.accent}`}
            >
              {feature.number}
            </span>
            <h3 className="font-f37-stout text-xl">{feature.title}</h3>
            <p className="max-w-md text-balance text-muted-foreground text-sm leading-relaxed">
              {feature.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {feature.tags.map((tag) => (
                <span
                  className="rounded-[2px] border border-dashed px-2 py-0.5 font-mono text-muted-foreground text-xs"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
