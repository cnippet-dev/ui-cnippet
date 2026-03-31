"use client";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { type ReactNode, useContext, useRef } from "react";

interface FrozenRouterProps {
  children: ReactNode;
}

export function FrozenRouter({ children }: FrozenRouterProps) {
  const context = useContext(LayoutRouterContext);
  const prevContext = useRef(context);

  const frozenContext = prevContext.current;

  if (!frozenContext) {
    return <>{children}</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozenContext}>
      {children}
    </LayoutRouterContext.Provider>
  );
}
