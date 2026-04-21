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

const orders = [
  {
    amount: "$1,999.00",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&dpr=2&q=80",
    customer: "Olivia Martin",
    date: "Feb 1, 2025",
    email: "olivia@example.com",
    id: "#3210",
    status: "Paid",
    statusVariant: "success" as const,
  },
  {
    amount: "$39.00",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    customer: "Jackson Lee",
    date: "Jan 28, 2025",
    email: "jackson@example.com",
    id: "#3209",
    status: "Pending",
    statusVariant: "warning" as const,
  },
  {
    amount: "$299.00",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&dpr=2&q=80",
    customer: "Isabella Nguyen",
    date: "Jan 25, 2025",
    email: "isabella@example.com",
    id: "#3208",
    status: "Paid",
    statusVariant: "success" as const,
  },
  {
    amount: "$99.00",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&dpr=2&q=80",
    customer: "William Kim",
    date: "Jan 22, 2025",
    email: "will@example.com",
    id: "#3207",
    status: "Refunded",
    statusVariant: "info" as const,
  },
  {
    amount: "$2,500.00",
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    customer: "Sofia Davis",
    date: "Jan 18, 2025",
    email: "sofia@example.com",
    id: "#3206",
    status: "Paid",
    statusVariant: "success" as const,
  },
];

export function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-sm">{order.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage alt={order.customer} src={order.avatar} />
                    <AvatarFallback>
                      {order.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">
                      {order.customer}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {order.date}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge size="sm" variant={order.statusVariant}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium text-sm">
                {order.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
