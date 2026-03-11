import { ArrowUpRightIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    content: (
      <>
        <p>
          <a className="text-primary hover:underline" href="#">
            Annual billing is available
          </a>{" "}
          with a 20% discount. All plans include a 14-day free trial with no
          credit card required.
        </p>
        <Button className="mt-4" size="sm">
          View plans
          <ArrowUpRightIcon className="size-4" />
        </Button>
      </>
    ),
    trigger: "What subscription plans do you offer?",
    value: "plans",
  },
  {
    content: (
      <>
        <p>
          Billing occurs automatically at the start of each billing cycle. We
          accept all major credit cards, PayPal, and ACH transfers for
          enterprise customers.
        </p>
      </>
    ),
    trigger: "How does billing work?",
    value: "billing",
  },
  {
    content: (
      <>
        <p>
          We take security seriously. All data is encrypted at rest using
          AES-256 and in transit via TLS 1.3. We perform regular third-party
          security audits and maintain SOC 2 Type II compliance.
        </p>
        <p>
          You can also enable multi-factor authentication (MFA) and single
          sign-on (SSO) for additional security.
        </p>
      </>
    ),
    trigger: "Is my data secure?",
    value: "security",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Subscription & Billing</CardTitle>
          <CardDescription>
            Common questions about your account, plans, and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion defaultValue={["plans"]} multiple>
            {items.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
