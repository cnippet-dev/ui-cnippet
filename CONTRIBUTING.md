# Contributing to Cnippet UI

Thank you for your interest in contributing! This guide will help you get started.

## Ways to Contribute

- Report bugs via GitHub Issues
- Suggest new components or features
- Submit pull requests for bug fixes or new components
- Improve documentation
- Share your projects built with cnippet ui

## Development Setup

### Prerequisites

- Node.js >= 18
- Bun >= 1.3.6

### Getting Started

```bash
git clone https://github.com/cnippet-dev/ui-cnippet.git
cd cnippet-ui
bun install
bun dev
```

Open http://localhost:3000 to view the docs site.

## Adding a New Component

1. Create your component in `apps/ui/registry/default/variants/`
2. Register it in `apps/ui/registry.json`
3. Add documentation in `apps/ui/content/ui/<category>/`
4. Run `bun registry:build` to generate the registry
5. Submit a PR with a description of the component and its use case

## Pull Request Guidelines

- One component or fix per PR
- Include screenshots or a Loom demo for UI changes
- Ensure all TypeScript types are correct
- Follow the existing code style (Biome enforces this)

## Code of Conduct

Be respectful. See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Questions?

Open a Discussion on GitHub or join our [Discord](https://discord.gg/cnippet).
