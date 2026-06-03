import { useId } from "react";
import { Field } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

const fields = [
  { key: "first", label: "First name", placeholder: "Jane" },
  { key: "last", label: "Last name", placeholder: "Smith" },
  {
    key: "email",
    label: "Email",
    placeholder: "jane@example.com",
    type: "email",
  },
] as const;

export function Pattern() {
  return (
    <div className="w-full max-w-sm space-y-3">
      {fields.map(({ key, label, placeholder, type }) => (
        <HorizontalField
          key={key}
          label={label}
          placeholder={placeholder}
          type={type}
        />
      ))}
    </div>
  );
}

function HorizontalField({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  const id = useId();
  return (
    <Field className="grid grid-cols-[100px_1fr] items-center gap-4">
      <Label className="text-right" htmlFor={id}>
        {label}
      </Label>
      <Input id={id} placeholder={placeholder} type={type} />
    </Field>
  );
}
