import { DocsSidebar } from "@/components/docs-sidebar";
import { SiteHeader } from "@/components/site-header";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/registry/default/ui/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />

      <div className="grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] justify-center [--gutter-width:2rem] md:-mx-4 md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)] lg:mx-4 ">
        <VerticalSeparatorLeft />

        <main className="flex flex-1 flex-col">
          <SidebarProvider className="container min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]">
            <DocsSidebar tree={source.pageTree} />
            <div className="h-full w-full">{children}</div>
          </SidebarProvider>
        </main>
        <VerticalSeparatorRight />
      </div>
    </>
  );
}

function VerticalSeparatorRight({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "row-span-full row-start-1 hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:col-start-3 md:block dark:[--pattern-fg:var(--color-white)]/8",
        className,
      )}
    />
  );
}

function VerticalSeparatorLeft({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "col-start-1 row-span-full row-start-1 hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8",
        className,
      )}
    />
  );
}
