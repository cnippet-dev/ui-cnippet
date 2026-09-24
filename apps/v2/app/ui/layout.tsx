import { DocsShell } from "@/components/site/docs-shell";

export default function UILayout({ children }: { children: React.ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
