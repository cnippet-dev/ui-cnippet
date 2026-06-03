import {
  Select,
  SelectItem,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const activeRoles = [
  { label: "Owner", value: "owner" },
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
];

const comingSoon = [
  { label: "Guest", value: "guest" },
  { label: "Contractor", value: "contractor" },
];

const placeholder = { label: "Select a role", value: null };
const allItems = [placeholder, ...activeRoles, ...comingSoon];

export default function Particle() {
  return (
    <Select defaultValue={activeRoles[2]} items={allItems}>
      <SelectTrigger className="w-52">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {activeRoles.map((item) => (
          <SelectItem key={item.value} value={item}>
            {item.label}
          </SelectItem>
        ))}
        <SelectSeparator />
        {comingSoon.map((item) => (
          <SelectItem disabled key={item.value} value={item}>
            {item.label}
            <span className="ms-1.5 text-muted-foreground text-xs">
              (coming soon)
            </span>
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
