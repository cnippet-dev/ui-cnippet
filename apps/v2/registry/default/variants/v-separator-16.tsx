import { Separator } from "@/registry/default/ui/separator";

export default function Particle() {
  return (
    <div className="w-full max-w-sm">
      <div className="space-y-1">
        <h4 className="font-medium text-sm">Cnippet UI</h4>
        <p className="text-muted-foreground text-sm">
          Components for product teams.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Blog</span>
        <Separator orientation="vertical" />
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  );
}
