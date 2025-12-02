import { loader } from "fumadocs-core/source";
import { ui } from "@/.source/server";
import { motion } from "@/.source/server";
import { doc } from "@/.source/server";

export const source = loader({
  baseUrl: "/ui",
  source: ui.toFumadocsSource(),
});

export const motionSource = loader({
  baseUrl: "/motion",
  source: motion.toFumadocsSource(),
});

export const docSource = loader({
  baseUrl: "/docs",
  source: doc.toFumadocsSource(),
});