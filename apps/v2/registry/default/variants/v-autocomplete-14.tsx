"use client";

import { Fragment } from "react";
import { Globe } from "lucide-react";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteSeparator,
} from "@/registry/default/ui/autocomplete";

type Timezone = {
  id: string;
  label: string;
  city: string;
  offset: string;
  region: "Americas" | "Europe & Africa" | "Asia & Pacific";
};

type RegionGroup = { value: string; items: Timezone[] };

const timezones: Timezone[] = [
  {
    id: "pst",
    label: "Pacific Time",
    city: "Los Angeles",
    offset: "UTC−8",
    region: "Americas",
  },
  {
    id: "mst",
    label: "Mountain Time",
    city: "Denver",
    offset: "UTC−7",
    region: "Americas",
  },
  {
    id: "cst",
    label: "Central Time",
    city: "Chicago",
    offset: "UTC−6",
    region: "Americas",
  },
  {
    id: "est",
    label: "Eastern Time",
    city: "New York",
    offset: "UTC−5",
    region: "Americas",
  },
  {
    id: "art",
    label: "Argentina Time",
    city: "Buenos Aires",
    offset: "UTC−3",
    region: "Americas",
  },
  {
    id: "gmt",
    label: "Greenwich Mean Time",
    city: "London",
    offset: "UTC±0",
    region: "Europe & Africa",
  },
  {
    id: "cet",
    label: "Central European Time",
    city: "Paris",
    offset: "UTC+1",
    region: "Europe & Africa",
  },
  {
    id: "eet",
    label: "Eastern European Time",
    city: "Helsinki",
    offset: "UTC+2",
    region: "Europe & Africa",
  },
  {
    id: "msk",
    label: "Moscow Time",
    city: "Moscow",
    offset: "UTC+3",
    region: "Europe & Africa",
  },
  {
    id: "eat",
    label: "East Africa Time",
    city: "Nairobi",
    offset: "UTC+3",
    region: "Europe & Africa",
  },
  {
    id: "gst",
    label: "Gulf Standard Time",
    city: "Dubai",
    offset: "UTC+4",
    region: "Europe & Africa",
  },
  {
    id: "ist",
    label: "India Standard Time",
    city: "Mumbai",
    offset: "UTC+5:30",
    region: "Asia & Pacific",
  },
  {
    id: "ict",
    label: "Indochina Time",
    city: "Bangkok",
    offset: "UTC+7",
    region: "Asia & Pacific",
  },
  {
    id: "sgt",
    label: "Singapore Time",
    city: "Singapore",
    offset: "UTC+8",
    region: "Asia & Pacific",
  },
  {
    id: "jst",
    label: "Japan Standard Time",
    city: "Tokyo",
    offset: "UTC+9",
    region: "Asia & Pacific",
  },
  {
    id: "aest",
    label: "AUS Eastern Time",
    city: "Sydney",
    offset: "UTC+10",
    region: "Asia & Pacific",
  },
  {
    id: "nzst",
    label: "New Zealand Time",
    city: "Auckland",
    offset: "UTC+12",
    region: "Asia & Pacific",
  },
];

function groupByRegion(tzs: Timezone[]): RegionGroup[] {
  const map: Record<string, Timezone[]> = {};
  for (const tz of tzs) {
    (map[tz.region] ??= []).push(tz);
  }
  const order: Timezone["region"][] = [
    "Americas",
    "Europe & Africa",
    "Asia & Pacific",
  ];
  return order.map((r) => ({ value: r, items: map[r] ?? [] }));
}

const regionGroups = groupByRegion(timezones);

export default function Particle() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <label className="text-sm font-medium">Timezone</label>
      <Autocomplete items={regionGroups}>
        <AutocompleteInput
          placeholder="Select a timezone…"
          showClear
          showTrigger
          startAddon={<Globe className="size-4 text-muted-foreground" />}
        />
        <AutocompletePopup>
          <AutocompleteEmpty>No timezone found.</AutocompleteEmpty>
          <AutocompleteList>
            {(group: RegionGroup) => (
              <Fragment key={group.value}>
                <AutocompleteGroup items={group.items}>
                  <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                  <AutocompleteCollection>
                    {(tz: Timezone) => (
                      <AutocompleteItem key={tz.id} value={tz}>
                        <div className="flex w-full items-center gap-2">
                          <span className="flex-1 truncate">{tz.label}</span>
                          <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                            {tz.offset}
                          </span>
                        </div>
                      </AutocompleteItem>
                    )}
                  </AutocompleteCollection>
                </AutocompleteGroup>
                {group.value !== "Asia & Pacific" && <AutocompleteSeparator />}
              </Fragment>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
