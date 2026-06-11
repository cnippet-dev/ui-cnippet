"use client";

import {
  ClockIcon,
  EyeIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  PenLineIcon,
  Share2Icon,
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

const docActions = [
  { icon: MessageSquareIcon, label: "Comments" },
  { icon: ClockIcon, label: "Version history" },
  { icon: MoreHorizontalIcon, label: "More options" },
] as const;

export function Pattern() {
  return (
    <TooltipProvider>
      <Toolbar className="w-full max-w-lg justify-between">
        <ToolbarGroup>
          <span className="truncate px-1 font-medium text-sm">
            Product Roadmap Q3
          </span>
        </ToolbarGroup>

        <ToolbarGroup className="gap-2">
          <ToggleGroup className="border-none p-0" defaultValue={["edit"]}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <ToolbarButton
                    aria-label="Edit mode"
                    render={<ToggleGroupItem value="edit" />}
                  >
                    <PenLineIcon className="size-3.5" />
                    <span className="text-xs">Edit</span>
                  </ToolbarButton>
                }
              />
              <TooltipContent>Switch to edit mode</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <ToolbarButton
                    aria-label="Preview mode"
                    render={<ToggleGroupItem value="preview" />}
                  >
                    <EyeIcon className="size-3.5" />
                    <span className="text-xs">Preview</span>
                  </ToolbarButton>
                }
              />
              <TooltipContent>Switch to preview mode</TooltipContent>
            </Tooltip>
          </ToggleGroup>

          <ToolbarSeparator />

          {docActions.map(({ icon: Icon, label }) => (
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

          <ToolbarSeparator />

          <ToolbarButton render={<Button size="sm" />}>
            <Share2Icon className="size-3.5" />
            Share
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    </TooltipProvider>
  );
}
