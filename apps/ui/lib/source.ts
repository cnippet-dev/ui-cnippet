import { loader } from "fumadocs-core/source";
import { doc, ui } from "@/.source/server";

export const source = loader({
  baseUrl: "/ui",
  source: ui.toFumadocsSource(),
});

export const docSource = loader({
  baseUrl: "/docs",
  source: doc.toFumadocsSource(),
});
