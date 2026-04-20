import type { Registry } from "shadcn/schema";

export const hooks: Registry["items"] = [
  {
    files: [
      {
        path: "hooks/use-media-query.ts",
        type: "registry:hook",
      },
    ],
    name: "use-media-query",
    type: "registry:hook",
  },
  {
    files: [
      {
        path: "hooks/use-copy-to-clipboard.ts",
        type: "registry:hook",
      },
    ],
    name: "use-copy-to-clipboard",
    type: "registry:hook",
  },
];
