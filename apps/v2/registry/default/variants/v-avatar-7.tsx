import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";

export function Pattern() {
  return (
    <div className="flex items-center gap-1.5">
      <Avatar>
        <AvatarImage
          alt="Alex Johnson"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80"
        />
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-sm">Alex Johnson</span>
          <Badge size="sm" variant="default">
            Pro
          </Badge>
        </div>
        <span className="text-muted-foreground text-xs">Founder & CEO</span>
      </div>
    </div>
  );
}
