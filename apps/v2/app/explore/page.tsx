import type { Metadata } from "next";
import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { ExploreShowcase } from "@/components/explore/explore-showcase";
import { Footer } from "@/components/layout/footer";
import { TopBar } from "@/components/layout/topbar";
import { Background } from "@/components/ui/background";
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
    <div className="relative flex min-h-svh flex-col overflow-clip">
      <TopBar>
        <Link
          className="inline-flex h-8 items-center justify-center rounded-[2px] border border-transparent bg-primary px-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          href="/docs/introduction"
        >
          Get started
        </Link>
      </TopBar>

      <main className="flex flex-1 flex-col">
        <div className="container-wrapper mx-auto">
          {/* Hero section */}
          <div className="relative overflow-hidden border-b border-dashed pt-16">
            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-background to-transparent" />

            {/* Background */}
            <div className="absolute inset-0 z-0">
              <Background
                accentColorVar="--cnippet-blue"
                className="absolute inset-0 z-0"
                fieldOpacity={0.1}
                interactive={true}
                pointerTrail={true}
                pointerTrailIntensity={0.4}
                pointerTrailRadius={0.2}
                speed={0.75}
              />
            </div>

            {/* Content */}
            <div className="relative z-20 px-8 pt-14 pb-16 lg:px-12 lg:pt-16">
              {/* Label pill */}
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-[2px] border border-cnippet-blue/40 border-dashed bg-cnippet-blue/5 px-3 py-1.5">
                <span className="size-1.5 animate-pulse rounded-full bg-cnippet-blue" />
                <span className="font-medium font-mono text-cnippet-blue text-xs tracking-wide">
                  {total} variants · {componentCount} components
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-f37-stout text-[40px] leading-[1.0] tracking-tight sm:text-[52px] lg:text-[60px]">
                Explore
                <br />
                <span className="text-cnippet-blue">Components.</span>
              </h1>

              {/* Description */}
              <p className="mt-5 max-w-md text-balance font-mono text-muted-foreground text-sm leading-relaxed">
                Browse every component variant. Copy the source or open it in
                the code viewer.
              </p>
            </div>

            {/* Stat strip */}
            <div className="relative z-20 grid grid-cols-2 divide-x divide-dashed border-t border-dashed sm:grid-cols-4">
              <div className="group relative flex flex-col gap-1 px-6 py-5 transition-colors duration-200 hover:bg-cnippet-orange/5">
                <span className="absolute inset-x-0 top-0 h-px bg-cnippet-orange opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="font-f37-stout text-3xl text-cnippet-orange leading-none">
                  {variantEntries.length}
                </span>
                <span className="mt-1 font-mono text-muted-foreground text-xs">
                  core variants
                </span>
              </div>
              <div className="group relative flex flex-col gap-1 px-6 py-5 transition-colors duration-200 hover:bg-cnippet-blue/5">
                <span className="absolute inset-x-0 top-0 h-px bg-cnippet-blue opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="font-f37-stout text-3xl text-cnippet-blue leading-none">
                  {textAnimEntries.length + scrollAnimEntries.length}
                </span>
                <span className="mt-1 font-mono text-muted-foreground text-xs">
                  motion variants
                </span>
              </div>
              <div className="group relative flex flex-col gap-1 px-6 py-5 transition-colors duration-200 hover:bg-cnippet-green/5">
                <span className="absolute inset-x-0 top-0 h-px bg-cnippet-green opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="font-f37-stout text-3xl text-cnippet-green leading-none">
                  {componentCount}
                </span>
                <span className="mt-1 font-mono text-muted-foreground text-xs">
                  components
                </span>
              </div>
              <div className="group relative flex flex-col gap-1 px-6 py-5 transition-colors duration-200 hover:bg-cnippet-yellow/5">
                <span className="absolute inset-x-0 top-0 h-px bg-cnippet-yellow opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="font-f37-stout text-3xl text-cnippet-yellow leading-none">
                  {total}
                </span>
                <span className="mt-1 font-mono text-muted-foreground text-xs">
                  total variants
                </span>
              </div>
            </div>
          </div>

          {/* Showcase */}
          <div className="px-8 py-10 lg:px-12">
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

      <Footer />
    </div>
  );
}
