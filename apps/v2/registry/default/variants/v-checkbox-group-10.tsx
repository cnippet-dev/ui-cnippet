import type { LucideIcon } from "lucide-react";
import {
  BellIcon,
  MailIcon,
  MessageSquareIcon,
  SmartphoneIcon,
} from "lucide-react";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Label } from "@/registry/default/ui/label";

type Channel = { Icon: LucideIcon; id: string; label: string };

const channels: Channel[] = [
  { Icon: MailIcon, id: "email", label: "Email" },
  { Icon: BellIcon, id: "push", label: "Push" },
  { Icon: SmartphoneIcon, id: "sms", label: "SMS" },
  { Icon: MessageSquareIcon, id: "in-app", label: "In-app" },
];

export default function Component() {
  return (
    <CheckboxGroup
      aria-label="Notification channels"
      className="flex-row gap-x-5"
      defaultValue={["email", "in-app"]}
    >
      {channels.map(({ Icon, id, label }) => (
        <Label key={id}>
          <Checkbox value={id} />
          <Icon aria-hidden="true" className="size-4 opacity-70" />
          {label}
        </Label>
      ))}
    </CheckboxGroup>
  );
}
