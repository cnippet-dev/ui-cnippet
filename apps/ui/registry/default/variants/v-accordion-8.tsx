"use client"
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const allItems = [
  {
    content:
      "Click the 'Sign Up' button and follow the onboarding wizard. You can also sign in with Google or GitHub.",
    trigger: "How do I create an account?",
    value: "getting-started",
  },
  {
    content:
      "We offer a 30‑day money‑back guarantee for all annual plans. Contact support to request a refund.",
    trigger: "What is your refund policy?",
    value: "pricing",
  },
  {
    content:
      "Yes, our Slack integration sends real‑time notifications for important events.",
    trigger: "Do you integrate with Slack?",
    value: "integrations",
  },
  {
    content:
      "Absolutely. You can enable TOTP‑based 2FA from your account security settings.",
    trigger: "Is two‑factor authentication available?",
    value: "security",
  },
];

export default function AccordionWithSearch() {
  const [search, setSearch] = useState("");

  const filteredItems = allItems.filter(
    (item) =>
      item.trigger.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          value={search}
        />
      </div>
      {filteredItems.length === 0 ? (
        <p className="py-6 text-center text-muted-foreground">
          No matching questions found.
        </p>
      ) : (
        <Accordion className="space-y-1" type="multiple">
          {filteredItems.map(({ value, trigger, content }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="hover:no-underline">
                {trigger}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
