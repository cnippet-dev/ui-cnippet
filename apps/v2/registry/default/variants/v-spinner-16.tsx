// title: Showcase: sizes, colors and in context
import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-center">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

export default function Particle() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Row label="Sizes">
        <Spinner className="size-3" />
        <Spinner className="size-4" />
        <Spinner className="size-6" />
        <Spinner className="size-8" />
      </Row>
      <Row label="Colors">
        <Spinner className="size-5 text-primary" />
        <Spinner className="size-5 text-muted-foreground" />
        <Spinner className="size-5 text-success" />
        <Spinner className="size-5 text-warning" />
        <Spinner className="size-5 text-destructive" />
      </Row>
      <Row label="In context">
        <Button disabled>
          <Spinner />
          Saving
        </Button>
        <span className="flex items-center gap-2 text-muted-foreground text-sm">
          <Spinner className="size-4" />
          Loading results…
        </span>
      </Row>
    </div>
  );
}
