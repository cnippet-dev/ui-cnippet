"use client";

import { Globe } from "lucide-react";
import { Fragment } from "react";
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
    city: "Los Angeles",
    id: "pst",
    label: "Pacific Time",
    offset: "UTC−8",
    region: "Americas",
  },
  {
    city: "Denver",
    id: "mst",
    label: "Mountain Time",
    offset: "UTC−7",
    region: "Americas",
  },
  {
    city: "Chicago",
    id: "cst",
    label: "Central Time",
    offset: "UTC−6",
    region: "Americas",
  },
  {
    city: "New York",
    id: "est",
    label: "Eastern Time",
    offset: "UTC−5",
    region: "Americas",
  },
  {
    city: "Buenos Aires",
    id: "art",
    label: "Argentina Time",
    offset: "UTC−3",
    region: "Americas",
  },
  {
    city: "London",
    id: "gmt",
    label: "Greenwich Mean Time",
    offset: "UTC±0",
    region: "Europe & Africa",
  },
  {
    city: "Paris",
    id: "cet",
    label: "Central European Time",
    offset: "UTC+1",
    region: "Europe & Africa",
  },
  {
    city: "Helsinki",
    id: "eet",
    label: "Eastern European Time",
    offset: "UTC+2",
    region: "Europe & Africa",
  },
  {
    city: "Moscow",
    id: "msk",
    label: "Moscow Time",
    offset: "UTC+3",
    region: "Europe & Africa",
  },
  {
    city: "Nairobi",
    id: "eat",
    label: "East Africa Time",
    offset: "UTC+3",
    region: "Europe & Africa",
  },
  {
    city: "Dubai",
    id: "gst",
    label: "Gulf Standard Time",
    offset: "UTC+4",
    region: "Europe & Africa",
  },
  {
    city: "Mumbai",
    id: "ist",
    label: "India Standard Time",
    offset: "UTC+5:30",
    region: "Asia & Pacific",
  },
  {
    city: "Bangkok",
    id: "ict",
    label: "Indochina Time",
    offset: "UTC+7",
    region: "Asia & Pacific",
  },
  {
    city: "Singapore",
    id: "sgt",
    label: "Singapore Time",
    offset: "UTC+8",
    region: "Asia & Pacific",
  },
  {
    city: "Tokyo",
    id: "jst",
    label: "Japan Standard Time",
    offset: "UTC+9",
    region: "Asia & Pacific",
  },
  {
    city: "Sydney",
    id: "aest",
    label: "AUS Eastern Time",
    offset: "UTC+10",
    region: "Asia & Pacific",
  },
  {
    city: "Auckland",
    id: "nzst",
    label: "New Zealand Time",
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
  return order.map((r) => ({ items: map[r] ?? [], value: r }));
}

const regionGroups = groupByRegion(timezones);

export default function Particle() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <label className="font-medium text-sm">Timezone</label>
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
