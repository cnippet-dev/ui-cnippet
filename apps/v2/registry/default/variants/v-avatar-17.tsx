import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

type Status = "online" | "busy" | "away" | "offline";

const statusColor: Record<Status, string> = {
  away: "bg-yellow-400",
  busy: "bg-red-500",
  offline: "bg-muted-foreground/40",
  online: "bg-emerald-500",
};

const members = [
  {
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    initials: "AJ",
    name: "Alex Johnson",
    status: "online" as Status,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    initials: "SC",
    name: "Sarah Chen",
    status: "busy" as Status,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=96&h=96&dpr=2&q=80",
    initials: "MR",
    name: "Marcus Reed",
    status: "online" as Status,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    initials: "LP",
    name: "Laura Park",
    status: "away" as Status,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=96&h=96&dpr=2&q=80",
    initials: "TK",
    name: "Tom Kim",
    status: "offline" as Status,
  },
  {
    avatar: "https://github.com/maxleiter.png",
    initials: "ML",
    name: "Max Leiter",
    status: "online" as Status,
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Frame>
        <FramePanel>
          <p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-widest">
            Team · {members.filter((m) => m.status === "online").length} online
          </p>
          <div className="grid grid-cols-3 gap-4">
            {members.map((m) => (
              <div
                className="flex flex-col items-center gap-1.5"
                key={m.initials}
              >
                <div className="relative">
                  <Avatar className="size-10">
                    <AvatarImage alt={m.name} src={m.avatar} />
                    <AvatarFallback className="text-xs">
                      {m.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute right-0 bottom-0 size-2.5 rounded-full ring-2 ring-background ${statusColor[m.status]}`}
                  />
                </div>
                <span className="max-w-full truncate text-center text-muted-foreground text-xs">
                  {m.name.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </FramePanel>
      </Frame>
    </div>
  );
}
