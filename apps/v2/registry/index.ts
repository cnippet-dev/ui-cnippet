import type { Registry } from "shadcn/schema";
import { baseUi } from "@/registry/registry-base-ui";
import { fonts } from "@/registry/registry-fonts";
import { hooks } from "@/registry/registry-hooks";
import { lib } from "@/registry/registry-lib";
import { motionComponents } from "@/registry/registry-motion";
import { motionVariants } from "@/registry/registry-motion-variants";
import { styles } from "@/registry/registry-styles";
import { ui } from "@/registry/registry-ui";
import { variants } from "@/registry/registry-variants";

export const registry = {
  homepage: "https://ui.cnippet.dev",
  items: [
    ...ui,
    ...(variants as Registry["items"]),
    ...(motionComponents as Registry["items"]),
    ...(motionVariants as Registry["items"]),
    ...styles,
    ...fonts,
    ...lib,
    ...baseUi,
    ...hooks,
  ],
  name: "cnippet ui",
} satisfies Registry;
