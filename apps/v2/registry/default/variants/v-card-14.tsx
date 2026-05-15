import { ChevronRightIcon, ShoppingBagIcon } from "lucide-react";
import { Card, CardContent } from "@/registry/default/ui/card";

const item = {
  description:
    "Track and review all recent purchases, updates, and status changes in one place.",
  icon: <ShoppingBagIcon aria-hidden="true" />,
  link: "View Orders",
  title: "Recent Orders Overview",
};

export function Pattern() {
  return (
    <Card className="w-full max-w-xs">
      <CardContent className="flex flex-col gap-3">
        <div className="flex size-11 items-center justify-center rounded-md bg-primary [&_svg]:size-5 [&_svg]:text-primary-foreground">
          {item.icon}
        </div>
        <a
          className="block font-medium text-foreground text-sm leading-tight hover:text-primary"
          href="#"
        >
          {item.title}
        </a>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {item.description}
        </p>
        <a
          className="inline-flex items-center gap-1 font-medium text-primary text-xs hover:underline"
          href="#"
        >
          {item.link}
          <ChevronRightIcon aria-hidden="true" className="size-2.5 shrink-0" />
        </a>
      </CardContent>
    </Card>
  );
}
