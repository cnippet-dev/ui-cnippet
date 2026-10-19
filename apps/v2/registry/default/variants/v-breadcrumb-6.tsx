// title: With Avatar
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";

export function Pattern() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="flex items-center gap-2" href="#">
            <Avatar className="size-5 rounded-sm">
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            Vercel
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="flex items-center gap-2" href="#">
            <Avatar className="size-5">
              <AvatarImage
                alt="Maya Patel"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&dpr=2&q=80"
              />
              <AvatarFallback>MP</AvatarFallback>
            </Avatar>
            @mayapatel
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Projects</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
