"use client";

import { PaperclipIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";

export function Pattern() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleClear = () => {
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-file">Attachment</FieldLabel>
      <input
        className="sr-only"
        id="input-demo-file"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        ref={inputRef}
        type="file"
      />
      <div className="flex w-full items-center gap-2 rounded-lg border bg-background p-1 shadow-xs/5 dark:bg-input/32">
        <Button
          onClick={() => inputRef.current?.click()}
          size="sm"
          variant="secondary"
        >
          <PaperclipIcon aria-hidden="true" />
          Choose file
        </Button>
        <span
          className="min-w-0 flex-1 truncate text-sm data-[empty=true]:text-muted-foreground"
          data-empty={!fileName}
        >
          {fileName ?? "No file selected"}
        </span>
        {fileName && (
          <Button
            aria-label="Remove file"
            onClick={handleClear}
            size="icon-sm"
            variant="ghost"
          >
            <XIcon aria-hidden="true" />
          </Button>
        )}
      </div>
    </Field>
  );
}
