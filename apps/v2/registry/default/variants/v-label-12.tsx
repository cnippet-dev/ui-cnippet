import Link from "next/link";
import { useId } from "react";
import { Field } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  const id = useId();
  return (
    <Field className="w-full max-w-xs">
      <Label className="justify-between" htmlFor={id}>
        Password
        <Link
          className="text-xs font-normal text-muted-foreground underline-offset-4 hover:underline"
          href="/forgot-password"
        >
          Forgot password?
        </Link>
      </Label>
      <Input id={id} placeholder="••••••••" type="password" />
    </Field>
  );
}
