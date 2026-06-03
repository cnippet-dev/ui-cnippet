import { BellIcon, CreditCardIcon, ShieldIcon, UserIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";

const sections = [
  {
    icon: UserIcon,
    label: "Account",
    links: ["Profile", "Display Name", "Email Address", "Language & Region"],
    value: "account",
  },
  {
    icon: ShieldIcon,
    label: "Security",
    links: ["Password", "Two-Factor Auth", "Active Sessions", "Login History"],
    value: "security",
  },
  {
    icon: BellIcon,
    label: "Notifications",
    links: [
      "Email Alerts",
      "Push Notifications",
      "Digest Frequency",
      "Do Not Disturb",
    ],
    value: "notifications",
  },
  {
    icon: CreditCardIcon,
    label: "Billing",
    links: [
      "Subscription Plan",
      "Payment Methods",
      "Invoices",
      "Usage & Limits",
    ],
    value: "billing",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-widest">
        Settings
      </p>
      <Accordion defaultValue={["account"]} multiple>
        {sections.map(({ icon: Icon, label, value, links }) => (
          <AccordionItem className="border-none" key={value} value={value}>
            <AccordionTrigger className="rounded-md px-2 py-2 hover:bg-accent hover:no-underline">
              <div className="flex items-center gap-2.5">
                <Icon className="size-4 text-muted-foreground" />
                <span className="font-medium text-sm">{label}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-1">
              <ul className="ml-6 flex flex-col gap-0.5 border-l pl-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      className="block rounded-sm py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
                      href="#"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
