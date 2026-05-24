"use client";

import LZString from "lz-string";
import type { PlaygroundNode } from "./types";

export function compressTree(tree: PlaygroundNode[]): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(tree));
}

export function decompressTree(value: string): PlaygroundNode[] | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(value);
    if (!json) return null;
    return JSON.parse(json) as PlaygroundNode[];
  } catch {
    return null;
  }
}
