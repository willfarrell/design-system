# Accessibility Specification: Design System

## Principles

1. **Progressive enhancement first.** Start with semantic HTML that works without JavaScript. Layer on CSS for presentation and JS for interactivity.
2. **Semantic HTML over ARIA.** Use native HTML elements before reaching for ARIA roles and attributes. The first rule of ARIA is: don't use ARIA if a native HTML element will do.
3. **No CSS-only interactive widgets.** CSS cannot manage state, update the DOM, or apply ARIA attributes. Interactive components require JavaScript. ([css-only-widgets-are-inaccessible](adrianroselli.com/css-accessibility/css-only-widgets-are-inaccessible.md))
4. **Don't assume the user.** Not all screen reader users are blind. Keyboard-only users include people using speech input, switch devices, and sip-and-puff systems.
5. **Test with real assistive technology.** Automated tools catch ~30% of issues. Manual testing with NVDA, JAWS, VoiceOver, and TalkBack is required.

---

## Semantic HTML

### Document Structure

- Use a single `<h1>` per page. Maintain heading hierarchy `<h1>`–`<h6>` matching document structure. The HTML5 outline algorithm was never implemented in any browser or assistive technology. ([the-truth-about-multiple-h1](adrianroselli.com/headings/the-truth-about-multiple-h1.md))
- Use semantic landmark elements: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<article>`, `<section>`.
- `<main>` must be present and have `id="main"` to support skip links.

### Element Semantics and CSS Display

- **`display: contents` breaks semantics** for tables, lists, headings, and buttons across browsers. Never use it on interactive or semantically meaningful elements. ([display-contents-is-not-a-css-reset](adrianroselli.com/css-accessibility/display-contents-is-not-a-css-reset.md), [css-display-properties-versus-html-semantics](adrianroselli.com/semantic-html/css-display-properties-versus-html-semantics.md))
- `display: flex` and `display: grid` on `<table>` elements strips table semantics in some browsers. If you must, restore semantics with ARIA roles (`table`, `rowgroup`, `row`, `cell`, `columnheader`, `rowheader`). ([tables-css-display-properties-and-aria](adrianroselli.com/tables/tables-css-display-properties-and-aria.md))
- `<details>` / `<summary>` are disclosure widgets only. They are **not** accordions, tab sets, menus, or dialogs. `<summary>` neutralizes nested element semantics. ([details-summary-are-not-insert-control-here](adrianroselli.com/dialogs-and-disclosures/details-summary-are-not-insert-control-here.md))

---

## Forms

### Labeling Priority

Use this priority order when labeling controls ([my-priority-of-methods-for-labeling-a-control](adrianroselli.com/forms/my-priority-of-methods-for-labeling-a-control.md)):

1. **`<label for="id">`**: Native HTML. Provides click-to-focus, voice control support, 20+ years of browser support.
2. **`aria-labelledby`** pointing to visible text: Works with voice control. All users see the label.
3. **Visually-hidden content** (`.visually-hidden` class): Only assistive technology users perceive it. No increased hit area.
4. **`aria-label`**: Last resort. Not translatable by browser translation services. 21–32% misuse rate in the wild.

Always use explicit `<label for="id">` association over wrapping inputs in `<label>` (better voice control support).

### Error Exposure

- Use `aria-describedby` linking to error message elements. It has more reliable cross-platform support than `aria-errormessage`. ([exposing-field-errors](adrianroselli.com/forms/exposing-field-errors.md))
- Use `aria-invalid="true"` only after a validation attempt, never on initial page load for required fields.
- Error message elements should use `aria-live="polite"` (not `assertive`) to preserve field name announcements.
- Don't place errors only below fields. Associate them programmatically via `aria-describedby`.
- Error IDs follow the pattern `{id}-error`. Hint IDs follow `{id}-hint`. Build `aria-describedby` from both.

### Grouped Controls

- Use `<fieldset>` and `<legend>` for related controls (radio groups, checkbox groups, address fields). Prefer native elements over `role="group"`. ([use-legend-and-fieldset](adrianroselli.com/forms/use-legend-and-fieldset.md))
- If legend styling is problematic, visually hide it while keeping it in the DOM. Never use `display: none` on `<legend>`.
- Add the word "required" explicitly in the legend text. This is more reliable than ARIA attributes alone for radio groups. ([support-for-marking-radio-buttons-required-invalid](adrianroselli.com/forms/support-for-marking-radio-buttons-required-invalid.md))

### Disabled & Read-Only Controls

- **Don't disable form controls.** Disabled elements fail to communicate why interaction is blocked and provide poor visual feedback. ([dont-disable-form-controls](adrianroselli.com/forms/dont-disable-form-controls.md))
- Use alternatives: clear instructions, error messages, `aria-live` announcements, or remove unnecessary controls.
- **Avoid `readonly`**: screen reader support is inconsistent, there's no default visual styling, and users can remove the attribute via DevTools. ([avoid-read-only-controls](adrianroselli.com/forms/avoid-read-only-controls.md))

### Browser Validation

- **Avoid default browser validation.** Built-in validation fails to convey pattern requirements, error messages disappear, and messages don't scale with zoom. Implement custom validation. ([avoid-default-field-validation](adrianroselli.com/forms/avoid-default-field-validation.md))
- Use `novalidate` on `<form>` elements and handle validation in JavaScript.

### Text Inputs

- Inherit typography: `font: inherit; letter-spacing: inherit; word-spacing: inherit;` because letter-spacing and word-spacing don't cascade with the `font` shorthand, breaking WCAG 1.4.12 (Text Spacing). ([under-engineered-text-boxen](adrianroselli.com/forms/under-engineered-text-boxen.md))
- Signal error states with visual indicators beyond color alone (e.g., border changes, icons).
- Mirror directional styles for RTL support.

### Select Menus

- Use native `<select>` elements. Custom implementations interfere with mobile gesture controls. ([under-engineered-select-menus](adrianroselli.com/forms/under-engineered-select-menus.md))
- Don't use `<select multiple>`. Use checkboxes instead.
- Custom arrows via `appearance: none` + background SVG. Mirror for RTL.

### Custom Checkboxes & Radios

- Visually hide inputs with clip/position methods, **not** `display: none`. ([under-engineered-custom-radio-buttons-and-checkboxen](adrianroselli.com/forms/under-engineered-custom-radio-buttons-and-checkboxen.md))
- Use pseudo-elements (`::before`, `::after`) for custom indicators.
- Support Windows High Contrast Mode, dark mode, `prefers-reduced-motion`, RTL, and print.
- Consider `accent-color` for simple brand customization.

### Toggle Switches

- Use `<input type="checkbox">` for progressive enhancement; `<button>` only if JS is guaranteed. ([under-engineered-toggles](adrianroselli.com/forms/under-engineered-toggles.md))
- Maintain 4.5:1 contrast ratio with background; 3:1 minimum for non-text elements.
- Support WHCM with system color keywords.

### Combobox / Autocomplete

- Native `<datalist>` has significant cross-browser issues (Firefox Android, Chrome Android landscape, zoom, voice control). ([under-engineered-comboboxen](adrianroselli.com/forms/under-engineered-comboboxen.md))
- Custom ARIA combobox must implement: `aria-autocomplete="list"`, `aria-owns`, `aria-expanded`, `role="listbox"` on options container, `role="option"` on each option, `aria-selected` state, and an `aria-live="polite"` status region announcing result count.

---

## Tables

### Semantic Markup

- Always use semantic table elements: `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`.
- Use `scope="col"` on column headers, `scope="row"` on row headers.
- Include `<caption>` for table identification (or `aria-labelledby`). ([hey-its-still-ok-to-use-tables](adrianroselli.com/tables/hey-its-still-ok-to-use-tables.md))

### Responsive Tables

- Wrap tables in a scrollable container: `<div role="region" aria-labelledby="caption-id" tabindex="0">` with `overflow: auto`. ([under-engineered-responsive-tables](adrianroselli.com/tables/under-engineered-responsive-tables.md))
- **Don't use CSS `display` properties** (`flex`, `grid`, `block`) on table elements, as they strip semantics. ([tables-css-display-properties-and-aria](adrianroselli.com/tables/tables-css-display-properties-and-aria.md))
- Avoid CSS scroll snap on tables, as it can clip content during zoom.

### Fixed Headers

- Use `position: sticky` for fixed column/row headers. ([fixed-table-headers](adrianroselli.com/tables/fixed-table-headers.md))
- Column headers: `position: sticky; top: 0; z-index: 2;`
- Row headers: `position: sticky; left: 0; z-index: 1;`
- `<caption>` doesn't support sticky positioning.

### ARIA Grid

- **Don't use ARIA grid roles** for data tables. Reserve grid only for spreadsheet-like applications requiring 2D arrow-key navigation. ([dont-turn-a-table-into-an-aria-grid](adrianroselli.com/tables/dont-turn-a-table-into-an-aria-grid.md), [aria-grid-as-an-anti-pattern](adrianroselli.com/aria/aria-grid-as-an-anti-pattern.md))
- For row selection, use checkboxes, not click handlers on `<tr>`.

---

## Dialogs & Disclosures

### Native Dialog

- Use `<dialog>` with `showModal()`. Native dialog provides focus trapping and the `inert` attribute for background content. ([dialog-focus-in-screen-readers](adrianroselli.com/dialogs-and-disclosures/dialog-focus-in-screen-readers.md))

### Focus Placement on Open

Choose based on dialog type ([where-to-put-focus-when-opening-a-modal-dialog](adrianroselli.com/dialogs-and-disclosures/where-to-put-focus-when-opening-a-modal-dialog.md)):

| Dialog Type | Focus Target |
|---|---|
| Short informational message | Close button (with `aria-describedby` for message) |
| Longer / interactive content | Dialog wrapper or primary heading |
| Action-required (destructive) | Least destructive option (cancel/close) |
| Brief login form | First input field |
| Longer / unexpected form | Dialog heading |

### Focus Return on Close

- Always return focus to the triggering element when a dialog closes.
- The trigger button should use `aria-haspopup="dialog"` and `aria-expanded` to communicate state.

---

## Navigation

### Site Navigation

- Use `<nav>`, `<ul>`, `<li>`, `<a>`, **not ARIA menu roles** (`role="menu"`, `role="menuitem"`). ([dont-use-aria-menu-roles-for-site-nav](adrianroselli.com/navigation/dont-use-aria-menu-roles-for-site-nav.md))
- ARIA menu roles require complex keyboard patterns (arrow keys, Home, End, Esc) that confuse users expecting standard tab navigation.
- Use `aria-label` on `<nav>` elements when multiple nav landmarks exist on a page. But don't over-label. A single nav may not need one. ([maybe-dont-name-that-landmark](adrianroselli.com/navigation/maybe-dont-name-that-landmark.md))

### Active Page Indication

- Use `aria-current="page"` on the link matching the current page.

### Dropdown / Disclosure Navigation

- Use disclosure widget pattern (button + hidden content) for dropdown menus. ([link-disclosure-widget-navigation](adrianroselli.com/navigation/link-disclosure-widget-navigation.md))
- Button needs `aria-expanded` state.

---

## ARIA

### General Rules

- **aria-label does not translate.** Browser translation tools and services skip ARIA attributes. Prefer visible text, `aria-labelledby` pointing to visible elements, or `.visually-hidden` text. ([aria-label-does-not-translate](adrianroselli.com/aria/aria-label-does-not-translate.md))
- **Don't dynamically change accessible names** on controls. Use separate live regions for status updates. ([be-careful-with-dynamic-accessible-names](adrianroselli.com/aria/be-careful-with-dynamic-accessible-names.md))
- **Don't add control hints** to screen readers (e.g., "Click this button to..."). Screen readers already announce appropriate interaction guidance. ([stop-giving-control-hints-to-screen-readers](adrianroselli.com/aria/stop-giving-control-hints-to-screen-readers.md))
- **Don't use `aria-label` on links.** It isn't translated and is ignored by read-aloud features. Don't use `aria-hidden` within links or split link text across elements. ([barriers-from-links-with-aria](adrianroselli.com/aria/barriers-from-links-with-aria.md))

### Live Regions

- Support varies significantly across platforms. `role="alert"` rarely produces the expected "alert" prefix. Test with multiple screen readers. ([live-region-support](adrianroselli.com/aria/live-region-support.md))
- Use `aria-live="polite"` as default. Reserve `assertive` for critical, time-sensitive information.
- Live region elements must exist in the DOM before content is injected.

---

## Focus Management

### Focus Styles

- **Create custom focus indicators** meeting WCAG 2.4.7 (Focus Visible) and 2.4.11 (Focus Appearance). ([avoid-default-browser-focus-styles](adrianroselli.com/focus-management/avoid-default-browser-focus-styles.md))
- Use `:focus-visible` (not `:focus`) to show focus rings only for keyboard navigation.
- Remove `:focus:not(:focus-visible)` outline to avoid showing rings on mouse click.
- Focus indicators need minimum 3:1 contrast against adjacent colors (WCAG 2.4.11).
- Recommended pattern:
  ```css
  :focus-visible {
    outline: 0.25rem solid var(--color-focus);
    outline-offset: 0.25rem;
    z-index: 1;
  }
  ```

### Keyboard-Only Scrolling Areas

- Add `tabindex="0"` to scrollable containers so keyboard users can scroll. ([keyboard-only-scrolling-areas](adrianroselli.com/focus-management/keyboard-only-scrolling-areas.md))
- Add `role="region"` and an accessible name (`aria-labelledby` or `aria-label`).
- Chrome 132+ and Firefox support native keyboard-focusable scrolling.

### Horizontal Scrolling

- Avoid horizontal scrolling as a content strategy. It creates barriers for keyboard users, voice control users, and breaks in-page search. ([horizontal-scrolling-containers](adrianroselli.com/focus-management/horizontal-scrolling-containers.md))
- If necessary, ensure keyboard navigation, clear scrolling affordances, and proper focus management.

### Focus on Item Deletion

- When an item is removed (e.g., from a list), move focus to the next logical item or a summary element.
- Never let focus drop to `<body>`.

---

## Color & Contrast

### Windows High Contrast Mode (WHCM)

- Use `@media (forced-colors: active)`, not the deprecated `-ms-high-contrast`. ([whcm-and-system-colors](adrianroselli.com/color-and-contrast/whcm-and-system-colors.md))
- Use CSS4 system color keywords: `Canvas`, `CanvasText`, `LinkText`, `ButtonText`, `ButtonFace`, `Highlight`, `HighlightText`, `Mark`, `MarkText`.
- Honor user color preferences. Override only when necessary for custom widgets.
- Include WHCM testing in the definition of done.

### Inverted Colors

- macOS color inversion (`@media (inverted-colors: inverted)`) inverts everything like a negative. It doesn't improve contrast. ([os-high-contrast-versus-inverted-colors](adrianroselli.com/color-and-contrast/os-high-contrast-versus-inverted-colors.md))
- Re-invert images and videos in inverted-colors mode to restore their appearance.
- Background images are discarded in high contrast modes. Don't rely on them for meaning.

### General

- Don't rely on color alone to convey information (WCAG 1.4.1).
- Text contrast: 4.5:1 for normal text, 3:1 for large text (WCAG 1.4.3).
- Non-text contrast: 3:1 for UI components and graphical objects (WCAG 1.4.11).

---

## Typography

### Zoom & Text Sizing

- Allow text to zoom to at least 200% without loss of content (WCAG 1.4.4). ([responsive-type-and-zoom](adrianroselli.com/typography/responsive-type-and-zoom.md))
- **Don't use viewport units** (`vw`, `clamp()`, `min()`, `max()`) that cap maximum text size.
- Use relative units (`%`, `em`, `rem`) for font sizes, never `px`.
- Set base font to `100%` on `<html>`.
- Honor OS text size preferences. ([honoring-mobile-os-text-size](adrianroselli.com/typography/honoring-mobile-os-text-size.md))

### Text Spacing

- Support WCAG 1.4.12 (Text Spacing): users must be able to override line-height (1.5x), letter-spacing (0.12em), word-spacing (0.16em), and paragraph spacing (2x font size) without loss of content.
- Inherit `letter-spacing` and `word-spacing` explicitly on form controls (they don't cascade with `font` shorthand).

### Anti-Patterns

- **Never split words into individual letter spans** for animation. Screen readers announce letter-by-letter. Using `aria-label` on `<div>` violates ARIA specs. ([dont-split-words-into-letters](adrianroselli.com/typography/dont-split-words-into-letters.md))

---

## CSS Patterns

### Interactive Widgets

- CSS-only widgets (disclosure, tabs, carousels, toggles) are inaccessible because they can't manage state, update ARIA attributes, or handle keyboard interaction. ([css-only-widgets-are-inaccessible](adrianroselli.com/css-accessibility/css-only-widgets-are-inaccessible.md))

### Display Properties

- `display: contents` removes elements from the accessibility tree. Never use on semantic or interactive elements. ([display-contents-is-not-a-css-reset](adrianroselli.com/css-accessibility/display-contents-is-not-a-css-reset.md))
- `display: flex/grid` on table elements strips table semantics. Restore with ARIA if unavoidable.

### Generated Content

- Prefer HTML `<img>` over CSS-generated content for meaningful images. ([alternative-text-for-css-generated-content](adrianroselli.com/css-accessibility/alternative-text-for-css-generated-content.md))
- CSS `content` with alt text (`content: url(img) / "alt"`) doesn't support localization or auto-translation.
- Use CSS-generated content only for clearly decorative purposes.

### Enforcing Accessibility with CSS

- Tie CSS styles to proper HTML/ARIA implementation using attribute selectors. ([using-css-to-enforce-accessibility](adrianroselli.com/css-accessibility/using-css-to-enforce-accessibility.md))
- Example: `button[aria-expanded="false"] + * { display: none; }`, which makes missing ARIA markup visually obvious.

### Logical Properties

- Use CSS logical properties (`inline-start`, `block-end`, etc.) for RTL/LTR support. ([css-logical-properties](adrianroselli.com/media-queries/css-logical-properties.md))

---

## Links & Buttons

### Choosing the Right Element

- **Links navigate** (`<a href>`), **buttons act** (`<button>`), **submits send data** (`<input type="submit">`/`<button type="submit">`). ([links-buttons-submits-and-divs](adrianroselli.com/links-and-buttons/links-buttons-submits-and-divs.md))
- Never use `<div>` or `<span>` with `role="button"`.
- Keyboard: anchors activate on Enter; buttons activate on Enter and Space.

### Link Underlines

- **Underline links in body text.** WCAG 1.4.1 requires visual distinction beyond color alone. ([on-link-underlines](adrianroselli.com/links-and-buttons/on-link-underlines.md))
- Use `text-decoration-skip-ink` to prevent descender interference.
- Navigation menus may be exceptions, but body content links must be clearly identifiable.

### Block Links / Clickable Cards

- Don't wrap entire cards in `<a>`, as this creates verbose screen reader output. ([block-links-cards-clickable-regions](adrianroselli.com/links-and-buttons/block-links-cards-clickable-regions.md))
- Use pseudo-element technique on the primary link only:
  ```css
  .card a[href]::after { content: ""; position: absolute; inset: 0; }
  ```
- Keep only the heading/title as the link text.
- Secondary controls must remain independently interactive.

---

## Images & Media

### Alt Text

- Write meaningful alt text considering audience, context, and intent. ([my-approach-to-alt-text](adrianroselli.com/images-and-media/my-approach-to-alt-text.md))
- Use `alt=""` for purely decorative images.
- Don't start alt text with "Image of..." because screen readers already announce the image role.

### Figures

- Don't wrap `<figure>` in a link. This causes accessibility issues across screen readers. ([dont-wrap-figure-in-a-link](adrianroselli.com/images-and-media/dont-wrap-figure-in-a-link.md))

### Video

- Provide captions and audio descriptions. Don't rely on YouTube auto-generated transcripts. ([dont-rely-on-youtube-transcripts](adrianroselli.com/images-and-media/dont-rely-on-youtube-transcripts.md))
- Embedded iframes must have a `title` attribute describing the content.

### Icons

- Decorative icons: `aria-hidden="true"` and `focusable="false"` on `<svg>`.
- Meaningful icons: provide text alternative via adjacent `.visually-hidden` text or `aria-label` on the parent button/link.

---

## Print

- Include link URLs in print styles. ([links-list-for-print-styles](adrianroselli.com/media-queries/links-list-for-print-styles.md))
- Hide navigation, interactive controls, and decorative elements.
- Ensure content is readable without color.
- Consider QR codes for key URLs. ([calling-qr-in-print-css](adrianroselli.com/media-queries/calling-qr-in-print-css.md))

---

## Media Queries

### Required Support

| Media Query | Purpose | Status |
|---|---|---|
| `prefers-color-scheme` | Dark/light mode | Required |
| `prefers-reduced-motion` | Disable animations | Required |
| `prefers-contrast` | Increase contrast, borders, font size | Required |
| `forced-colors` | Windows High Contrast Mode | Required |
| `prefers-reduced-transparency` | Remove transparency | Recommended |
| `prefers-reduced-data` | Hide decorative images | Recommended |
| `inverted-colors` | Re-invert images | Recommended |
| `print` | Print-friendly layout | Required |

### Reduced Motion

- Use the `animation-delay: -1ms; animation-duration: 0.01ms` technique to complete animations instantly rather than disabling them.
- Remove `scroll-behavior: smooth` and fixed background attachments.

---

## Visually Hidden Content

Use the standard pattern for content that should be accessible to screen readers but visually hidden:

```css
.visually-hidden:not(:focus):not(:active) {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}
```

Key points:
- `:not(:focus):not(:active)` allows focused elements (e.g., skip links) to become visible.
- `clip-path: inset(50%)` is required because `clip` alone is deprecated.
- Never use `display: none` or `visibility: hidden` for content that should remain in the accessibility tree.

---

## WCAG Conformance Targets

This design system targets **WCAG 2.2 Level AA** with select Level AAA criteria:

### Level A (Must)
- 1.3.1 Info and Relationships
- 2.1.1 Keyboard
- 2.4.1 Bypass Blocks (skip links)
- 2.4.2 Page Titled
- 4.1.2 Name, Role, Value

### Level AA (Must)
- 1.4.3 Contrast (Minimum): 4.5:1 text, 3:1 large text
- 1.4.4 Resize Text: 200% zoom
- 1.4.11 Non-text Contrast: 3:1 for UI components
- 1.4.12 Text Spacing
- 2.4.7 Focus Visible
- 2.4.11 Focus Appearance (2.2)
- 2.5.8 Target Size (Minimum) (2.2)

### Level AAA (Should)
- 2.4.13 Focus Appearance (Enhanced)
- 1.4.6 Contrast (Enhanced): 7:1 text, 4.5:1 large text

---

## References

All guidelines in this spec are grounded in Adrian Roselli's accessibility research, cached locally at `docs/adrianroselli.com/`. Each section links to the relevant source post(s). Additional references:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [HTML Specification](https://html.spec.whatwg.org/)
