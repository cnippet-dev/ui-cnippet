"use client";

import * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Input } from "@/registry/default/ui/input";
import { Slider } from "@/registry/default/ui/slider";

type Hsv = { h: number; s: number; v: number };

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** Parses "#rgb" or "#rrggbb" (the # is optional). Returns null when invalid. */
export function hexToHsv(hex: string): Hsv | null {
  const match = HEX_PATTERN.exec(hex.trim());
  if (!match?.[1]) return null;
  const digits =
    match[1].length === 3 ? [...match[1]].map((c) => c + c).join("") : match[1];
  const [r, g, b] = [0, 2, 4].map(
    (i) => Number.parseInt(digits.slice(i, i + 2), 16) / 255,
  ) as [number, number, number];
  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);
  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d + 6) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
  }
  return { h: h * 60, s: max ? d / max : 0, v: max };
}

/** Returns a lowercase "#rrggbb". */
export function hsvToHex({ h, s, v }: Hsv): string {
  const channel = (n: number) => {
    const k = (n + h / 60) % 6;
    const c = v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return Math.round(c * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(5)}${channel(3)}${channel(1)}`;
}

type ColorPickerContextValue = {
  hsv: Hsv;
  hex: string;
  disabled: boolean;
  setHsv: (hsv: Hsv) => void;
  setHex: (hex: string) => void;
};

const ColorPickerContext = React.createContext<ColorPickerContextValue | null>(
  null,
);

export function useColorPicker(): ColorPickerContextValue {
  const context = React.useContext(ColorPickerContext);
  if (!context) {
    throw new Error("ColorPicker parts must be used within <ColorPicker>.");
  }
  return context;
}

export function ColorPicker({
  value: valueProp,
  defaultValue = "#3b82f6",
  onValueChange,
  disabled = false,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "defaultValue"> & {
  /** Hex colour, e.g. "#3b82f6". */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}): React.ReactElement {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const hex = (valueProp ?? internalValue).toLowerCase();
  // HSV is kept in state so the hue survives greys and black, which have no hue in hex.
  const [hsv, setHsvState] = React.useState<Hsv>(
    () => hexToHsv(hex) ?? { h: 0, s: 0, v: 0 },
  );
  if (hsvToHex(hsv) !== hex) {
    const next = hexToHsv(hex);
    if (next) setHsvState(next.s && next.v ? next : { ...next, h: hsv.h });
  }

  const commit = (nextHsv: Hsv) => {
    setHsvState(nextHsv);
    const nextHex = hsvToHex(nextHsv);
    if (nextHex === hex) return;
    if (valueProp === undefined) setInternalValue(nextHex);
    onValueChange?.(nextHex);
  };

  const setHex = (next: string) => {
    const parsed = hexToHsv(next);
    if (parsed) commit(parsed.s && parsed.v ? parsed : { ...parsed, h: hsv.h });
  };

  return (
    <ColorPickerContext.Provider
      value={{ disabled, hex, hsv, setHex, setHsv: commit }}
    >
      <div
        className={cn(
          "flex w-full flex-col gap-3 data-disabled:pointer-events-none data-disabled:opacity-64",
          className,
        )}
        data-disabled={disabled || undefined}
        data-slot="color-picker"
        {...props}
      />
    </ColorPickerContext.Provider>
  );
}

const clamp = (n: number) => Math.min(Math.max(n, 0), 1);

/** Saturation (x) and brightness (y) for the current hue. Arrow keys move 1%, Shift moves 10%. */
export function ColorPickerArea({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  const { hsv, setHsv, disabled } = useColorPicker();
  const ref = React.useRef<HTMLDivElement>(null);

  const moveTo = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setHsv({
      h: hsv.h,
      s: clamp((e.clientX - rect.left) / rect.width),
      v: clamp(1 - (e.clientY - rect.top) / rect.height),
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 0.1 : 0.01;
    const delta: Record<string, [number, number]> = {
      ArrowDown: [0, -step],
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, step],
    };
    const d = delta[e.key];
    if (!d) return;
    e.preventDefault();
    setHsv({ h: hsv.h, s: clamp(hsv.s + d[0]), v: clamp(hsv.v + d[1]) });
  };

  return (
    <div
      className={cn(
        "relative h-40 w-full touch-none select-none rounded-lg",
        className,
      )}
      data-slot="color-picker-area"
      onPointerDown={(e) => {
        if (disabled) return;
        // Stops the mousedown default from moving focus off the thumb we focus below.
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e);
        ref.current?.querySelector<HTMLElement>("[role=slider]")?.focus();
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) moveTo(e);
      }}
      ref={ref}
      style={{
        backgroundColor: `hsl(${hsv.h} 100% 50%)`,
        backgroundImage:
          "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
      }}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-black/8 ring-inset dark:ring-white/8" />
      <div
        aria-label="Saturation and brightness"
        aria-valuetext={`Saturation ${Math.round(hsv.s * 100)}%, brightness ${Math.round(hsv.v * 100)}%`}
        className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgb(0_0_0/0.24),0_1px_3px_rgb(0_0_0/0.24)] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/48"
        onKeyDown={onKeyDown}
        role="slider"
        style={{
          backgroundColor: hsvToHex(hsv),
          left: `${hsv.s * 100}%`,
          top: `${(1 - hsv.v) * 100}%`,
        }}
        tabIndex={disabled ? -1 : 0}
      />
    </div>
  );
}

export function ColorPickerHue({
  className,
  ...props
}: Omit<
  React.ComponentProps<typeof Slider>,
  "value" | "defaultValue" | "onValueChange" | "min" | "max"
>): React.ReactElement {
  const { hsv, setHsv, disabled } = useColorPicker();
  return (
    <Slider
      aria-label="Hue"
      className={cn(
        "**:data-[slot=slider-track]:h-3 **:data-[slot=slider-indicator]:bg-transparent **:data-[slot=slider-track]:before:bg-[linear-gradient(to_right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)]",
        className,
      )}
      data-slot="color-picker-hue"
      disabled={disabled}
      max={360}
      min={0}
      onValueChange={(v) =>
        setHsv({ ...hsv, h: Array.isArray(v) ? (v[0] ?? 0) : v })
      }
      value={[Math.round(hsv.h)]}
      {...props}
    />
  );
}

/** Hex text field. Typed values apply once they parse, so half-typed input never jumps the colour. */
export function ColorPickerInput({
  className,
  ...props
}: Omit<
  React.ComponentProps<typeof Input>,
  "value" | "defaultValue" | "onChange"
>): React.ReactElement {
  const { hex, setHex, disabled } = useColorPicker();
  const [draft, setDraft] = React.useState(hex);
  const [focused, setFocused] = React.useState(false);

  return (
    <Input
      aria-label="Hex colour"
      className={cn("font-mono", className)}
      data-slot="color-picker-input"
      disabled={disabled}
      maxLength={7}
      onBlur={() => setFocused(false)}
      onChange={(e) => {
        setDraft(e.target.value);
        if (/^#?[0-9a-f]{6}$/i.test(e.target.value)) setHex(e.target.value);
      }}
      onFocus={() => {
        setDraft(hex);
        setFocused(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") setHex(draft);
      }}
      spellCheck={false}
      value={focused ? draft : hex}
      {...props}
    />
  );
}

export function ColorPickerSwatches({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex flex-wrap gap-1.5", className)}
      data-slot="color-picker-swatches"
      {...props}
    />
  );
}

export function ColorPickerSwatch({
  value,
  className,
  ...props
}: Omit<React.ComponentProps<"button">, "value"> & {
  /** Hex colour this swatch selects. */
  value: string;
}): React.ReactElement {
  const { hex, setHex, disabled } = useColorPicker();
  const selected = hex === value.toLowerCase();

  return (
    <button
      aria-label={value}
      aria-pressed={selected}
      className={cn(
        "size-6 shrink-0 cursor-pointer rounded-md shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)] outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-pressed:ring-2 aria-pressed:ring-foreground aria-pressed:ring-offset-2 aria-pressed:ring-offset-background",
        className,
      )}
      data-slot="color-picker-swatch"
      disabled={disabled}
      onClick={() => setHex(value)}
      style={{ backgroundColor: value }}
      type="button"
      {...props}
    />
  );
}
