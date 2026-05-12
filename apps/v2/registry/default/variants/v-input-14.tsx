import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

export function Pattern() {
  return (
    <form className="max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
          <Input id="form-phone" placeholder="+1 (555) 123-4567" type="tel" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-country">Country</FieldLabel>
          <Select defaultValue="us">
            <SelectTrigger id="form-country">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="form-address">Address</FieldLabel>
        <Input id="form-address" placeholder="123 Main St" type="text" />
      </Field>
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
