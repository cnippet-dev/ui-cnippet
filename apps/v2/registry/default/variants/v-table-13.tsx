import { CheckIcon, MinusIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

const features: {
  enterprise: boolean | string;
  free: boolean | string;
  name: string;
  pro: boolean | string;
}[] = [
  { enterprise: true, free: true, name: "Projects", pro: true },
  {
    enterprise: "Unlimited",
    free: "Up to 3",
    name: "Team members",
    pro: "Up to 20",
  },
  { enterprise: "1 TB", free: "5 GB", name: "Storage", pro: "50 GB" },
  { enterprise: true, free: false, name: "Custom domains", pro: true },
  { enterprise: true, free: false, name: "Advanced analytics", pro: true },
  { enterprise: true, free: false, name: "API access", pro: true },
  { enterprise: true, free: false, name: "Priority support", pro: true },
  { enterprise: true, free: false, name: "SSO & SAML", pro: false },
  { enterprise: true, free: false, name: "Audit logs", pro: false },
  { enterprise: true, free: false, name: "Dedicated manager", pro: false },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-muted-foreground text-sm">{value}</span>;
  }
  return value ? (
    <CheckIcon className="size-4 text-emerald-500" />
  ) : (
    <MinusIcon className="size-4 text-muted-foreground/40" />
  );
}

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2">Feature</TableHead>
            <TableHead className="text-center">Free</TableHead>
            <TableHead className="text-center">Pro</TableHead>
            <TableHead className="text-center">Enterprise</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((f) => (
            <TableRow key={f.name}>
              <TableCell className="font-medium text-sm">{f.name}</TableCell>
              <TableCell className="text-center">
                <FeatureCell value={f.free} />
              </TableCell>
              <TableCell className="text-center">
                <FeatureCell value={f.pro} />
              </TableCell>
              <TableCell className="text-center">
                <FeatureCell value={f.enterprise} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
