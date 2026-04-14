"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

const items = ["1", "2", "3"];

export function HomeAccordionPreview() {
  const [value, setValue] = useState(["1"]);

  return (
    <Accordion
      className="mx-auto rounded-2xl bg-neutral-800 p-4 md:w-52"
      onValueChange={setValue}
      value={value}
    >
      {items.map((id) => (
        <AccordionItem key={id} onMouseEnter={() => setValue([id])} value={id}>
          <AccordionTrigger className="py-3">
            <Skeleton className="h-2 w-20" />
          </AccordionTrigger>
          <AccordionPanel>
            <div className="space-y-2">
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-2 w-5/6" />
            </div>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
