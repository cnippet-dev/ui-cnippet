import { transformers } from "@coss/ui/lib/highlight-code";
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift();
      plugins.push([
        // biome-ignore lint/suspicious/noExplicitAny: known
        rehypePrettyCode as any,
        {
          theme: {
            dark: "github-dark",
            light: "github-light-default",
          },
          transformers,
        },
      ]);

      return plugins;
    },
  },
});

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      links: z
        .object({
          api: z.string().optional(),
          doc: z.string().optional(),
        })
        .optional(),
    }),
  },
});
