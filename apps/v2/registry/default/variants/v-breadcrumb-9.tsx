import {
  ChevronRightIcon,
  HouseIcon,
  LayoutGridIcon,
  SettingsIcon,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";
import { Button } from "@/registry/default/ui/button";

export function Pattern() {
  return (
    <Breadcrumb>
      <BreadcrumbList className="sm:gap-1">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            render={<Button size="sm" variant="ghost" />}
          >
            <HouseIcon />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRightIcon />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            render={<Button size="sm" variant="ghost" />}
          >
            <LayoutGridIcon />
            Workspace
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRightIcon />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbPage>
            <Button size="sm" variant="secondary">
              <SettingsIcon />
              Settings
            </Button>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
