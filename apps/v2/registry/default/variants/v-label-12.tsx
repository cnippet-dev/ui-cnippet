import Link from "next/link";
import { useId } from "react";
import { Field } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  const id = useId();
  return (
    <Field className="w-full max-w-xs">
      <div className="flex w-full items-center justify-between">
        <Label htmlFor={id}>Password</Label>
        <Link
          className="text-muted-foreground text-xs underline-offset-4 hover:underline"
          href="#"
        >
          Forgot password?
        </Link>
      </div>
      <Input id={id} placeholder="••••••••" type="password" />
    </Field>
  );
}
