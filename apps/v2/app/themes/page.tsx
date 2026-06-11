import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { ThemesShowcase } from "@/components/themes/themes-showcase";

const themesDescription =
  "Customise Cnippet UI design tokens — primary color and border radius — and preview changes live across components. Copy the CSS snippet to use in your project.";

export const metadata: Metadata = {
  description: themesDescription,
  openGraph: {
    description: themesDescription,
    title: "Themes",
    url: "https://ui.cnippet.dev/themes",
  },
  title: "Themes",
  twitter: {
    description: themesDescription,
    title: "Themes",
  },
};

export default function ThemesPage() {
  return (
    <>
      <SiteHeader />
      <div className="grid grid-cols-1 [--gutter-width:2.5rem] md:-mx-4 md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-xl))_var(--gutter-width)] lg:mx-auto">
        <div className="col-start-1 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />

        <main className="min-w-0 pb-24">
          <div className="relative flex h-16 items-end whitespace-pre px-2 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 sm:h-24 dark:text-white/40 dark:after:bg-white/10">
            8 presets · 6 chart types · customize & export
          </div>

          <div className="relative before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
            <h1 className="px-2 text-4xl tracking-tighter max-sm:px-4 sm:text-5xl lg:text-6xl">
              Themes
            </h1>
          </div>

          <div className="relative px-2 py-3 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 dark:text-white/40 dark:after:bg-white/10">
            Pick a color preset and radius. Changes apply live across the page.
            Copy the CSS snippet into your project.
          </div>

          <NuqsAdapter>
            <Suspense>
              <ThemesShowcase />
            </Suspense>
          </NuqsAdapter>
        </main>

        <div className="col-start-3 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />
      </div>
    </>
  );
}
