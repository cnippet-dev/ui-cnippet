"use client";

import { RiMoonClearFill, RiSunLine } from "@remixicon/react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/registry/default/ui/button";

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      className="relative size-8"
      onClick={toggleTheme}
      size="icon"
      title="Toggle theme"
      variant="ghost"
    >
      {resolvedTheme === "dark" ? (
        <RiMoonClearFill className="size-4 text-muted-foreground" />
      ) : (
        <RiSunLine className="size-4 text-muted-foreground" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
