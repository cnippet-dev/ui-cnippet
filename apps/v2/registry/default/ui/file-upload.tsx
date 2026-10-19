"use client";

import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import { Button, type ButtonProps } from "@/registry/default/ui/button";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/registry/default/ui/progress";

export type FileRejectReason = "type" | "size" | "count";

type FileUploadContextValue = {
  files: File[];
  accept?: string;
  multiple: boolean;
  disabled: boolean;
  dragging: boolean;
  setDragging: (dragging: boolean) => void;
  addFiles: (files: FileList | File[]) => void;
  removeFile: (file: File) => void;
  clearFiles: () => void;
  openFilePicker: () => void;
};

const FileUploadContext = React.createContext<FileUploadContextValue | null>(
  null,
);

export function useFileUpload(): FileUploadContextValue {
  const context = React.useContext(FileUploadContext);
  if (!context) {
    throw new Error("useFileUpload must be used within <FileUpload>.");
  }
  return context;
}

/** True when `file` matches an `accept` string such as "image/*,.pdf". */
export function isFileAccepted(file: File, accept?: string): boolean {
  if (!accept) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
    .some((token) => {
      if (token.startsWith(".")) return name.endsWith(token);
      if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
      return type === token;
    });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export interface FileUploadProps
  extends Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> {
  /** Controlled list of files. */
  value?: File[];
  defaultValue?: File[];
  onValueChange?: (files: File[]) => void;
  /** Called once for each file that fails validation. */
  onFileReject?: (file: File, reason: FileRejectReason) => void;
  /** Same format as the native `accept` attribute, e.g. "image/*,.pdf". */
  accept?: string;
  /** Largest allowed file, in bytes. */
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  /** Passed to the hidden input so the files submit with a form. */
  name?: string;
}

export function FileUpload({
  value,
  defaultValue = [],
  onValueChange,
  onFileReject,
  accept,
  maxSize,
  maxFiles,
  multiple = false,
  disabled = false,
  name,
  className,
  children,
  ...props
}: FileUploadProps): React.ReactElement {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internalFiles, setInternalFiles] =
    React.useState<File[]>(defaultValue);
  const [dragging, setDragging] = React.useState(false);
  const files = value ?? internalFiles;

  const setFiles = (next: File[]) => {
    if (value === undefined) setInternalFiles(next);
    onValueChange?.(next);
  };

  const addFiles = (incoming: FileList | File[]) => {
    if (disabled) return;
    const limit = multiple ? (maxFiles ?? Number.POSITIVE_INFINITY) : 1;
    // A single-file upload replaces its file instead of rejecting the new one.
    const next = multiple ? [...files] : [];
    const rejected: [File, FileRejectReason][] = [];
    for (const file of Array.from(incoming)) {
      if (!isFileAccepted(file, accept)) rejected.push([file, "type"]);
      else if (maxSize !== undefined && file.size > maxSize)
        rejected.push([file, "size"]);
      else if (next.length >= limit) rejected.push([file, "count"]);
      else next.push(file);
    }
    if (next.length !== files.length || next.some((f, i) => f !== files[i])) {
      setFiles(next);
    }
    // After the change, so a "clear errors on change" handler can't swallow them.
    for (const [file, reason] of rejected) onFileReject?.(file, reason);
  };

  const context: FileUploadContextValue = {
    accept,
    addFiles,
    clearFiles: () => setFiles([]),
    disabled,
    dragging,
    files,
    multiple,
    openFilePicker: () => inputRef.current?.click(),
    removeFile: (file) => setFiles(files.filter((f) => f !== file)),
    setDragging,
  };

  return (
    <FileUploadContext.Provider value={context}>
      <div
        className={cn("flex w-full flex-col gap-3", className)}
        data-disabled={disabled || undefined}
        data-slot="file-upload"
        {...props}
      >
        <input
          accept={accept}
          aria-hidden="true"
          className="sr-only"
          disabled={disabled}
          multiple={multiple}
          name={name}
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            // Reset so picking the same file again still fires onChange.
            e.target.value = "";
          }}
          ref={inputRef}
          tabIndex={-1}
          type="file"
        />
        {children}
      </div>
    </FileUploadContext.Provider>
  );
}

export function FileUploadDropzone({
  className,
  children,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  const { disabled, dragging, setDragging, addFiles, openFilePicker } =
    useFileUpload();

  return (
    <div
      aria-disabled={disabled || undefined}
      className={cn(
        "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-8 text-center outline-none transition-colors hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:pointer-events-none data-dragging:border-primary data-dragging:bg-primary/4 data-disabled:opacity-64",
        className,
      )}
      data-disabled={disabled || undefined}
      data-dragging={dragging || undefined}
      data-slot="file-upload-dropzone"
      onClick={openFilePicker}
      onDragLeave={(e) => {
        // Ignore leave events fired when moving between child elements.
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setDragging(false);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        addFiles(e.dataTransfer.files);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openFilePicker();
        }
      }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {children ?? (
        <>
          <div className="flex size-10 items-center justify-center rounded-full border bg-background">
            <UploadIcon aria-hidden="true" className="size-4 opacity-72" />
          </div>
          <p className="font-medium text-sm">
            Drop files here or{" "}
            <span className="text-primary underline underline-offset-4">
              browse
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export function FileUploadTrigger({
  onClick,
  ...props
}: ButtonProps): React.ReactElement {
  const { disabled, openFilePicker } = useFileUpload();
  return (
    <Button
      data-slot="file-upload-trigger"
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        openFilePicker();
      }}
      type="button"
      variant="outline"
      {...props}
    />
  );
}

export function FileUploadList({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"ul">, "children"> & {
  /** Renders each file; defaults to a standard `FileUploadItem`. */
  children?: (file: File) => React.ReactNode;
}): React.ReactElement | null {
  const { files } = useFileUpload();
  if (files.length === 0) return null;

  return (
    <ul
      className={cn("flex flex-col gap-2", className)}
      data-slot="file-upload-list"
      {...props}
    >
      {files.map((file) => (
        <React.Fragment key={`${file.name}-${file.size}-${file.lastModified}`}>
          {children ? children(file) : <FileUploadItem file={file} />}
        </React.Fragment>
      ))}
    </ul>
  );
}

export function FileUploadItem({
  file,
  progress,
  error,
  className,
  children,
  ...props
}: React.ComponentProps<"li"> & {
  file: File;
  /** 0–100 while uploading; omit when there's nothing to show. */
  progress?: number;
  error?: string;
}): React.ReactElement {
  return (
    <li
      className={cn(
        "flex flex-col gap-2 rounded-lg border bg-background p-2.5 data-invalid:border-destructive/36",
        className,
      )}
      data-invalid={error ? true : undefined}
      data-slot="file-upload-item"
      {...props}
    >
      <div className="flex items-center gap-3">
        {children ?? (
          <>
            <FileUploadItemPreview file={file} />
            <FileUploadItemMetadata error={error} file={file} />
            <FileUploadItemDelete file={file} />
          </>
        )}
      </div>
      {progress !== undefined && !error && (
        <Progress aria-label={`Uploading ${file.name}`} value={progress}>
          <ProgressTrack className="h-1">
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      )}
    </li>
  );
}

export function FileUploadItemPreview({
  file,
  className,
  ...props
}: React.ComponentProps<"div"> & { file: File }): React.ReactElement {
  const isImage = file.type.startsWith("image/");
  const [url, setUrl] = React.useState<string>();

  React.useEffect(() => {
    if (!isImage) return;
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, isImage]);

  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground",
        className,
      )}
      data-slot="file-upload-item-preview"
      {...props}
    >
      {url ? (
        <img alt="" className="size-full object-cover" src={url} />
      ) : (
        <FileIcon aria-hidden="true" className="size-4.5" />
      )}
    </div>
  );
}

export function FileUploadItemMetadata({
  file,
  error,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  file: File;
  error?: string;
}): React.ReactElement {
  return (
    <div
      className={cn("min-w-0 flex-1", className)}
      data-slot="file-upload-item-metadata"
      {...props}
    >
      <p className="truncate font-medium text-sm">{file.name}</p>
      <p
        className={cn(
          "text-muted-foreground text-xs",
          error && "text-destructive-foreground",
        )}
      >
        {error ?? formatFileSize(file.size)}
      </p>
    </div>
  );
}

export function FileUploadItemDelete({
  file,
  onClick,
  ...props
}: ButtonProps & { file: File }): React.ReactElement {
  const { removeFile } = useFileUpload();
  return (
    <Button
      aria-label={`Remove ${file.name}`}
      data-slot="file-upload-item-delete"
      onClick={(e) => {
        onClick?.(e);
        removeFile(file);
      }}
      size="icon-sm"
      type="button"
      variant="ghost"
      {...props}
    >
      <XIcon aria-hidden="true" />
    </Button>
  );
}
