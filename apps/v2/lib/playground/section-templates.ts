import { nanoid } from "nanoid";
import type { PlaygroundNode } from "./types";

// ── Blueprint types ────────────────────────────────────────────────────────
// Blueprints are template definitions with placeholder IDs.
// When applied, every node gets a fresh nanoid so the same template can be
// added multiple times without ID collisions.

type BlueprintNode = Omit<PlaygroundNode, "id" | "children"> & {
  children: BlueprintNode[];
};

function instantiate(blueprint: BlueprintNode[]): PlaygroundNode[] {
  function clone(node: BlueprintNode): PlaygroundNode {
    return {
      children: node.children.map(clone),
      id: nanoid(8),
      props: { ...node.props },
      registryId: node.registryId,
      type: node.type,
    };
  }
  return blueprint.map(clone);
}

// ── Template definitions ───────────────────────────────────────────────────

const heroBlueprint: BlueprintNode[] = [
  {
    children: [
      {
        children: [
          {
            children: [],
            props: { label: "New Release" },
            registryId: "v-badge-1",
            type: "component",
          },
          {
            children: [
              {
                children: [],
                props: { label: "Get Started", size: "lg", variant: "default" },
                registryId: "v-button-1",
                type: "component",
              },
              {
                children: [],
                props: { label: "View Docs", size: "lg", variant: "outline" },
                registryId: "v-button-1",
                type: "component",
              },
            ],
            props: { align: "center", gap: "4", justify: "center" },
            registryId: "flex-row",
            type: "layout",
          },
        ],
        props: { align: "center", gap: "6" },
        registryId: "flex-col",
        type: "layout",
      },
    ],
    props: { maxWidth: "4xl", padding: "12" },
    registryId: "container",
    type: "layout",
  },
];

const featuresBlueprint: BlueprintNode[] = [
  {
    children: [
      {
        children: [
          {
            children: [],
            props: {},
            registryId: "v-card-1",
            type: "component",
          },
          {
            children: [],
            props: {},
            registryId: "v-card-1",
            type: "component",
          },
          {
            children: [],
            props: {},
            registryId: "v-card-1",
            type: "component",
          },
        ],
        props: { gap: "6" },
        registryId: "grid-3col",
        type: "layout",
      },
    ],
    props: { maxWidth: "7xl", padding: "8" },
    registryId: "container",
    type: "layout",
  },
];

const buttonRowBlueprint: BlueprintNode[] = [
  {
    children: [
      {
        children: [],
        props: { label: "Primary", variant: "default" },
        registryId: "v-button-1",
        type: "component",
      },
      {
        children: [],
        props: { label: "Outline", variant: "outline" },
        registryId: "v-button-1",
        type: "component",
      },
      {
        children: [],
        props: { label: "Secondary", variant: "secondary" },
        registryId: "v-button-1",
        type: "component",
      },
      {
        children: [],
        props: { label: "Ghost", variant: "ghost" },
        registryId: "v-button-1",
        type: "component",
      },
      {
        children: [],
        props: { label: "Destructive", variant: "destructive" },
        registryId: "v-button-1",
        type: "component",
      },
    ],
    props: { align: "center", gap: "3", wrap: "true" },
    registryId: "flex-row",
    type: "layout",
  },
];

const formRowBlueprint: BlueprintNode[] = [
  {
    children: [
      {
        children: [],
        props: { placeholder: "Email address", type: "email" },
        registryId: "v-input-1",
        type: "component",
      },
      {
        children: [],
        props: { placeholder: "Password", type: "password" },
        registryId: "v-input-1",
        type: "component",
      },
      {
        children: [],
        props: { label: "Sign in", size: "lg", variant: "default" },
        registryId: "v-button-1",
        type: "component",
      },
    ],
    props: { gap: "4" },
    registryId: "flex-col",
    type: "layout",
  },
];

// ── Public API ─────────────────────────────────────────────────────────────

export interface SectionTemplate {
  id: string;
  label: string;
  description: string;
  /** Emoji/icon for the card */
  icon: string;
  instantiate: () => PlaygroundNode[];
}

export const sectionTemplates: SectionTemplate[] = [
  {
    description: "Badge + CTA buttons in a centred column",
    icon: "✦",
    id: "hero",
    instantiate: () => instantiate(heroBlueprint),
    label: "Hero",
  },
  {
    description: "3-column grid of cards",
    icon: "⊞",
    id: "features",
    instantiate: () => instantiate(featuresBlueprint),
    label: "Features",
  },
  {
    description: "All button variants in a flex row",
    icon: "◈",
    id: "buttons",
    instantiate: () => instantiate(buttonRowBlueprint),
    label: "Button row",
  },
  {
    description: "Input fields + submit button",
    icon: "▦",
    id: "form",
    instantiate: () => instantiate(formRowBlueprint),
    label: "Form",
  },
];
