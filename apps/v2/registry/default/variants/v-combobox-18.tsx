"use client";

import { MapPinIcon } from "lucide-react";
import { useState } from "react";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/default/ui/combobox";

interface City {
  label: string;
  value: string;
  country: string;
  timezone: string;
}

const cities: City[] = [
  { country: "US", label: "New York", timezone: "UTC-5", value: "nyc" },
  { country: "UK", label: "London", timezone: "UTC+0", value: "lon" },
  { country: "JP", label: "Tokyo", timezone: "UTC+9", value: "tyo" },
  { country: "FR", label: "Paris", timezone: "UTC+1", value: "par" },
  { country: "AU", label: "Sydney", timezone: "UTC+11", value: "syd" },
  { country: "SG", label: "Singapore", timezone: "UTC+8", value: "sin" },
  { country: "DE", label: "Berlin", timezone: "UTC+1", value: "ber" },
  { country: "IN", label: "Mumbai", timezone: "UTC+5:30", value: "bom" },
  { country: "CA", label: "Toronto", timezone: "UTC-5", value: "yyz" },
  { country: "BR", label: "São Paulo", timezone: "UTC-3", value: "gru" },
];

export default function Particle() {
  const [selected, setSelected] = useState<City | null>(null);

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Combobox
        items={cities}
        onValueChange={(v) => setSelected(v as City | null)}
        value={selected}
      >
        <ComboboxInput
          placeholder="Search city..."
          startAddon={<MapPinIcon />}
        />
        <ComboboxPopup>
          <ComboboxEmpty>No cities found.</ComboboxEmpty>
          <ComboboxList>
            {(city: City) => (
              <ComboboxItem
                className="**:data-check:ms-auto"
                key={city.value}
                value={city}
              >
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-sm">{city.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {city.country} · {city.timezone}
                  </span>
                </div>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
      {selected && (
        <div className="rounded-lg border px-4 py-2.5 text-sm">
          <span className="text-muted-foreground">Selected: </span>
          <span className="font-medium">{selected.label}</span>
          <span className="ml-2 text-muted-foreground text-xs">
            {selected.timezone}
          </span>
        </div>
      )}
    </div>
  );
}
