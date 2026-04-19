"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const STORAGE_KEY = "faq-accordion-state";

const items = [
  {
    content: "Our platform is built for speed and scalability.",
    trigger: "General Information",
    value: "general",
  },
  {
    content: "Choose between monthly or annual billing with a 20% discount.",
    trigger: "Pricing & Plans",
    value: "pricing",
  },
  {
    content: "We offer 24/7 email support for all paid plans.",
    trigger: "Technical Support",
    value: "support",
  },
];

export default function AccordionWithPersistence() {
  const [value, setValue] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : ["general"];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }, [value]);

  return (
    <Accordion
      className="w-full max-w-lg"
      onValueChange={setValue}
      value={value}
    >
      {items.map(({ value: itemValue, trigger, content }) => (
        <AccordionItem key={itemValue} value={itemValue}>
          <AccordionTrigger className="hover:no-underline">
            {trigger}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
