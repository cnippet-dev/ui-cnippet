import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh">
      <div className="mx-auto flex w-full max-w-7xl flex-col border-x border-dashed bg-background [--docs-topbar-height:56px] [--footer-height:0px] [--header-height:3.5rem] [--sidebar-width:220px] [--top-spacing:0px] lg:[--sidebar-width:240px] lg:[--top-spacing:1rem]">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
