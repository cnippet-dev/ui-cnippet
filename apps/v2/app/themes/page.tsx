import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { Frame, FramePanel } from "@/components/signal/frame";
import { PageHero } from "@/components/signal/page-hero";
import { Rule } from "@/components/signal/rule";
import { CONTAINER } from "@/components/signal/section";
import { SiteShell } from "@/components/site/site-shell";
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
    <SiteShell>
      <PageHero
        aside={
          <Frame>
            <FramePanel className="flex flex-col gap-6 p-5">
              <div>
                <p className="mb-3 font-mono text-[11px] text-faint">
                  {"// 8 color presets"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_SWATCHES.map((hex) => (
                    <span
                      className="block size-6 rounded-full ring-1 ring-black/10 ring-inset dark:ring-white/15"
                      key={hex}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 font-mono text-[11px] text-faint">
                  {"// 5 radius options"}
                </p>
                <div className="flex items-end gap-3">
                  {RADIUS_PREVIEW.map((r) => (
                    <div
                      className="flex flex-col items-center gap-1.5"
                      key={r.label}
                    >
                      <span
                        className="size-10 border border-signal/40 bg-signal-soft"
                        style={{ borderRadius: r.radius }}
                      />
                      <span className="font-mono text-[11px] text-faint">
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FramePanel>
          </Frame>
        }
        kicker="themes"
        lead="Switch colors, chart palettes and border radius. Watch every component below adapt, then copy the CSS straight into your project."
        stats={[
          { label: "color presets", value: "8" },
          { label: "chart palettes", value: "6" },
          { label: "radius options", value: "5" },
          { label: "preview", value: "Live" },
        ]}
        title={
          <>
            Make it <em>yours.</em>
          </>
        }
      />

      <section className="scroll-mt-(--header-height)" id="editor">
        <Rule />
        <div className={cn(CONTAINER, "pt-10 pb-16 md:pb-24")}>
          <NuqsAdapter>
            <Suspense>
              <ThemesShowcase />
            </Suspense>
          </NuqsAdapter>
        </div>
      </section>
    </SiteShell>
  );
}
