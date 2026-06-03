"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";

const SECTIONS = [
  {
    description:
      "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact support. This includes name, email address, payment information, and any other information you choose to provide.",
    id: "collection",
    title: "What data we collect",
  },
  {
    description:
      "We use your information to operate and improve our services, process transactions, send service-related emails, and comply with legal obligations. We do not sell your personal data to third parties.",
    id: "usage",
    title: "How we use your data",
  },
  {
    description:
      "We share your information with service providers who assist us in operating our business, subject to confidentiality agreements. We may also disclose information when required by law.",
    id: "sharing",
    title: "Data sharing",
  },
  {
    description:
      "You may access, update, or delete your personal information at any time via your account settings. You may also opt out of marketing communications by clicking 'Unsubscribe' in any email.",
    id: "rights",
    title: "Your rights",
  },
];

export function Pattern() {
  const [open, setOpen] = useState<string | null>("collection");

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-sm">Privacy Policy</CardTitle>
          <p className="text-muted-foreground text-xs">
            Last updated June 3, 2026
          </p>
        </CardHeader>
        <CardPanel className="space-y-0 divide-y py-0">
          {SECTIONS.map((s) => (
            <Collapsible
              key={s.id}
              onOpenChange={(o) => setOpen(o ? s.id : null)}
              open={open === s.id}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between py-3 text-left font-medium text-sm transition-colors hover:text-primary">
                {s.title}
                <ChevronDownIcon className="size-3.5 shrink-0 in-data-panel-open:rotate-180 text-muted-foreground transition-transform duration-200" />
              </CollapsibleTrigger>
              <CollapsiblePanel>
                <p className="pb-3 text-muted-foreground text-xs leading-relaxed">
                  {s.description}
                </p>
              </CollapsiblePanel>
            </Collapsible>
          ))}
        </CardPanel>
      </Card>
    </div>
  );
}
