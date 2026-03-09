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
import Code from "../elements/code.svelte";
import Pre from "../elements/pre.svelte";

const { language = "javascript", code, children, ...props } = $props();

function highlight(code, language) {
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
	return globalThis.Prism.highlight(
		componentCode ?? code,
		globalThis.Prism.languages[language],
		language,
	).replaceAll('class="token ', 'class="');
}

const html = $derived(highlight(code, language));
</script>

<Pre>
  <Code {...props}>{@html html}</Code>
</Pre>

<style>
  :global(code) {
    --hex-neutral: #000000;
    --hex-red: #da3425;
    --hex-cerise-red: #e31c65;
    --hex-cinnabar: #e2201d;
    --hex-pomegranate: #f3420c;
    --hex-pizazz: #ff8c00;
    --hex-selective-yellow: #ffb300;
    --hex-bright-yellow: #fdcf02;
    --hex-key-lime-pie: #c1cc33;
    --hex-sushi: #81ba45;
    --hex-apple: #4bb450;
    --hex-elf-green: #00ffe6;
    --hex-pelorous: #00e1ff;
    --hex-curious-blue: #03a9fc;
    --hex-cornflower-blue: #1a86e5;
    --hex-cobalt: #4051bf;
    --hex-daisy-bush: #693bc4;
    --hex-violet-eggplant: #ae2dd2;

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
    :global(.comment),
    :global(.prolog),
    :global(.doctype),
    :global(.cdata) {
      color: var(--code-comment, var(--color-text));
    }
    :global(.punctuation) {
      color: var(--code-punctuation, var(--color-text));
    }
    :global(.namespace) {
      opacity: 0.7;
    }
    :global(.property),
    :global(.tag),
    :global(.boolean),
    :global(.number),
    :global(.constant),
    :global(.symbol),
    :global(.deleted) {
      color: var(--code-deleted, var(--color-del, var(--color-text)));
    }
    :global(.selector),
    :global(.attr-name),
    :global(.string),
    :global(.char),
    :global(.builtin),
    :global(.inserted) {
      color: var(--code-inserted, var(--color-ins, var(--color-text)));
    }
    :global(.operator),
    :global(.entity),
    :global(.url),
    :global(.style .string) {
      color: var(--code-operator, var(--color-text));
      background: hsla(0, 0, 100%, 0.5);
    }
    :global(.atrule),
    :global(.attr-value),
    :global(.keyword) {
      color: var(--code-keyword, var(--color-text));
    }
    :global(.function) {
      color: var(--code-function, var(--color-text));
    }
    :global(.regex),
    :global(.important),
    :global(.variable) {
      color: var(--code-variable, var(--color-text));
    }
    :global(.important),
    :global(.bold) {
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
