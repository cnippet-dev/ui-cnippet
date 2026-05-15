import { BookOpenIcon, LinkIcon } from "lucide-react";
import { Card, CardContent } from "@/registry/default/ui/card";

const item = {
  description:
    "Find guides, API references, and examples to integrate with our platform.",
  icon: <BookOpenIcon aria-hidden="true" />,
  label: "Documentation",
  link: "View docs",
};

export function Pattern() {
  return (
    <Card className="w-full max-w-xs p-0">
      <CardContent className="p-0">
        <div className="border-b px-4 py-3">
          <div className="flex items-center gap-2 text-muted-foreground [&_svg]:size-4">
            {item.icon}
            <span className="font-medium text-foreground text-sm">
              {item.label}
            </span>
          </div>
        </div>
        <div className="space-y-3 p-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {item.description}
          </p>
          <a
            className="inline-flex items-center gap-1 font-medium text-primary text-xs hover:underline"
            href="#"
          >
            <LinkIcon aria-hidden="true" className="size-2.5 shrink-0" />
            {item.link}
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
