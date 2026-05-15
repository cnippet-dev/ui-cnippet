import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const avatars = [
  {
    fallback: "DK",
    name: "David Kim",
    src: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80",
  },
  {
    fallback: "ML",
    name: "Max Leiter",
    src: "https://github.com/maxleiter.png",
  },
  {
    fallback: "ER",
    name: "James Brown",
    src: "https://images.unsplash.com/photo-1543299750-19d1d6297053?w=96&h=96&dpr=2&q=80",
  },
  {
    fallback: "JW",
    name: "Jenny Wilson",
    src: "https://github.com/pranathip.png",
  },
];

export function Pattern() {
  return (
    <div className="group/avatars flex items-center px-2 py-4">
      {avatars.map((avatar, index) => (
        <div
          className="group/avatar-item translate-x-[calc(var(--index)*-8px)] transition-all duration-300 ease-in-out will-change-transform group-hover/avatars:translate-x-[calc(var(--index)*6px)]"
          key={index}
          style={
            {
              "--index": index,
              zIndex: avatars.length - index,
            } as React.CSSProperties
          }
        >
          <Tooltip>
            <TooltipTrigger
              render={
                <Avatar
                  className={cn(
                    "origin-center ring-2 ring-background transition-transform duration-300 ease-in-out",
                    "group-hover/avatar-item:scale-110",
                  )}
                >
                  <AvatarImage alt={avatar.name} src={avatar.src} />
                  <AvatarFallback className="text-xs">
                    {avatar.fallback}
                  </AvatarFallback>
                </Avatar>
              }
            />
            <TooltipContent sideOffset={10}>{avatar.name}</TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
