"use client";

import { SparkArea } from "@/registry/default/charts/spark-area";
import { formatCompact } from "@/registry/default/lib/chart-utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

// Weekly active users per workspace, last 8 weeks.
const workspaces = [
  { name: "Acme Corp", users: [412, 438, 451, 497, 523, 548, 571, 602] },
  { name: "Globex", users: [288, 301, 296, 310, 305, 322, 318, 331] },
  { name: "Initech", users: [196, 188, 175, 169, 160, 152, 149, 141] },
  { name: "Umbrella", users: [120, 134, 151, 168, 182, 205, 231, 254] },
];

export default function ActiveUsersTable() {
  return (
    <Table className="max-w-lg">
      <TableHeader>
        <TableRow>
          <TableHead>Workspace</TableHead>
          <TableHead>Last 8 weeks</TableHead>
          <TableHead className="text-end">Weekly users</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workspaces.map((ws) => (
          <TableRow key={ws.name}>
            <TableCell className="font-medium">{ws.name}</TableCell>
            <TableCell>
              <SparkArea
                aria-label={`${ws.name} weekly users trend`}
                categories={["users"]}
                className="h-8 w-28"
                colorByTrend
                data={ws.users.map((users, week) => ({ users, week }))}
                index="week"
              />
            </TableCell>
            <TableCell className="text-end tabular-nums">
              {formatCompact(ws.users.at(-1) ?? 0)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
