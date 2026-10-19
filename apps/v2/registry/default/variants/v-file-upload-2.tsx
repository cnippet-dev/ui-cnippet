// title: Avatar upload with preview
"use client";

import { UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  FileUpload,
  FileUploadTrigger,
  useFileUpload,
} from "@/registry/default/ui/file-upload";

function AvatarPreview() {
  const { files } = useFileUpload();
  const [url, setUrl] = useState<string>();
  const file = files[0];

  useEffect(() => {
    if (!file) {
      setUrl(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted text-muted-foreground">
      {url ? (
        <img alt="New avatar" className="size-full object-cover" src={url} />
      ) : (
        <UserIcon aria-hidden="true" className="size-6" />
      )}
    </div>
  );
}

function RemoveButton() {
  const { files, clearFiles } = useFileUpload();
  if (files.length === 0) return null;
  return (
    <Button onClick={clearFiles} size="sm" variant="ghost">
      Remove
    </Button>
  );
}

export default function Particle() {
  return (
    <FileUpload
      accept="image/png,image/jpeg,image/webp"
      className="w-fit flex-row items-center gap-4"
      maxSize={1024 * 1024}
    >
      <AvatarPreview />
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <FileUploadTrigger size="sm">Upload photo</FileUploadTrigger>
          <RemoveButton />
        </div>
        <p className="text-muted-foreground text-xs">
          PNG, JPG or WebP. Max 1 MB.
        </p>
      </div>
    </FileUpload>
  );
}
