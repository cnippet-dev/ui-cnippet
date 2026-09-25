import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { ExploreShowcase } from "@/components/explore/explore-showcase";
import { PageHero } from "@/components/signal/page-hero";
import { Rule } from "@/components/signal/rule";
import { CONTAINER } from "@/components/signal/section";
import { SiteShell } from "@/components/site/site-shell";
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

  return (
    <SiteShell>
      <PageHero
        kicker="explore"
        lead="Every variant in the library, rendered live. Scan, preview and copy the source — nothing hidden behind docs."
        stats={[
          { label: "core variants", value: variantEntries.length },
          {
            label: "motion variants",
            value: textAnimEntries.length + scrollAnimEntries.length,
          },
          { label: "components", value: componentCount },
          { label: "total variants", value: total },
        ]}
        title={
          <>
            The full index, <em>live.</em>
          </>
        }
      />

      <section className="scroll-mt-(--header-height)" id="browse">
        <Rule />
        <div className={cn(CONTAINER, "pt-10 pb-16 md:pb-24")}>
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
      </section>
    </SiteShell>
  );
}
