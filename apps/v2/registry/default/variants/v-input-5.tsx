"use client";

import { useState } from "react";

import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  const [value, setValue] = useState("");
  const maxLength = 50;

  return (
    <Field className="max-w-sm">
      <div className="flex w-full items-center justify-between">
        <FieldLabel htmlFor="bio">Description</FieldLabel>
        <span className="text-muted-foreground text-xs">
          {value.length}/{maxLength}
        </span>
      </div>
      <Input
        id="bio"
        maxLength={maxLength}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Description of your project"
        value={value}
      />
    </Field>
  );
}
