import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";

const faqs = [
  {
    answer: "Yes. Every plan starts with a 14-day trial, no card required.",
    question: "Is there a free trial?",
  },
  {
    answer:
      "Upgrade or downgrade at any time from Billing. Changes are prorated.",
    question: "Can I change plans later?",
  },
  {
    answer: "Your data stays available to export for 30 days after you cancel.",
    question: "What happens when I cancel?",
  },
];

export default function Particle() {
  return (
    <div className="grid w-full max-w-2xl gap-8 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs">
          Single (one open at a time)
        </span>
        <Accordion defaultValue={["single-0"]}>
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`single-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionPanel>{faq.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs">
          Multiple (any can be open)
        </span>
        <Accordion defaultValue={["multi-0", "multi-1"]} multiple>
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`multi-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionPanel>{faq.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
