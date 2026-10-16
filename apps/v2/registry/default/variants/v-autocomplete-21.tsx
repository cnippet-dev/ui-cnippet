"use client";

import { SearchIcon } from "lucide-react";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/default/ui/autocomplete";
import { Field, FieldLabel } from "@/registry/default/ui/field";

interface Item {
  label: string;
  value: string;
}

const cities: Item[] = [
  { label: "Amsterdam", value: "ams" },
  { label: "Berlin", value: "ber" },
  { label: "Lisbon", value: "lis" },
  { label: "London", value: "lon" },
  { label: "New York", value: "nyc" },
  { label: "San Francisco", value: "sfo" },
  { label: "Tokyo", value: "tyo" },
];

const commands: { items: Item[]; label: string }[] = [
  {
    items: [
      { label: "New project", value: "new-project" },
      { label: "Invite teammate", value: "invite" },
    ],
    label: "Actions",
  },
  {
    items: [
      { label: "Billing", value: "billing" },
      { label: "Members", value: "members" },
      { label: "API keys", value: "api-keys" },
    ],
    label: "Settings",
  },
];

export default function Particle() {
  return (
    <div className="grid w-full max-w-xl gap-x-6 gap-y-5 sm:grid-cols-2">
      <Field>
        <FieldLabel>City</FieldLabel>
        <Autocomplete items={cities}>
          <AutocompleteInput
            aria-label="City"
            placeholder="Search cities…"
            showClear
            showTrigger
          />
          <AutocompletePopup>
            <AutocompleteEmpty>No cities found.</AutocompleteEmpty>
            <AutocompleteList>
              {(item: Item) => (
                <AutocompleteItem key={item.value} value={item}>
                  {item.label}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </Autocomplete>
      </Field>
      <Field>
        <FieldLabel>Go to</FieldLabel>
        <Autocomplete items={commands}>
          <AutocompleteInput
            aria-label="Go to"
            placeholder="Type a command…"
            startAddon={<SearchIcon />}
          />
          <AutocompletePopup>
            <AutocompleteEmpty>No results.</AutocompleteEmpty>
            <AutocompleteList>
              {(group: { items: Item[]; label: string }) => (
                <AutocompleteGroup items={group.items} key={group.label}>
                  <AutocompleteGroupLabel>{group.label}</AutocompleteGroupLabel>
                  {group.items.map((item) => (
                    <AutocompleteItem key={item.value} value={item}>
                      {item.label}
                    </AutocompleteItem>
                  ))}
                </AutocompleteGroup>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </Autocomplete>
      </Field>
      <Field>
        <FieldLabel>Small</FieldLabel>
        <Autocomplete items={cities}>
          <AutocompleteInput
            aria-label="Office"
            placeholder="Office"
            size="sm"
          />
          <AutocompletePopup>
            <AutocompleteEmpty>No cities found.</AutocompleteEmpty>
            <AutocompleteList>
              {(item: Item) => (
                <AutocompleteItem key={item.value} value={item}>
                  {item.label}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </Autocomplete>
      </Field>
      <Field disabled>
        <FieldLabel>Disabled</FieldLabel>
        <Autocomplete disabled items={cities}>
          <AutocompleteInput aria-label="Region" placeholder="Region" />
        </Autocomplete>
      </Field>
    </div>
  );
}
