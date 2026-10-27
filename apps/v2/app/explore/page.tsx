import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { ExploreShowcase } from "@/components/explore/explore-showcase";
import { PageHero } from "@/components/signal/page-hero";
import { Rule } from "@/components/signal/rule";
import { CONTAINER } from "@/components/signal/section";
import { SiteShell } from "@/components/site/site-shell";
import { twitterBase } from "@/lib/config";
import { chartSource, motionSource, source } from "@/lib/source";
import {
  isPlaceholderMotionVariant,
  isPlaceholderVariant,
} from "@/lib/variants";
import { motionGroupOf, motionGroups } from "@/registry/motion-groups";
import { chartVariants } from "@/registry/registry-chart-variants";
import { motionVariants } from "@/registry/registry-motion-variants";
import { variants } from "@/registry/registry-variants";

const exploreDescription =
  "Explore all Cnippet UI component variants with live previews. Copy source code or view it inline.";

export const metadata: Metadata = {
  alternates: { canonical: "/explore" },
  description: exploreDescription,
  openGraph: {
    description: exploreDescription,
    title: "Explore Components",
    url: "https://ui.cnippet.dev/explore",
  },
  title: "Explore Components",
  twitter: {
    ...twitterBase,
    description: exploreDescription,
    title: "Explore Components",
  },
};

// Docs URL per component slug (a page's last segment): "button" → "/ui/actions/button".
function docsIndex(src: typeof source) {
  return new Map(src.getPages().map((p) => [p.slugs.at(-1) ?? "", p.url]));
}

// A variant's component is its first registry dependency.
function componentOf(v: { registryDependencies?: string[] }) {
  return v.registryDependencies?.[0]?.replace("@cnippet/", "") ?? "";
}

export default function ExplorePage() {
  const uiDocs = docsIndex(source);
  const motionDocs = docsIndex(motionSource);
  const chartDocs = docsIndex(chartSource);

  // API demos stay in the docs; each component's showcase replaces them here.
  const visibleVariants = variants.filter(
    (v) => v.meta?.role !== "demo" && !isPlaceholderVariant(v.name),
  );
  const categories = Array.from(
    new Set(visibleVariants.map((v) => v.categories?.[0] ?? "other")),
  );
  const order = new Map<string, number>(categories.map((c, i) => [c, i]));
  const variantEntries = visibleVariants
    .map((v) => ({
      category: v.categories?.[0] ?? "other",
      description: v.description ?? v.name,
      docsUrl: uiDocs.get(componentOf(v)),
      name: v.name,
      showcase: v.meta?.role === "showcase",
    }))
    .sort(
      (a, b) =>
        (order.get(a.category) ?? 0) - (order.get(b.category) ?? 0) ||
        Number(b.showcase) - Number(a.showcase),
    )
    .map(({ showcase: _, ...entry }) => entry);

  // A motion variant's group is its parent component's group.
  const motionEntries = motionVariants
    .filter((v) => !isPlaceholderMotionVariant(v.name))
    .map((v) => ({
      category: v.categories?.[0] ?? "other",
      description: v.description ?? v.name,
      docsUrl: motionDocs.get(componentOf(v)),
      groupId: motionGroupOf(componentOf(v))?.id,
      name: v.name,
    }));

  const groups = motionGroups
    .map((g) => {
      const entries = motionEntries
        .filter((v) => v.groupId === g.id)
        .map(({ groupId: _, ...entry }) => entry);
      return {
        categories: Array.from(new Set(entries.map((v) => v.category))),
        id: g.id,
        label: g.label,
        variants: entries,
      };
    })
    .filter((g) => g.variants.length > 0);

  const motionCount = groups.reduce((n, g) => n + g.variants.length, 0);

  // All chart variants share one section; each component is a sub-filter.
  const chartEntries = chartVariants.map((v) => ({
    category: v.categories?.[0] ?? "other",
    description: v.description ?? v.name,
    docsUrl: chartDocs.get(componentOf(v)),
    name: v.name,
  }));
  const sections = [
    ...groups,
    {
      categories: Array.from(new Set(chartEntries.map((v) => v.category))),
      id: "charts",
      label: "Charts",
      variants: chartEntries,
    },
  ];

  const total = variantEntries.length + motionCount + chartEntries.length;

  return (
    <SiteShell>
      <PageHero
        kicker="explore"
        lead="Every variant in the library, rendered live. Scan, preview and copy the source — nothing hidden behind docs."
        stats={[
          { label: "core variants", value: variantEntries.length },
          {
            label: "motion variants",
            value: motionCount,
          },
          { label: "chart variants", value: chartEntries.length },
          { label: "total variants", value: total },
        ]}
        title={
          <>
            The full index, <em>live.</em>
          </>
        }
      />

      {/* Widens --container for the whole page, as the blocks gallery does. */}
      <section
        className="scroll-mt-(--header-height)"
        data-container="wide"
        id="browse"
      >
        <Rule />
        <div className={CONTAINER}>
          <NuqsAdapter>
            <Suspense>
              <ExploreShowcase
                categories={categories}
                groups={sections}
                variants={variantEntries}
              />
            </Suspense>
          </NuqsAdapter>
        </div>
      </section>
    </SiteShell>
  );
}
