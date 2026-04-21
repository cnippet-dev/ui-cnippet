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

const members = [
  {
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&dpr=2&q=80",
    email: "sarah@example.com",
    name: "Sarah Chen",
    role: "Admin",
    roleVariant: "default" as const,
    status: "Active",
    statusVariant: "success" as const,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    email: "marcus@example.com",
    name: "Marcus Johnson",
    role: "Developer",
    roleVariant: "info" as const,
    status: "Active",
    statusVariant: "success" as const,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&dpr=2&q=80",
    email: "emily@example.com",
    name: "Emily Park",
    role: "Designer",
    roleVariant: "warning" as const,
    status: "Away",
    statusVariant: "warning" as const,
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&dpr=2&q=80",
    email: "david@example.com",
    name: "David Kim",
    role: "Viewer",
    roleVariant: "outline" as const,
    status: "Offline",
    statusVariant: "outline" as const,
  },
];

export function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <Frame>
        <FramePanel className="p-0!">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage alt={member.name} src={member.avatar} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {member.name}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge size="sm" variant={member.roleVariant}>
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge size="sm" variant={member.statusVariant}>
                      {member.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FramePanel>
      </Frame>
    </div>
  );
}
