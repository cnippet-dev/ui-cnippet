"use client";

import { ComponentCard } from "./component-card";
import { catalogue } from "./registry";

export function ComponentsShowcase() {
  return (
    <div className="space-y-16">
      {catalogue.map((cat) => (
        <section key={cat.label}>
          {/* Category heading */}
          <div className="relative mb-6 after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
            <h2 className="pb-3 font-mono text-black/40 text-xs tracking-tight dark:text-white/40">
              {cat.label}
            </h2>
          </div>

          {/* Component grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {cat.components.map((component) => (
              <ComponentCard key={component.name} {...component} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
