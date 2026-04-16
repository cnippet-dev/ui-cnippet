import type { ReactNode } from "react";

// Workaround: fumadocs-ui/provider/next uses ComponentProps<typeof RootProvider>
// which TypeScript 6 fails to resolve, dropping `children` from RootProviderProps
// and triggering TS2559. Augment to restore it.
declare module "fumadocs-ui/provider/next" {
  interface RootProviderProps {
    children?: ReactNode;
  }
}
