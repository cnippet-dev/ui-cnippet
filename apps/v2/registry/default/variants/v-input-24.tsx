"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

// Brand colours are user data, so they stay as hex values.
const swatches = [
  "#0f172a",
  "#2563eb",
  "#0891b2",
  "#059669",
  "#65a30d",
  "#ca8a04",
  "#ea580c",
  "#dc2626",
  "#db2777",
  "#9333ea",
];

const HEX = /^#[0-9a-f]{6}$/i;

export function Pattern() {
  const [color, setColor] = useState("#2563eb");
  const [draft, setDraft] = useState(color);

  const pick = (next: string) => {
    setColor(next);
    setDraft(next);
  };

  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-color">Brand color</FieldLabel>
      <Popover>
        <PopoverTrigger
          id="input-color"
          render={
            <Button
              className="w-full justify-start font-normal"
              variant="outline"
            />
          }
        >
          <span
            aria-hidden="true"
            className="size-4 rounded-sm border border-black/10"
            style={{ backgroundColor: color }}
          />
          <span className="font-mono uppercase">{color}</span>
        </PopoverTrigger>
        <PopoverPopup align="start" className="w-60">
          <div className="grid grid-cols-5 gap-2">
            {swatches.map((swatch) => (
              <button
                aria-label={swatch}
                aria-pressed={swatch === color}
                className="flex aspect-square items-center justify-center rounded-md border border-black/10 text-white outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
                key={swatch}
                onClick={() => pick(swatch)}
                style={{ backgroundColor: swatch }}
                type="button"
              >
                {swatch === color && <CheckIcon className="size-4" />}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-8 shrink-0 rounded-md border border-black/10"
              style={{ backgroundColor: HEX.test(draft) ? draft : color }}
            />
            <Input
              aria-label="Hex value"
              className="font-mono uppercase"
              maxLength={7}
              onBlur={() => setDraft(color)}
              onChange={(e) => {
                setDraft(e.target.value);
                if (HEX.test(e.target.value)) setColor(e.target.value);
              }}
              value={draft}
            />
          </div>
        </PopoverPopup>
      </Popover>
      <FieldDescription>
        Choose the primary color for your workspace theme.
      </FieldDescription>
    </Field>
  );
}
