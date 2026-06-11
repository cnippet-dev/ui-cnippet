import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

const members = [
  {
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&dpr=2&q=80",
    email: "olivia@example.com",
    name: "Olivia Martin",
    plan: "Pro",
    planVariant: "default" as const,
    totalGb: 50,
    usedGb: 47.2,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    email: "jackson@example.com",
    name: "Jackson Lee",
    plan: "Free",
    planVariant: "outline" as const,
    totalGb: 5,
    usedGb: 3.8,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&dpr=2&q=80",
    email: "isabella@example.com",
    name: "Isabella Nguyen",
    plan: "Pro",
    planVariant: "default" as const,
    totalGb: 50,
    usedGb: 18.5,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&dpr=2&q=80",
    email: "william@example.com",
    name: "William Kim",
    plan: "Team",
    planVariant: "info" as const,
    totalGb: 100,
    usedGb: 82.1,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    email: "sofia@example.com",
    name: "Sofia Davis",
    plan: "Free",
    planVariant: "outline" as const,
    totalGb: 5,
    usedGb: 4.9,
  },
];

function StorageBar({ used, total }: { used: number; total: number }) {
  const pct = Math.min((used / total) * 100, 100);
  const color =
    pct >= 90 ? "bg-destructive" : pct >= 70 ? "bg-warning" : "bg-primary";

  return (
    <div className="flex items-center gap-2.5">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-muted-foreground text-xs tabular-nums">
        {used} / {total} GB
      </span>
    </div>
  );
}

export function Pattern() {
  const totalUsed = members.reduce((s, m) => s + m.usedGb, 0);
  const totalCap = members.reduce((s, m) => s + m.totalGb, 0);

  return (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>
            {totalUsed.toFixed(1)} GB of {totalCap} GB used across all members
          </CardDescription>
        </CardHeader>
        <CardPanel className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => {
                const pct = (m.usedGb / m.totalGb) * 100;
                return (
                  <TableRow key={m.email}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarImage alt={m.name} src={m.avatar} />
                          <AvatarFallback className="text-xs">
                            {m.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{m.name}</span>
                          <span className="text-muted-foreground text-xs">
                            {m.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge size="sm" variant={m.planVariant}>
                        {m.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <StorageBar total={m.totalGb} used={m.usedGb} />
                        {pct >= 90 && (
                          <span className="font-medium text-destructive text-xs">
                            Storage almost full
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardPanel>
      </Card>
    </div>
  );
}
