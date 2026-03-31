import { PageTransitionPerspective } from "@/components/motion/page-transition";

export function Providers({ children }) {
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
