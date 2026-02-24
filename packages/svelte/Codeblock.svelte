<script>
import "prismjs";
import "prismjs/components/prism-bash.js"; // sh
import "prismjs/components/prism-css.js"; // css
import "prismjs/components/prism-javascript.js"; // js
import "prismjs/components/prism-markup.js"; // html

import * as bash from "prismjs/components/prism-bash.js"; // sh
import * as css from "prismjs/components/prism-css.js"; // css
import * as javascript from "prismjs/components/prism-javascript.js"; // js
import * as markup from "prismjs/components/prism-markup.js"; // html

const languages = {
	bash,
	css,
	js: javascript,
	html: markup,
};

/*
 TODO
 - [ ] Cli
 - [ ] Numbered
 - https://www.cssscript.com/syntax-highlighter-custom-api/
  */

// import {format} from "prettier"; // await format(html)
// import format from "html-format"; // supports mac char format(html; " ".repeat(2); 55)
import formatHtml from "pretty"; // format(html; {ocd: true})
import Code from "./element/code.svelte";
import Pre from "./element/pre.svelte";

const { ...props } = $props();

const { language = "javascript", code, children } = props;

// for rendering svelte components into html
let componentCode;
if (typeof code === "object") {
	const { html } = code.render();
	componentCode = formatHtml(html, { ocd: true });
} else if (typeof code === "string" && code.includes("<html")) {
	componentCode = formatHtml(code, { ocd: true });
} else if (typeof code !== "string") {
	componentCode = "error";
}

// https://prismjs.com/plugins/line-numbers/
// https://prismjs.com/plugins/show-invisibles/
// https://prismjs.com/plugins/match-braces/
// wrap indent https://github.com/PrismJS/prism/issues/2202
const html = globalThis.Prism.highlight(
	componentCode ?? code,
	globalThis.Prism.languages[language],
	language,
).replaceAll('class="token ', 'class="');
</script>

<Pre>
  <Code {...props}>{@html html}</Code>
</Pre>

<style>
  :global(code) {
    --hex-neutral: #00000;
    --hex-red: #c52f21;
    --hex-cerise-red: #d81b60;
    --hex-cinnabar: #e53935;
    --hex-pomegranate: #f4511e;
    --hex-pizazz: #fb8c00;
    --hex-selective-yellow: #ffb300;
    --hex-bright-yellow: #fdd835;
    --hex-key-lime-pie: #c0ca33;
    --hex-sushi: #7cb342;
    --hex-apple: #43a047;
    --hex-elf-green: #00897b;
    --hex-pelorous: #00acc1;
    --hex-curious-blue: #039be5;
    --hex-cornflower-blue: #1e88e5;
    --hex-cobalt: #3949ab;
    --hex-daisy-bush: #5e35b1;
    --hex-violet-eggplant: #8e24aa;

    --lightness-code: var(--lightness-main-bold);

    --code-comment: light-dark(
      oklch(from #000 0.4 c h),
      oklch(from #000 0.7 c h)
    );
    --code-punctuation: oklch(
      from var(--hex-neutral) var(--lightness-code) c h
    );
    --code-deleted: oklch(from var(--hex-red) var(--lightness-code) c h);
    --code-inserted: oklch(
      from var(--hex-key-lime-pie) var(--lightness-code) c h
    );
    --code-operator: oklch(from var(--hex-cobalt) var(--lightness-code) c h);
    --code-keyword: oklch(from var(--hex-pelorous) var(--lightness-code) c h);
    --code-function: oklch(from var(--hex-cinnabar) var(--lightness-code) c h);
    --code-variable: oklch(from var(--hex-pizazz) var(--lightness-code) c h);

    /* prismjs */
    :global(.comment, .prolog, .doctype, .cdata) {
      color: var(--code-comment, --color-text);
    }
    :global(.punctuation) {
      color: var(--code-punctuation, --color-text);
    }
    :global(.namespace) {
      opacity: 0.7;
    }
    :global(.property, .tag, .boolean, .number, .constant, .symbol, .deleted) {
      color: var(--code-deleted, --color-del, --color-text);
    }
    :global(.selector, .attr-name, .string, .char, .builtin, .inserted) {
      color: var(--code-inserted, --color-ins, --color-text);
    }
    :global(.operator, .entity, .url, .style .string) {
      color: var(--code-operator, --color-text);
      background: hsla(0, 0, 100%, 0.5);
    }
    :global(.atrule, .attr-value, .keyword) {
      color: var(--code-keyword, --color-text);
    }
    :global(.function) {
      color: var(--code-function, --color-text);
    }
    :global(.regex, .important, .variable) {
      color: var(--code-variable, --color-text);
    }
    :global(.important, .bold) {
      font-weight: bold;
    }
    :global(.italic) {
      font-style: italic;
    }
    :global(.entity) {
      cursor: help;
    }
  }
</style>
