"use client";

import { useState } from "react";

import { Field } from "@/registry/default/ui/field";
import { Label } from "@/registry/default/ui/label";
import { Textarea } from "@/registry/default/ui/textarea";

export function Pattern() {
  const [length, setLength] = useState(0);

  return (
    <Field className="w-full max-w-xs">
      <Label className="justify-between" htmlFor="label-counter">
        Bio
        <span className="text-muted-foreground">{length}/200</span>
      </Label>
      <Textarea
        id="label-counter"
        maxLength={200}
        onChange={(e) => setLength(e.target.value.length)}
        placeholder="Tell us about yourself…"
      />
    </Field>
  );
}
