import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Switch } from "@/registry/default/ui/switch";

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Field className="flex-row">
        <div className="space-y-2">
          <FieldLabel className="text-destructive" htmlFor="sw-danger ">
            Delete all data on sign out
          </FieldLabel>
          <FieldDescription>
            When enabled, all local data will be permanently removed when you
            sign out. This action cannot be undone.
          </FieldDescription>
        </div>
        <Switch className="data-checked:bg-destructive" id="sw-danger" />
      </Field>
    </div>
  );
}
