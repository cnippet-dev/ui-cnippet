# Cnippet UI

Accessible and composable React components built on [Base UI](https://base-ui.com/) and styled with [Tailwind CSS](https://tailwindcss.com/). Like shadcn/ui, but powered by Base UI — copy-paste friendly so you fully own the code.

> **Early Access** — cnippet ui is in active development. Base UI is also in beta, so expect breaking changes as both projects evolve.

## Features

- **Accessible by Default** — WAI-ARIA / WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Fully Customizable** — Tailwind-first styling with sensible defaults, override any style to match your brand
- **Blazing Performance** — Tree-shakeable components with minimal bundle size
- **TypeScript Native** — Full type safety with comprehensive IntelliSense
- **Next.js Optimized** — Works with App Router and Server Components
- **Copy-Paste Friendly** — No black-box dependencies, you own every line of code
- **AI Friendly** — Clear, readable, and predictable code that language models can reason about

## Architecture

cnippet ui uses a layered approach:

- **Primitives** — Unstyled, accessible building blocks powered by Base UI (the foundation)
- **Particles** — Pre-assembled components like auth forms, tables, and date pickers (the patterns)
- **Atoms** — API-enhanced particles that integrate with external data and services (the integrations)

## Getting Started

### Prerequisites

A React project with [Tailwind CSS v4](https://tailwindcss.com) installed.

### Install all components

```bash
npx cnippet@latest add ui
```

With optimized color tokens (recommended):

```bash
npx cnippet@latest add ui @cnippet/colors-zinc
```

This installs both the UI components and the default zinc-based color system, which provides crisp, contrasted borders and enhanced visual depth.

### Add individual components

Each component page on [ui.cnippet.dev](https://ui.cnippet.dev) provides a CLI command, or you can manually copy the source code into your project (e.g., `components/ui/button.tsx`).

### Manual installation

1. Find a component on the docs site
2. Copy the code from the **Code** tab
3. Create a new file in your project and paste the code
4. Install any dependencies listed on the component page
5. Import and use the component

## Components

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

### Media

| Component | Description |
|-----------|-------------|
| Avatar | User profile image display |
| Carousel | Scrollable content slider |

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

## Styling

Components use a design token system based on CSS variables, compatible with shadcn/ui tokens. Additional tokens are provided for granular control:

- `--destructive-foreground` — Destructive action foreground
- `--info` / `--info-foreground` — Info state colors
- `--success` / `--success-foreground` — Success state colors
- `--warning` / `--warning-foreground` — Warning state colors

Install the optimized color system via CLI:

```bash
npx cnippet@latest add colors-zinc
```

See the [Styling guide](https://ui.cnippet.dev/docs/styling) for full details.

## Migrating from Radix UI / shadcn

If you're migrating from **Radix UI** or **shadcn/ui**, cnippet ui provides a clear migration path. Each component includes comparison notes and examples for translating Radix equivalents to Base UI, preserving accessibility, behaviors, and API patterns.

## Development

This is a [Next.js](https://nextjs.org) app within a Turborepo monorepo, documented with [Fumadocs](https://fumadocs.vercel.app/).

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation site.

## License

MIT
