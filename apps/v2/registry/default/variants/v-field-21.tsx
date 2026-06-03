import { UploadIcon } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Field>
      <FieldLabel>
        <span className="flex items-center gap-1.5">
          <UploadIcon aria-hidden="true" className="size-4 opacity-60" />
          Upload resume
        </span>
      </FieldLabel>
      <Input accept=".pdf,.doc,.docx" type="file" />
      <FieldDescription>PDF or Word document, max 5 MB.</FieldDescription>
      <FieldError>Please upload a valid file.</FieldError>
    </Field>
  );
}
