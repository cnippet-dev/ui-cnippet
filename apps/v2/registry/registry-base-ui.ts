import type { Registry } from "shadcn/schema";

export const baseUi: Registry["items"] = [
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "base-ui/use-render.ts",
        type: "registry:lib",
      },
    ],
    name: "use-render",
    type: "registry:lib",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "base-ui/merge-props.ts",
        type: "registry:lib",
      },
    ],
    name: "merge-props",
    type: "registry:lib",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "base-ui/csp-provider.ts",
        type: "registry:lib",
      },
    ],
    name: "csp-provider",
    type: "registry:lib",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "base-ui/direction-provider.ts",
        type: "registry:lib",
      },
    ],
    name: "direction-provider",
    type: "registry:lib",
  },
];
