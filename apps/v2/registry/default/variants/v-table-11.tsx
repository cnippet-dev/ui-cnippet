import { Badge } from "@/registry/default/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

const stockVariant: Record<
  StockStatus,
  "success" | "warning" | "destructive"
> = {
  "in-stock": "success",
  "low-stock": "warning",
  "out-of-stock": "destructive",
};

const stockLabel: Record<StockStatus, string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  "out-of-stock": "Out of Stock",
};

const products = [
  {
    category: "Electronics",
    name: "Wireless Earbuds",
    price: "$89.00",
    qty: 142,
    sku: "SKU-0021",
    stock: "in-stock" as StockStatus,
  },
  {
    category: "Accessories",
    name: "Mechanical Keyboard",
    price: "$149.00",
    qty: 8,
    sku: "SKU-0047",
    stock: "low-stock" as StockStatus,
  },
  {
    category: "Accessories",
    name: "USB-C Hub",
    price: "$49.00",
    qty: 256,
    sku: "SKU-0093",
    stock: "in-stock" as StockStatus,
  },
  {
    category: "Furniture",
    name: "Laptop Stand",
    price: "$79.00",
    qty: 0,
    sku: "SKU-0104",
    stock: "out-of-stock" as StockStatus,
  },
  {
    category: "Lighting",
    name: "Monitor Light Bar",
    price: "$59.00",
    qty: 14,
    sku: "SKU-0118",
    stock: "low-stock" as StockStatus,
  },
  {
    category: "Electronics",
    name: "Webcam 4K",
    price: "$199.00",
    qty: 67,
    sku: "SKU-0132",
    stock: "in-stock" as StockStatus,
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.sku}>
              <TableCell className="font-medium text-sm">{p.name}</TableCell>
              <TableCell className="font-mono text-muted-foreground text-xs">
                {p.sku}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {p.category}
              </TableCell>
              <TableCell className="text-right text-sm">{p.price}</TableCell>
              <TableCell className="text-right tabular-nums text-sm">
                {p.qty}
              </TableCell>
              <TableCell>
                <Badge size="sm" variant={stockVariant[p.stock]}>
                  {stockLabel[p.stock]}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
