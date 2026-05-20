import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Kbd } from "@/registry/default/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const tools = [
  { icon: BoldIcon, label: "Bold", shortcut: ["⌘", "B"] },
  { icon: ItalicIcon, label: "Italic", shortcut: ["⌘", "I"] },
  { icon: UnderlineIcon, label: "Underline", shortcut: ["⌘", "U"] },
  {
    icon: StrikethroughIcon,
    label: "Strikethrough",
    shortcut: ["⌘", "⇧", "X"],
  },
] as const;

const aligns = [
  { icon: AlignLeftIcon, label: "Align left", shortcut: ["⌘", "⇧", "L"] },
  { icon: AlignCenterIcon, label: "Align center", shortcut: ["⌘", "⇧", "E"] },
  { icon: AlignRightIcon, label: "Align right", shortcut: ["⌘", "⇧", "R"] },
  { icon: AlignJustifyIcon, label: "Justify", shortcut: ["⌘", "⇧", "J"] },
] as const;

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <div className="flex items-center gap-1 rounded-lg border bg-background p-1 shadow-sm">
          {tools.map(({ icon: Icon, label, shortcut }) => (
            <Tooltip key={label}>
              <TooltipTrigger render={<Button size="icon" variant="ghost" />}>
                <Icon aria-hidden="true" className="size-4" />
                <span className="sr-only">{label}</span>
              </TooltipTrigger>
              <TooltipContent className="px-2.5 py-2">
                <div className="flex items-center gap-3">
                  <span>{label}</span>
                  <span className="flex items-center gap-0.5">
                    {shortcut.map((k) => (
                      <Kbd key={k}>{k}</Kbd>
                    ))}
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
          <div className="mx-1 h-5 w-px bg-border" />
          {aligns.map(({ icon: Icon, label, shortcut }) => (
            <Tooltip key={label}>
              <TooltipTrigger render={<Button size="icon" variant="ghost" />}>
                <Icon aria-hidden="true" className="size-4" />
                <span className="sr-only">{label}</span>
              </TooltipTrigger>
              <TooltipContent className="px-2.5 py-2">
                <div className="flex items-center gap-3">
                  <span>{label}</span>
                  <span className="flex items-center gap-0.5">
                    {shortcut.map((k) => (
                      <Kbd key={k}>{k}</Kbd>
                    ))}
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
