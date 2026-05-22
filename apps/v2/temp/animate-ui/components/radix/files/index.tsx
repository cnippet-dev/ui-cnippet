import { cn } from "@workspace/ui/lib/utils";
import { FileIcon, FolderIcon, FolderOpenIcon } from "lucide-react";
import type * as React from "react";
import {
  FileHighlight as FileHighlightPrimitive,
  FileIcon as FileIconPrimitive,
  FileLabel as FileLabelPrimitive,
  type FileLabelProps as FileLabelPrimitiveProps,
  File as FilePrimitive,
  type FileProps as FilePrimitiveProps,
  FilesHighlight as FilesHighlightPrimitive,
  Files as FilesPrimitive,
  type FilesProps as FilesPrimitiveProps,
  FolderContent as FolderContentPrimitive,
  type FolderContentProps as FolderContentPrimitiveProps,
  FolderHeader as FolderHeaderPrimitive,
  FolderHighlight as FolderHighlightPrimitive,
  FolderIcon as FolderIconPrimitive,
  FolderItem as FolderItemPrimitive,
  type FolderItemProps as FolderItemPrimitiveProps,
  Folder as FolderPrimitive,
  FolderTrigger as FolderTriggerPrimitive,
} from "@/registry/primitives/radix/files";

type GitStatus = "untracked" | "modified" | "deleted";

type FilesProps = FilesPrimitiveProps;

function Files({ className, children, ...props }: FilesProps) {
  return (
    <FilesPrimitive className={cn("w-full p-2", className)} {...props}>
      <FilesHighlightPrimitive className="pointer-events-none rounded-lg bg-accent">
        {children}
      </FilesHighlightPrimitive>
    </FilesPrimitive>
  );
}

type SubFilesProps = FilesProps;

function SubFiles(props: SubFilesProps) {
  return <FilesPrimitive {...props} />;
}

type FolderItemProps = FolderItemPrimitiveProps;

function FolderItem(props: FolderItemProps) {
  return <FolderItemPrimitive {...props} />;
}

type FolderTriggerProps = FileLabelPrimitiveProps & {
  gitStatus?: GitStatus;
};

function FolderTrigger({
  children,
  className,
  gitStatus,
  ...props
}: FolderTriggerProps) {
  return (
    <FolderHeaderPrimitive>
      <FolderTriggerPrimitive className="w-full text-start">
        <FolderHighlightPrimitive>
          <FolderPrimitive className="pointer-events-none flex items-center justify-between gap-2 p-2">
            <div
              className={cn(
                "flex items-center gap-2",
                gitStatus === "untracked" && "text-green-400",
                gitStatus === "modified" && "text-amber-400",
                gitStatus === "deleted" && "text-red-400",
              )}
            >
              <FolderIconPrimitive
                closeIcon={<FolderIcon className="size-4.5" />}
                openIcon={<FolderOpenIcon className="size-4.5" />}
              />
              <FileLabelPrimitive
                className={cn("text-sm", className)}
                {...props}
              >
                {children}
              </FileLabelPrimitive>
            </div>

            {gitStatus && (
              <span
                className={cn(
                  "size-2 rounded-full",
                  gitStatus === "untracked" && "bg-green-400",
                  gitStatus === "modified" && "bg-amber-400",
                  gitStatus === "deleted" && "bg-red-400",
                )}
              />
            )}
          </FolderPrimitive>
        </FolderHighlightPrimitive>
      </FolderTriggerPrimitive>
    </FolderHeaderPrimitive>
  );
}

type FolderContentProps = FolderContentPrimitiveProps;

function FolderContent(props: FolderContentProps) {
  return (
    <div className="relative ml-6 before:absolute before:inset-y-0 before:-left-2 before:h-full before:w-px before:bg-border">
      <FolderContentPrimitive {...props} />
    </div>
  );
}

type FileItemProps = FilePrimitiveProps & {
  icon?: React.ElementType;
  gitStatus?: GitStatus;
};

function FileItem({
  icon: Icon = FileIcon,
  className,
  children,
  gitStatus,
  ...props
}: FileItemProps) {
  return (
    <FileHighlightPrimitive>
      <FilePrimitive
        className={cn(
          "pointer-events-none flex items-center justify-between gap-2 p-2",
          gitStatus === "untracked" && "text-green-400",
          gitStatus === "modified" && "text-amber-400",
          gitStatus === "deleted" && "text-red-400",
        )}
      >
        <div className="flex items-center gap-2">
          <FileIconPrimitive>
            <Icon className="size-4.5" />
          </FileIconPrimitive>
          <FileLabelPrimitive className={cn("text-sm", className)} {...props}>
            {children}
          </FileLabelPrimitive>
        </div>

        {gitStatus && (
          <span className="font-medium text-sm">
            {gitStatus === "untracked" && "U"}
            {gitStatus === "modified" && "M"}
            {gitStatus === "deleted" && "D"}
          </span>
        )}
      </FilePrimitive>
    </FileHighlightPrimitive>
  );
}

export {
  FileItem,
  type FileItemProps,
  Files,
  type FilesProps,
  FolderContent,
  type FolderContentProps,
  FolderItem,
  type FolderItemProps,
  FolderTrigger,
  type FolderTriggerProps,
  SubFiles,
  type SubFilesProps,
};
