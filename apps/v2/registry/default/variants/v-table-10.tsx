import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Frame, FramePanel } from "@/registry/default/ui/frame";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

type ActionType = "login" | "export" | "delete" | "invite" | "update" | "create";

const actionVariant: Record<ActionType, "success" | "info" | "destructive" | "warning" | "outline"> = {
  create: "success",
  delete: "destructive",
  export: "outline",
  invite: "info",
  login: "outline",
  update: "warning",
};

const logs = [
  {
    action: "delete" as ActionType,
    actor: { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&dpr=2&q=80", email: "olivia@example.com", name: "Olivia Martin" },
    ip: "192.168.1.42",
    resource: "Project · Mobile App",
    time: "2 min ago",
  },
  {
    action: "invite" as ActionType,
    actor: { avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80", email: "jackson@example.com", name: "Jackson Lee" },
    ip: "10.0.0.15",
    resource: "User · sofia@example.com",
    time: "18 min ago",
  },
  {
    action: "export" as ActionType,
    actor: { avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&dpr=2&q=80", email: "isabella@example.com", name: "Isabella Nguyen" },
    ip: "203.0.113.7",
    resource: "Report · Q1 2025",
    time: "1 hr ago",
  },
  {
    action: "update" as ActionType,
    actor: { avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&dpr=2&q=80", email: "william@example.com", name: "William Kim" },
    ip: "172.16.0.3",
    resource: "Settings · Billing",
    time: "3 hr ago",
  },
  {
    action: "login" as ActionType,
    actor: { avatar: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80", email: "sofia@example.com", name: "Sofia Davis" },
    ip: "198.51.100.22",
    resource: "Auth · Password",
    time: "5 hr ago",
  },
  {
    action: "create" as ActionType,
    actor: { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&dpr=2&q=80", email: "olivia@example.com", name: "Olivia Martin" },
    ip: "192.168.1.42",
    resource: "API Key · Production",
    time: "Yesterday",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold text-sm">Audit Log</p>
        <span className="text-muted-foreground text-xs">{logs.length} recent events</span>
      </div>
      <Frame>
        <FramePanel className="p-0!">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-7">
                        <AvatarImage alt={log.actor.name} src={log.actor.avatar} />
                        <AvatarFallback className="text-xs">
                          {log.actor.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-xs">{log.actor.name}</span>
                        <span className="text-muted-foreground text-xs">{log.actor.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge size="sm" variant={actionVariant[log.action]}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{log.resource}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">{log.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FramePanel>
      </Frame>
    </div>
  );
}
