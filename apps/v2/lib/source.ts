import { loader } from "fumadocs-core/source";
import { charts, docs, motion, ui } from "@/.source/server";

export const source = loader({
  baseUrl: "/ui",
  source: ui.toFumadocsSource(),
});

export const docSource = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const motionSource = loader({
  baseUrl: "/motion",
  source: motion.toFumadocsSource(),
});

export const chartSource = loader({
  baseUrl: "/charts",
  source: charts.toFumadocsSource(),
});
