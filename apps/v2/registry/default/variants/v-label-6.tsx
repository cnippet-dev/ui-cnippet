import { InfoIcon } from "lucide-react";
import { Field } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label className="gap-1" htmlFor="label-tooltip">
        API Key
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="inline-flex items-center">
              <span className="inline-flex cursor-help text-muted-foreground">
                <InfoIcon className="size-3.5" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your API key can be found in the developer settings.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Label>
      <Input
        className="font-mono"
        id="label-tooltip"
        placeholder="sk_live_..."
      />
    </Field>
  );
}
