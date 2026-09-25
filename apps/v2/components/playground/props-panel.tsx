"use client";

import type { PropSchema } from "@/lib/playground/props-schemas";
import {
  getCatalogEntry,
  getCategoryFromRegistryId,
} from "@/lib/playground/registry-catalog";
import { usePropsStore } from "@/lib/playground/store";

export function PropsPanel({ variantKey }: { variantKey: string }) {
  const propsMap = usePropsStore((s) => s.propsMap);
  const setProp = usePropsStore((s) => s.setProp);

  if (!variantKey) {
    return (
      <div className="flex h-full items-center justify-center border-border border-l">
        <p className="px-4 text-center font-mono text-[11px] text-faint">
          Select a component to edit its props
        </p>
      </div>
    );
  }

  const category = getCategoryFromRegistryId(variantKey);
  const entry = getCatalogEntry(variantKey);
  const currentProps = propsMap[category] ?? {};

  return (
    <div className="flex h-full flex-col border-border border-l">
      {/* Header */}
      <div className="border-border border-b px-4 py-2.5">
        <p className="font-mono font-semibold text-[10px] text-faint uppercase tracking-widest">
          Props
        </p>
        <p className="mt-0.5 font-mono text-muted-foreground text-xs">
          {variantKey}
        </p>
      </div>

      {/* Controls */}
      <div className="flex-1 overflow-y-auto p-4">
        {!entry || entry.propsSchema.length === 0 ? (
          <p className="font-mono text-[11px] text-faint">
            {entry
              ? "No configurable props for this component."
              : "Prop editing is not available for this component."}
          </p>
        ) : (
          <div className="space-y-4">
            {entry.propsSchema.map((schema) => (
              <PropControl
                key={schema.name}
                onChange={(v) => setProp(category, schema.name, v)}
                schema={schema}
                value={
                  currentProps[schema.name] !== undefined
                    ? currentProps[schema.name]
                    : schema.default
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Individual prop controls ───────────────────────────────────────────────

function PropControl({
  schema,
  value,
  onChange,
}: {
  schema: PropSchema;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const labelClass = "mb-1 block font-mono text-[11px] text-muted-foreground";
  const inputClass =
    "w-full rounded-md border border-border bg-transparent px-2 py-1 font-mono text-xs text-foreground/80 outline-none focus:border-border-strong  ";

  switch (schema.type) {
    case "enum":
      return (
        <div>
          <label className={labelClass}>{schema.label}</label>
          <select
            className={inputClass}
            onChange={(e) => onChange(e.target.value)}
            value={String(value ?? schema.default)}
          >
            {schema.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );

    case "boolean":
      return (
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            checked={Boolean(value ?? schema.default)}
            className="size-3.5 rounded"
            onChange={(e) => onChange(e.target.checked)}
            type="checkbox"
          />
          <span className="font-mono text-[11px] text-muted-foreground">
            {schema.label}
          </span>
        </label>
      );

    case "string":
      return (
        <div>
          <label className={labelClass}>{schema.label}</label>
          <input
            className={inputClass}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            value={String(value ?? schema.default)}
          />
        </div>
      );

    case "number":
      return (
        <div>
          <label className={labelClass}>{schema.label}</label>
          <input
            className={inputClass}
            onChange={(e) => onChange(Number(e.target.value))}
            type="number"
            value={Number(value ?? schema.default)}
          />
        </div>
      );
  }
}
