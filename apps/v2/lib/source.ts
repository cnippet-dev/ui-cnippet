import { loader } from "fumadocs-core/source";
import { docs, ui } from "@/.source/server";

export const source = loader({
  baseUrl: "/ui",
  source: ui.toFumadocsSource(),
});

export const docSource = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});
