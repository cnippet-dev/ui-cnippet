"use client";

import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/default/ui/combobox";

interface Font {
  label: string;
  value: string;
  category: "sans" | "serif" | "mono";
}

const fonts: Font[] = [
  { category: "sans", label: "Inter", value: "inter" },
  { category: "sans", label: "Geist", value: "geist" },
  { category: "sans", label: "DM Sans", value: "dm-sans" },
  { category: "serif", label: "Lora", value: "lora" },
  { category: "serif", label: "Playfair Display", value: "playfair" },
  { category: "mono", label: "Geist Mono", value: "geist-mono" },
  { category: "mono", label: "JetBrains Mono", value: "jetbrains" },
  { category: "mono", label: "Fira Code", value: "fira-code" },
];

const groups = [
  {
    id: "sans",
    items: fonts.filter((f) => f.category === "sans"),
    label: "Sans-serif",
  },
  {
    id: "serif",
    items: fonts.filter((f) => f.category === "serif"),
    label: "Serif",
  },
  {
    id: "mono",
    items: fonts.filter((f) => f.category === "mono"),
    label: "Monospace",
  },
];

export default function Particle() {
  const [value, setValue] = useState<Font | null>(fonts[0] ?? null);

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Combobox
        items={fonts}
        onValueChange={(v) => setValue(v as Font | null)}
        value={value}
      >
        <ComboboxTrigger
          render={
            <Button
              className="w-full justify-between font-normal"
              variant="outline"
            />
          }
        >
          <ComboboxValue placeholder="Select font..." />
          <ChevronsUpDownIcon className="-me-1!" />
        </ComboboxTrigger>
        <ComboboxPopup>
          <ComboboxInput placeholder="Search fonts..." showTrigger={false} />
          <ComboboxEmpty>No fonts found.</ComboboxEmpty>
          <ComboboxList>
            {groups.map((group, i) => (
              <ComboboxGroup items={group.items} key={group.id}>
                {i > 0 && <ComboboxSeparator />}
                <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                {(font: Font) => (
                  <ComboboxItem key={font.value} value={font}>
                    <span
                      className={
                        font.category === "mono"
                          ? "font-mono text-sm"
                          : "text-sm"
                      }
                    >
                      {font.label}
                    </span>
                  </ComboboxItem>
                )}
              </ComboboxGroup>
            ))}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
      {value && (
        <p
          className={`text-muted-foreground text-sm ${value.category === "mono" ? "font-mono" : ""}`}
        >
          The quick brown fox jumps over the lazy dog.
        </p>
      )}
    </div>
  );
}
