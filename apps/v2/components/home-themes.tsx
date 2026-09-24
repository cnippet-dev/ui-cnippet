//biome-ignore-all lint/style/noNonNullAssertion:<>
"use client";

import { useEffect, useState } from "react";
import { Frame } from "@/components/signal/frame";
import { SignalSection } from "@/components/signal/section";
import { cn } from "@/lib/utils";
import { Pattern as SettingsCard } from "@/registry/default/variants/v-accordion-9";
import CalendarRange from "@/registry/default/variants/v-calendar-3";
import { Pattern as StatsGrid } from "@/registry/default/variants/v-card-20";
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
    <SignalSection
      id="themes"
      index="04"
      kicker="theming"
      lead="Every component reads the same handful of CSS variables. Change the colour and radius here — the whole page follows, live."
      title={
        <>
          Make it <em>unmistakably yours.</em>
        </>
      }
    >
      {/* Toolbar — inline controls instead of a hidden popover. */}
      <Frame className="mb-6">
        <div className="flex flex-col gap-3 px-3 py-2 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 font-mono text-[11px] text-faint">
              {"// color"}
            </span>
            <div className="no-scrollbar flex gap-1 overflow-x-auto">
              {PRESETS.map((p) => (
                <button
                  aria-pressed={colorName === p.name}
                  className={cn(
                    "flex h-8 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-2.5 text-[13px] transition-colors duration-150",
                    colorName === p.name
                      ? "bg-background font-medium text-foreground shadow-xs/5 ring-1 ring-border"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  key={p.name}
                  onClick={() => setColorName(p.name)}
                  type="button"
                >
                  <span
                    className="block size-3 shrink-0 rounded-full ring-1 ring-black/10 ring-inset dark:ring-white/15"
                    style={{ backgroundColor: p.swatch }}
                  />
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="shrink-0 font-mono text-[11px] text-faint">
              {"// radius"}
            </span>
            <div className="flex gap-1">
              {RADIUS_OPTIONS.map((r) => (
                <button
                  aria-pressed={radius === r.value}
                  className={cn(
                    "flex h-8 cursor-pointer items-center rounded-lg px-2.5 font-mono text-[12px] transition-colors duration-150",
                    radius === r.value
                      ? "bg-background text-foreground shadow-xs/5 ring-1 ring-border"
                      : "text-muted-foreground hover:text-foreground",
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
      </Frame>

      <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="grid min-w-0 grid-cols-1 gap-6">
          <SettingsCard />
          <CalendarRange />
          <NewsletterInline />
        </div>
        <div className="min-w-0 space-y-6">
          <StatsGrid />
          <MultiCombobox />
          <ForgotPassword />
          <SystemMeters />
        </div>
        <div className="min-w-0 space-y-6">
          <IncidentTimeline />
          <FeedbackForm />
        </div>
      </div>
    </SignalSection>
  );
}
