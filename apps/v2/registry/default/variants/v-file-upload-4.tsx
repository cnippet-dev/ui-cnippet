// title: Message composer with attachments
"use client";

import { ArrowUpIcon, PaperclipIcon, XIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  FileUpload,
  FileUploadTrigger,
  useFileUpload,
} from "@/registry/default/ui/file-upload";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/registry/default/ui/input-group";

function Attachments() {
  const { files, removeFile } = useFileUpload();
  if (files.length === 0) return null;
  return (
    <InputGroupAddon align="block-start" className="flex-wrap gap-1.5">
      {files.map((file) => (
        <span
          className="flex max-w-48 items-center gap-1 rounded-md border bg-muted/50 py-0.5 ps-2 pe-0.5 text-foreground text-xs"
          key={`${file.name}-${file.lastModified}`}
        >
          <span className="truncate">{file.name}</span>
          <Button
            aria-label={`Remove ${file.name}`}
            onClick={() => removeFile(file)}
            size="icon-xs"
            variant="ghost"
          >
            <XIcon aria-hidden="true" />
          </Button>
        </span>
      ))}
    </InputGroupAddon>
  );
}

export default function Particle() {
  return (
    <FileUpload className="max-w-md" maxFiles={5} multiple>
      <InputGroup>
        <Attachments />
        <InputGroupTextarea aria-label="Message" placeholder="Write a reply…" />
        <InputGroupAddon align="block-end">
          <FileUploadTrigger
            aria-label="Attach files"
            className="rounded-full"
            size="icon-sm"
            variant="ghost"
          >
            <PaperclipIcon aria-hidden="true" />
          </FileUploadTrigger>
          <Button
            aria-label="Send"
            className="ml-auto rounded-full"
            size="icon-sm"
          >
            <ArrowUpIcon aria-hidden="true" />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </FileUpload>
  );
}
