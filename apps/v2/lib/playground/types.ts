export interface PlaygroundNode {
  id: string;
  /** "component" = leaf (variant), "layout" = container (Phase 2.5+) */
  type: "component" | "layout";
  /** e.g. "v-button-3", "v-card-1" */
  registryId: string;
  props: Record<string, unknown>;
  /** Populated only for layout nodes (Phase 2.5+) */
  children: PlaygroundNode[];
  locked?: boolean;
}

export type PlaygroundMode = "inspect" | "build";
