// title: Resume dropzone with file validation
"use client";

import { FileTextIcon, UploadIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";

const ACCEPT = [".pdf", ".doc", ".docx"];
const MAX_BYTES = 5 * 1024 * 1024;

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Particle() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const accept = (next: File | undefined) => {
    if (!next) return;
    const ext = next.name.slice(next.name.lastIndexOf(".")).toLowerCase();
    if (!ACCEPT.includes(ext)) {
      setError("Upload a PDF or Word document.");
      return;
    }
    if (next.size > MAX_BYTES) {
      setError("That file is over 5 MB.");
      return;
    }
    setError(null);
    setFile(next);
  };

  const clear = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Field className="w-full max-w-sm" invalid={!!error}>
      <FieldLabel htmlFor="resume-upload">Resume</FieldLabel>
      <input
        accept={ACCEPT.join(",")}
        className="sr-only"
        id="resume-upload"
        onChange={(e) => accept(e.target.files?.[0])}
        ref={inputRef}
        type="file"
      />
      {file ? (
        <div className="flex w-full items-center gap-3 rounded-lg border p-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
            <FileTextIcon aria-hidden="true" className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-sm">{file.name}</p>
            <p className="text-muted-foreground text-xs">
              {formatSize(file.size)}
            </p>
          </div>
          <Button
            aria-label="Remove file"
            onClick={clear}
            size="icon-sm"
            variant="ghost"
          >
            <XIcon aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <button
          className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed px-4 py-6 text-center outline-none transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring data-[dragging=true]:border-primary data-[dragging=true]:bg-primary/4"
          data-dragging={dragging}
          onClick={() => inputRef.current?.click()}
          onDragLeave={() => setDragging(false)}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            accept(e.dataTransfer.files[0]);
          }}
          type="button"
        >
          <div className="flex size-9 items-center justify-center rounded-full border bg-background">
            <UploadIcon aria-hidden="true" className="size-4 opacity-60" />
          </div>
          <p className="font-medium text-sm">
            Drop your resume here or{" "}
            <span className="text-primary underline underline-offset-4">
              browse
            </span>
          </p>
        </button>
      )}
      <FieldDescription>PDF or Word document, max 5 MB.</FieldDescription>
      <FieldError match={!!error}>{error}</FieldError>
    </Field>
  );
}
