import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const countryGroups = [
  {
    items: [
      { label: "🇺🇸 United States", value: "us" },
      { label: "🇨🇦 Canada", value: "ca" },
      { label: "🇲🇽 Mexico", value: "mx" },
    ],
    label: "North America",
  },
  {
    items: [
      { label: "🇬🇧 United Kingdom", value: "gb" },
      { label: "🇩🇪 Germany", value: "de" },
      { label: "🇫🇷 France", value: "fr" },
      { label: "🇮🇹 Italy", value: "it" },
      { label: "🇪🇸 Spain", value: "es" },
      { label: "🇳🇱 Netherlands", value: "nl" },
    ],
    label: "Europe",
  },
  {
    items: [
      { label: "🇯🇵 Japan", value: "jp" },
      { label: "🇨🇳 China", value: "cn" },
      { label: "🇮🇳 India", value: "in" },
      { label: "🇦🇺 Australia", value: "au" },
      { label: "🇸🇬 Singapore", value: "sg" },
      { label: "🇰🇷 South Korea", value: "kr" },
    ],
    label: "Asia Pacific",
  },
  {
    items: [
      { label: "🇧🇷 Brazil", value: "br" },
      { label: "🇦🇷 Argentina", value: "ar" },
      { label: "🇨🇴 Colombia", value: "co" },
    ],
    label: "Latin America",
  },
];

const placeholder = { label: "Select a country", value: null };
const allItems = [placeholder, ...countryGroups.flatMap((g) => g.items)];

export default function Component() {
  return (
    <Select items={allItems}>
      <SelectTrigger className="w-56">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup className="max-h-64">
        {countryGroups.map((group) => (
          <SelectGroup key={group.label}>
            <SelectGroupLabel>{group.label}</SelectGroupLabel>
            {group.items.map((item) => (
              <SelectItem key={item.value} value={item}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectPopup>
    </Select>
  );
}
