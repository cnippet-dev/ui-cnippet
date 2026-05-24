"use client";

import { sectionTemplates } from "@/lib/playground/section-templates";
import { usePlaygroundStore } from "@/lib/playground/store";

export function EmptyState() {
  const setTree = usePlaygroundStore((s) => s.setTree);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex size-12 items-center justify-center rounded-xl border border-gray-950/15 border-dashed dark:border-white/15">
          <span className="text-xl opacity-40">+</span>
        </div>
        <p className="font-mono text-gray-950/30 text-xs dark:text-white/30">
          Drag a layout block or click a variant to start
        </p>
      </div>

      <div className="w-full max-w-sm">
        <p className="mb-3 text-center font-mono text-[10px] text-gray-950/25 uppercase tracking-widest dark:text-white/20">
          or start from a template
        </p>
        <div className="grid grid-cols-2 gap-2">
          {sectionTemplates.map((template) => (
            <button
              className="group flex flex-col gap-1.5 rounded-xl border border-gray-950/8 bg-white px-4 py-3 text-left transition-all hover:border-gray-950/15 hover:shadow-sm dark:border-white/8 dark:bg-neutral-900 dark:hover:border-white/15"
              key={template.id}
              onClick={() => setTree(template.instantiate())}
              type="button"
            >
              <span className="text-base opacity-50 transition-opacity group-hover:opacity-80">
                {template.icon}
              </span>
              <span className="font-medium font-mono text-gray-950/70 text-xs dark:text-white/60">
                {template.label}
              </span>
              <span className="font-mono text-[10px] text-gray-950/35 leading-tight dark:text-white/30">
                {template.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
