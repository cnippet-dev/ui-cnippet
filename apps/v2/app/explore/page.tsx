import { Blocks, Component, Hash, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { ExploreShowcase } from "@/components/explore/explore-showcase";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { cn } from "@/lib/utils";
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

  const STATS = [
    {
      accent: "text-cnippet-orange",
      icon: Blocks,
      label: "core variants",
      value: variantEntries.length,
    },
    {
      accent: "text-cnippet-blue",
      icon: Sparkles,
      label: "motion variants",
      value: textAnimEntries.length + scrollAnimEntries.length,
    },
    {
      accent: "text-cnippet-green",
      icon: Component,
      label: "components",
      value: componentCount,
    },
    {
      accent: "text-cnippet-yellow",
      icon: Hash,
      label: "total variants",
      value: total,
    },
  ];

  return (
    <div className="min-h-svh">
      <div className="mx-auto w-full max-w-7xl border-x border-dashed bg-background">
        <SiteHeader />

        <main className="flex flex-1 flex-col">
          {/* Hero section — centered index statement, intentionally minimal */}
          <div className="border-b border-dashed">
            {/* Eyebrow rail — sticks just below the navbar while the hero is in view */}
            <div className="sticky top-14 z-40 flex items-center justify-start gap-3 border-b border-dashed bg-background px-5 py-4 sm:gap-4 sm:px-8">
              <span className="font-mono text-[11px] text-cnippet-blue tracking-[0.18em]">
                01
              </span>
              <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                component explorer · live previews
              </span>
            </div>

            {/* Centered statement */}
            <div className="flex flex-col items-center px-5 py-20 text-center sm:py-24 lg:py-28">
              <span className="rounded-[2px] border border-dashed px-3 py-1 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                {total} variants · {componentCount} components
              </span>
              <h1 className="mt-8 font-f37-stout text-[44px] leading-[1.02] tracking-tight sm:text-[64px] lg:text-[76px]">
                The full <span className="text-cnippet-blue">index.</span>
              </h1>
              <p className="mt-6 max-w-md text-[15px] text-muted-foreground leading-relaxed">
                Every variant in the library, rendered live below. Scan,
                preview, and copy the source — nothing hidden behind docs.
              </p>
            </div>

            {/* Stat ticker strip */}
            <div className="grid grid-cols-2 border-t border-dashed sm:grid-cols-4">
              {STATS.map((stat, index) => (
                <div
                  className={cn(
                    "flex items-baseline justify-center gap-2.5 border-dashed px-4 py-4",
                    index % 2 === 1 && "border-l",
                    index > 1 && "border-t sm:border-t-0",
                    index === 2 && "sm:border-l",
                  )}
                  key={stat.label}
                >
                  <stat.icon
                    aria-hidden="true"
                    className={cn("size-3.5 self-center", stat.accent)}
                  />
                  <span
                    className={cn(
                      "font-f37-stout text-xl tabular-nums",
                      stat.accent,
                    )}
                  >
                    {stat.value}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.14em]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Showcase */}
          <div>
            {/* Eyebrow rail — sticks just below the navbar while the showcase is in view */}
            <div className="sticky top-14 z-40 flex items-center gap-3 border-b border-dashed bg-background px-5 py-4 sm:gap-4 sm:px-8">
              <span className="font-mono text-[11px] text-cnippet-blue tabular-nums tracking-[0.18em]">
                02
              </span>
              <h2 className="font-mono text-[11px] text-foreground uppercase tracking-[0.18em]">
                browse the library
              </h2>
              <span className="ml-auto hidden font-mono text-[11px] text-muted-foreground tracking-[0.18em] sm:inline">
                [filter · search · copy]
              </span>
            </div>

            <div className="px-5 pb-14 sm:px-8">
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
          </div>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
