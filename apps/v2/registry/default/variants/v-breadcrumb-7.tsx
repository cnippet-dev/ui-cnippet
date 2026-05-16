import { HouseIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";
import { Card, CardContent } from "@/registry/default/ui/card";

export function Pattern() {
  return (
    <Card className="p-2">
      <CardContent className="px-1 py-0">
        <Breadcrumb>
          <BreadcrumbList className="gap-1.5 sm:gap-1.5">
            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center gap-1.5" href="#">
                <HouseIcon aria-hidden="true" className="size-4" />
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                Checkout
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardContent>
    </Card>
  );
}
