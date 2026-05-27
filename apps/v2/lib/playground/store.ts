"use client";

import { create } from "zustand";

interface PropsStore {
  /** Per-component-category prop overrides, e.g. { button: { variant: "outline" } } */
  propsMap: Record<string, Record<string, unknown>>;
  setProp: (category: string, name: string, value: unknown) => void;
}

export const usePropsStore = create<PropsStore>()((set) => ({
  propsMap: {},
  setProp(category, name, value) {
    set((s) => ({
      propsMap: {
        ...s.propsMap,
        [category]: { ...(s.propsMap[category] ?? {}), [name]: value },
      },
    }));
  },
}));
