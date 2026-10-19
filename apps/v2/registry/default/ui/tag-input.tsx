"use client";

import { XIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";

export type TagRejectReason = "duplicate" | "invalid" | "max";

export interface TagInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "value" | "defaultValue" | "onChange" | "size"
  > {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (tags: string[]) => void;
  /** Return false to reject a tag, e.g. an invalid email. */
  validate?: (tag: string) => boolean;
  /** Called for each tag that isn't added. */
  onTagReject?: (tag: string, reason: TagRejectReason) => void;
  max?: number;
  /** Duplicates are compared case-insensitively. */
  allowDuplicates?: boolean;
  /** Commit the typed text when the input loses focus. */
  addOnBlur?: boolean;
  size?: "sm" | "default";
  startAddon?: React.ReactNode;
  /** Classes for the outer box; `className` goes on the inner input. */
  containerClassName?: string;
}

// Enter and comma commit a tag; pasted text is split on commas and newlines.
const SPLIT = /[,\n]/;

export function TagInput({
  value,
  defaultValue = [],
  onValueChange,
  validate,
  onTagReject,
  max,
  allowDuplicates = false,
  addOnBlur = true,
  size = "default",
  startAddon,
  containerClassName,
  className,
  disabled,
  placeholder,
  onKeyDown,
  onBlur,
  onPaste,
  ...props
}: TagInputProps): React.ReactElement {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internalTags, setInternalTags] =
    React.useState<string[]>(defaultValue);
  const [draft, setDraft] = React.useState("");
  const tags = value ?? internalTags;

  const setTags = (next: string[]) => {
    if (value === undefined) setInternalTags(next);
    onValueChange?.(next);
  };

  // Returns true when every candidate was handled, so the draft can be cleared.
  const addTags = (candidates: string[]) => {
    const next = [...tags];
    const rejected: [string, TagRejectReason][] = [];
    for (const raw of candidates) {
      const tag = raw.trim();
      if (!tag) continue;
      if (
        !allowDuplicates &&
        next.some((t) => t.toLowerCase() === tag.toLowerCase())
      ) {
        rejected.push([tag, "duplicate"]);
      } else if (validate && !validate(tag)) rejected.push([tag, "invalid"]);
      else if (max !== undefined && next.length >= max)
        rejected.push([tag, "max"]);
      else next.push(tag);
    }
    if (next.length !== tags.length) setTags(next);
    for (const [tag, reason] of rejected) onTagReject?.(tag, reason);
    // Keep an invalid entry in the field so it can be fixed.
    return !rejected.some(([, reason]) => reason === "invalid");
  };

  const commitDraft = () => {
    if (draft.trim() && addTags([draft])) setDraft("");
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "relative inline-flex w-full cursor-text flex-wrap items-center gap-1 rounded-lg border border-input bg-background not-dark:bg-clip-padding p-[calc(--spacing(1)-1px)] text-base shadow-xs/5 outline-none ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-within:border-ring focus-within:ring-[3px] has-disabled:pointer-events-none has-aria-invalid:border-destructive/36 has-disabled:opacity-64 has-[:disabled,:focus-within,[aria-invalid]]:shadow-none focus-within:has-aria-invalid:border-destructive/64 focus-within:has-aria-invalid:ring-destructive/16 sm:text-sm dark:not-has-disabled:bg-input/32 dark:has-aria-invalid:ring-destructive/24 dark:not-has-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        size === "sm"
          ? "min-h-8 *:min-h-6 sm:min-h-7 sm:*:min-h-5"
          : "min-h-9 *:min-h-7 sm:min-h-8 sm:*:min-h-6",
        containerClassName,
      )}
      data-size={size}
      data-slot="tag-input"
      onClick={() => inputRef.current?.focus()}
    >
      {startAddon && (
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center ps-2 pe-1 opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none"
          data-slot="tag-input-start-addon"
        >
          {startAddon}
        </div>
      )}
      {tags.map((tag, index) => (
        <span
          className="flex items-center rounded-[calc(var(--radius-md)-1px)] bg-accent ps-2 font-medium text-accent-foreground text-sm sm:text-xs/(--text-xs--line-height)"
          data-slot="tag-input-tag"
          // Tags can repeat when allowDuplicates is on, so the index keeps keys unique.
          key={`${tag}-${index}`}
        >
          {tag}
          <button
            aria-label={`Remove ${tag}`}
            className="h-full shrink-0 cursor-pointer rounded-e-[calc(var(--radius-md)-1px)] px-1.5 opacity-80 outline-none hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4 sm:[&_svg]:size-3.5"
            data-slot="tag-input-remove"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              removeTag(index);
            }}
            type="button"
          >
            <XIcon aria-hidden="true" />
          </button>
        </span>
      ))}
      <input
        className={cn(
          "min-w-20 flex-1 bg-transparent outline-none placeholder:text-muted-foreground/72",
          size === "sm" ? "ps-1.5" : "ps-2",
          className,
        )}
        data-slot="tag-input-input"
        disabled={disabled}
        onBlur={(e) => {
          onBlur?.(e);
          if (addOnBlur) commitDraft();
        }}
        onChange={(e) => {
          const text = e.target.value;
          // Typing a comma commits everything before it.
          if (SPLIT.test(text)) {
            const parts = text.split(SPLIT);
            const rest = parts.pop() ?? "";
            setDraft(addTags(parts) ? rest : text.replace(SPLIT, ""));
          } else {
            setDraft(text);
          }
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          if (e.key === "Enter") {
            e.preventDefault();
            commitDraft();
          } else if (e.key === "Backspace" && draft === "" && tags.length) {
            removeTag(tags.length - 1);
          }
        }}
        onPaste={(e) => {
          onPaste?.(e);
          const text = e.clipboardData.getData("text");
          if (!SPLIT.test(text)) return;
          e.preventDefault();
          addTags(text.split(SPLIT));
        }}
        placeholder={tags.length ? undefined : placeholder}
        ref={inputRef}
        value={draft}
        {...props}
      />
    </div>
  );
}
