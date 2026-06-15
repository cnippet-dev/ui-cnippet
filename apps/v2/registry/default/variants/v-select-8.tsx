import {
  Select,
  SelectItem,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const availablePlans = [
  { label: "Free", value: "free" },
  { label: "Pro", value: "pro" },
  { label: "Team", value: "team" },
];

const unavailablePlans = [
  { label: "Enterprise", value: "enterprise" },
  { label: "Custom", value: "custom" },
];

const placeholder = { label: "Select a plan", value: null };
const allItems = [placeholder, ...availablePlans, ...unavailablePlans];

export default function Component() {
  return (
    <Select items={allItems}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {availablePlans.map((item) => (
          <SelectItem key={item.value} value={item}>
            {item.label}
          </SelectItem>
        ))}
        <SelectSeparator />
        {unavailablePlans.map((item) => (
          <SelectItem disabled key={item.value} value={item}>
            {item.label}
            <span className="ms-auto text-muted-foreground text-xs">
              Contact us
            </span>
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
