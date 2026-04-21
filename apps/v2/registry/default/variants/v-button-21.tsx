import { MailIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";

export function Pattern() {
  return (
    <Button
      aria-label="Inbox (8 unread)"
      className="relative gap-2"
      variant="outline"
    >
      <MailIcon aria-hidden="true" />
      Inbox
      <Badge
        aria-hidden="true"
        className="absolute -top-1.5 -right-2 rounded-full px-1"
        size="sm"
        variant="destructive"
      >
        8
      </Badge>
    </Button>
  );
}
