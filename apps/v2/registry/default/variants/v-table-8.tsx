"use client";

import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/registry/default/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

type SortKey = "endpoint" | "latency" | "requests" | "errorRate";
type SortDir = "asc" | "desc";

const methodVariant: Record<string, "success" | "info" | "warning" | "destructive"> = {
  DELETE: "destructive",
  GET: "success",
  PATCH: "warning",
  POST: "info",
  PUT: "warning",
};

const rows = [
  { endpoint: "/api/users", errorRate: 0.2, latency: 48, method: "GET", requests: 12400 },
  { endpoint: "/api/orders", errorRate: 1.4, latency: 134, method: "POST", requests: 3200 },
  { endpoint: "/api/products", errorRate: 0.0, latency: 22, method: "GET", requests: 28900 },
  { endpoint: "/api/auth/login", errorRate: 3.8, latency: 210, method: "POST", requests: 8700 },
  { endpoint: "/api/users/:id", errorRate: 0.5, latency: 61, method: "PATCH", requests: 1100 },
  { endpoint: "/api/orders/:id", errorRate: 0.0, latency: 38, method: "DELETE", requests: 540 },
];

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ArrowUpDownIcon className="size-3 opacity-40" />;
  return sortDir === "asc"
    ? <ArrowUpIcon className="size-3" />
    : <ArrowDownIcon className="size-3" />;
}

export function Pattern() {
  const [sortKey, setSortKey] = useState<SortKey>("requests");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = [...rows].sort((a, b) => {
    const val = sortDir === "asc" ? 1 : -1;
    if (typeof a[sortKey] === "string") {
      return val * (a[sortKey] as string).localeCompare(b[sortKey] as string);
    }
    return val * ((a[sortKey] as number) - (b[sortKey] as number));
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const th = (key: SortKey, label: string, align = "left") => (
    <TableHead
      className={`cursor-pointer select-none hover:text-foreground transition-colors ${align === "right" ? "text-right" : ""}`}
      onClick={() => toggleSort(key)}
    >
      <span className={`inline-flex items-center gap-1 ${align === "right" ? "flex-row-reverse" : ""}`}>
        {label}
        <SortIcon col={key} sortDir={sortDir} sortKey={sortKey} />
      </span>
    </TableHead>
  );

  return (
    <div className="w-full max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Method</TableHead>
            {th("endpoint", "Endpoint")}
            {th("latency", "Avg latency", "right")}
            {th("requests", "Req / day", "right")}
            {th("errorRate", "Error %", "right")}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row) => (
            <TableRow key={`${row.method}-${row.endpoint}`}>
              <TableCell>
                <Badge size="sm" variant={methodVariant[row.method]}>
                  {row.method}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-xs">{row.endpoint}</TableCell>
              <TableCell className="text-right text-sm">{row.latency} ms</TableCell>
              <TableCell className="text-right text-sm">{row.requests.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <span
                  className={`text-sm font-medium ${
                    row.errorRate >= 3 ? "text-destructive" : row.errorRate >= 1 ? "text-warning" : "text-success-foreground"
                  }`}
                >
                  {row.errorRate.toFixed(1)}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
