import { useId } from "react";
import { Field } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Kbd } from "@/registry/default/ui/kbd";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  const id = useId();
  return (
    <Field className="w-full max-w-xs">
      <Label className="justify-between" htmlFor={id}>
        Quick search
        <Kbd className="font-normal text-muted-foreground">⌘K</Kbd>
      </Label>
      <Input id={id} placeholder="Type to search…" type="search" />
    </Field>
  );
}
