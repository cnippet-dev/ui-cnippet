# Repository protection

How `cnippet-dev/ui-cnippet` is protected, and why. Last updated 2026-11-19.

The repo is public and open source: anyone can read it, fork it and open a pull request. The goal of these settings is that **nothing reaches `main` without a pull request, passing CI and a maintainer's review**.

## Who can do what

| Who | Access | Can push to `main`? |
|---|---|---|
| Anyone on GitHub | read | No. Fork the repo and open a PR. |
| Collaborators with write access | write | No. Open a PR; it needs CI to pass and a code-owner approval. They can push to other branches. |
| `cnippet-dev` (repo admin) | admin | Only through a PR. The admin can bypass rules on a PR (e.g. merge their own PR), but not push directly. |

## `main` branch ruleset (`main-protection`)

Settings → Rules → Rulesets → `main-protection`. Applies to the default branch (`main`).

| Rule | Why |
|---|---|
| Require a pull request before merging, 1 approval | No direct pushes; every change is reviewed. |
| Require review from Code Owners | Approval must come from someone in [`CODEOWNERS`](CODEOWNERS), not from any collaborator. Stops two collaborators approving each other's work. |
| Dismiss stale approvals on new pushes | An approval only counts for the code that was actually reviewed. |
| Require conversation resolution | Review comments can't be ignored. |
| Require status checks: `Format Check / Format Check`, `Lint / Lint`, `Typecheck / Typecheck`, `Build / Build` | Broken code can't be merged. All four are listed because `Build` is skipped (and skipped counts as passing) when an earlier job fails. |
| Block force pushes | History on `main` can't be rewritten. |
| Restrict deletions | `main` can't be deleted. |
| Bypass: Repository admin, **for pull requests only** | The admin can still merge their own PRs, but can't push straight to `main` by accident. |

> If a CI job in `.github/workflows/ci.yml` is renamed, update the required check names in the ruleset too, or PRs will wait forever for a check that never runs.

## Code owners

[`.github/CODEOWNERS`](CODEOWNERS) lists `@cnippet-dev` and `@0x-negi` as owners of every file. A PR needs an approval from one of them. Nobody can approve their own PR, so a PR by `0x-negi` needs `cnippet-dev` and vice versa (or the admin bypass).

## GitHub Actions

Settings → Actions → General.

| Setting | Value | Why |
|---|---|---|
| Fork PR workflow approval | Require approval for **all external contributors** | Workflows from outside contributors don't run until a maintainer approves them, so a malicious PR can't run code in CI on its own. |
| Default `GITHUB_TOKEN` permissions | Read only | A workflow can't write to the repo unless it asks for it explicitly. |
| Actions can create/approve PRs | Off | A bot can't approve its way past the review rule. |

The `labeler` and `semantic-pull-requests` workflows use `pull_request_target` (they run with repo permissions on fork PRs). That is safe here because they never check out or run the PR's code. Keep it that way.

## Security features

Settings → Advanced Security.

| Feature | State | What it does |
|---|---|---|
| Secret push protection | On | Blocks pushes that contain API keys, tokens, etc. |
| Dependabot alerts | On | Warns when a dependency has a known vulnerability. |
| Dependabot security updates | On | Opens a PR that bumps a vulnerable dependency to the fixed version. Review and merge it like any PR. |
| Private vulnerability reporting | On | People can report security issues privately instead of in a public issue. Linked from [`SECURITY.md`](../SECURITY.md). |

## Housekeeping

- Deleted stale branches `v0/deepak-2551-1d565a65` and `v0/negideepakin-1987-dcd19f82` (no commits that weren't already on `main`).

## Still open

- Review whether every collaborator still needs write access (Settings → Collaborators).
- Not yet reviewed: webhooks, deploy keys, secrets, GitHub Apps, environments.
