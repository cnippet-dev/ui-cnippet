import { ChevronsUpDownIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";

export function Pattern() {
  return (
    <div className="h-48 w-full max-w-xs">
      <Collapsible className="flex w-full flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-2">
          <h4 className="font-semibold text-sm">Order #4189</h4>
          <CollapsibleTrigger
            render={<Button className="size-8" size="icon" variant="ghost" />}
          >
            <ChevronsUpDownIcon aria-hidden="true" className="size-4" />
            <span className="sr-only">Toggle details</span>
          </CollapsibleTrigger>
        </div>

        <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2 text-sm">
          <span className="text-muted-foreground">Status</span>
          <Badge variant="success">Shipped</Badge>
        </div>

        <CollapsibleContent className="flex flex-col gap-2">
          <div className="rounded-lg border px-3 py-2 text-sm">
            <p className="font-medium">Shipping address</p>
            <p className="text-muted-foreground">
              100 Market St, San Francisco
            </p>
          </div>
          <div className="rounded-lg border px-3 py-2 text-sm">
            <p className="font-medium">Items</p>
            <p className="text-muted-foreground">2x Studio Headphones</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
