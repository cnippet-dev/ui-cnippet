import { Separator } from "@/registry/default/ui/separator";

export default function Particle() {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex items-center gap-1.5">
        <span className="font-semibold">2.4k</span>
        <span className="text-muted-foreground">Followers</span>
      </div>
      <Separator className="h-4" orientation="vertical" />
      <div className="flex items-center gap-1.5">
        <span className="font-semibold">148</span>
        <span className="text-muted-foreground">Following</span>
      </div>
      <Separator className="h-4" orientation="vertical" />
      <div className="flex items-center gap-1.5">
        <span className="font-semibold">37</span>
        <span className="text-muted-foreground">Posts</span>
      </div>
      <Separator className="h-4" orientation="vertical" />
      <div className="flex items-center gap-1.5">
        <span className="font-semibold">9.1k</span>
        <span className="text-muted-foreground">Likes</span>
      </div>
    </div>
  );
}
