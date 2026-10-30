# Contributing

In the spirit of Open Source Software, everyone is very welcome to contribute to this repository. Feel free to [raise issues](https://github.com/willfarrell/design-system/issues) or to [submit Pull Requests](https://github.com/willfarrell/design-system/pulls).

## Development Setup

```bash
git clone https://github.com/willfarrell/design-system.git
cd design-system
npm install
npm test
```

### Prerequisites

`npm install` covers the JavaScript tooling. `npm test` also calls these tools, which you need to install yourself and have on your `PATH`:

| Tool                                                        | Used by                 | Install                                          |
| ----------------------------------------------------------- | ----------------------- | ------------------------------------------------ |
| Node.js 26+                                                 | everything              | <https://nodejs.org>                             |
| [Playwright browsers](https://playwright.dev/docs/browsers) | `test:unit`, `test:e2e` | `npx playwright install --with-deps`             |
| [semgrep](https://semgrep.dev/docs/getting-started/)        | `test:sast:semgrep`     | `brew install semgrep` or `pipx install semgrep` |
| [trufflehog](https://github.com/trufflesecurity/trufflehog) | `test:sast:trufflehog`  | `brew install trufflehog`                        |
| [gitleaks](https://github.com/gitleaks/gitleaks)            | `test:sast:gitleaks`    | `brew install gitleaks`                          |
| [trivy](https://trivy.dev)                                  | `test:sast:trivy`       | `brew install trivy`                             |
| [actionlint](https://github.com/rhysd/actionlint)           | `test:sast:actionlint`  | `brew install actionlint`                        |
| [zizmor](https://docs.zizmor.sh)                            | `test:sast:zizmor`      | `brew install zizmor` or `pipx install zizmor`   |

License headers are added at release time (`npm run release:license:add`), so source files in the repo don't carry them.

## Committing

Ensure git commits meet the following FLOSS Best Practices:
- Message follows [Conventional Commits](https://www.conventionalcommits.org/) pattern. This is automatically enforced using `@commitlint/cli`.
- Message includes sign off for [Developer Certificate of Origin (DCO)](https://developercertificate.org/) compliance. This is automatically enforced using GitHub Actions on Pull-Requests.
  1. `git config --global user.name "Your Name"` and `git config --global user.email username@example.org` setup with `--signoff` flag on `git commit`
  2. Or, `Signed-off-by: username <email address>` as the last line of a commit, when a change is made through GitHub
- Commit is cryptographically signed and can be verified. This is automatically enforced by GitHub security configuration. [GitHub Docs: About commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)

## Code Style

Code is formatted and linted using [Biome](https://biomejs.dev).

## Licence

Licensed under [MIT Licence](LICENSE).
