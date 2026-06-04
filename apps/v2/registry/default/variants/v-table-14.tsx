import { Badge } from "@/registry/default/ui/badge";
import { Progress } from "@/registry/default/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

const servers = [
  {
    cpu: 42,
    memory: 61,
    name: "web-prod-01",
    region: "us-east-1",
    status: "Healthy",
    statusVariant: "success" as const,
    uptime: "99.98%",
  },
  {
    cpu: 38,
    memory: 55,
    name: "web-prod-02",
    region: "us-east-1",
    status: "Healthy",
    statusVariant: "success" as const,
    uptime: "99.98%",
  },
  {
    cpu: 87,
    memory: 79,
    name: "api-prod-01",
    region: "us-west-2",
    status: "Warning",
    statusVariant: "warning" as const,
    uptime: "99.81%",
  },
  {
    cpu: 23,
    memory: 68,
    name: "db-primary",
    region: "eu-west-1",
    status: "Healthy",
    statusVariant: "success" as const,
    uptime: "99.99%",
  },
  {
    cpu: 96,
    memory: 91,
    name: "worker-01",
    region: "ap-east-1",
    status: "Critical",
    statusVariant: "destructive" as const,
    uptime: "97.23%",
  },
  {
    cpu: 14,
    memory: 33,
    name: "cache-01",
    region: "us-east-1",
    status: "Healthy",
    statusVariant: "success" as const,
    uptime: "100%",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Server</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CPU</TableHead>
            <TableHead>Memory</TableHead>
            <TableHead className="text-right">Uptime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {servers.map((s) => (
            <TableRow key={s.name}>
              <TableCell className="font-medium font-mono text-sm">
                {s.name}
              </TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {s.region}
              </TableCell>
              <TableCell>
                <Badge size="sm" variant={s.statusVariant}>
                  {s.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress className="h-1.5 w-16" value={s.cpu} />
                  <span className="w-8 text-right text-muted-foreground text-xs tabular-nums">
                    {s.cpu}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress className="h-1.5 w-16" value={s.memory} />
                  <span className="w-8 text-right text-muted-foreground text-xs tabular-nums">
                    {s.memory}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right font-mono text-sm">
                {s.uptime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
