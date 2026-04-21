import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";

const nestedItems = [
  {
    content:
      "Detailed technical specs including dimensions, weight, and power requirements.",
    trigger: "Technical Specifications",
    value: "sub-item-1",
  },
  {
    content:
      "List of supported devices and operating systems for this product.",
    trigger: "Compatibility",
    value: "sub-item-2",
  },
];

const mainItems = [
  {
    content:
      "This product is designed for high-performance enterprise environments requiring maximum reliability.",
    trigger: "Product Overview",
    value: "product-info",
  },
  {
    isNested: true,
    trigger: "Additional Details",
    value: "details",
  },
  {
    content:
      "Free standard shipping on orders over $500. 30-day return policy applies.",
    trigger: "Shipping & Returns",
    value: "shipping",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Accordion
        className="space-y-2 border-none"
        defaultValue={["details"]}
        multiple={false}
      >
        {mainItems.map((item) => (
          <AccordionItem
            className="rounded-lg border border-border bg-transparent px-4"
            key={item.value}
            value={item.value}
          >
            <AccordionTrigger className="items-center py-3 font-medium hover:no-underline">
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent className="h-auto text-muted-foreground">
              {item.isNested ? (
                <Accordion
                  className="space-y-2 border-none"
                  defaultValue={["sub-item-1"]}
                  multiple={false}
                >
                  {nestedItems.map((subItem) => (
                    <AccordionItem
                      className="rounded-lg border border-border bg-transparent px-3"
                      key={subItem.value}
                      value={subItem.value}
                    >
                      <AccordionTrigger className="items-center py-3 font-medium text-foreground hover:no-underline">
                        {subItem.trigger}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm">
                        {subItem.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                item.content
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
