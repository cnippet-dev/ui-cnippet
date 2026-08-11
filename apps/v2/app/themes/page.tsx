import { BarChart3, Palette, SlidersHorizontal, Zap } from "lucide-react";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { ThemesShowcase } from "@/components/themes/themes-showcase";
import { cn } from "@/lib/utils";

const themesDescription =
  "Customise Cnippet UI design tokens — primary color and border radius — and preview changes live across components. Copy the CSS snippet to use in your project.";

const PRESET_SWATCHES = [
  "#262626",
  "#2563eb",
  "#7c3aed",
  "#e11d48",
  "#ea580c",
  "#059669",
  "#0d9488",
  "#d97706",
];

const RADIUS_PREVIEW = [
  { label: "none", radius: 0 },
  { label: "sm", radius: 4 },
  { label: "md", radius: 8 },
  { label: "lg", radius: 10 },
  { label: "xl", radius: 16 },
];

const STATS = [
  {
    accent: "text-cnippet-orange",
    icon: Palette,
    label: "color presets",
    value: "8",
  },
  {
    accent: "text-cnippet-blue",
    icon: BarChart3,
    label: "chart types",
    value: "6",
  },
  {
    accent: "text-cnippet-green",
    icon: SlidersHorizontal,
    label: "radius options",
    value: "5",
  },
  {
    accent: "text-cnippet-yellow",
    icon: Zap,
    label: "instant preview",
    value: "Live",
  },
];

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
    <div className="min-h-svh">
      <div className="mx-auto w-full max-w-7xl border-x border-dashed bg-background">
        <SiteHeader />

        <main className="flex flex-1 flex-col">
          {/* Hero section */}
          <div className="border-b border-dashed">
            {/* Eyebrow rail — sticks just below the navbar while the hero is in view */}
            <div className="sticky top-14 z-40 flex items-center justify-start gap-3 border-b border-dashed bg-background px-5 py-4 sm:gap-4 sm:px-8">
              <span className="font-mono text-[11px] text-cnippet-green tracking-[0.18em]">
                01
              </span>
              <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                theme editor · live preview
              </span>
            </div>

            <div className="grid lg:grid-cols-12">
              {/* Heading block */}
              <div className="flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:col-span-7 lg:border-r lg:border-dashed lg:py-24">
                <h1 className="font-f37-stout text-[44px] leading-[1.02] tracking-tight sm:text-[60px] lg:text-[72px]">
                  Make it
                  <br />
                  <span className="text-cnippet-green">yours.</span>
                </h1>
                <p className="mt-6 max-w-md text-[15px] text-muted-foreground leading-relaxed">
                  Switch colors, chart palettes and border radius. Preview
                  changes live across every component below, then copy the CSS
                  straight into your project.
                </p>
              </div>

              {/* Right rail — token previews */}
              <div className="flex flex-col justify-center gap-10 border-t border-dashed px-5 py-10 sm:px-8 lg:col-span-5 lg:border-t-0 lg:py-12">
                {/* Preset swatches */}
                <div>
                  <p className="mb-3 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                    8 color presets
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_SWATCHES.map((hex) => (
                      <span
                        className="block size-5 rounded-full ring-1 ring-foreground/10"
                        key={hex}
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Radius preview */}
                <div>
                  <p className="mb-3 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                    5 radius options
                  </p>
                  <div className="flex items-end gap-3">
                    {RADIUS_PREVIEW.map((r) => (
                      <div
                        className="flex flex-col items-center gap-1.5"
                        key={r.label}
                      >
                        <span
                          className="size-9 border border-cnippet-green/50 border-dashed bg-cnippet-green/5"
                          style={{ borderRadius: r.radius }}
                        />
                        <span className="font-mono text-[10px] text-muted-foreground uppercase">
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
              <span className="font-mono text-[11px] text-cnippet-green tabular-nums tracking-[0.18em]">
                02
              </span>
              <h2 className="font-mono text-[11px] text-foreground uppercase tracking-[0.18em]">
                customise & preview
              </h2>
              <span className="ml-auto hidden font-mono text-[11px] text-muted-foreground tracking-[0.18em] sm:inline">
                [color · radius · copy css]
              </span>
            </div>

            <div className="px-5 pb-14 sm:px-8">
              <NuqsAdapter>
                <Suspense>
                  <ThemesShowcase />
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
