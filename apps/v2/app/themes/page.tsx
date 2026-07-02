import { BarChart3, Palette, SlidersHorizontal, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { CornerPlus } from "@/components/layout/corner-plus";
import { Footer } from "@/components/layout/footer";
import { TopBar } from "@/components/layout/topbar";
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
    color: "orange",
    icon: Palette,
    label: "color presets",
    value: "8",
  },
  {
    color: "blue",
    icon: BarChart3,
    label: "chart types",
    value: "6",
  },
  {
    color: "green",
    icon: SlidersHorizontal,
    label: "radius options",
    value: "5",
  },
  {
    color: "yellow",
    icon: Zap,
    label: "instant preview",
    value: "Live",
  },
] as const;

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

const STAT_COLORS = {
  blue: {
    bar: "bg-cnippet-blue",
    hover: "hover:bg-cnippet-blue/5",
    icon: "text-cnippet-blue",
    value: "text-cnippet-blue",
  },
  green: {
    bar: "bg-cnippet-green",
    hover: "hover:bg-cnippet-green/5",
    icon: "text-cnippet-green",
    value: "text-cnippet-green",
  },
  orange: {
    bar: "bg-cnippet-orange",
    hover: "hover:bg-cnippet-orange/5",
    icon: "text-cnippet-orange",
    value: "text-cnippet-orange",
  },
  yellow: {
    bar: "bg-cnippet-yellow",
    hover: "hover:bg-cnippet-yellow/5",
    icon: "text-cnippet-yellow",
    value: "text-cnippet-yellow",
  },
} as const;

export default function ThemesPage() {
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
          <div className="relative border-b border-dashed pt-16">
            <CornerPlus className="left-0 -translate-x-1/2" />
            <CornerPlus className="right-0 translate-x-1/2" />

            {/* Content */}
            <div className="grid grid-cols-1 gap-10 px-8 pt-14 pb-16 lg:grid-cols-12 lg:gap-6 lg:px-12">
              <div className="lg:col-span-7">
                {/* Label pill */}
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-[2px] border border-cnippet-green/40 border-dashed bg-cnippet-green/5 px-3 py-1.5">
                  <span className="size-1.5 animate-pulse rounded-full bg-cnippet-green" />
                  <span className="font-medium font-mono text-cnippet-green text-xs tracking-wide">
                    themes · color & radius
                  </span>
                </div>

                {/* Heading */}
                <h1 className="font-f37-stout text-[40px] leading-[1.0] tracking-tight sm:text-[52px] lg:text-9xl">
                  Make it
                  <br />
                  <span className="text-cnippet-green">yours.</span>
                </h1>
              </div>

              {/* Right rail — description + live preview cluster */}
              <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:border-l lg:border-dashed lg:pl-8">
                <p className="max-w-sm text-balance font-mono text-muted-foreground text-sm leading-relaxed">
                  Switch colors, chart palettes and border radius. Preview
                  changes live across every component below, then copy the CSS
                  straight into your project.
                </p>

                <div className="space-y-6">
                  {/* Preset swatches */}
                  <div>
                    <p className="mb-2.5 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                      8 presets
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_SWATCHES.map((hex) => (
                        <span
                          className="block size-4 rounded-full ring-1 ring-foreground/10"
                          key={hex}
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Radius preview */}
                  <div>
                    <p className="mb-2.5 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                      5 radius options
                    </p>
                    <div className="flex items-end gap-3">
                      {RADIUS_PREVIEW.map((r) => (
                        <div
                          className="flex flex-col items-center gap-1.5"
                          key={r.label}
                        >
                          <span
                            className="size-8 border border-cnippet-green/50 border-dashed bg-cnippet-green/5"
                            style={{ borderRadius: r.radius }}
                          />
                          <span className="font-mono text-[9px] text-muted-foreground uppercase">
                            {r.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat strip */}
            <div className="relative border-t border-dashed">
              <div className="flex items-center gap-2 border-b border-dashed px-6 py-2.5">
                <span className="size-1 rounded-full bg-muted-foreground/40" />
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                  quick specs
                </span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-dashed sm:grid-cols-4">
                {STATS.map((stat) => {
                  const Icon = stat.icon;
                  const c = STAT_COLORS[stat.color];
                  return (
                    <div
                      className={cn(
                        "group relative flex flex-col gap-2 px-6 py-5 transition-colors duration-200",
                        c.hover,
                      )}
                      key={stat.label}
                    >
                      <span
                        className={cn(
                          "absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                          c.bar,
                        )}
                      />
                      <Icon
                        className={cn("size-4", c.icon)}
                        strokeWidth={1.75}
                      />
                      <span
                        className={cn(
                          "font-f37-stout text-3xl leading-none",
                          c.value,
                        )}
                      >
                        {stat.value}
                      </span>
                      <span className="font-mono text-muted-foreground text-xs">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Showcase */}
          <div className="relative px-4 py-10 lg:px-6">
            <CornerPlus className="left-0 -translate-x-1/2" />
            <CornerPlus className="right-0 translate-x-1/2" />
            <NuqsAdapter>
              <Suspense>
                <ThemesShowcase />
              </Suspense>
            </NuqsAdapter>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
