import type { ReactNode } from "react";

export default function PlaygroundLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-dvh w-full overflow-hidden bg-white dark:bg-neutral-950">
      {children}
    </div>
  );
}
