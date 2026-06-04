"use client";

import { PaperclipIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/registry/default/ui/button";

export function Pattern() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name ?? null);
  };

  const handleClear = () => {
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <input
        accept="image/*,.pdf,.doc,.docx"
        className="sr-only"
        id="file-upload"
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />
      <Button onClick={() => inputRef.current?.click()} variant="outline">
        <PaperclipIcon className="size-4" />
        {fileName ? "Change file" : "Attach file"}
      </Button>
      {fileName && (
        <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm">
          <PaperclipIcon className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="max-w-45 truncate">{fileName}</span>
          <button
            aria-label="Remove file"
            className="ml-1 text-muted-foreground hover:text-foreground"
            onClick={handleClear}
            type="button"
          >
            <XIcon className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
