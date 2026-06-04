import { Building2Icon, UserIcon, UsersIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

export function Pattern() {
  return (
    <Frame>
      <FramePanel>
        <Breadcrumb>
          <BreadcrumbList className="gap-2 sm:gap-2">
            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center gap-2" href="#">
                <span className="flex size-6 items-center justify-center rounded-md bg-violet-100 dark:bg-violet-950">
                  <Building2Icon className="size-3.5 text-violet-600 dark:text-violet-400" />
                </span>
                <span className="font-medium text-sm">Acme Corp</span>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center gap-2" href="#">
                <span className="flex size-6 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-950">
                  <UsersIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
                </span>
                <span className="font-medium text-sm">Engineering</span>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-950">
                  <UserIcon className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                </span>
                <span className="font-medium text-sm">Alex Johnson</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </FramePanel>
    </Frame>
  );
}
