"use client";

import { nanoid } from "nanoid";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { generateCode } from "./codegen";
import { isLayoutBlock } from "./layout-blocks";
import {
  findNodeById,
  findParentOf,
  insertIntoTree,
  moveInTree,
  removeFromTree,
} from "./tree-utils";
import type { PlaygroundMode, PlaygroundNode } from "./types";

const MAX_UNDO = 50;

function snapshot<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

interface PlaygroundStore {
  mode: PlaygroundMode;
  tree: PlaygroundNode[];
  selectedId: string | null;
  undoStack: PlaygroundNode[][];
  redoStack: PlaygroundNode[][];
  codeOutput: string;

  setMode: (mode: PlaygroundMode) => void;

  /**
   * Add a new node. Pass parentId to nest inside a layout block.
   * nodeType defaults to "layout" for layout blocks, "component" otherwise.
   */
  addNode: (
    registryId: string,
    nodeType?: "component" | "layout",
    parentId?: string | null,
  ) => void;

  removeNode: (id: string) => void;

  /**
   * Move a node to a new parent at a given index.
   * newParentId null = root level.
   */
  moveNode: (id: string, newParentId: string | null, newIndex: number) => void;

  duplicateNode: (id: string) => void;
  selectNode: (id: string | null) => void;
  undo: () => void;
  redo: () => void;
  setTree: (tree: PlaygroundNode[]) => void;

  /**
   * Merge props into a node. Does NOT push to undo stack (batched per-interaction).
   */
  updateProps: (id: string, props: Record<string, unknown>) => void;

  regenerateCode: () => void;
}

export const usePlaygroundStore = create<PlaygroundStore>()(
  immer((set) => ({
    addNode(registryId, nodeType, parentId = null) {
      set((s) => {
        s.undoStack.push(snapshot(s.tree));
        if (s.undoStack.length > MAX_UNDO) s.undoStack.shift();
        s.redoStack = [];

        const type =
          nodeType ?? (isLayoutBlock(registryId) ? "layout" : "component");

        const node: PlaygroundNode = {
          children: [],
          id: nanoid(8),
          props: {},
          registryId,
          type,
        };

        const insertIndex =
          parentId === null
            ? s.tree.length
            : (findNodeById(s.tree as PlaygroundNode[], parentId)?.children
                .length ?? 0);

        s.tree = insertIntoTree(
          s.tree as PlaygroundNode[],
          parentId,
          insertIndex,
          node,
        ) as typeof s.tree;

        s.selectedId = node.id;
        s.codeOutput = generateCode(s.tree as PlaygroundNode[]);
      });
    },
    codeOutput: "",

    duplicateNode(id) {
      set((s) => {
        const original = findNodeById(s.tree as PlaygroundNode[], id);
        if (!original) return;

        // Deep-clone with fresh IDs
        function cloneWithNewIds(node: PlaygroundNode): PlaygroundNode {
          return {
            ...snapshot(node),
            children: node.children.map(cloneWithNewIds),
            id: nanoid(8),
          };
        }
        const clone = cloneWithNewIds(original);

        s.undoStack.push(snapshot(s.tree));
        if (s.undoStack.length > MAX_UNDO) s.undoStack.shift();
        s.redoStack = [];

        const parent = findParentOf(s.tree as PlaygroundNode[], id);
        if (parent) {
          const idx = parent.children.findIndex((c) => c.id === id);
          s.tree = insertIntoTree(
            s.tree as PlaygroundNode[],
            parent.id,
            idx + 1,
            clone,
          ) as typeof s.tree;
        } else {
          const idx = s.tree.findIndex((n) => n.id === id);
          s.tree = insertIntoTree(
            s.tree as PlaygroundNode[],
            null,
            idx + 1,
            clone,
          ) as typeof s.tree;
        }

        s.selectedId = clone.id;
        s.codeOutput = generateCode(s.tree as PlaygroundNode[]);
      });
    },
    mode: "inspect",

    moveNode(id, newParentId, newIndex) {
      set((s) => {
        s.undoStack.push(snapshot(s.tree));
        if (s.undoStack.length > MAX_UNDO) s.undoStack.shift();
        s.redoStack = [];

        s.tree = moveInTree(
          s.tree as PlaygroundNode[],
          id,
          newParentId,
          newIndex,
        ) as typeof s.tree;
        s.codeOutput = generateCode(s.tree as PlaygroundNode[]);
      });
    },

    redo() {
      set((s) => {
        const next = s.redoStack.pop();
        if (!next) return;
        s.undoStack.push(snapshot(s.tree));
        s.tree = next as typeof s.tree;
        s.codeOutput = generateCode(s.tree as PlaygroundNode[]);
      });
    },
    redoStack: [],

    regenerateCode() {
      set((s) => {
        s.codeOutput = generateCode(s.tree as PlaygroundNode[]);
      });
    },

    removeNode(id) {
      set((s) => {
        s.undoStack.push(snapshot(s.tree));
        if (s.undoStack.length > MAX_UNDO) s.undoStack.shift();
        s.redoStack = [];

        s.tree = removeFromTree(
          s.tree as PlaygroundNode[],
          id,
        ) as typeof s.tree;
        if (s.selectedId === id) s.selectedId = null;
        s.codeOutput = generateCode(s.tree as PlaygroundNode[]);
      });
    },
    selectedId: null,

    selectNode(id) {
      set((s) => {
        s.selectedId = id;
      });
    },

    setMode(mode) {
      set((s) => {
        s.mode = mode;
      });
    },

    setTree(tree) {
      set((s) => {
        s.tree = tree as typeof s.tree;
        s.undoStack = [];
        s.redoStack = [];
        s.codeOutput = generateCode(tree);
      });
    },
    tree: [],

    undo() {
      set((s) => {
        const prev = s.undoStack.pop();
        if (!prev) return;
        s.redoStack.push(snapshot(s.tree));
        s.tree = prev as typeof s.tree;
        s.codeOutput = generateCode(s.tree as PlaygroundNode[]);
      });
    },
    undoStack: [],

    updateProps(id, newProps) {
      set((s) => {
        function apply(nodes: typeof s.tree): boolean {
          for (const node of nodes) {
            if (node.id === id) {
              Object.assign(node.props, newProps);
              return true;
            }
            if (apply(node.children)) return true;
          }
          return false;
        }
        apply(s.tree);
        s.codeOutput = generateCode(s.tree as PlaygroundNode[]);
      });
    },
  })),
);
