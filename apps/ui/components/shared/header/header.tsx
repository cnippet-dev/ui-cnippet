import { GitHubLink } from "./github-link";
import { ModeSwitcher } from "./mode-switcher";
import { ProductLabel } from "./product-label";
import { ProductsDropdown } from "./products-dropdown";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

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

  return (
    <header className="bg-sidebar/80 before:bg-border/50 sticky top-0 z-10 mx-auto w-full max-w-[94.6%] backdrop-blur-sm before:absolute before:inset-x-0 before:bottom-0 before:h-px">
      <div className="relative container flex h-(--header-height) w-full items-center justify-between gap-2 px-4 sm:px-6">
        {mobileNav}
        <div className="font-heading -mt-0.5 flex shrink-0 items-center gap-1.5 text-2xl sm:text-[1.625em]">
          {isExternal ? (
            <a aria-label="Home" href={gatewayHome}>
              cnippet-dev
            </a>
          ) : (
            <Link aria-label="Home" href={gatewayHome}>
              cnippet.dev
            </Link>
          )}
          {/* <span className="text-muted-foreground/64">ui</span> */}
          <ProductLabel
            currentProduct={currentProduct}
            items={siteConfig.products}
          />
        </div>
        <div className="ms-auto flex items-center gap-2 md:flex-1 md:justify-end">
          {children}
          <ProductsDropdown items={siteConfig.products} />
          <GitHubLink />
          <ModeSwitcher />
        </div>
      </div>
    </header>
  );
}
