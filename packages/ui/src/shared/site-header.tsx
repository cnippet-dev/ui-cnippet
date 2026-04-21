"use client";
import { siteConfig } from "@cnippet/ui/lib/config";
import { ModeSwitcher } from "@cnippet/ui/shared/mode-switcher";
import { ProductLabel } from "@cnippet/ui/shared/product-label";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

export function SiteHeader({
  mobileNav,
  children,
  currentProduct,
}: {
  mobileNav?: React.ReactNode;
  children?: React.ReactNode;
  currentProduct?: string;
}) {
  const gatewayOrigin = process.env.NEXT_PUBLIC_COSS_URL || "";
  const gatewayHome = gatewayOrigin ? `${gatewayOrigin}/` : "/";
  const isExternal = !!gatewayOrigin;
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "grid grid-cols-1 md:-mx-4",
        pathname.startsWith("/ui") || pathname.startsWith("/docs")
          ? "sticky top-0 z-50 border-b px-4 backdrop-blur [--gutter-width:2rem] md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)] lg:mx-auto dark:supports-backdrop-filter:bg-neutral-950/60"
          : "[--gutter-width:2.5rem] md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-xl))_var(--gutter-width)] lg:mx-auto",
      )}
    >
      {/* Left gutter */}
      <div className="col-start-1 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />

      {/* Header content */}

      <div className="container relative flex h-(--header-height) w-full items-center justify-between gap-2 px-4 sm:px-6">
        {mobileNav}
        <div className="-mt-0.5 flex shrink-0 items-center gap-1.5 font-heading text-2xl sm:text-[1.625em]">
          {isExternal ? (
            <a aria-label="Home" href={gatewayHome}>
              coss.com
            </a>
          ) : (
            <Link aria-label="Home" href={gatewayHome}>
              coss.com
            </Link>
          )}
          <ProductLabel
            currentProduct={currentProduct}
            items={siteConfig.products}
          />
        </div>
        <div className="ms-auto flex items-center gap-2 md:flex-1 md:justify-end">
          {children}
          {/* <GitHubLink /> */}
          <ModeSwitcher />
        </div>
      </div>

      <div className="col-start-3 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />
    </header>
  );
}
