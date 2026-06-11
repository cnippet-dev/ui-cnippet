"use client";

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  UnderlineIcon,
} from "lucide-react";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

export function Pattern() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed">
        <p
          className={`max-w-[160px] text-muted-foreground text-sm text-${align} ${bold ? "font-bold" : ""} ${italic ? "italic" : ""} ${underline ? "underline" : ""}`}
        >
          Right-click to format this text sample.
        </p>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuLabel>Formatting</ContextMenuLabel>
        <ContextMenuGroup>
          <ContextMenuCheckboxItem checked={bold} onCheckedChange={setBold}>
            <BoldIcon />
            Bold
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={italic} onCheckedChange={setItalic}>
            <ItalicIcon />
            Italic
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem
            checked={underline}
            onCheckedChange={setUnderline}
          >
            <UnderlineIcon />
            Underline
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <AlignLeftIcon />
            Alignment
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuGroup>
              <ContextMenuItem onSelect={() => setAlign("left")}>
                <AlignLeftIcon />
                Left
              </ContextMenuItem>
              <ContextMenuItem onSelect={() => setAlign("center")}>
                <AlignCenterIcon />
                Center
              </ContextMenuItem>
              <ContextMenuItem onSelect={() => setAlign("right")}>
                <AlignRightIcon />
                Right
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            <LinkIcon />
            Insert link
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
