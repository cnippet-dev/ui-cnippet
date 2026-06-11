"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";

const FAQS = [
  {
    answer:
      "You can cancel at any time from your account settings. Your subscription remains active until the end of the current billing period.",
    id: "cancel",
    question: "How do I cancel my subscription?",
  },
  {
    answer:
      "Yes — we offer a 14-day free trial with no credit card required. You get full access to all Pro features during the trial.",
    id: "trial",
    question: "Is there a free trial?",
  },
  {
    answer:
      "We accept Visa, Mastercard, American Express, and PayPal. All transactions are secured with TLS encryption.",
    id: "payment",
    question: "What payment methods do you accept?",
  },
  {
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time and the price difference will be prorated automatically.",
    id: "switch",
    question: "Can I switch plans mid-cycle?",
  },
];

export function Pattern() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="mb-1 flex items-center justify-between">
        <p className="font-semibold text-sm">Frequently Asked Questions</p>
        <Badge size="sm" variant="secondary">
          {FAQS.length} questions
        </Badge>
      </div>
      {FAQS.map((faq) => (
        <Collapsible
          key={faq.id}
          onOpenChange={(o) => setOpen(o ? faq.id : null)}
          open={open === faq.id}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left font-medium text-sm transition-colors hover:bg-muted/50">
            {faq.question}
            <ChevronDownIcon className="size-4 shrink-0 in-data-panel-open:rotate-180 text-muted-foreground transition-transform duration-200" />
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div className="rounded-b-lg border border-t-0 bg-muted/30 px-4 py-3 text-muted-foreground text-sm leading-relaxed">
              {faq.answer}
            </div>
          </CollapsiblePanel>
        </Collapsible>
      ))}
    </div>
  );
}
