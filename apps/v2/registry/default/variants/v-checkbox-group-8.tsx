import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";

const notifications = [
  {
    description: "Get notified when someone @mentions you.",
    id: "mentions",
    label: "Mentions",
  },
  {
    description: "Receive a summary of your team's activity.",
    id: "digest",
    label: "Weekly digest",
  },
  {
    description: "Security alerts and login notifications.",
    id: "security",
    label: "Security alerts",
  },
  {
    description: "Product updates and new feature announcements.",
    id: "product",
    label: "Product updates",
  },
];

export default function Component() {
  return (
    <CheckboxGroup
      aria-label="Notification preferences"
      className="gap-0 divide-y"
      defaultValue={["mentions", "security"]}
    >
      {notifications.map((item) => (
        <label
          className="flex cursor-pointer items-start gap-3 py-3 first:pt-0 last:pb-0"
          htmlFor={item.id}
          key={item.id}
        >
          <Checkbox className="mt-0.5" id={item.id} value={item.id} />
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-sm">{item.label}</span>
            <span className="text-muted-foreground text-xs">
              {item.description}
            </span>
          </div>
        </label>
      ))}
    </CheckboxGroup>
  );
}
