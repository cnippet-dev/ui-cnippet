"use client";

import { getLayoutPropsSchema } from "@/lib/playground/layout-blocks";
import { usePlaygroundStore } from "@/lib/playground/store";
import type { PlaygroundNode } from "@/lib/playground/types";

interface LayoutControlsProps {
  node: PlaygroundNode;
}

export function LayoutControls({ node }: LayoutControlsProps) {
  const updateProps = usePlaygroundStore((s) => s.updateProps);
  const schema = getLayoutPropsSchema(node.registryId);

  if (schema.length === 0) {
    return (
      <p className="font-mono text-[11px] text-gray-950/30 dark:text-white/25">
        No configurable layout props.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {schema.map((prop) => {
        const value =
          node.props[prop.name] !== undefined
            ? String(node.props[prop.name])
            : String(prop.default);
        return (
          <div key={prop.name}>
            <label className="mb-1 block font-mono text-[11px] text-gray-950/50 dark:text-white/40">
              {prop.label}
            </label>
            <select
              className="w-full rounded-md border border-gray-950/10 bg-transparent px-2 py-1 font-mono text-gray-950/80 text-xs outline-none focus:border-gray-950/20 dark:border-white/10 dark:text-white/70 dark:focus:border-white/20"
              onChange={(e) =>
                updateProps(node.id, { [prop.name]: e.target.value })
              }
              value={value}
            >
              {prop.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}
