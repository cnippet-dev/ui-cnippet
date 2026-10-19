// title: Photo gallery grid
"use client";

import { ImagePlusIcon } from "lucide-react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItemDelete,
  FileUploadItemPreview,
  useFileUpload,
} from "@/registry/default/ui/file-upload";

const MAX_PHOTOS = 6;

function Gallery() {
  const { files } = useFileUpload();
  return (
    <div className="grid grid-cols-3 gap-2">
      {files.map((file) => (
        <div className="relative" key={`${file.name}-${file.lastModified}`}>
          <FileUploadItemPreview
            className="aspect-square size-auto w-full rounded-lg"
            file={file}
          />
          <FileUploadItemDelete
            className="absolute end-1 top-1 bg-background/80 backdrop-blur-sm"
            file={file}
            size="icon-xs"
          />
        </div>
      ))}
      {files.length < MAX_PHOTOS && (
        <FileUploadDropzone className="aspect-square gap-1 rounded-lg p-2">
          <ImagePlusIcon aria-hidden="true" className="size-5 opacity-72" />
          <span className="text-muted-foreground text-xs">
            {files.length}/{MAX_PHOTOS}
          </span>
        </FileUploadDropzone>
      )}
    </div>
  );
}

export default function Particle() {
  return (
    <FileUpload
      accept="image/*"
      className="max-w-xs"
      maxFiles={MAX_PHOTOS}
      multiple
    >
      <div className="flex flex-col gap-1">
        <p className="font-medium text-sm">Listing photos</p>
        <p className="text-muted-foreground text-xs">
          The first photo is the cover. Up to {MAX_PHOTOS}.
        </p>
      </div>
      <Gallery />
    </FileUpload>
  );
}
