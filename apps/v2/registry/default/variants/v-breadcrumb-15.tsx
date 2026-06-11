import { HouseIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/registry/default/ui/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@/registry/default/ui/menu";

const hidden = [
  { href: "#", label: "Dashboard" },
  { href: "#", label: "Settings" },
  { href: "#", label: "Integrations" },
];

export function Pattern() {
  return (
    <Breadcrumb>
      <BreadcrumbList className="sm:gap-1.5">
        <BreadcrumbItem>
          <BreadcrumbLink className="flex items-center gap-1" href="#">
            <HouseIcon className="size-4" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <Menu>
            <MenuTrigger
              render={
                <Button
                  className="-m-1.5 gap-1 text-muted-foreground"
                  size="icon-sm"
                  variant="ghost"
                />
              }
            >
              <BreadcrumbEllipsis />
              <Badge
                className="hidden sm:inline-flex"
                size="sm"
                variant="secondary"
              >
                {hidden.length}
              </Badge>
            </MenuTrigger>
            <MenuPopup align="start">
              {hidden.map((item) => (
                <MenuItem key={item.label} render={<Link href={item.href} />}>
                  {item.label}
                </MenuItem>
              ))}
            </MenuPopup>
          </Menu>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage className="font-medium">Notifications</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
