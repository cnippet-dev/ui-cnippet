import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";

const items = [
  {
    content:
      "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members. There are no hidden fees or setup costs.",
    trigger: "How does billing work?",
    value: "billing",
  },
  {
    content:
      "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols. We also offer optional two-factor authentication and single sign-on for enterprise customers.",
    trigger: "Is my data secure?",
    value: "security",
  },
  {
    content: (
      <>
        <p>
          We integrate with 500+ popular tools including Slack, Zapier,
          Salesforce, HubSpot, and more. You can also build custom integrations
          using our REST API and webhooks.{" "}
        </p>
        <p>
          Our API documentation includes code examples in 10+ programming
          languages.
        </p>
      </>
    ),
    trigger: "What integrations do you support?",
    value: "integration",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Accordion
        className="space-y-2 border-0"
        defaultValue={["billing"]}
        multiple={false}
      >
        {items.map((item) => (
          <AccordionItem
            className="rounded-lg border border-border not-last:border-b px-3"
            key={item.value}
            value={item.value}
          >
            <AccordionTrigger className="items-center py-3 font-medium hover:no-underline">
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-4 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
