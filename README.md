<div align="center">
  <h1>Cnippet UI</h1>
  <p>
    Accessible, copy-paste React components built on Base UI + Tailwind CSS.<br />
    Like shadcn/ui — but powered by Base UI instead of Radix.
  </p>

  [![GitHub stars](https://img.shields.io/github/stars/cnippet-dev/ui-cnippet?style=flat-square)](https://github.com/cnippet-dev/ui-cnippet)
  [![npm version](https://img.shields.io/npm/v/cnippet?style=flat-square)](https://www.npmjs.com/package/cnippet)
  [![CI](https://github.com/cnippet-dev/ui-cnippet/actions/workflows/ci.yml/badge.svg)](https://github.com/cnippet-dev/ui-cnippet/actions/workflows/ci.yml)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](./CONTRIBUTING.md)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)

  **[Live Demo](https://play.cnippet.dev)** · **[Documentation](https://ui.cnippet.dev)** · **[Discord](https://discord.gg/cnippet)** · **[Twitter](https://twitter.com/cnippetui)**
</div>

---

> Built on [Base UI](https://base-ui.com/) — fully accessible, copy-paste friendly, and production-ready.

## Why Cnippet UI?

| Feature | shadcn/ui | Cnippet UI |
|---------|-----------|------------|
| Primitive layer | Radix UI | **Base UI** (MUI team) |
| Styling | Tailwind CSS | **Tailwind CSS v4** |
| Copy-paste | Yes | **Yes** |
| Accessible | Yes | **Yes (WAI-ARIA / WCAG 2.1 AA)** |
| AI-friendly code | Partial | **Optimized for LLMs** |
| Bundle size | Medium | **Minimal (tree-shakeable)** |

## Quick Start

```bash
# Add a single component
npx cnippet@latest add button

# Add all components at once
npx cnippet@latest add ui

# With optimized color tokens (recommended)
npx cnippet@latest add ui @cnippet/colors-zinc
```

Then import:

```tsx
import { Button } from '@/components/ui/button'

export default function App() {
  return <Button variant="solid">Click me</Button>
}
```

## 40+ Components · 8 Categories

### Actions
| Component | Description |
|-----------|-------------|
| Button | Primary action trigger with multiple variants |
| Switch | Toggle between two states |
| Toggle | Single pressable toggle button |
| Toggle Group | Group of toggle buttons with single/multi selection |
| Toolbar | Container for grouping action controls |

### Data Display
| Component | Description |
|-----------|-------------|
| Accordion | Expandable/collapsible content sections |
| Chart | Data visualization (area, bar, line, and more) |
| Collapsible | Show/hide content with a trigger |
| Empty | Empty state placeholder |
| Table | Structured data display |

### Feedback
| Component | Description |
|-----------|-------------|
| Alert | Contextual feedback messages |
| Badge | Status indicators and labels |
| Kbd | Keyboard shortcut display |
| Progress | Progress indicator bar |
| Skeleton | Loading placeholder |
| Spinner | Loading spinner |
| Toast | Temporary notification messages |

### Forms
| Component | Description |
|-----------|-------------|
| Checkbox | Single checkbox input |
| Checkbox Group | Group of related checkboxes |
| Field | Form field wrapper with label and error |
| Fieldset | Grouping of related form fields |
| Form | Form container with validation |
| Input | Text input field |
| Input Group | Input with prefix/suffix addons |
| Label | Form label |
| Meter | Scalar measurement display |
| Number Field | Numeric input with increment/decrement |
| Radio Group | Single-select radio options |
| Slider | Range value selector |
| Textarea | Multi-line text input |

### Layout
| Component | Description |
|-----------|-------------|
| Avatar | User profile image/initials |
| Card | Contained content surface |
| Frame | Media frame/container |
| Group | Flex layout grouping |
| Preview Card | Hover preview card |
| Scroll Area | Custom scrollbar container |
| Separator | Visual divider |

### Navigation
| Component | Description |
|-----------|-------------|
| Breadcrumb | Page hierarchy navigation |
| Menu | Dropdown action menu |
| Pagination | Page navigation controls |
| Tabs | Tabbed content navigation |

### Overlays
| Component | Description |
|-----------|-------------|
| Alert Dialog | Confirmation dialog requiring user action |
| Context Menu | Right-click context menu |
| Dialog | Modal dialog window |
| Popover | Floating content panel |
| Sheet | Slide-in side panel |
| Tooltip | Hover information display |

### Pickers
| Component | Description |
|-----------|-------------|
| Autocomplete | Input with suggestion dropdown |
| Calendar | Date selection calendar |
| Combobox | Searchable select input |
| Select | Dropdown selection |

## Architecture

cnippet ui uses a layered approach:

- **Primitives** — Unstyled, accessible building blocks powered by Base UI (the foundation)
- **Particles** — Pre-assembled components like auth forms, tables, and date pickers (the patterns)
- **Atoms** — API-enhanced particles that integrate with external data and services (the integrations)

This is a [Next.js](https://nextjs.org) app within a [Turborepo](https://turbo.build/) monorepo, documented with [Fumadocs](https://fumadocs.vercel.app/).

## Styling

Components use a design token system based on CSS variables, compatible with shadcn/ui tokens. Additional tokens:

- `--destructive-foreground` — Destructive action foreground
- `--info` / `--info-foreground` — Info state colors
- `--success` / `--success-foreground` — Success state colors
- `--warning` / `--warning-foreground` — Warning state colors

See the [Styling guide](https://ui.cnippet.dev/docs/styling) for full details.

## Migrating from shadcn/ui

cnippet ui is inspired by shadcn/ui. If you're migrating from **Radix UI** or **shadcn/ui**, each component includes comparison notes and examples for translating equivalents to Base UI, preserving accessibility, behaviors, and API patterns.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

## Built on the Shoulders of Giants

cnippet ui would not exist without these incredible projects:

- [Base UI](https://base-ui.com/) — The accessible primitive layer
- [shadcn/ui](https://ui.shadcn.com/) — Inspiration for the copy-paste model
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling
- [Fumadocs](https://fumadocs.vercel.app/) — Documentation framework
- [Radix UI](https://radix-ui.com/) — Original accessible primitives inspiration

## Development

```bash
git clone https://github.com/cnippet-dev/ui-cnippet.git
cd cnippet-ui
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation site.

## License

MIT — see [LICENSE](./LICENSE) for details.
