import { InfoIcon } from "lucide-react";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

type Field = {
  id: string;
  label: string;
  placeholder: string;
  hint: string;
};

const fields: Field[] = [
  {
    hint: "3–20 characters, letters, numbers, and underscores only.",
    id: "username",
    label: "Username",
    placeholder: "john_doe",
  },
  {
    hint: "Must be 8+ chars with at least one uppercase letter and one number.",
    id: "password",
    label: "Password",
    placeholder: "••••••••",
  },
  {
    hint: "We only use this for account recovery — no marketing emails.",
    id: "email",
    label: "Email",
    placeholder: "you@example.com",
  },
];

export function Pattern() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <TooltipProvider>
        {fields.map(({ id, label, placeholder, hint }) => (
          <div className="space-y-1.5" key={id}>
            <div className="flex items-center gap-1.5">
              <Label htmlFor={id}>{label}</Label>
              <Tooltip>
                <TooltipTrigger
                  aria-label={`${label} format requirements`}
                  className="inline-flex cursor-default text-muted-foreground hover:text-foreground"
                >
                  <InfoIcon className="size-3.5" />
                </TooltipTrigger>
                <TooltipContent className="max-w-52">{hint}</TooltipContent>
              </Tooltip>
            </div>
            <Input id={id} placeholder={placeholder} />
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
}
