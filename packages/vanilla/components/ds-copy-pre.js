/* eslint-env browser */

const d = document;
const is = "ds-copy-pre";

customElements.define(
	is,
	class extends HTMLPreElement {
		#button;
		#label;
		#timeout;

		handleClick = async () => {
			try {
				await navigator.clipboard.writeText(
					this.querySelector("code")?.textContent ?? "",
				);
			} catch {
				this.#label.textContent = this.dataset.i18nCopyFailed ?? "Copy failed";
				return;
			}
			this.#label.textContent = this.dataset.i18nCopied ?? "Copied";
			clearTimeout(this.#timeout);
			this.#timeout = setTimeout(() => {
				this.#label.textContent = this.dataset.i18nCopy ?? "Copy";
			}, 2000);
		};

		connectedCallback() {
			const button = d.createElement("button");
			button.type = "button";
			const svg = d.createElementNS("http://www.w3.org/2000/svg", "svg");
			svg.setAttribute("class", "icon");
			svg.setAttribute("aria-hidden", "true");
			svg.setAttribute("focusable", "false");
			const use = d.createElementNS("http://www.w3.org/2000/svg", "use");
			use.setAttribute("href", this.dataset.icon ?? "/img/icons.svg#copy");
			svg.append(use);
			const label = d.createElement("span");
			label.className = "visually-hidden";
			label.setAttribute("aria-live", "polite");
			label.textContent = this.dataset.i18nCopy ?? "Copy";
			button.append(svg, label);
			button.addEventListener("click", this.handleClick);
			this.#button = button;
			this.#label = label;
			this.prepend(button);
		}

		disconnectedCallback() {
			this.#button?.removeEventListener("click", this.handleClick);
			this.#button?.remove();
			clearTimeout(this.#timeout);
		}
	},
	{ extends: "pre" },
);
