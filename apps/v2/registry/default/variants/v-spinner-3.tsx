import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";
export function Pattern() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button>
        <Spinner data-icon="inline-start" /> Processing…
      </Button>
      <Button disabled variant="outline">
        <Spinner data-icon="inline-start" /> Loading…
      </Button>
      <Button aria-label="Loading" disabled size="icon" variant="outline">
        <Spinner />
      </Button>
    </div>
  );
}
