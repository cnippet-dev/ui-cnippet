//biome-ignore-all lint/style/noNonNullAssertion:<>
"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { FullWidthBorder } from "@/components/layout/full-width-border";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";
import { Pattern as SettingsCard } from "@/registry/default/variants/v-accordion-9";
import CalendarRange from "@/registry/default/variants/v-calendar-3";
import { Pattern as StatsGrid } from "@/registry/default/variants/v-card-20";
import { Pattern as ReadMore } from "@/registry/default/variants/v-collapsible-8";
import { Pattern as IncidentTimeline } from "@/registry/default/variants/v-collapsible-10";
import MultiCombobox from "@/registry/default/variants/v-combobox-8";
import { Pattern as FeedbackForm } from "@/registry/default/variants/v-form-10";
import { Pattern as ForgotPassword } from "@/registry/default/variants/v-form-11";
import NewsletterInline from "@/registry/default/variants/v-input-group-18";
import { Pattern as SystemMeters } from "@/registry/default/variants/v-meter-12";

interface ThemeTokens {
  primary: string;
  primaryForeground: string;
  ring: string;
}

interface Preset {
  name: string;
  swatch: string;
  light: ThemeTokens;
  dark: ThemeTokens;
}

const PRESETS: Preset[] = [
  {
    dark: {
      primary: "var(--color-neutral-100)",
      primaryForeground: "var(--color-neutral-800)",
      ring: "var(--color-neutral-500)",
    },
    light: {
      primary: "var(--color-neutral-800)",
      primaryForeground: "var(--color-neutral-50)",
      ring: "var(--color-neutral-400)",
    },
    name: "Default",
    swatch: "#262626",
  },
  {
    dark: {
      primary: "var(--color-blue-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-blue-400)",
    },
    light: {
      primary: "var(--color-blue-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-blue-400)",
    },
    name: "Blue",
    swatch: "#2563eb",
  },
  {
    dark: {
      primary: "var(--color-violet-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-violet-400)",
    },
    light: {
      primary: "var(--color-violet-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-violet-400)",
    },
    name: "Violet",
    swatch: "#7c3aed",
  },
  {
    dark: {
      primary: "var(--color-rose-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-rose-400)",
    },
    light: {
      primary: "var(--color-rose-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-rose-400)",
    },
    name: "Rose",
    swatch: "#e11d48",
  },
  {
    dark: {
      primary: "var(--color-orange-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-orange-400)",
    },
    light: {
      primary: "var(--color-orange-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-orange-400)",
    },
    name: "Orange",
    swatch: "#ea580c",
  },
  {
    dark: {
      primary: "var(--color-emerald-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-emerald-400)",
    },
    light: {
      primary: "var(--color-emerald-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-emerald-400)",
    },
    name: "Emerald",
    swatch: "#059669",
  },
  {
    dark: {
      primary: "var(--color-teal-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-teal-400)",
    },
    light: {
      primary: "var(--color-teal-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-teal-400)",
    },
    name: "Teal",
    swatch: "#0d9488",
  },
  {
    dark: {
      primary: "var(--color-amber-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-amber-400)",
    },
    light: {
      primary: "var(--color-amber-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-amber-400)",
    },
    name: "Amber",
    swatch: "#d97706",
  },
];

const RADIUS_OPTIONS = [
  { label: "None", value: 0 },
  { label: "SM", value: 0.25 },
  { label: "MD", value: 0.5 },
  { label: "LG", value: 0.625 },
  { label: "XL", value: 1 },
];

const STYLE_TAG_ID = "cnippet-home-theme";

function buildCSS(preset: Preset, radius: number): string {
  const { light, dark } = preset;
  return `
:root {
  --radius: ${radius}rem;
  --primary: ${light.primary};
  --primary-foreground: ${light.primaryForeground};
  --ring: ${light.ring};
}
.dark {
  --primary: ${dark.primary};
  --primary-foreground: ${dark.primaryForeground};
  --ring: ${dark.ring};
}`.trim();
}

export function HomeThemes() {
  const [colorName, setColorName] = useState("Default");
  const [radius, setRadius] = useState(0.625);

  const preset = PRESETS.find((p) => p.name === colorName) ?? PRESETS[0]!;

  useEffect(() => {
    let el = document.getElementById(STYLE_TAG_ID) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_TAG_ID;
      document.head.appendChild(el);
    }
    el.textContent = buildCSS(preset, radius);
    return () => {
      document.getElementById(STYLE_TAG_ID)?.remove();
    };
  }, [preset, radius]);

  return (
    <section className="relative pt-12" suppressHydrationWarning>
      <FullWidthBorder className="top-0" />

      <div className="flex items-end justify-between gap-4 px-4 pb-10">
        <div className="flex flex-col gap-2">
          <p className="font-medium font-mono text-cnippet-green text-sm">
            [themes · color & radius]
          </p>
          <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
            Make it yours.
          </h2>
          <p className="max-w-sm text-muted-foreground text-sm leading-relaxed">
            Switch colors and border radius to preview how every component
            adapts in real time.
          </p>
        </div>

        <Popover>
          <PopoverTrigger className="hidden shrink-0 cursor-pointer items-center gap-1.5 rounded-[2px] border border-dashed px-3 py-1.5 font-mono text-muted-foreground text-xs transition-colors hover:text-cnippet-green md:flex">
            <SlidersHorizontal className="size-3" />
            Customize · <span className="text-foreground">{colorName}</span>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-72" sideOffset={8}>
            <div className="space-y-5">
              <div>
                <p className="mb-2.5 font-mono text-muted-foreground text-xs">
                  Color
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      className={cn(
                        "flex h-7 cursor-pointer items-center gap-1.5 rounded-[2px] border px-2.5 font-mono text-xs transition-all",
                        colorName === p.name
                          ? "border-foreground/20 bg-foreground/5 font-medium"
                          : "border-transparent text-muted-foreground hover:border-foreground/10 hover:bg-foreground/4",
                      )}
                      key={p.name}
                      onClick={() => setColorName(p.name)}
                      type="button"
                    >
                      <span
                        className="block size-2.5 shrink-0 rounded-full ring-1 ring-black/10 dark:ring-white/10"
                        style={{ backgroundColor: p.swatch }}
                      />
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2.5 font-mono text-muted-foreground text-xs">
                  Radius
                </p>
                <div className="flex gap-1.5">
                  {RADIUS_OPTIONS.map((r) => (
                    <button
                      className={cn(
                        "flex h-7 cursor-pointer items-center rounded-[2px] border px-2.5 font-mono text-xs transition-all",
                        radius === r.value
                          ? "border-foreground/20 bg-foreground/5 font-medium"
                          : "border-transparent text-muted-foreground hover:border-foreground/10 hover:bg-foreground/4",
                      )}
                      key={r.label}
                      onClick={() => setRadius(r.value)}
                      type="button"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Mobile customize button */}
      <div className="flex px-4 pb-6 md:hidden">
        <Popover>
          <PopoverTrigger className="flex cursor-pointer items-center gap-1.5 rounded-[2px] border border-dashed px-3 py-1.5 font-mono text-muted-foreground text-xs transition-colors hover:text-cnippet-green">
            <SlidersHorizontal className="size-3" />
            Customize · <span className="text-foreground">{colorName}</span>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72" sideOffset={8}>
            <div className="space-y-5">
              <div>
                <p className="mb-2.5 font-mono text-muted-foreground text-xs">
                  Color
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      className={cn(
                        "flex h-7 cursor-pointer items-center gap-1.5 rounded-[2px] border px-2.5 font-mono text-xs transition-all",
                        colorName === p.name
                          ? "border-foreground/20 bg-foreground/5 font-medium"
                          : "border-transparent text-muted-foreground hover:border-foreground/10 hover:bg-foreground/4",
                      )}
                      key={p.name}
                      onClick={() => setColorName(p.name)}
                      type="button"
                    >
                      <span
                        className="block size-2.5 shrink-0 rounded-full ring-1 ring-black/10 dark:ring-white/10"
                        style={{ backgroundColor: p.swatch }}
                      />
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2.5 font-mono text-muted-foreground text-xs">
                  Radius
                </p>
                <div className="flex gap-1.5">
                  {RADIUS_OPTIONS.map((r) => (
                    <button
                      className={cn(
                        "flex h-7 cursor-pointer items-center rounded-[2px] border px-2.5 font-mono text-xs transition-all",
                        radius === r.value
                          ? "border-foreground/20 bg-foreground/5 font-medium"
                          : "border-transparent text-muted-foreground hover:border-foreground/10 hover:bg-foreground/4",
                      )}
                      key={r.label}
                      onClick={() => setRadius(r.value)}
                      type="button"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <FullWidthBorder className="relative" />

      <div className="grid grid-cols-2 items-start gap-6 p-4 py-10 lg:grid-cols-4">
        <div className="grid grid-cols-1 gap-10">
          <SettingsCard />
          <CalendarRange />
        </div>
        <div className="space-y-10">
          <StatsGrid />
          <SystemMeters />
          <NewsletterInline />
        </div>
        <div className="space-y-10">
          <IncidentTimeline />
          <ForgotPassword />
        </div>
        <div className="space-y-10">
          <ReadMore />
          <MultiCombobox />
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}
