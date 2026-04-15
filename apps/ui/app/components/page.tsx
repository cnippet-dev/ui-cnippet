import type { Metadata } from "next";
import Link from "next/link";
import { ComponentsShowcase } from "@/components/components-page/components-showcase";
import { totalComponents } from "@/components/components-page/registry";
import SiteHeader from "@/components/shared/header/site-header";

export const metadata: Metadata = {
  description:
    "Browse all Cnippet UI components with live previews and variant switchers. Accessible React components built on Base UI and Tailwind CSS.",
  title: "Components",
};

export default function ComponentsPage() {
  return (
    <>
      <SiteHeader />
      <div className="grid grid-cols-1 [--gutter-width:2.5rem] md:-mx-4 md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-xl))_var(--gutter-width)] lg:mx-auto">
        {/* Left gutter */}
        <div className="col-start-1 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />

        {/* Main content */}
        <main className="min-w-0 pb-24">
          {/* Eyebrow */}
          <div className="relative flex h-16 items-end whitespace-pre px-2 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 sm:h-24 dark:text-white/40 dark:after:bg-white/10">
            {totalComponents} components · 9 categories
          </div>

          {/* Title */}
          <div className="relative before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
            <h1 className="px-2 text-4xl tracking-tighter max-sm:px-4 sm:text-5xl lg:text-6xl">
              Component Library
            </h1>
          </div>

          {/* Description */}
          <div className="relative px-2 py-3 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 dark:text-white/40 dark:after:bg-white/10">
            Accessible, composable React components built on{" "}
            <a
              className="underline underline-offset-2"
              href="https://base-ui.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Base UI
            </a>{" "}
            and Tailwind CSS.{" "}
            <Link
              className="underline underline-offset-2"
              href="/docs/introduction"
            >
              Read the docs →
            </Link>
          </div>

          {/* Component showcase */}
          <div className="px-2 pt-12 max-sm:px-4">
            <ComponentsShowcase />
          </div>
        </main>

        {/* Right gutter */}
        <div className="col-start-3 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />
      </div>
    </>
  );
}
