import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Component() {
  const items = [
    {
      content:
        "Cnippet  UI is a library of high-quality unstyled React components for design systems and web apps.",
      id: "1",
      title: "What is Cnippet  UI?",
    },
    {
      content:
        "Head to the \"Quick start\" guide in the docs. If you've used unstyled libraries before, you'll feel at home.",
      id: "2",
      title: "How do I get started?",
    },
    {
      content: "Of course! Cnippet  UI is free and open source.",
      id: "3",
      title: "Can I use it for my project?",
    },
  ];

  return (
    <Accordion className="space-y-2 md:max-w-md" defaultValue={["1"]}>
      {items.map((item) => (
        <AccordionItem
          className="rounded-2xl border px-4 last:border-b data-open:bg-neutral-800"
          key={item.id}
          value={item.id}
        >
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionPanel>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
