import Link from "next/link";
import { TopBar } from "@/components/layout/topbar";

export default function MotionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative flex min-h-svh flex-col overflow-clip [--docs-topbar-height:56px] [--footer-height:0px] [--header-height:4rem] [--sidebar-width:220px] [--top-spacing:0px] lg:[--sidebar-width:240px] lg:[--top-spacing:1rem]"
    >
      <TopBar>
        <Link
          className="inline-flex h-8 items-center justify-center rounded-[2px] border border-transparent bg-primary px-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          href="/docs/introduction"
        >
          Get started
        </Link>
        <Link
          className="hidden h-8 items-center justify-center rounded-[2px] border px-3 font-medium text-sm transition-colors hover:bg-accent md:inline-flex"
          href="/explore"
        >
          Components
        </Link>
      </TopBar>
      <main className="flex flex-1 flex-col pt-16">{children}</main>
    </div>
  );
}
