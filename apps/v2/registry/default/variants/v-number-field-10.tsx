"use client";

import { useState } from "react";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/default/ui/number-field";

export default function Particle() {
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <NumberField
        max={48}
        min={8}
        onValueChange={(value) => {
          if (value !== null) setFontSize(value);
        }}
        step={1}
        value={fontSize}
      >
        <NumberFieldScrubArea label="Font size (px)" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <div className="rounded-lg border bg-muted/30 px-4 py-3">
        <p className="text-foreground leading-snug" style={{ fontSize }}>
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </div>
  );
}
