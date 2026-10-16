import { Spinner } from "@/registry/default/ui/spinner";

export function Pattern() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Spinner className="size-4 text-primary" />
      <Spinner className="size-4 text-success" />
      <Spinner className="size-4 text-destructive" />
      <Spinner className="size-4 text-warning" />
      <Spinner className="size-4 text-info" />
    </div>
  );
}
