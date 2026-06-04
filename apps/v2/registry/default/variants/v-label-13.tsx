import { MailIcon } from "lucide-react";
import { useId } from "react";
import { Field } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  const id = useId();
  return (
    <Field className="w-full max-w-xs">
      <Label className="gap-1.5" htmlFor={id}>
        <MailIcon aria-hidden="true" className="size-3.5" />
        Email address
      </Label>
      <Input id={id} placeholder="you@example.com" type="email" />
    </Field>
  );
}
