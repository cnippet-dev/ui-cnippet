"use client";

import { ChevronsUpDownIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
  ComboboxValue,
} from "@/registry/default/ui/combobox";

interface Timezone {
  label: string;
  value: string;
  offset: string;
  region: string;
}

const timezones: Timezone[] = [
  {
    label: "Pacific Time",
    offset: "UTC-8",
    region: "Americas",
    value: "America/Los_Angeles",
  },
  {
    label: "Mountain Time",
    offset: "UTC-7",
    region: "Americas",
    value: "America/Denver",
  },
  {
    label: "Central Time",
    offset: "UTC-6",
    region: "Americas",
    value: "America/Chicago",
  },
  {
    label: "Eastern Time",
    offset: "UTC-5",
    region: "Americas",
    value: "America/New_York",
  },
  { label: "UTC", offset: "UTC+0", region: "Europe", value: "UTC" },
  {
    label: "Central European",
    offset: "UTC+1",
    region: "Europe",
    value: "Europe/Paris",
  },
  {
    label: "Eastern European",
    offset: "UTC+2",
    region: "Europe",
    value: "Europe/Helsinki",
  },
  {
    label: "India Standard",
    offset: "UTC+5:30",
    region: "Asia",
    value: "Asia/Kolkata",
  },
  {
    label: "China Standard",
    offset: "UTC+8",
    region: "Asia",
    value: "Asia/Shanghai",
  },
  {
    label: "Japan Standard",
    offset: "UTC+9",
    region: "Asia",
    value: "Asia/Tokyo",
  },
  {
    label: "AEST",
    offset: "UTC+10",
    region: "Pacific",
    value: "Australia/Sydney",
  },
];

export default function Particle() {
  const [value, setValue] = useState<Timezone | null>(
    timezones.find((t) => t.value === "UTC") ?? null,
  );

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="flex gap-2">
        <Combobox
          items={timezones}
          onValueChange={(v) => setValue(v as Timezone | null)}
          value={value}
        >
          <ComboboxTrigger
            render={
              <Button
                className="flex-1 justify-between font-normal"
                variant="outline"
              />
            }
          >
            {value ? (
              <span className="flex items-center gap-2 text-sm">
                <Badge size="sm" variant="secondary">
                  {value.offset}
                </Badge>
                <ComboboxValue />
              </span>
            ) : (
              <ComboboxValue placeholder="Select timezone..." />
            )}
            <ChevronsUpDownIcon className="-me-1!" />
          </ComboboxTrigger>
          <ComboboxPopup>
            <ComboboxInput
              placeholder="Search timezone..."
              showTrigger={false}
            />
            <ComboboxEmpty>No timezones found.</ComboboxEmpty>
            <ComboboxList>
              {(tz: Timezone) => (
                <ComboboxItem
                  className="**:data-check:ms-auto"
                  key={tz.value}
                  value={tz}
                >
                  <div className="flex flex-1 items-center justify-between gap-2">
                    <span className="text-sm">{tz.label}</span>
                    <span className="text-muted-foreground text-xs">
                      {tz.offset}
                    </span>
                  </div>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
        <Button
          aria-label="Clear"
          disabled={!value}
          onClick={() => setValue(null)}
          size="icon"
          variant="ghost"
        >
          <XIcon />
        </Button>
      </div>
      {value && (
        <p className="text-muted-foreground text-xs">
          Region:{" "}
          <span className="font-medium text-foreground">{value.region}</span> ·
          Identifier:{" "}
          <span className="font-mono text-foreground">{value.value}</span>
        </p>
      )}
    </div>
  );
}
