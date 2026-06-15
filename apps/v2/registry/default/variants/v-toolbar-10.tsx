"use client";

import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  UnderlineIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/registry/default/ui/toolbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const blockTypes = [
  { label: "Paragraph", value: "p" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Quote", value: "quote" },
  { label: "Code block", value: "code" },
];

const inlineFormats = [
  { icon: BoldIcon, label: "Bold", value: "bold" },
  { icon: ItalicIcon, label: "Italic", value: "italic" },
  { icon: UnderlineIcon, label: "Underline", value: "underline" },
  { icon: CodeIcon, label: "Inline code", value: "code" },
] as const;

const blockFormats = [
  { icon: Heading1Icon, label: "Heading 1", value: "h1" },
  { icon: Heading2Icon, label: "Heading 2", value: "h2" },
  { icon: ListIcon, label: "Bullet list", value: "ul" },
  { icon: ListOrderedIcon, label: "Numbered list", value: "ol" },
  { icon: QuoteIcon, label: "Blockquote", value: "blockquote" },
] as const;

export function Pattern() {
  const [active, setActive] = useState<string[]>(["bold"]);

  const toggle = (val: string) =>
    setActive((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );

  return (
    <TooltipProvider>
      <Toolbar className="w-full max-w-xl flex-wrap gap-y-1">
        <ToolbarGroup>
          <Select defaultValue="p" items={blockTypes}>
            <ToolbarButton
              render={
                <SelectTrigger className="h-7 w-28 text-xs">
                  <SelectValue />
                </SelectTrigger>
              }
            />
            <SelectPopup>
              {blockTypes.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToggleGroup className="border-none p-0" value={active}>
          {inlineFormats.map(({ icon: Icon, label, value }) => (
            <Tooltip key={value}>
              <TooltipTrigger
                render={
                  <ToolbarButton
                    aria-label={label}
                    aria-pressed={active.includes(value)}
                    onClick={() => toggle(value)}
                    render={<ToggleGroupItem value={value} />}
                  >
                    <Icon />
                  </ToolbarButton>
                }
              />
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          ))}
        </ToggleGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          {blockFormats.map(({ icon: Icon, label, value }) => (
            <Tooltip key={value}>
              <TooltipTrigger
                render={
                  <ToolbarButton
                    aria-label={label}
                    render={<Button size="icon" variant="ghost" />}
                  >
                    <Icon />
                  </ToolbarButton>
                }
              />
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          ))}
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Insert link"
                  render={<Button size="icon" variant="ghost" />}
                >
                  <LinkIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Insert link</TooltipContent>
          </Tooltip>
        </ToolbarGroup>
      </Toolbar>
    </TooltipProvider>
  );
}
