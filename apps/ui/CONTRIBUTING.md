# Contributing to coss ui

Thank you for your interest in contributing to coss ui! This guide will help you understand how to contribute components and particles to our design system.

## Overview

**coss ui** consists of two main types of components:

1. **UI Components** - Core reusable components (`Button`, `Input`, etc.)
2. **Particles** - Composite components that use or combine multiple UI components

## Adding New Particles

Particles are composite components that use or combine multiple UI components. They appear in the documentation and on the particles page.

### Naming Convention

Particles use the format: `p-{component}-{N}.tsx`

- **component**: The component name (e.g., `button`, `input`, `alert-dialog`, `input-group`)
- **N**: Progressive number within the category (e.g., `1`, `2`, `3`)

**Examples:**
- `p-button-1.tsx` (first button particle)
- `p-input-2.tsx` (second input particle)
- `p-pagination-1.tsx` (first pagination particle)
- `p-alert-dialog-1.tsx` (first alert dialog particle)
- `p-input-group-3.tsx` (third input group particle)

**Note:** Component names use hyphens for multi-word components (e.g., `alert-dialog`, `input-group`, `number-field`).

### Step 1: Create the Particle Component

1. Create a new file in `registry/default/particles/` with the correct naming:
   ```bash
   # Example: p-button-8.tsx (8th button particle)
   touch registry/default/particles/p-button-8.tsx
   ```

2. Export a component named `Particle`:
   ```tsx
   // registry/default/particles/p-button-8.tsx
   import { Button } from "@/registry/default/ui/button"

   export default function Particle() {
     return (
       <div className="flex gap-2">
         <Button variant="outline">Cancel</Button>
         <Button>Save Changes</Button>
       </div>
     )
   }
   ```

**Important notes:**
- Always name the default export function `Particle` (not `ParticleBt8` or similar)
- Use Base UI primitives from `@/registry/default/ui/` (e.g., `input`, `button`, `label`, etc.)
- If a particle uses multiple UI primitives, choose the primary category for the file name
- Keep files minimal and focused

### Step 2: Add to Registry Particles

Add your particle to `registry/registry-particles.ts`:

```tsx
// registry/registry-particles.ts
{
  categories: categories("button"),
  description: "Button group with cancel and save actions",
  files: [{ path: "particles/p-button-8.tsx", type: "registry:block" }],
  name: "p-button-8",
  registryDependencies: ["@coss/button"],
  type: "registry:block",
}
```

**Important fields:**
- `name`: The particle id (e.g., `p-button-8`)
- `description`: Concise but descriptive (displays on particles page)
- `type`: Always `"registry:block"`
- `registryDependencies`: Array of UI components used (e.g., `["@coss/button"]`, `["@coss/input", "@coss/label"]`)
- `dependencies`: External npm package dependencies if needed (e.g., `["lucide-react"]`)
- `files`: Array with one file object:
  - `path`: `"particles/p-button-8.tsx"`
  - `type`: `"registry:block"`
- `categories`: Array of categories using the `categories()` helper function (e.g., `categories("button")`, `categories("input", "label")`)
  - **Important:** All valid category names are typed in `registry-categories.ts`. The `categories()` helper function ensures type safety and will show TypeScript errors if you use an invalid category name.
  - Category names use spaces (e.g., `"input group"`, `"alert dialog"`) not hyphens, as defined in `registry-categories.ts`
- `meta` (optional): Object with `className` property for wrapper styling:
  ```tsx
  meta: {
    className: "**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64",
  }
  ```

**meta.className Property:**
The `meta.className` property adds CSS classes to the particle preview wrapper. This is useful for:
- Responsive sizing: `"**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64"`
- Full width components: `"**:data-[slot=preview]:w-full"`
- Custom layouts and spacing

**Category Naming:**
- All valid category names are typed in `registry-categories.ts`
- Use category names that match exactly as defined in `registry-categories.ts` (e.g., `"input group"` not `"input-group"`, `"alert dialog"` not `"alert-dialog"`)
- The `categories()` helper function provides type safety - TypeScript will error if you use an invalid category
- For composite components, include all relevant categories
- Categories are used for filtering on the particles page

### Step 3: Add to Documentation (Optional)

If you want to showcase the particle in documentation:

1. Find the relevant MDX file in `content/docs/components/`
2. Add your particle with `<ComponentPreview />`:

```mdx
<ComponentPreview name="p-button-8" />
```

You can also pass a `className` prop to override the meta className:

```mdx
<ComponentPreview
  name="p-button-8"
  className="[&_.preview>*]:w-full [&_.preview>*]:max-w-80"
/>
```

## Final Steps

After adding your particle, run these scripts:

```bash
cd apps/ui

# Format code and sort imports
bun run format:all

# Build registry JSON files
bun run registry:build

## Copy UI components to the packages folder
bun run ui:propagate
```

The `registry:build` command will:
- Generate `registry/__index__.tsx` with all particles
- Generate `registry.json` and `public/r/registry.json`
- Build individual JSON files for each particle in `public/r/`

## Guidelines

### Code Style
- Use TypeScript
- Follow existing naming conventions
- Use meaningful, descriptive names
- Keep components focused and single-purpose
- Always export as `export default function Particle()`

### Categories
- All valid category names are typed in `registry-categories.ts`
- Use categories that correspond to actual components
- For composite components, include all relevant categories
- Categories are used for filtering on the particles page
- Category names must match exactly as defined in `registry-categories.ts` (use spaces, not hyphens)
- The `categories()` helper function ensures type safety - TypeScript will error if you use an invalid category

### Descriptions
- Keep descriptions concise but informative (≤ 15 words recommended)
- Focus on what the component does, not how it's implemented
- Descriptions appear on the particles page

### Dependencies
- Be accurate with `dependencies` and `registryDependencies` - these are used for installation
- `registryDependencies` should reference `@coss/*` package names
- `dependencies` should list external npm packages (e.g., `["lucide-react"]`)

### Numbering
- Particles are numbered sequentially within each category
- If you're adding a new particle to a category, check the highest number and increment
- For example, if `p-button-26.tsx` exists, the next button particle should be `p-button-27.tsx`

## Getting Help

- Check existing particles for patterns and conventions
- Look at similar components for reference
- Review `registry-categories.ts` for valid category names
- Ask questions in our community channels

Thank you for contributing to coss ui! 🎉
