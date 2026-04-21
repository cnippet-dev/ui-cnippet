import { SettingsIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";

import { Button } from "@/registry/default/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

const subscriptions = [
  {
    billing: "$20/mo",
    nextBilling: "Mar 1, 2025",
    plan: "Pro",
    planVariant: "default" as const,
    service: "Vercel Pro",
    status: "Active",
    statusVariant: "success" as const,
  },
  {
    billing: "$21/user/mo",
    nextBilling: "Mar 15, 2025",
    plan: "Enterprise",
    planVariant: "info" as const,
    service: "GitHub Enterprise",
    status: "Active",
    statusVariant: "success" as const,
  },
  {
    billing: "$45/editor/mo",
    nextBilling: "Apr 1, 2025",
    plan: "Organization",
    planVariant: "warning" as const,
    service: "Figma Organization",
    status: "Active",
    statusVariant: "success" as const,
  },
  {
    billing: "$12.50/user/mo",
    nextBilling: "—",
    plan: "Business+",
    planVariant: "secondary" as const,
    service: "Slack Business+",
    status: "Cancelled",
    statusVariant: "destructive" as const,
  },
  {
    billing: "$8/user/mo",
    nextBilling: "Mar 20, 2025",
    plan: "Standard",
    planVariant: "outline" as const,
    service: "Linear Standard",
    status: "Trial",
    statusVariant: "info" as const,
  },
];

export function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Billing</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((sub) => (
            <TableRow key={sub.service}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{sub.service}</span>
                  <span className="text-muted-foreground text-xs">
                    Next: {sub.nextBilling}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge size="sm" variant={sub.planVariant}>
                  {sub.plan}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{sub.billing}</TableCell>
              <TableCell>
                <Badge size="sm" variant={sub.statusVariant}>
                  {sub.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button className="h-7" size="sm" variant="ghost">
                  <SettingsIcon aria-hidden="true" className="size-3.5" />
                  Manage
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
