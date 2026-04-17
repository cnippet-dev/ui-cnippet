import type { ReactNode } from "react";
import { PageTransitionPerspective } from "@/components/motion/page-transition";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PageTransitionPerspective
      duration={0.6}
      origin="top"
      rotateAmount={3}
      scaleAmount={0.95}
    >
      {children}
    </PageTransitionPerspective>
  );
}
