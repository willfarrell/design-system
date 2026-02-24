/* eslint-env browser */

// https://www.w3.org/TR/webauthn-2
// Source: https://github.com/joostd/passkey-demo/blob/main/index.html
import { startRegistration } from "@simplewebauthn/browser";

const is = "ds-input-webauthn-create";
customElements.define(
	is,
	class extends HTMLInputElement {
		constructor() {
			super();
			this.$form = this.closest("form");
			this.$options = JSON.parse(this.getAttribute("data-options"));
		}

		handleSubmit = async (event) => {
			try {
				const credential = await startRegistration({
					optionsJSON: this.$options,
				});
				const value = JSON.stringify(credential);
				event.formData.append(this.name, value);
			} catch (e) {
				// clicking `Cancel` triggers error
				console.error(e);
			}
		};

		connectedCallback() {
			this.$form.addEventListener("submit", this.handleSubmit);
		}

		disconnectedCallback() {
			this.$form.removeEventListener("submit", this.handleSubmit);
		}
	},
	{ extends: "input" },
);
