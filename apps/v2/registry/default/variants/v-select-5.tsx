"use client";

import type { LucideIcon } from "lucide-react";
import {
  BellIcon,
  GlobeIcon,
  LockIcon,
  ShieldIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

type NavItem = { Icon: LucideIcon; label: string; value: string };

const navItems: NavItem[] = [
  { Icon: UserIcon, label: "Profile", value: "profile" },
  { Icon: BellIcon, label: "Notifications", value: "notifications" },
  { Icon: LockIcon, label: "Privacy", value: "privacy" },
  { Icon: ShieldIcon, label: "Security", value: "security" },
  { Icon: GlobeIcon, label: "Language & Region", value: "language" },
  { Icon: ZapIcon, label: "Integrations", value: "integrations" },
];

const placeholder = { label: "Go to settings", value: null };
const allItems = [placeholder, ...navItems];

export default function Component() {
  return (
    <Select items={allItems}>
      <SelectTrigger className="w-52">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {navItems.map((item) => {
          const { Icon, label, value } = item;
          return (
            <SelectItem key={value} value={item}>
              <span className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </span>
            </SelectItem>
          );
        })}
      </SelectPopup>
    </Select>
  );
}
