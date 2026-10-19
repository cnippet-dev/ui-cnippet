// title: Multi-file dropzone with type, size and count limits
"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/registry/default/ui/alert";
import {
  type FileRejectReason,
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
} from "@/registry/default/ui/file-upload";

const MAX_SIZE = 2 * 1024 * 1024;

const REASONS: Record<FileRejectReason, string> = {
  count: "only 4 files are allowed",
  size: "it's over 2 MB",
  type: "only images and PDFs are allowed",
};

export default function Particle() {
  const [error, setError] = useState<string | null>(null);

  return (
    <FileUpload
      accept="image/*,.pdf"
      className="max-w-md"
      maxFiles={4}
      maxSize={MAX_SIZE}
      multiple
      onFileReject={(file, reason) =>
        setError(`${file.name} wasn't added: ${REASONS[reason]}.`)
      }
      onValueChange={() => setError(null)}
    >
      <FileUploadDropzone>
        <p className="font-medium text-sm">
          Drop files here or{" "}
          <span className="text-primary underline underline-offset-4">
            browse
          </span>
        </p>
        <p className="text-muted-foreground text-xs">
          Images or PDF, up to 4 files, 2 MB each
        </p>
      </FileUploadDropzone>
      {error && (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <FileUploadList />
    </FileUpload>
  );
}
