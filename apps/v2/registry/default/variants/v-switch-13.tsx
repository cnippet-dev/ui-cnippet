"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/registry/default/ui/switch";

export default function Particle() {
  const [dark, setDark] = useState(false);

  return (
    <div
      className={`flex w-full max-w-xs flex-col items-center gap-6 rounded-2xl border p-8 transition-colors duration-300 ${dark ? "border-zinc-700 bg-zinc-900 text-white" : "bg-white text-zinc-900"}`}
    >
      <div
        className={`flex size-16 items-center justify-center rounded-full transition-colors duration-300 ${dark ? "bg-zinc-800" : "bg-amber-50"}`}
      >
        {dark ? (
          <MoonIcon aria-hidden="true" className="size-7 text-indigo-400" />
        ) : (
          <SunIcon aria-hidden="true" className="size-7 text-amber-500" />
        )}
      </div>
      <div className="text-center">
        <p className="font-semibold">{dark ? "Dark Mode" : "Light Mode"}</p>
        <p
          className={`text-sm ${dark ? "text-zinc-400" : "text-zinc-500"} mt-1`}
        >
          {dark ? "Easy on the eyes at night" : "Crisp and clear in daylight"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <SunIcon
          aria-hidden="true"
          className={`size-4 ${dark ? "text-zinc-500" : "text-amber-500"}`}
        />
        <Switch
          checked={dark}
          className="data-checked:bg-indigo-600"
          onCheckedChange={setDark}
        />
        <MoonIcon
          aria-hidden="true"
          className={`size-4 ${dark ? "text-indigo-400" : "text-zinc-400"}`}
        />
      </div>
    </div>
  );
}
