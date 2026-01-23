import { hooks } from "@/registry/registry-hooks";
import { lib } from "@/registry/registry-lib";
import { styles } from "@/registry/registry-styles";
import { ui } from "@/registry/registry-ui";

export const registry = {
  homepage: "https://ui.cnippet.dev",
  items: [...ui, ...styles, ...lib, ...hooks],
  name: "cnippet/ui",
};
