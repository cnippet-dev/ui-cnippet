"use client";

import { useId, useState } from "react";
import { Field, FieldDescription } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  const [value, setValue] = useState("existing@taken.com");
  const id = useId();
  const hasError = value.length > 0 && value.includes("taken");

  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor={id}>
        Email address
        <span className="text-destructive">*</span>
      </Label>
      <Input
        aria-describedby={hasError ? `${id}-error` : undefined}
        aria-invalid={hasError}
        className={
          hasError ? "border-destructive focus-visible:ring-destructive/20" : ""
        }
        id={id}
        onChange={(e) => setValue(e.target.value)}
        type="email"
        value={value}
      />
      {hasError && (
        <FieldDescription className="text-destructive" id={`${id}-error`}>
          This email is already registered.
        </FieldDescription>
      )}
    </Field>
  );
}
