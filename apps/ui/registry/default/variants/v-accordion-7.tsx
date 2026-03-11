import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    content:
      "Yes, you can use ReUI for any of your personal or commercial projects. The library is distributed under the MIT license.",
    trigger: "Can I use this for my project?",
    value: "item-1",
  },
  {
    content:
      "We are currently working on a comprehensive Figma design system that will be released soon to all ReUI users.",
    trigger: "Is there a Figma file available?",
    value: "item-2",
  },
  {
    content:
      "You can contribute by reporting bugs, suggesting features, or submitting pull requests on our GitHub repository.",
    trigger: "How do I contribute to ReUI?",
    value: "item-3",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Accordion defaultValue={["item-1"]} multiple={false}>
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="flex-row-reverse items-center justify-end gap-3 py-3 hover:no-underline *:data-[slot=accordion-trigger-icon]:hidden">
              <span className="font-medium text-foreground/90">
                {item.trigger}
              </span>
            </AccordionTrigger>
            <AccordionContent className="ps-7 text-muted-foreground leading-relaxed">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
