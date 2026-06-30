import Link from "next/link";
import { FullWidthBorder } from "@/components/layout/full-width-border";

const products = [
  {
    accent: "text-cnippet-orange",
    bg: "bg-cnippet-orange/5 dark:bg-cnippet-orange/10",
    border: "border-cnippet-orange/20",
    count: "100+",
    description:
      "57 core components and 40 motion animations — copy them into your project and own the code completely. No npm package to fight, no lock-in.",
    href: "/explore",
    items: [
      "Button",
      "Dialog",
      "Select",
      "Tabs",
      "Badge",
      "Motion",
      "Card",
      "Tooltip",
    ],
    label: "components",
    title: "UI",
  },
  {
    accent: "text-cnippet-blue",
    bg: "bg-cnippet-blue/5 dark:bg-cnippet-blue/10",
    border: "border-cnippet-blue/20",
    count: "50+",
    description:
      "Pre-built sections, full pages, and templates — drop in, customize the copy, and ship. Days saved, not hours.",
    href: "/blocks",
    items: ["Hero", "Pricing", "Features", "Testimonials", "Footer", "CTA"],
    label: "blocks",
    title: "Blocks",
  },
  {
    accent: "text-cnippet-green",
    bg: "bg-cnippet-green/5 dark:bg-cnippet-green/10",
    border: "border-cnippet-green/20",
    count: "20+",
    description:
      "Implementation guides for Next.js — auth, CMS, payments, email, i18n, and more. Everything we've learned from shipping real products.",
    href: "/docs/introduction",
    items: ["Auth", "CMS", "Email", "Payments", "Analytics", "i18n"],
    label: "guides",
    title: "Next",
  },
  {
    accent: "text-cnippet-yellow",
    bg: "bg-cnippet-yellow/5 dark:bg-cnippet-yellow/10",
    border: "border-cnippet-yellow/20",
    count: "10+",
    description:
      "Admin panel UI — CMS, CRM, and LMS dashboards built on Cnippet UI. Production-ready, fully typed, easy to extend.",
    href: "/docs/introduction",
    items: ["DataTable", "Charts", "Sidebar", "Stats", "Forms", "Filters"],
    label: "dashboards",
    title: "Dashboard",
  },
];

export function Works() {
  return (
    <section className="relative pt-12">
      <FullWidthBorder className="top-0" />
      <div className="flex items-end justify-between gap-4 px-4 pb-10">
        <div className="flex flex-col gap-2">
          <p className="font-medium font-mono text-cnippet-orange text-sm">
            [our products]
          </p>
          <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
            Tools we build with.
            <br />
            Shared with developers.
          </h2>
        </div>
        <Link
          className="hidden shrink-0 rounded-[2px] border border-dashed px-3 py-1.5 font-mono text-muted-foreground text-xs transition-colors hover:text-foreground md:inline-flex"
          href="/explore"
        >
          View all components →
        </Link>
      </div>

      <div className="relative grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
        <FullWidthBorder className="top-0" />
        {products.map((product, index) => (
          <Link
            className={`group flex flex-col gap-5 border-b border-dashed p-6 transition-colors hover:bg-accent/20 sm:p-8 lg:border-b-0 ${
              index < products.length - 1 ? "lg:border-r" : ""
            } ${index % 2 === 0 ? "sm:border-r" : ""}`}
            href={product.href}
            key={product.title}
          >
            <div
              className={`flex items-end justify-between rounded-[2px] border p-4 ${product.bg} ${product.border}`}
            >
              <span
                className={`font-f37-stout text-4xl leading-none ${product.accent}`}
              >
                {product.count}
              </span>
              <span className="font-mono text-muted-foreground/60 text-xs">
                {product.label}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-f37-stout text-xl">{product.title}</h3>
              <p className="text-balance text-muted-foreground text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-auto flex flex-wrap gap-1.5">
              {product.items.map((name) => (
                <span
                  className="rounded-[2px] border border-dashed px-2 py-0.5 font-mono text-muted-foreground text-xs"
                  key={name}
                >
                  {name}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-dashed px-6 py-4 sm:px-8">
        <p className="font-mono text-muted-foreground/60 text-xs">
          also open-source →
        </p>
        {[
          {
            desc: "Prisma → admin panel",
            href: "https://helm.cnippet.dev",
            label: "HELM",
          },
          {
            desc: "OG image generator",
            href: "https://metanip.cnippet.dev",
            label: "Metanip",
          },
          {
            desc: "Cloudinary manager",
            href: "https://cdn.cnippet.dev",
            label: "CDN",
          },
        ].map((tool) => (
          <Link
            className="group flex items-center gap-2 transition-colors"
            href={tool.href}
            key={tool.label}
            rel="noopener"
            target="_blank"
          >
            <span className="font-medium font-mono text-xs transition-colors group-hover:text-foreground">
              {tool.label}
            </span>
            <span className="font-mono text-muted-foreground/50 text-xs">
              — {tool.desc}
            </span>
          </Link>
        ))}
      </div>

      <div className="px-4 pt-4 md:hidden">
        <Link
          className="rounded-[2px] border border-dashed px-3 py-1.5 font-mono text-muted-foreground text-xs transition-colors hover:text-foreground"
          href="/explore"
        >
          View all components →
        </Link>
      </div>
    </section>
  );
}
