<div align="center">
  <h1>@willfarrell-ds</h1>
  <p><strong>Design system</strong></p>
<p>
  <a href="https://github.com/willfarrell/design-system/actions/workflows/test-unit.yml"><img src="https://github.com/willfarrell/design-system/actions/workflows/test-unit.yml/badge.svg" alt="GitHub Actions unit test status"></a>
  <a href="https://github.com/willfarrell/design-system/actions/workflows/test-dast.yml"><img src="https://github.com/willfarrell/design-system/actions/workflows/test-dast.yml/badge.svg" alt="GitHub Actions dast test status"></a>
  <a href="https://github.com/willfarrell/design-system/actions/workflows/test-bench.yml"><img src="https://github.com/willfarrell/design-system/actions/workflows/test-bench.yml/badge.svg" alt="GitHub Actions perf test status"></a>
  <a href="https://github.com/willfarrell/design-system/actions/workflows/test-sast.yml"><img src="https://github.com/willfarrell/design-system/actions/workflows/test-sast.yml/badge.svg" alt="GitHub Actions SAST test status"></a>
  <a href="https://github.com/willfarrell/design-system/actions/workflows/test-lint.yml"><img src="https://github.com/willfarrell/design-system/actions/workflows/test-lint.yml/badge.svg" alt="GitHub Actions lint test status"></a>
  <br/>
  <a href="https://scorecard.dev/viewer/?uri=github.com/willfarrell/design-system"><img src="https://api.scorecard.dev/projects/github.com/willfarrell/design-system/badge" alt="Open Source Security Foundation (OpenSSF) Scorecard"></a>
  <a href="https://slsa.dev"><img src="https://slsa.dev/images/gh-badge-level3.svg" alt="SLSA 3"></a>
  <a href="https://biomejs.dev"><img alt="Checked with Biome" src="https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome"></a>
  <a href="https://conventionalcommits.org"><img alt="Conventional Commits" src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white"></a>
</p>
</div>

Semantic HTML, CSS, and progressive enhancement, published as three packages. Every component works without JavaScript. Scripts only add behaviour on top.

Documentation and live examples: https://design-system.willfarrell.ca

## Packages

| Package | Contents |
| --- | --- |
| `@willfarrell-ds/vanilla` | CSS for elements, classes, and themes, plus bootstrap scripts and `is="ds-*"` web components |
| `@willfarrell-ds/svelte` | Svelte 5 components and SvelteKit server hooks built on the vanilla package |
| `@willfarrell-ds/cli` | `ds` command that builds per-site CSS from your rendered output |

## Install

```sh
npm install @willfarrell-ds/vanilla
npm install @willfarrell-ds/svelte
npm install --save-dev @willfarrell-ds/cli
```

The Svelte package needs `svelte` 5, `@sveltejs/kit` 3, and `vite` 8 as peers. The CLI needs Node.js 26 or later.

## Usage

### CSS

Import everything:

```css
@import "@willfarrell-ds/vanilla/all.css";
```

Or import only what a page uses. Files live under `elements/`, `classes/`, `layers/`, and `media/`, with `theme.css` and `print.css` at the root. The CLI can write this import list for you (see below).

### Web components

Components are customized built-ins, written as `is` attributes on native elements, for example `<pre is="ds-codeblock-actions">` or `<input is="ds-fetch-typeahead">`. Load them with the bootstrap script:

```js
import "@willfarrell-ds/vanilla/bootstrap/webcomponents.js";
import "@willfarrell-ds/vanilla/bootstrap/tooltip.js";
import "@willfarrell-ds/vanilla/bootstrap/keyshortcuts.js";
import "@willfarrell-ds/vanilla/bootstrap/trustedtypes.js";
```

`webcomponents.js` includes the Safari polyfill for `is`. It imports each component when its element scrolls into view. It looks for a matching `<link rel="modulepreload">` first and falls back to `/js/pewc/<name>.js`. Import `trustedtypes.js` last, because it freezes the Trusted Types policy registry.

### Svelte

```svelte
<script>
import Codeblock from "@willfarrell-ds/svelte/components/Codeblock.svelte";
</script>

<Codeblock language="js" code={'console.log("hi")'} />
```

Components are under `components/`, thin element wrappers under `elements/`, and SvelteKit `handle` middleware (cache control, comment stripping, and similar) under `hooks/`.

### CLI

```sh
# write above.css, below.css, and app.css from the selectors your built pages use
ds extract --input-dir .svelte-kit --theme ./src/styles/theme.css --output-dir src/styles/

# minify and simplify the CSS in a build directory
ds optimize-styles .svelte-kit

# inline a CSS or JS file into every HTML file in a directory
ds inline build build/css/above.css
```

`extract` reads built HTML and JS, so run it after a build. The documentation site builds once, extracts, then builds again so the shipped CSS matches the pages (see `websites/design-system.willfarrell.ca/package.json`).

## Development

```sh
npm install
npm test                 # lint, unit, types, e2e, sast, bench, dast
npm run test:unit
npm start --workspace websites/design-system.willfarrell.ca
```

Visual regression baselines are Linux-only and come from the Playwright container. In the site workspace, run `npm run build && npm run preview`, then `npm run test:e2e:update` in a second terminal. Docker is required.

## Backlog

Not built yet:

- Breadcrumb
- Pagination ([pattern notes](https://coyleandrew.medium.com/design-better-pagination-a022a3b161e1))
- Audio player
- Typeahead backed by a native `<datalist>`, as its own component
- Blurred image placeholders ([CSS-only LQIP](https://leanrada.com/notes/css-only-lqip/))
- Type-to-filter in the aside navigation, focused with `/`
- Proof-of-work captcha ([altcha](https://github.com/altcha-org/altcha))
