import type { Registry } from "shadcn/schema";
import { baseUi } from "@/registry/registry-base-ui";
import { fonts } from "@/registry/registry-fonts";
import { hooks } from "@/registry/registry-hooks";
import { lib } from "@/registry/registry-lib";
import { styles } from "@/registry/registry-styles";
import { ui } from "@/registry/registry-ui";
import { variants } from "@/registry/registry-variants";

export const registry = {
  homepage: "https://coss.com",
  items: [
    ...ui,
    ...(variants as Registry["items"]),
    ...styles,
    ...fonts,
    ...lib,
    ...baseUi,
    ...hooks,
  ],
  name: "coss ui",
} satisfies Registry;
