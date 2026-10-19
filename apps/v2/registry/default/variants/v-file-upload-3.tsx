// title: Dropzone with per-file upload progress
"use client";

import { CheckCircle2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
} from "@/registry/default/ui/file-upload";

const key = (file: File) => `${file.name}-${file.size}-${file.lastModified}`;

export default function Particle() {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  // Fake upload: each new file climbs to 100% at its own pace.
  useEffect(() => {
    const pending = files.filter((f) => (progress[key(f)] ?? 0) < 100);
    if (pending.length === 0) return;
    const id = setTimeout(() => {
      setProgress((prev) => {
        const next = { ...prev };
        for (const f of pending) {
          next[key(f)] = Math.min(
            100,
            (next[key(f)] ?? 0) + 8 + Math.random() * 12,
          );
        }
        return next;
      });
    }, 300);
    return () => clearTimeout(id);
  }, [files, progress]);

  return (
    <FileUpload
      className="max-w-md"
      multiple
      onValueChange={setFiles}
      value={files}
    >
      <FileUploadDropzone />
      <FileUploadList>
        {(file) => {
          const value = progress[key(file)] ?? 0;
          const done = value >= 100;
          return (
            <FileUploadItem file={file} progress={done ? undefined : value}>
              <FileUploadItemPreview file={file} />
              <FileUploadItemMetadata file={file} />
              {done ? (
                <CheckCircle2Icon
                  aria-label="Uploaded"
                  className="size-4 text-success-foreground"
                />
              ) : (
                <span className="text-muted-foreground text-xs tabular-nums">
                  {Math.round(value)}%
                </span>
              )}
              <FileUploadItemDelete file={file} />
            </FileUploadItem>
          );
        }}
      </FileUploadList>
    </FileUpload>
  );
}
