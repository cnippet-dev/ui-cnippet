"use client";

import { BellIcon, CreditCardIcon, ShieldIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/registry/default/ui/card";

const sections = [
  { icon: UserIcon, id: "profile", label: "Profile" },
  { icon: BellIcon, id: "notifications", label: "Notifications" },
  { icon: CreditCardIcon, id: "billing", label: "Billing" },
  { icon: ShieldIcon, id: "security", label: "Security" },
];

const content: Record<string, { description: string; title: string }> = {
  billing: {
    description: "Manage your subscription, invoices, and payment methods.",
    title: "Billing & Plans",
  },
  notifications: {
    description: "Control how and when you receive alerts and digest emails.",
    title: "Notification Preferences",
  },
  profile: {
    description: "Update your display name, avatar, and contact information.",
    title: "Profile Settings",
  },
  security: {
    description: "Set a strong password and enable two-factor authentication.",
    title: "Security Settings",
  },
};

export function Pattern() {
  const [active, setActive] = useState("profile");
  const panel = content[active];

  return (
    <Card className="w-full max-w-sm p-0">
      <CardContent className="flex gap-0 p-0">
        <nav className="flex w-36 shrink-0 flex-col gap-0.5 border-r p-2">
          {sections.map(({ icon: Icon, id, label }) => (
            <button
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                active === id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              key={id}
              onClick={() => setActive(id)}
              type="button"
            >
              <Icon className="size-3.5 shrink-0" />
              {label}
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-2 p-4">
          <h3 className="font-semibold text-sm">{panel?.title}</h3>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {panel?.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
