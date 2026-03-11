import { HelpCircleIcon, LockIcon, SettingsIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const items = [
  {
    badge: "New",
    content:
      "Manage your account preferences, security settings, and personal information. You can also configure two-factor authentication here.",
    icon: <SettingsIcon className="size-4 text-muted-foreground" />,
    trigger: "Account Settings",
    value: "account",
  },
  {
    content:
      "Control who can see your profile and what data we collect. View our latest security audits and transparency reports.",
    icon: <LockIcon className="size-4 text-muted-foreground" />,
    trigger: "Privacy & Security",
    value: "privacy",
  },
  {
    content:
      "Access our help center, community forums, and contact support. We're here to help you 24/7.",
    icon: <HelpCircleIcon className="size-4 text-muted-foreground" />,
    trigger: "Help & Support",
    value: "support",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Accordion
        className="space-y-3 border-0"
        defaultValue={["account"]}
        multiple={false}
      >
        {items.map((item) => (
          <AccordionItem
            className="rounded-lg border border-border bg-card px-2 last:border-b **:data-[slot=accordion-content]:p-0!"
            key={item.value}
            value={item.value}
          >
            <AccordionTrigger className="items-center px-1 py-3 font-semibold hover:no-underline">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                  {item.icon}
                </div>
                <span>{item.trigger}</span>
                {item.badge && <Badge variant="info">{item.badge}</Badge>}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-2 pt-0 pb-4 text-muted-foreground leading-relaxed">
              <div className="pl-11">{item.content}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
