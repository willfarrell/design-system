/* eslint-env browser */
import { controlValue } from "./control-value.js";

const d = document;
const is = "ds-copy";

if (!customElements.get(is)) {
	customElements.define(
		is,
		class extends HTMLButtonElement {
			#label;
			#idle;
			#status;
			#timeout;

			#swap = (text) => {
				this.#status.textContent = text;
				if (this.#label) this.#label.textContent = text;
				clearTimeout(this.#timeout);
				this.#timeout = setTimeout(() => {
					this.#status.textContent = "";
					if (this.#label) this.#label.textContent = this.#idle;
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
				this.#status = d.createElement("span");
				this.#status.className = "visually-hidden";
				this.#status.setAttribute("role", "status");
				this.after(this.#status);
				this.addEventListener("click", this.handleClick);
			}

			disconnectedCallback() {
				this.removeEventListener("click", this.handleClick);
				clearTimeout(this.#timeout);
				this.#status?.remove();
			}
		},
		{ extends: "button" },
	);
}
