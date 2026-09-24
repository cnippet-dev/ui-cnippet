import { DocsShell } from "@/components/site/docs-shell";

export default function MotionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
