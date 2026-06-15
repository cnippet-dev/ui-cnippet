import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const sizes = [
  { label: "Select a plan", value: null },
  { label: "Free", value: "free" },
  { label: "Pro", value: "pro" },
  { label: "Team", value: "team" },
  { label: "Enterprise", value: "enterprise" },
];

export default function Component() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-muted-foreground text-xs">Small</span>
        <Select items={sizes}>
          <SelectTrigger className="w-48" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {sizes.slice(1).map((item) => (
              <SelectItem key={item.value} value={item}>
                {item.label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-muted-foreground text-xs">Default</span>
        <Select items={sizes}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {sizes.slice(1).map((item) => (
              <SelectItem key={item.value} value={item}>
                {item.label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-muted-foreground text-xs">Large</span>
        <Select items={sizes}>
          <SelectTrigger className="w-48" size="lg">
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {sizes.slice(1).map((item) => (
              <SelectItem key={item.value} value={item}>
                {item.label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </div>
    </div>
  );
}
