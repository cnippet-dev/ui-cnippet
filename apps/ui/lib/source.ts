import { loader } from "fumadocs-core/source";
import { ui } from "@/.source/server";
import { motion } from "@/.source/server";

export const source = loader({
  baseUrl: "/ui",
  source: ui.toFumadocsSource(),
});

export const motionSource = loader({
  baseUrl: "/motion",
  source: motion.toFumadocsSource(),
});
