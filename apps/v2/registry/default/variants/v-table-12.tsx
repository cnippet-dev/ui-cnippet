import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

const invoices = [
  {
    amount: "$4,800.00",
    client: "Acme Corp",
    due: "Feb 5, 2025",
    id: "INV-2025-001",
    issued: "Jan 5, 2025",
    status: "Paid",
    statusVariant: "success" as const,
  },
  {
    amount: "$2,150.00",
    client: "Globex Inc",
    due: "Feb 12, 2025",
    id: "INV-2025-002",
    issued: "Jan 12, 2025",
    status: "Overdue",
    statusVariant: "destructive" as const,
  },
  {
    amount: "$9,320.00",
    client: "Initech Ltd",
    due: "Feb 20, 2025",
    id: "INV-2025-003",
    issued: "Jan 20, 2025",
    status: "Pending",
    statusVariant: "warning" as const,
  },
  {
    amount: "$1,500.00",
    client: "Umbrella Co",
    due: "Feb 27, 2025",
    id: "INV-2025-004",
    issued: "Jan 27, 2025",
    status: "Paid",
    statusVariant: "success" as const,
  },
  {
    amount: "$7,200.00",
    client: "Cyberdyne Systems",
    due: "Mar 3, 2025",
    id: "INV-2025-005",
    issued: "Feb 3, 2025",
    status: "Draft",
    statusVariant: "outline" as const,
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Issued</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-mono font-medium text-sm">
                {inv.id}
              </TableCell>
              <TableCell className="text-sm">{inv.client}</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {inv.issued}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {inv.due}
              </TableCell>
              <TableCell>
                <Badge size="sm" variant={inv.statusVariant}>
                  {inv.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium text-sm">
                {inv.amount}
              </TableCell>
              <TableCell className="text-right">
                <Button className="h-7" size="sm" variant="ghost">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total outstanding</TableCell>
            <TableCell className="text-right">$11,470.00</TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
