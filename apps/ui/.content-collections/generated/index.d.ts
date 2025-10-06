import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Component = GetTypeByName<typeof configuration, "components">;
export declare const allComponents: Array<Component>;

export type Motion = GetTypeByName<typeof configuration, "motions">;
export declare const allMotions: Array<Motion>;

export type Chart = GetTypeByName<typeof configuration, "charts">;
export declare const allCharts: Array<Chart>;

export type Doc = GetTypeByName<typeof configuration, "docs">;
export declare const allDocs: Array<Doc>;

export {};
