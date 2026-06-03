"use client";

import { XIcon } from "lucide-react";
import { useState } from "react";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  const [value, setValue] = useState("Alex Rivera");

  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="input-clearable">Full name</FieldLabel>
      <div className="relative">
        <Input
          className={value ? "pe-9" : ""}
          id="input-clearable"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your full name"
          type="text"
          value={value}
        />
        {value && (
          <button
            aria-label="Clear input"
            className="absolute inset-e-0 inset-y-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-colors hover:text-foreground focus-visible:ring-2"
            onClick={() => setValue("")}
            type="button"
          >
            <XIcon aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>
    </Field>
  );
}
