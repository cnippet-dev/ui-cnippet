"use client";

import {
  RiComputerLine,
  RiSmartphoneLine,
  RiTabletLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";

export type PreviewWidth = "mobile" | "tablet" | "desktop";

const OPTIONS: { id: PreviewWidth; icon: React.ReactNode; title: string }[] = [
  {
    icon: <RiSmartphoneLine className="size-3.5" />,
    id: "mobile",
    title: "Mobile (375px)",
  },
  {
    icon: <RiTabletLine className="size-3.5" />,
    id: "tablet",
    title: "Tablet (768px)",
  },
  {
    icon: <RiComputerLine className="size-3.5" />,
    id: "desktop",
    title: "Desktop (full)",
  },
];

export const PREVIEW_WIDTHS: Record<PreviewWidth, string | undefined> = {
  desktop: undefined,
  mobile: "375px",
  tablet: "768px",
};

interface ResponsivePreviewProps {
  value: PreviewWidth;
  onChange: (v: PreviewWidth) => void;
}

export function ResponsivePreview({ value, onChange }: ResponsivePreviewProps) {
  return (
    <div className="flex items-center gap-0.5 rounded-md border border-gray-950/8 p-0.5 dark:border-white/10">
      {OPTIONS.map((opt) => (
        <button
          className={cn(
            "flex items-center justify-center rounded p-1 transition-colors",
            value === opt.id
              ? "bg-gray-950/6 text-gray-950 dark:bg-white/10 dark:text-white"
              : "text-gray-950/30 hover:text-gray-950/60 dark:text-white/25 dark:hover:text-white/50",
          )}
          key={opt.id}
          onClick={() => onChange(opt.id)}
          title={opt.title}
          type="button"
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
}
