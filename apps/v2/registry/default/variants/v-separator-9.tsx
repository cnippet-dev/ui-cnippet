import { Separator } from "@/registry/default/ui/separator";

const sections = [
  {
    items: ["Account settings", "Privacy & security", "Notifications"],
    label: "Profile",
  },
  {
    items: ["Billing", "Plans & pricing", "Invoices"],
    label: "Subscription",
  },
  {
    items: ["Help center", "Contact support"],
    label: "Support",
  },
];

export function Pattern() {
  return (
    <div className="w-full max-w-xs space-y-1">
      {sections.map((section, si) => (
        <div key={section.label}>
          {si > 0 && <Separator className="my-2" />}
          <p className="px-2 pb-1 font-medium text-muted-foreground text-xs uppercase tracking-wide">
            {section.label}
          </p>
          {section.items.map((item) => (
            <div
              className="cursor-pointer rounded-md px-2 py-1.5 text-sm hover:bg-muted"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
