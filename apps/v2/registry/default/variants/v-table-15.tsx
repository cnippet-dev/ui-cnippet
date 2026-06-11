import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

const contributors = [
  {
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&dpr=2&q=80",
    badge: "Top Contributor",
    change: +3,
    commits: 342,
    name: "Olivia Martin",
    prs: 87,
    rank: 1,
    reviews: 156,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    badge: null,
    change: -1,
    commits: 291,
    name: "Jackson Lee",
    prs: 64,
    rank: 2,
    reviews: 122,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&dpr=2&q=80",
    badge: null,
    change: +2,
    commits: 248,
    name: "Isabella Nguyen",
    prs: 71,
    rank: 3,
    reviews: 98,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&dpr=2&q=80",
    badge: null,
    change: 0,
    commits: 196,
    name: "William Kim",
    prs: 43,
    rank: 4,
    reviews: 87,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    badge: null,
    change: -2,
    commits: 163,
    name: "Sofia Davis",
    prs: 35,
    rank: 5,
    reviews: 74,
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Rank</TableHead>
            <TableHead>Contributor</TableHead>
            <TableHead className="text-right">Commits</TableHead>
            <TableHead className="text-right">PRs</TableHead>
            <TableHead className="text-right">Reviews</TableHead>
            <TableHead className="text-right">Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contributors.map((c) => (
            <TableRow key={c.rank}>
              <TableCell className="font-bold text-muted-foreground text-sm tabular-nums">
                #{c.rank}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar className="size-7">
                    <AvatarImage alt={c.name} src={c.avatar} />
                    <AvatarFallback className="text-xs">
                      {c.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-sm">{c.name}</span>
                  {c.badge && (
                    <Badge size="sm" variant="info">
                      {c.badge}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right text-sm tabular-nums">
                {c.commits}
              </TableCell>
              <TableCell className="text-right text-sm tabular-nums">
                {c.prs}
              </TableCell>
              <TableCell className="text-right text-sm tabular-nums">
                {c.reviews}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={`inline-flex items-center gap-0.5 text-xs tabular-nums ${
                    c.change > 0
                      ? "text-emerald-500"
                      : c.change < 0
                        ? "text-red-500"
                        : "text-muted-foreground"
                  }`}
                >
                  {c.change > 0 ? (
                    <TrendingUpIcon className="size-3" />
                  ) : c.change < 0 ? (
                    <TrendingDownIcon className="size-3" />
                  ) : null}
                  {c.change > 0
                    ? `+${c.change}`
                    : c.change === 0
                      ? "—"
                      : c.change}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
