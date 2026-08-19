/* eslint-env browser */

const d = document;
const is = "ds-input-password";

customElements.define(
	is,
	class extends HTMLInputElement {
		#button;

		handleClick = () => {
			const show = this.type === "password";
			this.type = show ? "text" : "password";
			this.#button.setAttribute("aria-pressed", `${show}`);
		};

		connectedCallback() {
			const button = d.createElement("button");
			button.type = "button";
			button.textContent = this.dataset.i18nShow ?? "Show";
			button.setAttribute("aria-pressed", "false");
			if (this.id) {
				button.setAttribute("aria-controls", this.id);
			}
			button.addEventListener("click", this.handleClick);
			this.#button = button;
			this.after(button);
		}

		disconnectedCallback() {
			this.#button?.removeEventListener("click", this.handleClick);
			this.#button?.remove();
		}
	},
	{ extends: "input" },
);
