"use client";

import { CheckIcon, CopyIcon, PlayIcon, WrapTextIcon } from "lucide-react";
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

const languages = [
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
];

const SNIPPET = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`;

export function Pattern() {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);

  const copy = () => {
    void navigator.clipboard.writeText(SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const run = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 1000);
  };

  return (
    <TooltipProvider>
      <Toolbar className="w-full max-w-md">
        <ToolbarGroup>
          <Select defaultValue="typescript" items={languages}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <ToolbarButton
                    render={
                      <SelectTrigger className="h-7 w-32 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                    }
                  />
                }
              />
              <TooltipContent>Select language</TooltipContent>
            </Tooltip>
            <SelectPopup>
              {languages.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToggleGroup className="border-none p-0">
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Toggle word wrap"
                  render={<ToggleGroupItem value="wrap" />}
                >
                  <WrapTextIcon />
                </ToolbarButton>
              }
            />
            <TooltipContent>Word wrap</TooltipContent>
          </Tooltip>
        </ToggleGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label="Copy code"
                  onClick={copy}
                  render={<Button size="icon" variant="ghost" />}
                >
                  {copied ? (
                    <CheckIcon className="text-emerald-500" />
                  ) : (
                    <CopyIcon />
                  )}
                </ToolbarButton>
              }
            />
            <TooltipContent>{copied ? "Copied!" : "Copy code"}</TooltipContent>
          </Tooltip>

          <ToolbarButton
            onClick={run}
            render={
              <Button
                className="gap-1.5"
                disabled={running}
                loading={running}
                size="sm"
              />
            }
          >
            {!running && <PlayIcon className="size-3.5" />}
            {running ? "Running…" : "Run"}
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    </TooltipProvider>
  );
}
