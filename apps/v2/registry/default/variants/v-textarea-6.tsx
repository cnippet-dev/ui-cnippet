"use client";

import { useCallback, useRef, useState } from "react";

import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Textarea } from "@/registry/default/ui/textarea";

const MAX_CHARS = 280;

export function Pattern() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (newValue.length <= MAX_CHARS) {
        setValue(newValue);
      }

      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    },
    [],
  );

  const remaining = MAX_CHARS - value.length;
  const isNearLimit = remaining <= 20;
  const isAtLimit = remaining === 0;

  return (
    <div className="mx-auto w-full max-w-xs">
      <Field className="w-full">
        <div className="flex w-full items-center justify-between">
          <FieldLabel htmlFor="auto-resize-textarea">Bio</FieldLabel>
          <span
            className={`text-xs tabular-nums ${
              isAtLimit
                ? "font-semibold text-destructive"
                : isNearLimit
                  ? "text-warning"
                  : "text-muted-foreground"
            }`}
          >
            {value.length}/{MAX_CHARS}
          </span>
        </div>
        <Textarea
          className="resize-none overflow-hidden"
          id="auto-resize-textarea"
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          ref={textareaRef}
          rows={2}
          value={value}
        />
      </Field>
    </div>
  );
}
