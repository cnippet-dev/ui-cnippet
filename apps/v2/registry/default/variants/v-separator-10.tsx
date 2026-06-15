import { Separator } from "@/registry/default/ui/separator";

export function Pattern() {
  return (
    <div className="w-full max-w-xs rounded-xl border p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-sm">
          JD
        </div>
        <div>
          <p className="font-medium text-sm">Jane Doe</p>
          <p className="text-muted-foreground text-xs">
            @janedoe · Product Designer
          </p>
        </div>
      </div>
      <Separator className="my-3" />
      <p className="text-muted-foreground text-sm leading-relaxed">
        Building interfaces that get out of the way. Focused on clarity, speed,
        and things that actually ship.
      </p>
      <Separator className="my-3" />
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">San Francisco, CA</span>
        <a className="text-primary hover:underline" href="#">
          janedoe.design
        </a>
      </div>
    </div>
  );
}
