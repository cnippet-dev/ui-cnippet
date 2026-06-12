import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { ExploreShowcase } from "@/components/explore/explore-showcase";
import { SiteHeader } from "@/components/site-header";
import {
  isPlaceholderMotionVariant,
  isPlaceholderVariant,
} from "@/lib/variants";
import { motionVariants } from "@/registry/registry-motion-variants";
import { variants } from "@/registry/registry-variants";

const exploreDescription =
  "Explore all Cnippet UI component variants with live previews. Copy source code or view it inline.";

export const metadata: Metadata = {
  description: exploreDescription,
  openGraph: {
    description: exploreDescription,
    title: "Explore Components",
    url: "https://ui.cnippet.dev/explore",
  },
  title: "Explore Components",
  twitter: {
    description: exploreDescription,
    title: "Explore Components",
  },
};

export default function ExplorePage() {
  const variantEntries = variants
    .filter((v) => !isPlaceholderVariant(v.name))
    .map((v) => ({
      category: v.categories?.[0] ?? "other",
      description: v.description ?? v.name,
      name: v.name,
    }));

  const categories = Array.from(new Set(variantEntries.map((v) => v.category)));

  const SCROLL_ANIM_CATEGORIES = new Set([
    "scroll reveal",
    "scroll progress",
    "scroll velocity text",
    "parallax floating",
    "stacking cards",
    "progressive blur",
  ]);

  const allMotionEntries = motionVariants
    .filter((v) => !isPlaceholderMotionVariant(v.name))
    .map((v) => ({
      category: v.categories?.[0] ?? "other",
      description: v.description ?? v.name,
      name: v.name,
    }));

  const textAnimEntries = allMotionEntries.filter(
    (v) => !SCROLL_ANIM_CATEGORIES.has(v.category),
  );
  const scrollAnimEntries = allMotionEntries.filter((v) =>
    SCROLL_ANIM_CATEGORIES.has(v.category),
  );

  const textAnimCategories = Array.from(
    new Set(textAnimEntries.map((v) => v.category)),
  );
  const scrollAnimCategories = Array.from(
    new Set(scrollAnimEntries.map((v) => v.category)),
  );

  const total =
    variantEntries.length + textAnimEntries.length + scrollAnimEntries.length;
  const componentCount =
    categories.length + textAnimCategories.length + scrollAnimCategories.length;

  return (
    <>
      <SiteHeader />
      <div className="grid grid-cols-1 [--gutter-width:2.5rem] md:-mx-4 md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-xl))_var(--gutter-width)] lg:mx-auto">
        <div className="col-start-1 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />

        <main className="min-w-0 pb-24">
          <div className="relative flex h-16 items-end whitespace-pre px-2 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 sm:h-24 dark:text-white/40 dark:after:bg-white/10">
            {total} variants · {componentCount} components
          </div>

          <div className="relative before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
            <h1 className="px-2 text-4xl tracking-tighter max-sm:px-4 sm:text-5xl lg:text-6xl">
              Explore
            </h1>
          </div>

          <div className="relative px-2 py-3 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 dark:text-white/40 dark:after:bg-white/10">
            Browse every component variant. Copy the source or open it in the
            code viewer.
          </div>

          <div className="px-0 pt-8 max-sm:px-0">
            <NuqsAdapter>
              <Suspense>
                <ExploreShowcase
                  categories={categories}
                  scrollAnimCategories={scrollAnimCategories}
                  scrollAnimVariants={scrollAnimEntries}
                  textAnimCategories={textAnimCategories}
                  textAnimVariants={textAnimEntries}
                  variants={variantEntries}
                />
              </Suspense>
            </NuqsAdapter>
          </div>
        </main>

        <div className="col-start-3 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />
      </div>
    </>
  );
}
