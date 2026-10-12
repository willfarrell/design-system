/* eslint-env browser */

const d = document;
const is = "ds-codeblock-actions";

const icon = (href) => {
	const svg = d.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("class", "icon");
	svg.setAttribute("aria-hidden", "true");
	svg.setAttribute("focusable", "false");
	const use = d.createElementNS("http://www.w3.org/2000/svg", "use");
	use.setAttribute("href", href);
	svg.append(use);
	return svg;
};

const iconHref = (src, name) =>
	(src ?? `/img/icons.svg#${name}`).replace(/#.*$/, `#${name}`);

const control = (behaviour, href, text) => {
	const button = d.createElement("button", { is: behaviour });
	button.type = "button";
	const span = d.createElement("span");
	span.className = "visually-hidden";
	span.textContent = text;
	button.append(icon(href), span);
	return button;
};

customElements.define(
	is,
	class extends HTMLPreElement {
		#copy;
		#download;

		connectedCallback() {
			if (!this.querySelector("code")) return;

			if (this.dataset.filename !== undefined) {
				const download = control(
					"ds-download",
					iconHref(this.dataset.icon, "download"),
					this.dataset.i18nDownload ?? "Download",
				);
				download.dataset.elem = "code";
				download.dataset.filename = this.dataset.filename || "code.txt";
				this.#download = download;
				this.prepend(download);
			}

			const copy = control(
				"ds-copy",
				iconHref(this.dataset.icon, "copy"),
				this.dataset.i18nCopy ?? "Copy",
			);
			copy.dataset.elem = "code";
			if (this.dataset.i18nCopied) {
				copy.dataset.i18nCopied = this.dataset.i18nCopied;
			}
			if (this.dataset.i18nCopyFailed) {
				copy.dataset.i18nCopyFailed = this.dataset.i18nCopyFailed;
			}
			this.#copy = copy;
			this.prepend(copy);
		}

		disconnectedCallback() {
			this.#copy?.remove();
			this.#download?.remove();
		}
	},
	{ extends: "pre" },
);
