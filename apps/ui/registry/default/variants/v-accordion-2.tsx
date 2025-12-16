

import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionTrigger,
  } from "@/registry/default/ui/accordion";
  
  export default function Component() {
    const items = [
      {
        content:
          "Cnippet Ui is a library of high-quality unstyled React components for design systems and web apps.",
        id: "1",
        title: "What is Cnippet Ui?",
      },
      {
        content:
          "Head to the \"Quick start\" guide in the docs. If you've used unstyled libraries before, you'll feel at home.",
        id: "2",
        title: "How do I get started?",
      },
      {
        content: "Of course! Cnippet Ui is free and open source.",
        id: "3",
        title: "Can I use it for my project?",
      },
    ];
  
    return (
      <Accordion defaultValue={["1"]} className="w-lg">
        <AccordionItem>
          <AccordionTrigger>Accordion inside and an accordion</AccordionTrigger>
          <AccordionPanel>
            <Accordion className="w-lg pl-4" defaultValue={["3"]}>
              {items.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionPanel>{item.content}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionTrigger>This can be a surprize</AccordionTrigger>
          <AccordionPanel>Surpisseee!! 🙌</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }
  