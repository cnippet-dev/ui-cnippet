"use client";

import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import type * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import {
  Highlight,
  HighlightItem,
  type HighlightItemProps,
  type HighlightProps,
} from "@/registry/primitives/effects/highlight";
import {
  Accordion,
  AccordionContent,
  type AccordionContentProps,
  AccordionHeader,
  type AccordionHeaderProps,
  AccordionItem,
  type AccordionItemProps,
  type AccordionProps,
  AccordionTrigger,
  type AccordionTriggerProps,
} from "@/registry/primitives/radix/accordion";

type FilesContextType = {
  open: string[];
};

type FolderContextType = {
  isOpen: boolean;
};

const [FilesProvider, useFiles] =
  getStrictContext<FilesContextType>("FilesContext");

const [FolderProvider, useFolder] =
  getStrictContext<FolderContextType>("FolderContext");

type BaseFilesProps = {
  children: React.ReactNode;
} & Omit<AccordionProps, "type" | "defaultValue" | "value" | "onValueChange">;

type ControlledFilesProps = {
  defaultOpen?: never;
  open?: string[];
  onOpenChange?: (open: string[]) => void;
};

type UncontrolledFilesProps = {
  defaultOpen: string[];
  open?: never;
  onOpenChange?: never;
};

type FilesProps = BaseFilesProps &
  (ControlledFilesProps | UncontrolledFilesProps);

function Files({
  children,
  defaultOpen = [],
  open,
  onOpenChange,
  style,
  ...props
}: FilesProps) {
  const [openValue, setOpenValue] = useControlledState({
    defaultValue: defaultOpen,
    onChange: onOpenChange,
    value: open,
  });

  return (
    <FilesProvider value={{ open: openValue ?? [] }}>
      <Accordion
        data-slot="files"
        defaultValue={defaultOpen}
        onValueChange={setOpenValue}
        style={{
          overflow: "auto",
          position: "relative",
          ...style,
        }}
        type="multiple"
        value={open}
        {...props}
      >
        {children}
      </Accordion>
    </FilesProvider>
  );
}

type FilesHighlightProps = Omit<HighlightProps, "controlledItems" | "mode">;

function FilesHighlight({ hover = true, ...props }: FilesHighlightProps) {
  return (
    <Highlight
      controlledItems
      data-slot="files-highlight"
      hover={hover}
      mode="parent"
      {...props}
    />
  );
}

type FolderItemProps = AccordionItemProps;

function FolderItem({ value, ...props }: FolderItemProps) {
  const { open } = useFiles();

  return (
    <FolderProvider value={{ isOpen: open.includes(value) }}>
      <AccordionItem data-slot="folder-item" value={value} {...props} />
    </FolderProvider>
  );
}

type FolderHeaderProps = AccordionHeaderProps;

function FolderHeader(props: FolderHeaderProps) {
  return <AccordionHeader data-slot="folder-header" {...props} />;
}

type FolderTriggerProps = AccordionTriggerProps;

function FolderTrigger(props: FolderTriggerProps) {
  return <AccordionTrigger data-slot="folder-trigger" {...props} />;
}

type FolderContentProps = AccordionContentProps;

function FolderContent(props: FolderContentProps) {
  return <AccordionContent data-slot="folder-content" {...props} />;
}

type FolderHighlightProps = HighlightItemProps;

function FolderHighlight(props: FolderHighlightProps) {
  return <HighlightItem data-slot="folder-highlight" {...props} />;
}

type FolderProps = React.ComponentProps<"div">;

function Folder(props: FolderProps) {
  return <div data-slot="folder" {...props} />;
}

type FolderIconProps = HTMLMotionProps<"span"> & {
  closeIcon: React.ReactNode;
  openIcon: React.ReactNode;
};

function FolderIcon({
  closeIcon,
  openIcon,
  transition = { duration: 0.15 },
  ...props
}: FolderIconProps) {
  const { isOpen } = useFolder();

  return (
    <AnimatePresence mode="wait">
      <motion.span
        animate={{ scale: 1 }}
        data-slot="folder-icon"
        exit={{ scale: 0.9 }}
        initial={{ scale: 0.9 }}
        key={isOpen ? "open" : "close"}
        transition={transition}
        {...props}
      >
        {isOpen ? openIcon : closeIcon}
      </motion.span>
    </AnimatePresence>
  );
}

type FolderLabelProps = React.ComponentProps<"span">;

function FolderLabel(props: FolderLabelProps) {
  return <span data-slot="folder-label" {...props} />;
}

type FileHighlightProps = HighlightItemProps;

function FileHighlight(props: FileHighlightProps) {
  return <HighlightItem data-slot="file-highlight" {...props} />;
}

type FileProps = React.ComponentProps<"div">;

function File(props: FileProps) {
  return <div data-slot="file" {...props} />;
}

type FileIconProps = React.ComponentProps<"span">;

function FileIcon(props: FileIconProps) {
  return <span data-slot="file-icon" {...props} />;
}

type FileLabelProps = React.ComponentProps<"span">;

function FileLabel(props: FileLabelProps) {
  return <span data-slot="file-label" {...props} />;
}

export {
  File,
  FileHighlight,
  type FileHighlightProps,
  FileIcon,
  type FileIconProps,
  FileLabel,
  type FileLabelProps,
  type FileProps,
  Files,
  type FilesContextType,
  FilesHighlight,
  type FilesHighlightProps,
  type FilesProps,
  Folder,
  FolderContent,
  type FolderContentProps,
  type FolderContextType,
  FolderHeader,
  type FolderHeaderProps,
  FolderHighlight,
  type FolderHighlightProps,
  FolderIcon,
  type FolderIconProps,
  FolderItem,
  type FolderItemProps,
  FolderLabel,
  type FolderLabelProps,
  type FolderProps,
  FolderTrigger,
  type FolderTriggerProps,
  useFiles,
  useFolder,
};
