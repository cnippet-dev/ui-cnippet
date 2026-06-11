"use client";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";
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

const formatTools = [
  { icon: BoldIcon, label: "Bold", shortcut: "⌘B" },
  { icon: ItalicIcon, label: "Italic", shortcut: "⌘I" },
  { icon: UnderlineIcon, label: "Underline", shortcut: "⌘U" },
  { icon: StrikethroughIcon, label: "Strikethrough", shortcut: "⌘⇧X" },
] as const;

const alignTools = [
  { icon: AlignLeftIcon, label: "Align left", value: "left" },
  { icon: AlignCenterIcon, label: "Align center", value: "center" },
  { icon: AlignRightIcon, label: "Align right", value: "right" },
  { icon: AlignJustifyIcon, label: "Justify", value: "justify" },
] as const;

const listTools = [
  { icon: ListIcon, label: "Bullet list" },
  { icon: ListOrderedIcon, label: "Numbered list" },
] as const;

export function Pattern() {
  return (
    <TooltipProvider>
      <Toolbar>
        <ToolbarGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton render={<Button size="icon" variant="ghost" />}>
                  <UndoIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Undo (⌘Z)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton render={<Button size="icon" variant="ghost" />}>
                  <RedoIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Redo (⌘⇧Z)</TooltipContent>
          </Tooltip>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToggleGroup className="border-none p-0">
          {formatTools.map(({ icon: Icon, label, shortcut }) => (
            <Tooltip key={label}>
              <TooltipTrigger
                render={
                  <ToolbarButton
                    aria-label={label}
                    render={<ToggleGroupItem value={label.toLowerCase()} />}
                  >
                    <Icon />
                  </ToolbarButton>
                }
              />
              <TooltipContent>
                {label}
                <span className="ml-1.5 text-muted-foreground">{shortcut}</span>
              </TooltipContent>
            </Tooltip>
          ))}
        </ToggleGroup>

        <ToolbarSeparator />

        <ToggleGroup className="border-none p-0" defaultValue={["left"]}>
          {alignTools.map(({ icon: Icon, label, value }) => (
            <Tooltip key={value}>
              <TooltipTrigger
                render={
                  <ToolbarButton
                    aria-label={label}
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
          {listTools.map(({ icon: Icon, label }) => (
            <Tooltip key={label}>
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
      </Toolbar>
    </TooltipProvider>
  );
}
