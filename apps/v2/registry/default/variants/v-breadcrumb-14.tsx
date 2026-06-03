import { PencilIcon, ShareIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";
import { Button } from "@/registry/default/ui/button";
import { Frame, FramePanel } from "@/registry/default/ui/frame";
import { Separator } from "@/registry/default/ui/separator";

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Frame>
        <FramePanel className="flex items-center justify-between gap-4 px-4 py-2.5!">
          <Breadcrumb>
            <BreadcrumbList className="sm:gap-1.5">
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-muted-foreground text-sm hover:text-foreground"
                  href="#"
                >
                  Docs
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-muted-foreground text-sm hover:text-foreground"
                  href="#"
                >
                  Components
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-sm">
                  Breadcrumb
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex shrink-0 items-center gap-1">
            <Button size="xs" variant="ghost">
              <ShareIcon className="size-3.5" />
              Share
            </Button>
            <Separator className="h-4" orientation="vertical" />
            <Button size="xs" variant="ghost">
              <PencilIcon className="size-3.5" />
              Edit
            </Button>
          </div>
        </FramePanel>

        <FramePanel className="flex h-32 items-center justify-center text-muted-foreground text-sm">
          Page content
        </FramePanel>
      </Frame>
    </div>
  );
}
