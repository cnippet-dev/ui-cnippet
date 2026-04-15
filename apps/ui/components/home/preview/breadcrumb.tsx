import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

export default function BreadcrumbPreview() {
  return (
    <div className="relative w-52 space-y-4">
      <div className="w-52 rounded-md bg-neutral-800 p-2 transition-opacity duration-300 group-hover:opacity-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8153 2.34689C12.7771 1.4345 11.2229 1.4345 10.1847 2.34689L3.93468 7.83932C3.34056 8.36143 3 9.11408 3 9.90502V18.2501C3 19.7689 4.23122 21.0001 5.75 21.0001H8.16057C9.12707 21.0001 9.91057 20.2166 9.91057 19.2501V17.0001C9.91057 15.8955 10.806 15.0001 11.9106 15.0001H12C13.1046 15.0001 14 15.8955 14 17.0001V19.2501C14 20.2166 14.7835 21.0001 15.75 21.0001H18.25C19.7688 21.0001 21 19.7689 21 18.2501V9.90502C21 9.11408 20.6594 8.36143 20.0653 7.83932L13.8153 2.34689Z"
                  fill="currentColor"
                />
              </svg>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <Skeleton className="h-2 w-12" />
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <Skeleton className="h-2 w-16" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="absolute inset-0 h-fit rounded-md bg-neutral-700/95 p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <svg
                className="size-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8153 2.34689C12.7771 1.4345 11.2229 1.4345 10.1847 2.34689L3.93468 7.83932C3.34056 8.36143 3 9.11408 3 9.90502V18.2501C3 19.7689 4.23122 21.0001 5.75 21.0001H8.16057C9.12707 21.0001 9.91057 20.2166 9.91057 19.2501V17.0001C9.91057 15.8955 10.806 15.0001 11.9106 15.0001H12C13.1046 15.0001 14 15.8955 14 17.0001V19.2501C14 20.2166 14.7835 21.0001 15.75 21.0001H18.25C19.7688 21.0001 21 19.7689 21 18.2501V9.90502C21 9.11408 20.6594 8.36143 20.0653 7.83932L13.8153 2.34689Z"
                  fill="currentColor"
                />
              </svg>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem className="text-[10px]">Components</BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem className="text-[10px]">Breadcrumb</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
