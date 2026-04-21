import { ChevronDownIcon } from "lucide-react";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";

export function Pattern() {
  return (
    <div className="h-40 w-full max-w-xs">
      <Card className="py-0">
        <CardContent className="px-3">
          <Collapsible>
            <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between gap-4 text-sm">
              <span>How do I reset my password?</span>
              <ChevronDownIcon
                aria-hidden="true"
                className="size-4 shrink-0 in-data-[state=open]:rotate-180 text-muted-foreground transition-transform"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <div className="pt-3 text-muted-foreground text-sm">
                You can reset your password by clicking the &quot;Forgot
                Password&quot; link on the login page. We&apos;ll send you an
                email with instructions to create a new password.
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}
