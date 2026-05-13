import { Field } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label className="gap-1.5" htmlFor="label-status">
        Server Status
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-green-500" />
        </span>
      </Label>
      <Input defaultValue="Online" disabled id="label-status" />
    </Field>
  );
}
