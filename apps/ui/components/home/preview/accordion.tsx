"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

const items = ["1", "2"];

export function AccordionPreview() {
  const [value, setValue] = useState(["1"]);

  return (
    <Accordion
      className="mx-auto rounded-2xl bg-neutral-200/50 p-4 md:w-48 dark:bg-neutral-800"
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
