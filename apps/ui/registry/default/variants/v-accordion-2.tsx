import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    content:
      "We use industry-standard AES-256 encryption to protect your sensitive information at rest and in transit.",
    trigger: "Data Security",
    value: "security",
  },
  {
    content:
      "Seamlessly connect with your favorite tools using our robust REST API and pre-built connectors.",
    trigger: "API Integration",
    value: "integration",
  },
  {
    content:
      "Invite team members, assign roles, and work together in real-time on shared projects and documents.",
    trigger: "Team Collaboration",
    value: "collaboration",
  },
];

export default function Pattern() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Accordion defaultValue={["security"]}>
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger
              className="hover:no-underline"
              icon={
                <div className="flex h-7 w-7 items-center justify-center">
                  <Plus className="in-data-open:hidden" size={16} />
                  <Minus className="in-data-open:block hidden" size={16} />
                </div>
              }
            >
              <span>{item.trigger}</span>
            </AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
