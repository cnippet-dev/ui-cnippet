"use client";

import { RotateCcwIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/default/ui/number-field";

const DEFAULT_VALUE = 50;

export function Pattern() {
  const [value, setValue] = useState(DEFAULT_VALUE);

  return (
    <div className="flex items-center gap-2">
      <NumberField
        onValueChange={(v) => setValue(v ?? DEFAULT_VALUE)}
        value={value}
      >
        <NumberFieldScrubArea label="Volume" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <Button
        aria-label="Reset to default"
        onClick={() => setValue(DEFAULT_VALUE)}
        size="icon"
        variant="ghost"
      >
        <RotateCcwIcon className="size-4" />
      </Button>
    </div>
  );
}
