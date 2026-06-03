import { SearchIcon } from "lucide-react";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="input-icon-search">Search</FieldLabel>
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground/80"
        >
          <SearchIcon className="size-4" />
        </div>
        <Input
          className="ps-9"
          id="input-icon-search"
          placeholder="Search projects…"
          type="search"
        />
      </div>
    </Field>
  );
}
