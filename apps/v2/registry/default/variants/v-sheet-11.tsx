"use client";

import { DownloadIcon, FileJsonIcon, FileSpreadsheetIcon, FileTextIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

const formats = [
  { ext: "csv", Icon: FileSpreadsheetIcon, label: "CSV" },
  { ext: "json", Icon: FileJsonIcon, label: "JSON" },
  { ext: "txt", Icon: FileTextIcon, label: "TXT" },
];

export default function Particle() {
  const [format, setFormat] = useState("csv");
  const [filename, setFilename] = useState("export");

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        <DownloadIcon aria-hidden="true" />
        Export Data
      </SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>Export Data</SheetTitle>
          <SheetDescription>
            Choose a format and filename before downloading.
          </SheetDescription>
        </SheetHeader>
        <SheetPanel className="space-y-5">
          <div className="space-y-2">
            <p className="font-medium text-sm">File format</p>
            <div className="grid grid-cols-3 gap-2">
              {formats.map(({ ext, Icon, label }) => (
                <button
                  className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-sm transition-colors ${
                    format === ext
                      ? "border-primary bg-primary/5 text-primary"
                      : "hover:bg-muted"
                  }`}
                  key={ext}
                  onClick={() => setFormat(ext)}
                  type="button"
                >
                  <Icon aria-hidden="true" className="size-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
          <Field>
            <FieldLabel>Filename</FieldLabel>
            <div className="flex items-center">
              <Input
                className="rounded-r-none"
                onChange={(e) => setFilename(e.target.value)}
                type="text"
                value={filename}
              />
              <span className="flex h-9 items-center rounded-r-lg border border-l-0 bg-muted px-3 text-muted-foreground text-sm">
                .{format}
              </span>
            </div>
          </Field>
          <div className="space-y-1.5 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Export includes:</p>
            <p>• All records from the current view</p>
            <p>• Applied filters and column order</p>
            <p>• Column headers in the first row</p>
          </div>
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
          <Button>
            <DownloadIcon aria-hidden="true" />
            Download
          </Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
