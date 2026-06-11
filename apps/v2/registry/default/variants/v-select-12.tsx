import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const regionGroups = [
  {
    items: [
      { label: "United States", value: "us" },
      { label: "Canada", value: "ca" },
      { label: "Brazil", value: "br" },
    ],
    label: "Americas",
  },
  {
    items: [
      { label: "United Kingdom", value: "gb" },
      { label: "Germany", value: "de" },
      { label: "France", value: "fr" },
    ],
    label: "Europe",
  },
  {
    items: [
      { label: "Japan", value: "jp" },
      { label: "Australia", value: "au" },
      { label: "India", value: "in" },
    ],
    label: "Asia Pacific",
  },
];

const placeholder = { label: "Select a region", value: null };
const allItems = [placeholder, ...regionGroups.flatMap((g) => g.items)];

export default function Particle() {
  return (
    <Select items={allItems}>
      <SelectTrigger className="w-52">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {regionGroups.map((group) => (
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
