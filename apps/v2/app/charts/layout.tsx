import { DocsShell } from "@/components/site/docs-shell";

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsShell>{children}</DocsShell>;
}
