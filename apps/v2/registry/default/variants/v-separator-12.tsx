import { Separator } from "@/registry/default/ui/separator";

export default function Particle() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="flex items-center gap-3">
        <span className="shrink-0 font-medium text-sm">Recent Activity</span>
        <Separator />
      </div>
      <div className="space-y-1.5 text-muted-foreground text-sm">
        <p>Pushed 3 commits to main branch</p>
        <p>Opened pull request #45</p>
        <p>Commented on issue #38</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="shrink-0 font-medium text-sm">Repositories</span>
        <Separator />
      </div>
      <div className="space-y-1.5 text-muted-foreground text-sm">
        <p>ui-cnippet (public)</p>
        <p>design-system (private)</p>
      </div>
    </div>
  );
}
