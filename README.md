<div align="center">
  <h1>@willfarrell-ds</h1>
  <p><strong>Design system</strong></p>
<p>
  <a href="https://github.com/willfarrell/design-system/actions/workflows/test-unit.yml"><img src="https://github.com/willfarrell/design-system/actions/workflows/test-unit.yml/badge.svg" alt="GitHub Actions unit test status"></a>
  <a href="https://github.com/willfarrell/design-system/actions/workflows/test-dast.yml"><img src="https://github.com/willfarrell/design-system/actions/workflows/test-dast.yml/badge.svg" alt="GitHub Actions dast test status"></a>
  <a href="https://github.com/willfarrell/design-system/actions/workflows/test-perf.yml"><img src="https://github.com/willfarrell/design-system/actions/workflows/test-perf.yml/badge.svg" alt="GitHub Actions perf test status"></a>
  <a href="https://github.com/willfarrell/design-system/actions/workflows/test-sast.yml"><img src="https://github.com/willfarrell/design-system/actions/workflows/test-sast.yml/badge.svg" alt="GitHub Actions SAST test status"></a>
  <a href="https://github.com/willfarrell/design-system/actions/workflows/test-lint.yml"><img src="https://github.com/willfarrell/design-system/actions/workflows/test-lint.yml/badge.svg" alt="GitHub Actions lint test status"></a>
  <br/>
  <a href="https://scorecard.dev/viewer/?uri=github.com/willfarrell/design-system"><img src="https://api.scorecard.dev/projects/github.com/willfarrell/design-system/badge" alt="Open Source Security Foundation (OpenSSF) Scorecard"></a>
  <a href="https://slsa.dev"><img src="https://slsa.dev/images/gh-badge-level3.svg" alt="SLSA 3"></a>
  <a href="https://github.com/willfarrell/design-system/blob/main/docs/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg"></a>
  <a href="https://biomejs.dev"><img alt="Checked with Biome" src="https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome"></a>
  <a href="https://conventionalcommits.org"><img alt="Conventional Commits" src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white"></a>
</p>
</div>

- Styles
  - reset
  - default (:root number vars)
  - a11y
  - media
- Themes
  - default (:root number values)
  - Light
  - Dark
  - Contrast
  - Forced Colours
  - Print
- Classes
  - accordions (+/-), (arrow down/up)
  - ol (Word default)
  - Flex ramp
  - pagination - https://coyleandrew.medium.com/design-better-pagination-a022a3b161e1
- Progressive Enhancements (CustomElements)
- Bootstrap.js
  - Trusted Types
  - CustomElements
- Patterns
  - <head>
  - <header>
    - Skip link
    - Locales
    - Nav button
  - <main>
    - Back to top w/ hotkey trigger
    - Search form w/ hotkey focus
    - Fluid Side padding
    - Fluid top padding
    - Fluid font-size
  - <section>
  - <footer>
  - page (header, main, footer)
  - page w/ aside (header, main, aside, footer )
  - page w/ form (header, back, main, footer )
    - Head
    - Header
    - Footer
    -
  - <address> w/ tel:, mailto:
  - <svg> sprite maps
  - popovers
    - https://hidde.blog/popover-accessibility/
    - https://hidde.blog/positioning-anchored-popovers/
- selected text - https://alfy.blog/2024/10/19/linking-directly-to-web-page-content.html
- hero
  - desktop first
    - side aligned hgroup with button
    - shrinking text width (draw eyes to button) css shape-outside (https://css-challenges.com/custom-text-shape/)
    - paired with img looking at text (when in mobile view, image looking up)
  - mobile first
    - centered hgroup & button
    - multiple smaller snapshot like images below
- set default `text-wrap: pretty` - https://www.joshwcomeau.com/css/browser-support/
- header logo alt-text `{Name} logo, to the homepage` - https://htmhell.dev/adventcalendar/2024/1/
- colour pallette - https://www.inclusivecolors.com/
- override pre whitespace -> https://blog.dwac.dev/posts/html-whitespace/
- lqip (blury img placeholders (https://leanrada.com/notes/css-only-lqip/)
- critical css generator - https://github.com/pocketjoso/penthouse / https://github.com/indirap/critical-css-generator
- save as design tokens file - https://tr.designtokens.org/format/
  - https://namedesigntokens.guide/

- container query hack to know when overflowing (chrome only - only vertical), can be used to hide nav on small screens https://www.bram.us/2023/09/16/solved-by-css-scroll-driven-animations-detect-if-an-element-can-scroll-or-not/
- captcha (PoW) - https://github.com/altcha-org/altcha
- cards - https://inclusive-components.design/cards/
- 
## Nav

### Design Tokens

#### Typography
- font-family (heading/text/code) w/ pangrams [choose]
- font-size (heading/text) [choose scale]
- font-weight (heading/text)
- line height
- letter spacing

#### Spacing & layout
- gap
- margin
- padding (-fixed)
- width
- height

#### Border & radius

- width
- style (solid)
- radius (button vs card)

#### Colour
- primary

- background
- border
- text/icon
- link / inline elements

#### Colour palettes
- color palettes (primary, accent) [choose]
- themes (light, dark, ...)

#### Elevation & effects
- shadow
- blur
- opacity

#### interactive states
- hover
- active
- focus

### Patterns

- [text]
  - heading group
  - headings
  - paragraph
  - horizontal rule
  - inline text (abbr, ...)
  - lists
  - accordion
  - alert (TODO)
  - badge
  - breadcrumb (TODO)
  - card
  - disclosure (details)
  - address
  - blockquote
  - code block
  - dialog w/ js
  - dialog w/ popover (TODO)
  - table
  - footnotes
- [media]
  - image
  - icon
  - video (TODO)
  - audio (TODO)
- [forms]
  - inputs (...)
  - typeahead select (TODO)
  - typeahead datalist (TODO)
  - typeahead fetch (TODO) - 1
  - typeahead aside filter
  - errors
- [navigation]
  - links
    - tag
  - button
  - dropdown w/ js
  - dropdown w/ popover (TODO)
  - body header (TODO) - 1
    - skip link
  - body footer
  - hero (TODO)
  - aside menu
    - Add in typeahead filter using `/` (ex https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/)
  - scroll spy

### Layouts
