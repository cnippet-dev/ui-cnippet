"use client";

import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/default/ui/autocomplete";

type Country = { id: string; label: string; code: string; flag: string };

const countries: Country[] = [
  { code: "US", flag: "🇺🇸", id: "us", label: "United States" },
  { code: "GB", flag: "🇬🇧", id: "gb", label: "United Kingdom" },
  { code: "DE", flag: "🇩🇪", id: "de", label: "Germany" },
  { code: "FR", flag: "🇫🇷", id: "fr", label: "France" },
  { code: "JP", flag: "🇯🇵", id: "jp", label: "Japan" },
  { code: "IN", flag: "🇮🇳", id: "in", label: "India" },
  { code: "CA", flag: "🇨🇦", id: "ca", label: "Canada" },
  { code: "AU", flag: "🇦🇺", id: "au", label: "Australia" },
  { code: "BR", flag: "🇧🇷", id: "br", label: "Brazil" },
  { code: "SG", flag: "🇸🇬", id: "sg", label: "Singapore" },
  { code: "NL", flag: "🇳🇱", id: "nl", label: "Netherlands" },
  { code: "SE", flag: "🇸🇪", id: "se", label: "Sweden" },
  { code: "NO", flag: "🇳🇴", id: "no", label: "Norway" },
  { code: "CH", flag: "🇨🇭", id: "ch", label: "Switzerland" },
  { code: "KR", flag: "🇰🇷", id: "kr", label: "South Korea" },
  { code: "MX", flag: "🇲🇽", id: "mx", label: "Mexico" },
  { code: "ES", flag: "🇪🇸", id: "es", label: "Spain" },
  { code: "IT", flag: "🇮🇹", id: "it", label: "Italy" },
  { code: "PL", flag: "🇵🇱", id: "pl", label: "Poland" },
  { code: "ZA", flag: "🇿🇦", id: "za", label: "South Africa" },
];

export default function Particle() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <label className="font-medium text-sm">Country</label>
      <Autocomplete items={countries}>
        <AutocompleteInput
          placeholder="Search country…"
          showClear
          showTrigger
        />
        <AutocompletePopup>
          <AutocompleteEmpty>No country found.</AutocompleteEmpty>
          <AutocompleteList>
            {(country: Country) => (
              <AutocompleteItem key={country.id} value={country}>
                <div className="flex w-full items-center gap-2.5">
                  <span aria-hidden="true" className="text-base leading-none">
                    {country.flag}
                  </span>
                  <span className="flex-1 font-medium text-sm">
                    {country.label}
                  </span>
                  <span className="font-mono text-muted-foreground text-xs">
                    {country.code}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
