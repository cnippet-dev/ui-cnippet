"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export const topbarButtonLinkClassName =
  "group flex items-center gap-1 font-medium text-foreground text-sm transition-colors hover:text-foreground";

type TopbarButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function TopbarButton({ href, children, className }: TopbarButtonProps) {
  return (
    <Link className={cn(topbarButtonLinkClassName, className)} href={href}>
      <span className="text-foreground/30 opacity-0 transition-all duration-100 group-hover:text-cnippet-blue group-hover:opacity-100">
        [
      </span>
      {children}
      <span className="text-foreground/30 opacity-0 transition-all duration-100 group-hover:text-cnippet-blue group-hover:opacity-100">
        ]
      </span>
    </Link>
  );
}
