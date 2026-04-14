<div align="center">
  <h1>Cnippet UI</h1>
  <p>
    Accessible, copy-paste React components built on Base UI + Tailwind CSS.<br />
    Like shadcn/ui — but powered by Base UI instead of Radix.
  </p>

  [![GitHub stars](https://img.shields.io/github/stars/cnippet-dev/ui-cnippet?style=flat-square)](https://github.com/cnippet-dev/ui-cnippet/stargazers)
  [![npm version](https://img.shields.io/npm/v/cnippet?style=flat-square)](https://www.npmjs.com/package/cnippet)
  [![CI](https://github.com/cnippet-dev/ui-cnippet/actions/workflows/ci.yml/badge.svg)](https://github.com/cnippet-dev/ui-cnippet/actions/workflows/ci.yml)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](../../LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](../../CONTRIBUTING.md)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)

  **[Live Demo](https://play.cnippet.dev)** · **[Documentation](https://ui.cnippet.dev)** · **[Discord](https://discord.gg/cnippet)** · **[Twitter](https://twitter.com/cnippetui)**
</div>

---

> Built on [Base UI](https://base-ui.com/) — fully accessible, copy-paste friendly, and production-ready.

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

## Documentation

Full docs at [ui.cnippet.dev](https://ui.cnippet.dev).

## Development

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the docs site.

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md).

## License

MIT
