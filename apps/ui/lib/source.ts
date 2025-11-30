import { loader } from "fumadocs-core/source";
import { ui } from "@/.source/server";

export const source = loader({
  baseUrl: "/ui",
  source: ui.toFumadocsSource(),
});
