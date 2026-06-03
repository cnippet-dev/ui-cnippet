import { GitCommitHorizontalIcon, TrophyIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

const leaderboard = [
  {
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    commits: 312,
    initials: "AJ",
    name: "Alex Johnson",
    rank: 1,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    commits: 247,
    initials: "SC",
    name: "Sarah Chen",
    rank: 2,
  },
  {
    avatar: "https://github.com/maxleiter.png",
    commits: 198,
    initials: "ML",
    name: "Max Leiter",
    rank: 3,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=96&h=96&dpr=2&q=80",
    commits: 154,
    initials: "MR",
    name: "Marcus Reed",
    rank: 4,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    commits: 89,
    initials: "LP",
    name: "Laura Park",
    rank: 5,
  },
];

const rankMedal: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Frame>
        <FramePanel className="flex items-center gap-2 px-4 py-2.5!">
          <TrophyIcon className="size-4 text-amber-500" />
          <span className="font-semibold text-sm">Contributor Leaderboard</span>
          <Badge className="ml-auto" size="sm" variant="secondary">
            This month
          </Badge>
        </FramePanel>
        {leaderboard.map((entry) => (
          <FramePanel
            className="flex items-center gap-3 px-4 py-2.5!"
            key={entry.initials}
          >
            <span className="w-5 shrink-0 text-center text-sm">
              {rankMedal[entry.rank] ?? (
                <span className="text-muted-foreground">{entry.rank}</span>
              )}
            </span>
            <Avatar className="size-8">
              <AvatarImage alt={entry.name} src={entry.avatar} />
              <AvatarFallback className="text-xs">
                {entry.initials}
              </AvatarFallback>
            </Avatar>
            <span className="flex-1 font-medium text-sm">{entry.name}</span>
            <span className="flex items-center gap-1 text-muted-foreground text-xs">
              <GitCommitHorizontalIcon className="size-3.5" />
              {entry.commits}
            </span>
          </FramePanel>
        ))}
      </Frame>
    </div>
  );
}
