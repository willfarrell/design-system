/* eslint-env browser */

import Prism from "prismjs";
import "prismjs/components/prism-bash.js"; // sh
import "prismjs/components/prism-css.js"; // css
import "prismjs/components/prism-javascript.js"; // js
import "prismjs/components/prism-markup.js"; // html
import "prismjs/components/prism-yaml.js"; // yaml, yml

const d = document;
const is = "ds-codeblock";

// Nodes, not `innerHTML`: Trusted Types blocks the string assignment, and the
// class is the token type on its own, `.token` carries no styles
const render = (tokens, parent) => {
	for (const token of [tokens].flat()) {
		if (typeof token === "string") {
			parent.append(token);
			continue;
		}
		const span = d.createElement("span");
		span.className = [token.type, token.alias].flat().filter(Boolean).join(" ");
		render(token.content, span);
		parent.append(span);
	}
};

// `code` has no dedicated interface
customElements.define(
	is,
	class extends HTMLElement {
		#highlighted;

		connectedCallback() {
			// Re-entrant on a move: highlighting the spans again nests them
			if (this.#highlighted) return;
			const grammar = Prism.languages[this.dataset.lang ?? "js"];
			if (!grammar) return;
			this.#highlighted = true;
			const fragment = d.createDocumentFragment();
			render(Prism.tokenize(this.textContent, grammar), fragment);
			this.replaceChildren(fragment);
		}
	},
	{ extends: "code" },
);
