/* eslint-env browser */
import { controlValue } from "./control-value.js";

const is = "ds-copy";

customElements.define(
	is,
	class extends HTMLButtonElement {
		#label;
		#idle;
		#timeout;

		#swap = (text) => {
			if (!this.#label) return;
			this.#label.textContent = text;
			clearTimeout(this.#timeout);
			this.#timeout = setTimeout(() => {
				this.#label.textContent = this.#idle;
			}, 2000);
		};

		handleClick = async () => {
			try {
				await navigator.clipboard.writeText(controlValue(this));
			} catch {
				this.#swap(this.dataset.i18nCopyFailed ?? "Copy failed");
				return;
			}
			this.#swap(this.dataset.i18nCopied ?? "Copied");
		};

		connectedCallback() {
			// The authored label is the idle text, so the i18n is the markup's
			this.#label = this.querySelector("span");
			this.#idle = this.#label?.textContent;
			this.#label?.setAttribute("aria-live", "polite");
			this.addEventListener("click", this.handleClick);
		}

		disconnectedCallback() {
			this.removeEventListener("click", this.handleClick);
			clearTimeout(this.#timeout);
		}
	},
	{ extends: "button" },
);
