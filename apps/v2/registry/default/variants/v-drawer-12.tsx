"use client";

import {
  FileTextIcon,
  ImageIcon,
  PaperclipIcon,
  TrashIcon,
  UploadIcon,
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

type MockFile = {
  id: number;
  name: string;
  size: string;
  type: "image" | "doc";
};

const INITIAL_FILES: MockFile[] = [
  { id: 1, name: "Q3-report.pdf", size: "2.4 MB", type: "doc" },
  { id: 2, name: "hero-banner.png", size: "840 KB", type: "image" },
  { id: 3, name: "notes.txt", size: "12 KB", type: "doc" },
];

export default function Particle() {
  const [files, setFiles] = useState<MockFile[]>(INITIAL_FILES);

  const remove = (id: number) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        <PaperclipIcon className="size-4" />
        Attachments ({files.length})
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Attachments</DrawerTitle>
        </DrawerHeader>
        <DrawerPanel className="space-y-3">
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors hover:border-primary hover:bg-primary/5">
            <UploadIcon className="size-6 text-muted-foreground" />
            <span className="font-medium text-sm">
              Drop files or click to upload
            </span>
            <span className="text-muted-foreground text-xs">
              PNG, JPG, PDF up to 10 MB
            </span>
            <input
              accept=".png,.jpg,.jpeg,.pdf,.txt"
              className="sr-only"
              type="file"
            />
          </label>
          {files.length > 0 && (
            <ul className="divide-y divide-border rounded-lg border">
              {files.map((file) => (
                <li
                  className="flex items-center gap-3 px-3 py-2.5"
                  key={file.id}
                >
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
                    {file.type === "image" ? (
                      <ImageIcon className="size-4 text-muted-foreground" />
                    ) : (
                      <FileTextIcon className="size-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">{file.name}</p>
                    <p className="text-muted-foreground text-xs">{file.size}</p>
                  </div>
                  <button
                    className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => remove(file.id)}
                    type="button"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </DrawerPanel>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost" />}>Cancel</DrawerClose>
          <DrawerClose render={<Button />}>
            Attach {files.length} file{files.length !== 1 ? "s" : ""}
          </DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
