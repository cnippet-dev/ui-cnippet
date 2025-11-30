import type { Registry } from "shadcn/schema";

import { hooks } from "@/registry/registry-hooks";
import { lib } from "@/registry/registry-lib";
import { styles } from "@/registry/registry-styles";
import { ui } from "@/registry/registry-ui";
import { variants } from "./registry-variants";

export const registry = {
  homepage: "https://ui.cnippet.dev",
  items: [...ui, ...styles, ...variants, ...lib, ...hooks],
  name: "cnippet/ui",
} satisfies Registry;
