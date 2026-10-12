/* eslint-env browser */

import Prism from "prismjs";

const d = document;
const is = "ds-codeblock-highlight";

const valid = /^[a-z0-9-]+$/;

const load = (lang) => {
	const name = `${is}-${lang}`;
	const link = d.querySelector(
		`link[rel="modulepreload"][data-lang="${lang}"]`,
	);
	return import(link?.href ?? `/js/pewc/${name}.js`);
};

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

customElements.define(
	is,
	class extends HTMLElement {
		#highlighted;

		async connectedCallback() {
			if (this.#highlighted) return;
			this.#highlighted = true;
			const lang = this.dataset.lang ?? "js";
			if (!valid.test(lang)) return;
			if (!Prism.languages[lang]) await load(lang).catch(() => {});
			const grammar = Prism.languages[lang];
			if (!grammar) return;
			const fragment = d.createDocumentFragment();
			render(Prism.tokenize(this.textContent, grammar), fragment);
			this.replaceChildren(fragment);
		}
	},
	{ extends: "code" },
);
