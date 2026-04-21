import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import { Progress } from "@/registry/default/ui/progress";

export function Pattern() {
  return (
    <div className="h-72 w-full max-w-xs">
      <Collapsible className="relative">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-sm">3 days remaining in cycle</CardTitle>
            <CardAction>
              <Button size="sm" variant="outline">
                Billing
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 rounded-lg border border-border bg-muted/60 p-3">
              <div className="flex justify-between font-medium text-sm">
                <span>$18.08 / $20</span>
                <span>$200</span>
              </div>
              <Progress
                className="**:data-[slot=progress-track]:h-1.5 **:data-[slot=progress-track]:bg-primary/20"
                value={90}
              />
            </div>

            <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <div className="flex flex-col gap-2.5 pt-2">
                {[
                  { label: "Requests", value: "$210.84" },
                  { label: "Active CPU", value: "$21.95" },
                  { label: "Events", value: "$21.20" },
                  { label: "Storage Usage", value: "$20.45" },
                ].map((item) => (
                  <div
                    className="flex justify-between text-xs"
                    key={item.label}
                  >
                    <span className="font-medium text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </CardContent>
        </Card>

        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2">
          <CollapsibleTrigger
            render={
              <Button
                className="rounded-full bg-background! shadow-sm"
                size="icon-sm"
                variant="outline"
              />
            }
          >
            <ChevronDownIcon
              aria-hidden="true"
              className="size-3.5 in-data-panel-open:rotate-180 transition-transform"
            />
            <span className="sr-only">Toggle details</span>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </div>
  );
}
