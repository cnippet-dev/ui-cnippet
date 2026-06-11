//biome-ignore-all lint/style/noNonNullAssertion:<>
"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
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
    <div className="px-2 max-sm:px-4" suppressHydrationWarning>
      {/* Label bar */}
      <div className="relative flex h-16 items-end whitespace-pre font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 sm:h-24 dark:text-white/40 dark:after:bg-white/10">
        Themes · color & radius
      </div>

      {/* Heading */}
      <div className="relative before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
        <h2 className="text-balance text-4xl tracking-tighter max-lg:font-medium sm:text-5xl lg:text-6xl xl:text-7xl">
          Make it yours.
        </h2>
      </div>

      {/* Subtitle */}
      <div className="relative mt-5 font-mono text-black/40 tracking-tighter before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:text-white/40 dark:after:bg-white/10">
        Switch colors and border radius to preview how every component adapts in
        real time.
      </div>

      {/* Controls row */}
      <div className="relative mt-10 flex items-center justify-between py-3 before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] before:bg-gray-950/5 after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10 dark:before:bg-white/10">
        <span className="font-mono text-black/40 text-xs tracking-tighter dark:text-white/40">
          {colorName} ·{" "}
          {RADIUS_OPTIONS.find((r) => r.value === radius)?.label ?? "LG"} radius
        </span>

        <Popover>
          <PopoverTrigger className="flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-950/10 bg-transparent px-3 py-1.5 font-mono text-black/60 text-xs transition-colors hover:border-gray-950/20 hover:text-black dark:border-white/10 dark:text-white/50 dark:hover:border-white/20 dark:hover:text-white">
            <SlidersHorizontal className="size-3" />
            Customize
          </PopoverTrigger>

          <PopoverContent align="end" className="w-72" sideOffset={8}>
            <div className="space-y-5">
              {/* Color */}
              <div>
                <p className="mb-2.5 font-mono text-black/40 text-xs tracking-tighter dark:text-white/40">
                  Color
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      className={cn(
                        "flex h-7 cursor-pointer items-center gap-1.5 rounded-full border px-2.5 font-mono text-xs transition-all",
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

              {/* Radius */}
              <div>
                <p className="mb-2.5 font-mono text-black/40 text-xs tracking-tighter dark:text-white/40">
                  Radius
                </p>
                <div className="flex gap-1.5">
                  {RADIUS_OPTIONS.map((r) => (
                    <button
                      className={cn(
                        "flex h-7 cursor-pointer items-center rounded-full border px-2.5 font-mono text-xs transition-all",
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

      {/* Component grid */}
      <div className="grid grid-cols-2 items-start gap-6 py-10 lg:grid-cols-4">
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
    </div>
  );
}
