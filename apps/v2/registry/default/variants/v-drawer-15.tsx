"use client";

import {
  ArchiveIcon,
  BookmarkIcon,
  DownloadIcon,
  FlagIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Share2Icon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";

const ACTIONS = [
  { description: "Modify this item", icon: PencilIcon, label: "Edit" },
  { description: "Add a comment", icon: MessageSquareIcon, label: "Comment" },
  { description: "Share with others", icon: Share2Icon, label: "Share" },
  { description: "Save for later", icon: BookmarkIcon, label: "Bookmark" },
  { description: "Export as file", icon: DownloadIcon, label: "Download" },
  { description: "Move to archive", icon: ArchiveIcon, label: "Archive" },
  { description: "Flag for review", icon: FlagIcon, label: "Report" },
  {
    description: "Remove permanently",
    destructive: true,
    icon: TrashIcon,
    label: "Delete",
  },
];

export default function Particle() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-3">
      {lastAction && (
        <p className="text-muted-foreground text-sm">
          Action:{" "}
          <span className="font-medium text-foreground">{lastAction}</span>
        </p>
      )}
      <Drawer>
        <DrawerTrigger render={<Button size="icon" variant="outline" />}>
          <MoreHorizontalIcon className="size-4" />
        </DrawerTrigger>
        <DrawerPopup showBar>
          <DrawerHeader>
            <DrawerTitle>Actions</DrawerTitle>
          </DrawerHeader>
          <DrawerPanel>
            <div className="grid grid-cols-4 gap-2">
              {ACTIONS.map((action) => (
                <DrawerClose
                  key={action.label}
                  render={
                    <button
                      className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors ${
                        action.destructive
                          ? "border-destructive/20 text-destructive hover:bg-destructive/5"
                          : "text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                      }`}
                      onClick={() => setLastAction(action.label)}
                      type="button"
                    />
                  }
                >
                  <action.icon className="size-5" />
                  <span className="font-medium text-xs leading-none">
                    {action.label}
                  </span>
                </DrawerClose>
              ))}
            </div>
          </DrawerPanel>
          <DrawerFooter
            className="justify-center sm:justify-center"
            variant="bare"
          >
            <DrawerClose render={<Button variant="outline" />}>
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>
    </div>
  );
}
