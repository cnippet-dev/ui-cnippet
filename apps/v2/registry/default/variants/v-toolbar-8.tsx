"use client";

import {
  MaximizeIcon,
  MinusIcon,
  MoonIcon,
  PlusIcon,
  RotateCcwIcon,
  SunIcon,
} from "lucide-react";
import { useState } from "react";
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

const ZOOM_LEVELS = [50, 75, 100, 125, 150, 200];

export function Pattern() {
  const [zoom, setZoom] = useState(100);

  const zoomIn = () =>
    setZoom(
      (z) =>
        ZOOM_LEVELS[
          Math.min(ZOOM_LEVELS.indexOf(z) + 1, ZOOM_LEVELS.length - 1)
        ] ?? z,
    );
  const zoomOut = () =>
    setZoom((z) => ZOOM_LEVELS[Math.max(ZOOM_LEVELS.indexOf(z) - 1, 0)] ?? z);

  return (
    <TooltipProvider>
      <Toolbar>
        <ToggleGroup className="border-none p-0" defaultValue={["light"]}>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Light mode"
                  render={<ToggleGroupItem value="light" />}
                >
                  <SunIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Light mode</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Dark mode"
                  render={<ToggleGroupItem value="dark" />}
                >
                  <MoonIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Dark mode</TooltipContent>
          </Tooltip>
        </ToggleGroup>

        <ToolbarSeparator />

        <ToolbarGroup className="items-center gap-1">
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Zoom out"
                  disabled={zoom === ZOOM_LEVELS[0]}
                  onClick={zoomOut}
                  render={<Button size="icon" variant="ghost" />}
                >
                  <MinusIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Zoom out</TooltipContent>
          </Tooltip>
          <span className="w-12 text-center text-muted-foreground text-xs tabular-nums">
            {zoom}%
          </span>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Zoom in"
                  disabled={zoom === ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
                  onClick={zoomIn}
                  render={<Button size="icon" variant="ghost" />}
                >
                  <PlusIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Zoom in</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Reset to 100%"
                  onClick={() => setZoom(100)}
                  render={<Button size="icon" variant="ghost" />}
                >
                  <MaximizeIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Reset zoom</TooltipContent>
          </Tooltip>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Reset canvas"
                  render={<Button size="icon" variant="ghost" />}
                >
                  <RotateCcwIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Reset canvas</TooltipContent>
          </Tooltip>
        </ToolbarGroup>
      </Toolbar>
    </TooltipProvider>
  );
}
