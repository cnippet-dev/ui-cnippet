import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const timezones = [
  { label: "Select timezone", value: null },
  { label: "Pacific Time (PT)", value: "america/los_angeles" },
  { label: "Mountain Time (MT)", value: "america/denver" },
  { label: "Central Time (CT)", value: "america/chicago" },
  { label: "Eastern Time (ET)", value: "america/new_york" },
  { label: "Greenwich Mean Time (GMT)", value: "europe/london" },
  { label: "Central European Time (CET)", value: "europe/paris" },
  { label: "India Standard Time (IST)", value: "asia/kolkata" },
  { label: "Japan Standard Time (JST)", value: "asia/tokyo" },
];

export default function Component() {
  return (
    <Select items={timezones}>
      <SelectTrigger className="w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {timezones.slice(1).map((tz) => (
          <SelectItem key={tz.value} value={tz}>
            {tz.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
